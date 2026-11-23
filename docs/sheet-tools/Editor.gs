/**
 * Server side of the "Website editor" sidebar (Editor.html).
 *
 * Lives in the same Apps Script project as website-menu.gs (Code.gs) and
 * uses its constants and helpers (SITE, KEY_PROPERTY, normalizeHeader,
 * callWebsite, goTo, …). Everything here reads or writes this Sheet,
 * uploads pictures to a "Website pictures" folder in Nicole's Drive, or
 * asks Claude (Anthropic) to turn a request into a proposed change that
 * she reviews before anything is saved.
 */

var FOLDER_PROPERTY = "NARRATIVA_PICTURE_FOLDER";
var AI_KEY_PROPERTY = "NARRATIVA_AI_KEY";
var AI_MODEL = "claude-opus-5-5";
var TIME_COLUMNS = ["event_time", "end_time", "time"];

// What the editor shows for each tab: plain labels, input types and help.
// The keys are the Sheet's column names (matched loosely, as on the site).
var FORMS = {
  Events: {
    label: "Events",
    item: "event",
    title: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "event_date", label: "Date", type: "date", required: true },
      { key: "event_time", label: "Starts", type: "time", placeholder: "11:30am" },
      { key: "end_time", label: "Ends", type: "time", placeholder: "1:00pm" },
      { key: "location", label: "Where", type: "text", placeholder: "Bethlehem, PA" },
      { key: "role", label: "Your role", type: "text", placeholder: "Keynote, Panel, Workshop…" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "cta_url", label: "Registration link", type: "url", placeholder: "https://…" },
      { key: "cta_label", label: "Button text", type: "text", placeholder: "Register" },
      { key: "visibility", label: "Who can come", type: "choice", options: [["public", "Open to the public"], ["private", "Private event"]] },
      { key: "image_url", label: "Flyer or photo", type: "picture" },
      { key: "featured", label: "Feature it at the top", type: "toggle" },
    ],
  },
  Partners: {
    label: "Partners",
    item: "partner",
    title: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "logo_url", label: "Logo", type: "picture", logo: true, required: true },
      { key: "logo_background", label: "Logo colours", type: "choice", options: [["light", "Normal logo"], ["dark", "White logo (needs a dark tile)"]] },
      { key: "relationship", label: "Relationship", type: "text", placeholder: "Only when confirmed" },
      { key: "featured", label: "Feature it first", type: "toggle" },
      { key: "sort_order", label: "Order", type: "number", placeholder: "10, 20, 30…" },
    ],
  },
  Podcasts: {
    label: "Podcasts",
    item: "podcast or interview",
    title: "show",
    fields: [
      { key: "show", label: "Show", type: "text", required: true },
      { key: "title", label: "Episode title", type: "text" },
      { key: "url", label: "Link to the episode", type: "url", required: true, placeholder: "https://…" },
      { key: "image_url", label: "Cover picture", type: "picture" },
      { key: "published_date", label: "Date", type: "date" },
      { key: "host", label: "Host", type: "text" },
      { key: "kind", label: "Kind", type: "choice", options: [["Podcast", "Podcast"], ["Interview", "Interview"], ["YouTube", "YouTube"], ["Spotify", "Spotify"], ["Apple", "Apple"], ["Vimeo", "Vimeo"]] },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "featured", label: "Feature it at the top", type: "toggle" },
    ],
  },
  Recognition: {
    label: "Awards",
    item: "award",
    title: "title",
    fields: [
      { key: "title", label: "Award", type: "text", required: true },
      { key: "organization", label: "Given by", type: "text", required: true },
      { key: "year", label: "Year", type: "number", placeholder: "2025" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "url", label: "Link", type: "url", placeholder: "https://…" },
      { key: "image_url", label: "Picture", type: "picture" },
      { key: "featured", label: "Feature it first", type: "toggle" },
    ],
  },
  Books: {
    label: "Book",
    item: "book",
    title: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "tagline", label: "One line about it", type: "text" },
      { key: "description", label: "Description", type: "textarea", tall: true, help: "Leave a blank line between paragraphs. Lines starting with - become a list." },
      { key: "publisher", label: "Publisher", type: "text" },
      { key: "release_date", label: "Release date", type: "date" },
      { key: "amazon_url", label: "Amazon link", type: "url" },
      { key: "barnes_noble_url", label: "Barnes & Noble link", type: "url" },
    ],
  },
};

// ---------------------------------------------------------------------
// Opening and loading

function openEditor() {
  var html = HtmlService.createHtmlOutputFromFile("Editor").setTitle("Website editor");
  SpreadsheetApp.getUi().showSidebar(html);
}

function editorLoad() {
  var ss = SpreadsheetApp.getActive();
  var props = PropertiesService.getDocumentProperties();
  var tabs = {};
  Object.keys(FORMS).concat(["Settings"]).forEach(function (name) {
    tabs[name] = readTab(ss.getSheetByName(name));
  });
  return {
    forms: FORMS,
    tabs: tabs,
    connected: !!props.getProperty(KEY_PROPERTY),
    aiEnabled: !!props.getProperty(AI_KEY_PROPERTY),
    today: Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "yyyy-MM-dd"),
    site: SITE,
  };
}

/** A tab as plain text values, keyed by column, with row numbers. */
function readTab(sheet) {
  if (!sheet || sheet.getLastColumn() === 0) return { exists: !!sheet, rows: [], columns: [] };
  var tz = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  var values = sheet.getDataRange().getValues();
  var keys = values[0].map(function (h) { return normalizeHeader(h); });
  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var cells = values[r];
    if (cells.every(function (c) { return String(c).trim() === ""; })) continue;
    var row = {};
    keys.forEach(function (key, i) {
      if (!key || row[key] !== undefined && row[key] !== "") return;
      row[key] = cellText(cells[i], key, tz);
    });
    rows.push({ row: r + 1, values: row });
  }
  return { exists: true, rows: rows, columns: keys.filter(function (k) { return k; }) };
}

function cellText(value, key, tz) {
  if (value === null || value === undefined) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    if (TIME_COLUMNS.indexOf(key) !== -1) {
      return Utilities.formatDate(value, tz, "h:mma").toLowerCase();
    }
    return Utilities.formatDate(value, tz, "yyyy-MM-dd");
  }
  if (value === true) return "TRUE";
  if (value === false) return "FALSE";
  return String(value);
}

// ---------------------------------------------------------------------
// Saving

/**
 * Write `fields` ({column: text}) into a row. row = 0 adds a new row at
 * the bottom. Columns the tab doesn't have yet are added at the end.
 * Returns the row number and the tab as it is now.
 */
function editorSave(tabName, row, fields) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(15000);
  try {
    var sheet = SpreadsheetApp.getActive().getSheetByName(tabName);
    if (!sheet) throw new Error("There's no tab called " + tabName + " in this Sheet.");
    var columns = headerColumns(sheet);
    var isNew = !row;
    if (isNew) row = Math.max(2, sheet.getLastRow() + 1);
    Object.keys(fields).forEach(function (key) {
      var col = ensureColumn(sheet, columns, key);
      writeCell(sheet.getRange(row, col), key, fields[key]);
    });
    var stamp = new Date().toISOString();
    if (isNew && columns.created_at) sheet.getRange(row, columns.created_at).setValue(stamp);
    if (columns.updated_at) sheet.getRange(row, columns.updated_at).setValue(stamp);
    SpreadsheetApp.flush();
    return { row: row, tab: readTab(sheet) };
  } finally {
    lock.releaseLock();
  }
}

/** Column number for each column key (first one wins), from the header row. */
function headerColumns(sheet) {
  var columns = {};
  if (sheet.getLastColumn() === 0) return columns;
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].forEach(function (h, i) {
    var key = normalizeHeader(h);
    if (key && !columns[key]) columns[key] = i + 1;
  });
  return columns;
}

function ensureColumn(sheet, columns, key) {
  if (columns[key]) return columns[key];
  var col = sheet.getLastColumn() + 1;
  sheet.getRange(1, col).setValue(key).setFontWeight("bold");
  if (NOTES[key]) sheet.getRange(1, col).setNote(NOTES[key]);
  columns[key] = col;
  return col;
}

function writeCell(range, key, value) {
  var text = value === null || value === undefined ? "" : String(value);
  if (key === "featured") {
    range.setValue(text === "TRUE" || text === "true");
    return;
  }
  if ((key === "sort_order" || key === "year") && /^-?\d+(\.\d+)?$/.test(text.trim())) {
    range.setValue(Number(text.trim()));
    return;
  }
  if (TIME_COLUMNS.indexOf(key) !== -1) {
    // Keep a time exactly as typed ("11:30am"), not as a spreadsheet time.
    range.setNumberFormat("@");
  }
  // A cell starting with = + - or @ would be read as a formula.
  if (/^[=+\-@]/.test(text) && DATE_COLUMNS.indexOf(key) === -1) text = "'" + text;
  range.setValue(text);
}

/** Quick fix: rename a misspelt column header to the name the site reads. */
function editorRenameColumn(tabName, fromKey, toKey) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(tabName);
  if (!sheet) throw new Error("There's no tab called " + tabName + ".");
  var col = headerColumns(sheet)[fromKey];
  if (!col) throw new Error("That column isn't there any more.");
  sheet.getRange(1, col).setValue(toKey);
  if (NOTES[toKey]) sheet.getRange(1, col).setNote(NOTES[toKey]);
  return readTab(sheet);
}

/** Quick fix: rows sharing an id; every row but the first gets id-<row>. */
function editorFixDuplicateIds(tabName, id, rows) {
  rows.slice(1).forEach(function (r) {
    editorSave(tabName, Number(r), { id: id + "-" + r });
  });
  return readTab(SpreadsheetApp.getActive().getSheetByName(tabName));
}

// ---------------------------------------------------------------------
// The website: publish and check

/** Update the website from the Sheet and return its check of the Sheet. */
function editorPublish() {
  var key = PropertiesService.getDocumentProperties().getProperty(KEY_PROPERTY);
  if (!key) return { needsKey: true };
  SpreadsheetApp.flush();
  var response = callWebsite(key);
  var code = response.getResponseCode();
  if (code === 404) return { needsKey: true, message: "The website's update key has changed. Paste the new one." };
  if (code !== 200) return { error: "The website didn't answer just now. Nothing went wrong in the Sheet; try again in a minute." };
  return { report: JSON.parse(response.getContentText()) };
}

/** Store the update key (or the whole "update site" link) after testing it. */
function editorConnect(keyOrLink) {
  var key = extractUpdateKey(keyOrLink);
  if (!key) return { error: "Paste the update link or the key after key=." };
  var response = callWebsite(key);
  if (response.getResponseCode() === 404) return { error: "That key didn't work. Check you copied all of it." };
  if (response.getResponseCode() !== 200) return { error: "The website didn't answer just now. Try again in a minute." };
  PropertiesService.getDocumentProperties().setProperty(KEY_PROPERTY, key);
  return { report: JSON.parse(response.getContentText()) };
}

// ---------------------------------------------------------------------
// Pictures: upload to Drive, shared so the website can show them

/**
 * Save a picture (already resized in the browser) to the "Website
 * pictures" folder, shared as "Anyone with the link", and return the link
 * to paste into the Sheet.
 */
function editorUploadPicture(base64, mimeType, fileName) {
  if (!/^image\/(jpeg|png|webp|gif)$/.test(mimeType)) {
    throw new Error("That file isn't a picture the website can show (use JPEG or PNG).");
  }
  var bytes = Utilities.base64Decode(base64);
  if (bytes.length > 20 * 1024 * 1024) throw new Error("That picture is too large. Try a smaller copy.");
  var folderId = pictureFolderId();
  var boundary = "narrativa" + Date.now();
  var meta = JSON.stringify({ name: cleanFileName(fileName, mimeType), parents: [folderId] });
  var payload = Utilities.newBlob(
    "--" + boundary + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" + meta +
    "\r\n--" + boundary + "\r\nContent-Type: " + mimeType + "\r\n\r\n"
  ).getBytes().concat(bytes).concat(Utilities.newBlob("\r\n--" + boundary + "--").getBytes());
  var file = driveRequest("post", "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
    contentType: "multipart/related; boundary=" + boundary,
    payload: payload,
  });
  shareWithAnyone(file.id);
  return { fileId: file.id, url: "https://drive.google.com/file/d/" + file.id + "/view?usp=sharing" };
}

/**
 * Quick fix: share a Drive picture as "Anyone with the link". The editor
 * may only change pictures it uploaded itself; for any other file it
 * says how to do it in Drive.
 */
function editorSharePicture(link) {
  var id = driveIdFromLink(link);
  if (!id) return { ok: false, message: "That isn't a Google Drive link." };
  try {
    shareWithAnyone(id);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message: "The editor can only change sharing on pictures it uploaded. In Google Drive, right-click the picture → Share, and set General access to “Anyone with the link”. Or upload it again here.",
    };
  }
}

function pictureFolderId() {
  var props = PropertiesService.getDocumentProperties();
  var id = props.getProperty(FOLDER_PROPERTY);
  if (id) {
    try {
      var folder = driveRequest("get", "https://www.googleapis.com/drive/v3/files/" + id + "?fields=id,trashed");
      if (!folder.trashed) return id;
    } catch (err) {
      // Deleted, or no longer reachable: make a new one below.
    }
  }
  var created = driveRequest("post", "https://www.googleapis.com/drive/v3/files?fields=id", {
    contentType: "application/json",
    payload: JSON.stringify({ name: "Website pictures", mimeType: "application/vnd.google-apps.folder" }),
  });
  props.setProperty(FOLDER_PROPERTY, created.id);
  return created.id;
}

function shareWithAnyone(fileId) {
  driveRequest("post", "https://www.googleapis.com/drive/v3/files/" + fileId + "/permissions?fields=id", {
    contentType: "application/json",
    payload: JSON.stringify({ role: "reader", type: "anyone" }),
  });
}

function driveRequest(method, url, options) {
  var params = {
    method: method,
    muteHttpExceptions: true,
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
  };
  if (options) {
    params.contentType = options.contentType;
    params.payload = options.payload;
  }
  var response = UrlFetchApp.fetch(url, params);
  var code = response.getResponseCode();
  if (code === 401 || code === 403) {
    throw new Error("Google Drive said no. If this is the first upload, the editor needs Drive permission: see step 3 of the set-up guide (appsscript.json).");
  }
  if (code < 200 || code >= 300) throw new Error("Google Drive didn't save it (" + code + "). Try again in a minute.");
  return JSON.parse(response.getContentText() || "{}");
}

function driveIdFromLink(link) {
  var text = String(link || "");
  var match = text.match(/\/file\/d\/([A-Za-z0-9_-]{10,})/) || text.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  return match ? match[1] : null;
}

function cleanFileName(name, mimeType) {
  var base = String(name || "picture").replace(/\.[a-z0-9]+$/i, "").replace(/[^\w\- ]+/g, "").trim() || "picture";
  var ext = mimeType === "image/png" ? ".png" : mimeType === "image/webp" ? ".webp" : mimeType === "image/gif" ? ".gif" : ".jpg";
  return base.slice(0, 80) + ext;
}

// ---------------------------------------------------------------------
// AI helper (Claude): request in plain words → one proposed change

var AI_SYSTEM = [
  "You help Nicole Stephenson update her website, narrativaconsulting.com, through the Google Sheet it is built from.",
  "She describes a change in her own words. You turn it into exactly one proposed change to one row of one tab. She reviews it before anything is saved, so be precise rather than chatty.",
  "",
  "Tabs, and the columns you may set (column: what goes in it):",
  "{{TABS}}",
  "status: Published shows the row on the website. Draft keeps it off the site. Archived takes it down but keeps it.",
  "",
  "Rules:",
  "- Use only facts she gives you or that are already in the Sheet. Never invent dates, times, places, links, names, roles or descriptions.",
  "- Keep her wording. Copy text she gives you exactly. Only rewrite, shorten or correct text when she asks you to, and then change nothing else.",
  "- Dates are YYYY-MM-DD. Work out dates like \"next Tuesday\" from today's date, given with the Sheet below. Write times the way she would, like 11:30am.",
  "- New row: action add_row, row 0. Set status to Published if she wants it on the site now, otherwise Draft. A new event needs at least a title and a date.",
  "- Change to a row: action update_row with that row's number from the Sheet, and only the columns that change.",
  "- Taking something down or hiding it: action hide_row with the row number and no fields.",
  "- If you can't tell which row she means, or something essential is missing, use action none and ask one short question in question.",
  "- If she asks for something the Sheet can't change (the design, colours, page layout, a new page), use action none and say so in summary.",
  "- summary: one short sentence to her about what the change does, e.g. \"Adds your keynote at the Lehigh Valley Women's Summit on June 4.\"",
  "- question: empty unless you need to ask something.",
].join("\n");

var PROPOSAL_SCHEMA = {
  type: "object",
  properties: {
    action: { type: "string", enum: ["add_row", "update_row", "hide_row", "none"] },
    tab: { type: "string", enum: ["Events", "Partners", "Podcasts", "Recognition", "Books", "Settings", "none"] },
    row: { type: "integer" },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: { column: { type: "string" }, value: { type: "string" } },
        required: ["column", "value"],
        additionalProperties: false,
      },
    },
    summary: { type: "string" },
    question: { type: "string" },
  },
  required: ["action", "tab", "row", "fields", "summary", "question"],
  additionalProperties: false,
};

/** Store the Anthropic API key after checking it works (a free call). */
function editorSetAiKey(key) {
  key = String(key || "").trim();
  if (!key) return { error: "Paste the key first." };
  var response = UrlFetchApp.fetch("https://api.anthropic.com/v1/models/" + AI_MODEL, {
    method: "get",
    muteHttpExceptions: true,
    headers: { "x-api-key": key, "anthropic-version": "2026-10-21" },
  });
  var code = response.getResponseCode();
  if (code === 401 || code === 403) return { error: "That key didn't work. Check you copied all of it." };
  if (code !== 200) return { error: "Couldn't check the key just now (" + code + "). Try again in a minute." };
  PropertiesService.getDocumentProperties().setProperty(AI_KEY_PROPERTY, key);
  return { ok: true };
}

function editorRemoveAiKey() {
  PropertiesService.getDocumentProperties().deleteProperty(AI_KEY_PROPERTY);
  return { ok: true };
}

/**
 * history: [{role: "user"|"assistant", text}], oldest first; the last one
 * is her new request. Returns a checked proposal, or {error}.
 */
function editorAsk(history) {
  var key = PropertiesService.getDocumentProperties().getProperty(AI_KEY_PROPERTY);
  if (!key) return { needsKey: true };
  var data = editorLoad();
  var messages = history.slice(-8).map(function (turn, i, list) {
    var text = String(turn.text || "").slice(0, 8000);
    if (i === list.length - 1) {
      text = "Today is " + data.today + ".\n\nThe Sheet right now:\n" + sheetForAi(data) + "\n\nNicole's request:\n" + text;
    }
    return { role: turn.role === "assistant" ? "assistant" : "user", content: text };
  });
  var body = {
    model: AI_MODEL,
    max_tokens: 16000,
    output_config: { effort: "low", format: { type: "json_schema", schema: PROPOSAL_SCHEMA } },
    // On a safety decline, the API retries on a suitable model by itself.
    fallbacks: "default",
    system: [{ type: "text", text: AI_SYSTEM.replace("{{TABS}}", tabsForAi()), cache_control: { type: "ephemeral" } }],
    messages: messages,
  };
  var response;
  try {
    response = UrlFetchApp.fetch("https://api.anthropic.com/v1/messages", {
      method: "post",
      contentType: "application/json",
      muteHttpExceptions: true,
      headers: {
        "x-api-key": key,
        "anthropic-version": "2026-10-21",
        "anthropic-beta": "server-side-fallback-2026-07-01",
      },
      payload: JSON.stringify(body),
    });
  } catch (err) {
    return { error: "The AI helper didn't answer. Try again in a minute." };
  }
  var code = response.getResponseCode();
  if (code === 401 || code === 403) return { needsKey: true, error: "The AI key isn't working any more. Paste a new one." };
  if (code === 429 || code >= 500) return { error: "The AI helper is busy. Try again in a minute." };
  if (code !== 200) return { error: "The AI helper couldn't take that request (" + code + ")." };

  var result = JSON.parse(response.getContentText());
  if (result.stop_reason === "refusal") return { error: "The AI helper can't help with that one. Try the forms instead." };
  if (result.stop_reason === "max_tokens") return { error: "That was too much at once. Try one change at a time." };
  var text = (result.content || []).filter(function (b) { return b.type === "text"; }).map(function (b) { return b.text; }).join("");
  var proposal;
  try {
    proposal = JSON.parse(text);
  } catch (err) {
    return { error: "The AI helper's answer didn't make sense. Try saying it another way." };
  }
  return { proposal: checkProposal(proposal, data), raw: text };
}

/** Keep only what can be applied, and add each column's current value. */
function checkProposal(p, data) {
  var out = {
    action: p.action,
    tab: p.tab,
    row: 0,
    fields: [],
    summary: String(p.summary || ""),
    question: String(p.question || ""),
    dropped: [],
  };
  if (p.action === "none" || p.tab === "none") {
    out.action = "none";
    return out;
  }
  var tab = data.tabs[p.tab];
  if (!tab || !tab.exists) {
    out.action = "none";
    out.question = "There's no " + p.tab + " tab in this Sheet.";
    return out;
  }
  var current = null;
  if (p.action === "update_row" || p.action === "hide_row") {
    current = tab.rows.filter(function (r) { return r.row === p.row; })[0];
    if (!current) {
      out.action = "none";
      out.question = "I couldn't find that row. Which one do you mean?";
      return out;
    }
    out.row = p.row;
  }
  var allowed = allowedColumns(p.tab);
  var fields = p.action === "hide_row" ? [{ column: "status", value: "Archived" }] : p.fields || [];
  fields.forEach(function (f) {
    var key = normalizeHeader(f.column);
    if (allowed.indexOf(key) === -1) {
      out.dropped.push(f.column);
      return;
    }
    out.fields.push({ column: key, value: String(f.value), old: current ? current.values[key] || "" : "" });
  });
  if (out.fields.length === 0 && out.action !== "none") {
    out.action = "none";
    if (!out.question) out.question = "What should change?";
  }
  return out;
}

function allowedColumns(tab) {
  if (tab === "Settings") return ["key", "value"];
  var keys = FORMS[tab].fields.map(function (f) { return f.key; });
  return keys.concat(["status", "id", "sort_order", "featured"]);
}

function tabsForAi() {
  return Object.keys(FORMS).map(function (name) {
    var form = FORMS[name];
    var cols = form.fields.map(function (f) {
      var choices = f.options ? " (one of: " + f.options.map(function (o) { return o[0]; }).join(", ") + ")" : "";
      return "  " + f.key + ": " + f.label + choices;
    });
    return name + " (" + form.item + "s):\n  status\n" + cols.join("\n");
  }).join("\n") + "\nSettings: key, value (amazon_book_url is the book's Amazon link)";
}

function sheetForAi(data) {
  var lines = [];
  Object.keys(data.tabs).forEach(function (name) {
    var tab = data.tabs[name];
    if (!tab.exists) return;
    lines.push("## " + name);
    tab.rows.forEach(function (r) {
      var parts = Object.keys(r.values)
        .filter(function (k) { return r.values[k] !== "" && k !== "created_at" && k !== "updated_at"; })
        .map(function (k) { return k + "=" + JSON.stringify(String(r.values[k]).slice(0, 2000)); });
      lines.push("Row " + r.row + ": " + parts.join("; "));
    });
  });
  return lines.join("\n");
}

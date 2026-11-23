/** @OnlyCurrentDoc  (it can only touch this Sheet, nothing else in Drive) */

/**
 * Narrativa website menu for the content Google Sheet.
 *
 * Adds a "Website" menu to the Sheet:
 *   - Publish changes now: updates the website from the Sheet and shows
 *     anything that needs fixing, with a button that jumps to each row.
 *   - Set up dropdowns and tick boxes: a Status dropdown, Featured tick
 *     boxes, other dropdowns, a help note on every column the website
 *     reads, and hidden rows greyed out. Safe to run again at any time.
 *   - Connect to the website: stores the update key once (only people
 *     who can edit the Sheet's script can see it, never viewers).
 *
 * Install (once): in the Sheet, Extensions → Apps Script, replace the
 * contents of Code.gs with this file, click Save, then reload the Sheet.
 * See docs/sheet-tools/README.md.
 */

var SITE = "https://narrativaconsulting.com";
var KEY_PROPERTY = "NARRATIVA_UPDATE_KEY";

var STATUSES = ["Draft", "Ready to Publish", "Published", "Archived"];
// Status words the website treats as "show on the site".
var SHOWN_STATUSES = ["published", "publish", "live", "ready to publish", "ready", "approved"];
var TRUTHY = ["true", "yes", "y", "1", "x", "✓", "✔"];

// Tabs the website shows, and where.
var TABS = {
  Events: "Home, Speaker and Events pages",
  Partners: "Home, Speaker and Partners pages",
  Books: "Home, About and Book pages",
  Podcasts: "Home and Media pages",
  Recognition: "Home and About pages",
  Settings: "Book page (amazon_book_url)",
};
// Tabs the website reads but no page shows at the moment.
var UNUSED_TABS = ["Media", "Press", "Photos"];

var CHOICES = {
  visibility: ["public", "private"],
  logo_background: ["light", "dark"],
};
var KINDS = {
  Podcasts: ["Podcast", "Interview", "Spotify", "Apple", "YouTube", "Vimeo"],
  Press: ["Feature", "Quote", "Op-Ed", "Profile", "Mention"],
};
var PHOTO_CATEGORIES = ["Headshot", "Speaking", "Portrait", "Book Launch", "Editorial"];
var DATE_COLUMNS = ["event_date", "date", "end_date", "release_date", "published_date"];

var NOTES = {
  id: "Optional. A short unique name for the row, e.g. evt-lvws-2026. Leave blank and the website makes one from the title.",
  status: "Published (or Ready to Publish) shows the row on the website. Draft or Archived hides it. Nothing is deleted.",
  featured: "Tick to put this row first in its list.",
  sort_order: "Optional number. Lower numbers come first, e.g. 10, 20, 30.",
  title: "The title as it should appear on the website.",
  name: "The name as it should appear on the website.",
  event_date: "The day of the event, e.g. 6/4/2026. Past events stay on the calendar, faded.",
  end_date: "Only for events over more than one day.",
  event_time: "Start time as you'd write it, e.g. 11:30am.",
  end_time: "End time as you'd write it, e.g. 1:00pm.",
  location: "Where it is, e.g. Bethlehem, PA.",
  visibility: "public, or private for an event that isn't open to everyone (it shows a 'Private event' label and no registration button).",
  role: "Your role, shown as typed: Keynote, Panel, Workshop…",
  description: "A sentence or two about it.",
  summary: "A sentence or two about it.",
  cta_label: "The button text, e.g. Register. Blank shows 'Register'.",
  cta_url: "The registration or details link (starts with https://). A Google Drive or Dropbox link to a flyer works too.",
  image_url: "A picture: paste its Google Drive or Dropbox share link. In Drive, set sharing to 'Anyone with the link' first.",
  logo_url: "The logo: paste its Google Drive or Dropbox share link. In Drive, set sharing to 'Anyone with the link' first.",
  logo_width: "The logo file's width in pixels (helps logos look the same size). Optional.",
  logo_height: "The logo file's height in pixels. Optional.",
  logo_background: "dark for a logo drawn in white, so it sits on a dark tile. Otherwise leave blank.",
  relationship: "Optional, e.g. 2026 Breakout Session Speaker. Only fill in when confirmed.",
  show: "The show's name, e.g. How Women Write.",
  host: "The host's name. Optional.",
  kind: "Pick from the list.",
  url: "The link (starts with https://).",
  published_date: "When it came out, e.g. 6/4/2026.",
  organization: "Who gave the award.",
  year: "The year, e.g. 2025.",
  subtitle: "The book's subtitle.",
  tagline: "One line about the book.",
  publisher: "The publisher's name.",
  release_date: "Release date, e.g. 3/1/2026.",
  amazon_url: "The book's Amazon link.",
  barnes_noble_url: "The book's Barnes & Noble link.",
  key: "The setting's name. The website reads amazon_book_url.",
  value: "The setting's value.",
};

// ---------------------------------------------------------------------
// Menu

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Website")
    .addItem("Publish changes now", "publishChanges")
    .addSeparator()
    .addItem("Set up dropdowns and tick boxes", "setUpSheet")
    .addItem("Connect to the website…", "connectToWebsite")
    .addToUi();
}

function connectToWebsite() {
  var ui = SpreadsheetApp.getUi();
  var answer = ui.prompt(
    "Connect to the website",
    "Paste the website's update key (the long code at the end of your 'update site' link, after key=).",
    ui.ButtonSet.OK_CANCEL
  );
  if (answer.getSelectedButton() !== ui.Button.OK) return false;
  var key = answer.getResponseText().trim().replace(/^.*[?&]key=/, "").replace(/&.*$/, "");
  if (!key) return false;
  var response = callWebsite(key);
  if (response.getResponseCode() === 404) {
    ui.alert("That key didn't work", "Check you copied the whole key and try again.", ui.ButtonSet.OK);
    return false;
  }
  if (response.getResponseCode() !== 200) {
    ui.alert("The website didn't answer", "Try again in a minute.", ui.ButtonSet.OK);
    return false;
  }
  PropertiesService.getDocumentProperties().setProperty(KEY_PROPERTY, key);
  ui.alert("Connected", "Use Website → Publish changes now whenever you want your edits on the site straight away.", ui.ButtonSet.OK);
  return true;
}

function publishChanges() {
  var ui = SpreadsheetApp.getUi();
  var key = PropertiesService.getDocumentProperties().getProperty(KEY_PROPERTY);
  if (!key) {
    if (!connectToWebsite()) return;
    key = PropertiesService.getDocumentProperties().getProperty(KEY_PROPERTY);
  }
  SpreadsheetApp.flush();
  var response = callWebsite(key);
  var code = response.getResponseCode();
  if (code === 404) {
    ui.alert("The update key has changed", "Use Website → Connect to the website… and paste the new key.", ui.ButtonSet.OK);
    return;
  }
  if (code !== 200) {
    ui.alert("The website didn't answer", "Nothing went wrong in the Sheet. Try again in a minute. (" + code + ")", ui.ButtonSet.OK);
    return;
  }
  var report = JSON.parse(response.getContentText());
  var html = HtmlService.createHtmlOutput(reportHtml(report)).setWidth(560).setHeight(600);
  ui.showModalDialog(html, "Website updated");
}

/** The website's answer, or a stand-in with code 0 if it couldn't be reached. */
function callWebsite(key) {
  try {
    return UrlFetchApp.fetch(
      SITE + "/api/refresh?format=json&key=" + encodeURIComponent(key),
      { muteHttpExceptions: true, followRedirects: true }
    );
  } catch (err) {
    return { getResponseCode: function () { return 0; }, getContentText: function () { return ""; } };
  }
}

/** Called from the report dialog: jump to a tab and row. */
function goTo(tab, row) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(tab);
  if (!sheet) return;
  sheet.activate();
  sheet.setActiveRange(sheet.getRange(row || 1, 1, 1, Math.max(1, sheet.getLastColumn())));
}

function reportHtml(report) {
  var problems = report.issues.filter(function (i) { return i.level === "problem"; });
  var checks = report.issues.filter(function (i) { return i.level === "check"; });
  var out = [];
  out.push('<style>body{font:14px/1.5 Lato,Arial,sans-serif;color:#1b1223;margin:0}h2{font:600 15px/1.3 Arial,sans-serif;margin:18px 0 8px}' +
    'p{margin:0 0 10px;color:#3a2d49}.ok{color:#2f8067;font-weight:700}ul{list-style:none;padding:0;margin:0}' +
    'li{border:1px solid #eadbf4;border-left:4px solid #b3261e;border-radius:10px;padding:8px 10px;margin:0 0 8px}' +
    'li.check{border-left-color:#2f8067}.where{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5b5065}' +
    'button{margin-top:6px;border:1px solid #eadbf4;background:#fff;color:#5a2896;border-radius:999px;padding:4px 12px;font-weight:700;cursor:pointer}</style>');
  out.push("<p><strong>Your changes are on the website.</strong> Open any page to see them (give it a few seconds).</p>");
  if (problems.length === 0 && checks.length === 0) {
    out.push('<p class="ok">Everything in the Sheet looks good.</p>');
  }
  if (problems.length > 0) {
    out.push("<h2>To fix (" + problems.length + ")</h2><p>These rows don't show on the website the way they should.</p><ul>");
    problems.forEach(function (i) { out.push(issueHtml(i)); });
    out.push("</ul>");
  }
  if (checks.length > 0) {
    out.push("<h2>Worth a look (" + checks.length + ")</h2><p>These may be on purpose.</p><ul>");
    checks.forEach(function (i) { out.push(issueHtml(i)); });
    out.push("</ul>");
  }
  out.push("<script>function go(t,r){google.script.run.withSuccessHandler(function(){google.script.host.close();}).goTo(t,r);}</script>");
  return out.join("");
}

function issueHtml(issue) {
  var where = [issue.tab || "The whole Sheet", issue.row ? "row " + issue.row : "", issue.item || ""]
    .filter(function (s) { return s; })
    .map(esc)
    .join(" · ");
  var button = issue.tab
    ? '<button onclick="go(' + esc(JSON.stringify(issue.tab)) + "," + (issue.row || 1) + ')">Go to ' + (issue.row ? "row" : "tab") + "</button>"
    : "";
  return '<li class="' + issue.level + '"><div class="where">' + where + "</div><div>" + esc(issue.message) + "</div>" + button + "</li>";
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------
// One-time (repeatable) set-up

function setUpSheet() {
  var ss = SpreadsheetApp.getActive();
  var done = [];
  Object.keys(TABS).concat(UNUSED_TABS).forEach(function (name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet || sheet.getLastColumn() === 0) return;
    setUpTab(sheet, name);
    done.push(name);
  });
  SpreadsheetApp.getUi().alert(
    "Sheet set up",
    done.length > 0
      ? "Done for: " + done.join(", ") + ".\n\nStatus is now a dropdown, Featured is a tick box, hidden rows are greyed out, and every column the website reads has a note on its header (hover over the header to read it)."
      : "No tabs with the website's names were found (Events, Partners, Books, Podcasts, Recognition, Settings).",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function setUpTab(sheet, name) {
  var lastCol = sheet.getLastColumn();
  var dataRows = Math.max(1, sheet.getMaxRows() - 1);
  var headerRange = sheet.getRange(1, 1, 1, lastCol);
  var headers = headerRange.getValues()[0].map(function (h) { return normalizeHeader(h); });

  sheet.setFrozenRows(1);
  headerRange.setFontWeight("bold");

  var unused = UNUSED_TABS.indexOf(name) !== -1;
  sheet.setTabColor(unused ? "#c9c3cf" : "#5a2896");
  if (unused) {
    sheet.getRange(1, 1).setNote("Nothing from this tab appears on the website at the moment, so changes here won't show.");
  }

  headers.forEach(function (key, i) {
    if (!key) return;
    var col = i + 1;
    var column = sheet.getRange(2, col, dataRows, 1);
    var note = NOTES[key];
    if (note && !unused) sheet.getRange(1, col).setNote(note);

    if (key === "status") {
      column.setDataValidation(listRule(STATUSES, false, "Pick Published to show the row on the website, Draft or Archived to hide it."));
    } else if (key === "featured") {
      makeTickBoxes(sheet, col);
    } else if (CHOICES[key]) {
      column.setDataValidation(listRule(CHOICES[key], true, NOTES[key] || ""));
    } else if (key === "kind" && KINDS[name]) {
      column.setDataValidation(listRule(KINDS[name], true, "Pick from the list."));
    } else if (key === "category" && name === "Photos") {
      column.setDataValidation(listRule(PHOTO_CATEGORIES, true, "Pick from the list."));
    } else if (DATE_COLUMNS.indexOf(key) !== -1) {
      column.setDataValidation(
        SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(true)
          .setHelpText("Type a date, e.g. 6/4/2026.").build()
      );
    }
  });

  var statusCol = headers.indexOf("status") + 1;
  if (statusCol > 0 && name !== "Settings") greyOutHiddenRows(sheet, statusCol, lastCol);
}

function listRule(values, allowOthers, help) {
  return SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(allowOthers)
    .setHelpText(help)
    .build();
}

/** Turn TRUE/Yes/✓ text into real tick boxes, keeping what each row meant. */
function makeTickBoxes(sheet, col) {
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var range = sheet.getRange(2, col, lastRow - 1, 1);
    var values = range.getValues().map(function (r) {
      var v = r[0];
      if (v === true || v === false) return [v];
      return [TRUTHY.indexOf(String(v).trim().toLowerCase()) !== -1];
    });
    range.setValues(values);
  }
  sheet.getRange(2, col, Math.max(1, sheet.getMaxRows() - 1), 1)
    .setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
}

/** Grey out rows the website hides (not Published / Ready to Publish). */
function greyOutHiddenRows(sheet, statusCol, lastCol) {
  var s = columnLetter(statusCol);
  var last = columnLetter(lastCol);
  var shown = SHOWN_STATUSES.map(function (w) { return 'LOWER(TRIM($' + s + '2))="' + w + '"'; }).join(",");
  var formula = "=AND(COUNTA($A2:$" + last + "2)>0,NOT(OR(" + shown + ")))";
  var range = sheet.getRange(2, 1, Math.max(1, sheet.getMaxRows() - 1), lastCol);

  // Replace our own rule if it is already there; keep any others.
  var rules = sheet.getConditionalFormatRules().filter(function (rule) {
    var condition = rule.getBooleanCondition();
    if (!condition) return true;
    var f = String(condition.getCriteriaValues()[0] || "");
    return !(f.indexOf("=AND(COUNTA($A2:$") === 0 && f.indexOf('="published"') !== -1);
  });
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(formula)
      .setFontColor("#8a8291")
      .setBackground("#f4f1f7")
      .setRanges([range])
      .build()
  );
  sheet.setConditionalFormatRules(rules);
}

/** Same rule as the website: "Image URL" and image_url are the same column. */
function normalizeHeader(header) {
  return String(header == null ? "" : header)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function columnLetter(col) {
  var letters = "";
  while (col > 0) {
    var rem = (col - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    col = Math.floor((col - 1) / 26);
  }
  return letters;
}

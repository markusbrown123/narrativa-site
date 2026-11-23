/**
 * The "update site" page (app/api/refresh): confirms the refresh and
 * shows the Sheet check in plain words, with a link to each row that
 * needs attention. A self-contained HTML page: no site layout, so it
 * works even if a page of the site is broken.
 */

import type { SheetCheck, SheetIssue } from "./sheetCheck";

export function renderUpdatePage(check: SheetCheck, siteOrigin: string): string {
  const problems = check.issues.filter((i) => i.level === "problem");
  const checks = check.issues.filter((i) => i.level === "check");

  const summary =
    problems.length === 0 && checks.length === 0
      ? `<p class="ok">Everything in the Sheet looks good.</p>`
      : `<p class="summary">${[
          problems.length > 0 ? plural(problems.length, "thing to fix", "things to fix") : "",
          checks.length > 0 ? plural(checks.length, "thing to look at", "things to look at") : "",
        ]
          .filter(Boolean)
          .join(" · ")}</p>`;

  const tabRows = check.tabs
    .map(
      (t) => `<tr>
  <th scope="row">${t.link ? `<a href="${esc(t.link)}">${esc(t.tab)}</a>` : esc(t.tab)}</th>
  <td>${t.shownOn === null ? "—" : t.usingBackup ? "built-in content" : String(t.shown)}</td>
  <td>${t.shownOn === null ? "—" : t.usingBackup ? "—" : String(t.hidden)}</td>
  <td>${t.shownOn ? esc(t.shownOn) : "not shown on the site"}</td>
</tr>`,
    )
    .join("\n");

  const checkedAt = new Date(check.checkedAt).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site updated</title>
<style>
:root{--ink:#1b1223;--soft:#3a2d49;--muted:#5b5065;--line:#eadbf4;--brand:#5a2896;--tint:#fcf8ff;--fix:#b3261e;--look:#2f8067}
*{box-sizing:border-box}
body{margin:0;background:var(--tint);color:var(--ink);font:16px/1.6 Lato,system-ui,sans-serif}
main{max-width:44rem;margin:0 auto;padding:2.5rem 1rem 4rem}
.card{background:#fff;border:1px solid var(--line);border-radius:1.5rem;padding:2rem 1.5rem}
h1{font:500 2.25rem/1.1 "Cormorant Garamond",Georgia,serif;margin:0 0 .5rem}
h2{font:500 1.6rem/1.2 "Cormorant Garamond",Georgia,serif;margin:2.25rem 0 .75rem}
p{margin:0 0 1rem;color:var(--soft)}
.ok{font-weight:700;color:var(--look)}
.summary{font-weight:700;color:var(--ink)}
ul{list-style:none;margin:0;padding:0;display:grid;gap:.75rem}
li{background:#fff;border:1px solid var(--line);border-left:4px solid var(--fix);border-radius:1rem;padding:.9rem 1.1rem}
li.check{border-left-color:var(--look)}
.where{font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 .25rem}
.msg{margin:0;color:var(--ink)}
li a{font-size:.9rem;font-weight:700;color:var(--brand)}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:1rem;overflow:hidden;font-size:.95rem}
th,td{text-align:left;padding:.6rem .8rem;border-top:1px solid var(--line);vertical-align:top}
thead th{border-top:0;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
th a{color:var(--brand)}
.buttons{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.5rem}
.btn{display:inline-block;padding:.75rem 1.5rem;border-radius:999px;background:var(--brand);color:#fff;text-decoration:none;font-weight:700}
.btn.secondary{background:#fff;color:var(--brand);border:1px solid var(--line)}
.foot{margin-top:2rem;font-size:.85rem;color:var(--muted)}
@media (max-width:30rem){.card{padding:1.5rem 1.1rem}th,td{padding:.5rem}table{font-size:.85rem}}
</style></head>
<body><main>
<div class="card">
<h1>Site updated.</h1>
<p>The site now shows the Sheet as it is. Open any page to see your changes (give it a few seconds).</p>
${summary}
<div class="buttons">
${check.sheetUrl ? `<a class="btn" href="${esc(check.sheetUrl)}">Open the Sheet</a>` : ""}
<a class="btn secondary" href="${esc(siteOrigin)}/">View the site</a>
</div>
</div>
${problems.length > 0 ? `<h2>To fix</h2>\n<p>These rows don't show on the site the way they should.</p>\n<ul>${problems.map(issueItem).join("\n")}</ul>` : ""}
${checks.length > 0 ? `<h2>Worth a look</h2>\n<p>These may be on purpose. If not, they're quick to change.</p>\n<ul>${checks.map(issueItem).join("\n")}</ul>` : ""}
${
  check.tabs.length > 0
    ? `<h2>What's on the site</h2>
<table>
<thead><tr><th scope="col">Tab</th><th scope="col">Showing</th><th scope="col">Hidden</th><th scope="col">Where</th></tr></thead>
<tbody>
${tabRows}
</tbody>
</table>
<p class="foot">Hidden rows are set to Draft or Archived (or have no status). Change a row's status to Published to show it.</p>`
    : ""
}
<p class="foot">Checked ${esc(checkedAt)}${check.picturesChecked > 0 ? ` · ${plural(check.picturesChecked, "picture link", "picture links")} opened` : ""}.</p>
</main></body></html>`;
}

function issueItem(issue: SheetIssue): string {
  const where = [
    issue.tab ?? "The whole Sheet",
    issue.row ? `row ${issue.row}` : "",
    issue.item ?? "",
  ]
    .filter(Boolean)
    .map(esc)
    .join(" · ");
  return `<li class="${issue.level}">
  <p class="where">${where}</p>
  <p class="msg">${esc(issue.message)}</p>
  ${issue.link ? `<a href="${esc(issue.link)}">Open in the Sheet →</a>` : ""}
</li>`;
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

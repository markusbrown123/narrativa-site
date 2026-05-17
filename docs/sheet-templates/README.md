# Sheet templates

Drop these CSVs into a Google Sheet (one per tab) to bootstrap the
Narrativa CMS structure.

## How to import

1. Create a new Google Sheet.
2. For each CSV in this folder, **File → Import → Upload → select
   file → Import location: Insert new sheet(s)**.
3. After import, rename each tab to match the file name (the importer
   uses the file name minus `.csv` already, but double-check):
   `Events`, `Partners`, `Services`, `Books`, `Media`, `Podcasts`,
   `Press`, `Recognition`, `Photos`, `Settings`.
4. Delete the default empty `Sheet1` tab.
5. **Share → Anyone with the link → Viewer**.
6. Grab the sheet ID from the URL (the segment between `/d/` and
   `/edit`) and paste it into your `.env` as `GOOGLE_SHEET_ID`.

See [`../google-sheets-cms.md`](../google-sheets-cms.md) for the full
column reference and value vocabularies.

## What's in each file

The sample rows are taken from verified content already in the mock
data, so the resulting sheet renders an identical site on day one.
Nicole can edit/add rows from there.

| File              | Tab name      | Sample rows                                   |
| ----------------- | ------------- | --------------------------------------------- |
| `Events.csv`      | Events        | 2026 Lehigh Valley Summit + Henkels & McCoy   |
| `Partners.csv`    | Partners      | LV Women's Summit + West Chester University   |
| `Services.csv`    | Services      | Speaker Brand Development + Visibility        |
| `Books.csv`       | Books         | Unapologetic                                  |
| `Media.csv`       | Media         | Placeholder Draft row                         |
| `Podcasts.csv`    | Podcasts      | Beyond Empty Nest + Influential Women         |
| `Press.csv`       | Press         | Main Line Media News + Lock Haven             |
| `Recognition.csv` | Recognition   | Power Women 2024 + Rebecca Gross Alumni       |
| `Photos.csv`      | Photos        | Blue-top headshot + on-stage microphone shot  |
| `Settings.csv`    | Settings      | `amazon_book_url`                             |

# Messman Ready ⚓

A beginner-friendly, mobile-first preparation checklist for Filipino applicants hoping to work as a **Messman** on an international ship.

Built with plain **HTML, CSS and JavaScript**. No backend, accounts, install commands or paid services required.

## What it does

- Organizes the journey into **5 stages**: documents, training, seafarer documents, job search and after-hiring tasks.
- Tracks common/core requirements separately from **only-if-required** items.
- Automatically saves checkboxes in the same browser using `localStorage`.
- Shows overall progress and your next unfinished core step.
- Searches and filters tasks by status, with collapsible stages.
- Exports/restores progress using a JSON backup, and supports browser printing.
- Installs as a basic offline-capable web app (PWA) over HTTPS.
- Provides links to official MARINA, TESDA and DMW services.

> **Important:** This is an independent planning tool, not an official list of requirements or proof of qualification. Verify details with a DMW-licensed manning agency before you purchase additional training. Requirements vary by ship and assignment.

## Run locally

Open `index.html` in your browser. For PWA/service-worker testing, run a local server instead:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Publish with GitHub Pages

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main`, folder `/ (root)`, and save.
4. After GitHub Pages deploys, the site will be available at `https://valdiakun.github.io/messman-valdiakun/` (subject to Pages being enabled and deployment succeeding).

Every committed update to `main` is published by Pages when this deployment mode is enabled.

## Customize

Checklist stages and task details live in the `STAGES` array at the top of `app.js`. Styles are in `styles.css`. Everything uses relative links, so it also works under a subpath like `/messman-valdiakun/`.

## Files

- `index.html` — semantic application layout
- `styles.css` — responsive visual design, mobile navigation, print styling
- `app.js` — checklist data, progress, filters, backup/restore
- `manifest.webmanifest` — installable app metadata
- `sw.js` — offline app shell
- `assets/` — app icons

## Sources and verification

For current information use:
- [MARINA list of approved maritime training institutions](https://marina.gov.ph/approved-maritime-training-institutions/)
- [MARINA MISMO](https://online-appointment.marina.gov.ph/)
- [TESDA website](https://www.tesda.gov.ph/)
- [DMW official website](https://dmw.gov.ph/) and [online services](https://onlineservices.dmw.gov.ph/)

No personal information is sent to these sites by this app. Clicking an external link opens that site directly. Completed tasks are stored only in the browser you use; create a backup before clearing browsing data or moving phones.

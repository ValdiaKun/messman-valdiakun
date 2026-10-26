# Messman Ready ⚓

A beginner-friendly, mobile-first preparation checklist for Filipino applicants hoping to work as a **Messman** on an international ship.

Built with plain **HTML, CSS and JavaScript**. No backend, accounts, install commands or paid services required.

## Interactive guide update (October 26, 2026)

- A five-stage clickable beginner-to-boarding roadmap.
- **View guide** buttons on all 26 requirements. Each guide explains why, how to complete it, what to prepare, employer-dependent requirements and relevant official links.
- Complete or undo tasks directly inside a guide; open the next guide with one tap.
- Search also checks guide content. Progress and roadmap automatically refresh.
- Separate `guides.js` stores all step-by-step help. Add a matching guide whenever you add a checklist task.

Official guidance is dated and employer-specific; confirm details with MARINA, TESDA, DMW or your licensed manning agency before making payments. The app remains independent and stores your checklist on the device only.

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

## Automatic deployment with GitHub Pages

The repository includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), a GitHub Actions workflow that deploys the website automatically after each push to `main`.

**One-time GitHub setup (must be done by a repository administrator):**

1. Open **Settings → Pages**: https://github.com/ValdiaKun/messman-valdiakun/settings/pages
2. Under **Build and deployment → Source**, select **GitHub Actions**. This enables the Pages site.
3. Open **Actions → Deploy Messman Ready to GitHub Pages** and select **Run workflow** for `main` to publish the initial version: https://github.com/ValdiaKun/messman-valdiakun/actions/workflows/deploy.yml
4. Check the deployment run until it reports success, then open https://valdiakun.github.io/messman-valdiakun/.

The first workflow run before Pages is enabled will fail at `Configure GitHub Pages` with a 404 error. This is expected until step 2 is complete. Future pushes to `main` deploy automatically after this one-time setup.

No additional packages, deploy token or third-party hosting account are needed.

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

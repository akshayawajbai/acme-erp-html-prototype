# ACME ERP – HTML Prototype

A static, front-end UI prototype of **Acme.erp**, an ERP and accounting system for religious organisations and NGOs.
It demonstrates the portal layouts, navigation menus and multilingual interface. There is no backend: every module
currently opens an *Under Maintenance* page, and all records shown are sample data.

**Live site:** https://akshayawajbai.github.io/acme-erp-html-prototype/

## Technologies

- HTML5, CSS3 and vanilla JavaScript (no framework, no build step)
- Google Fonts (Rubik); Chart.js 4.4.1 from a CDN on the Reports page

## Portals

| Portal | Description |
|---|---|
| Login | Demo sign-in for each portal (password `demo123`, demonstration only) |
| Admin | Navigation for User, Office, Tools, Ticketing and Help; main area under maintenance |
| Head Office | Navigation with side-opening nested menus (Data, Budget, Reports, …); main area under maintenance |
| Branch Office | Finance, Fixed Asset, Payroll and Utilities sidebars, Reports category bar; main area under maintenance |

## Languages

The Head Office and Branch Office portals can be shown in:

- English (default)
- Français
- Português (European Portuguese)

The choice is saved in the browser (`localStorage`) and shared by both portals. The Admin portal is English only.
Translations are local files – no external translation service is used.

## Project structure

```text
index.html                 Entry point (redirects to the signed-in portal or the login page)
login.html                 Demo login
admin.html                 Admin portal
headoffice.html            Head Office portal
branch.html                Branch Office portal
under-maintenance.html     Reusable maintenance page (Admin / Head Office menu items)
under-development.html     Reusable "under development" page
reports.html               Reports demo page
css/                       style.css (shared), dashboard.css (Branch Office), login.css
js/                        app.js (header, navigation, shared UI), i18n.js (translations),
                           maintenance.js, branch.js, admin.js, headoffice.js, auth.js, mock-data.js, …
locales/                   en.js, fr.js, pt.js – translation dictionaries
assets/                    ACME logo
```

## Run locally

No installation is needed. Either open `login.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

## Notes

- This is a static UI prototype. Authentication, data storage and ERP operations are not implemented.
- The demo password and all organisation and branch records are sample values for demonstration only.

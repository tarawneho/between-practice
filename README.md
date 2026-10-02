# Between Practice — website preview

A build-free, responsive static website for an independent production studio / interdisciplinary practice. Open `index.html` directly or serve this folder locally. No package installation, framework or external assets required.

## GitHub Pages: simplest deployment

1. Create a GitHub repository, for example `between-practice`.
2. Upload **the contents of this folder** into the repository root. `index.html` should be at the top level alongside `assets/` and `.nojekyll`.
3. Commit to `main`.
4. Open repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. Wait for deployment to finish. GitHub will show the published address, typically `https://YOUR-USERNAME.github.io/between-practice/`.

Relative paths support repository subfolders and custom domains. No paid hosting is needed for a public repository with GitHub Free. See [GitHub’s publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Optional local preview: run `python3 -m http.server 4173` in this folder, then visit `http://localhost:4173`.

## Architecture

- Home: programs, current activity, production approach, testimonial and newsletter.
- Work: filterable project index; Fantasia, Andy and community-space detail pages.
- Programs: repeatable offers; six named program detail pages with scope, audience, fees and enquiry links.
- Services: production, facilitation, portfolio review and commissions.
- Research: field notes and project research; sample article.
- About: short practice statement, with space for approved biography and credits.
- Contact: enquiry form preselects the program when arriving from a detail page.
- Shop: future editions holding page, linked only from the footer.
- `reading-room.html`: unlisted template, excluded from navigation and marked noindex. Contains no sensitive work.

## Editing

Each HTML file is a standalone page. Shared appearance lives in `assets/site.css`; menu, project filtering and form demonstrations live in `assets/site.js`. The header and footer are repeated: apply global navigation or newsletter changes to every page. No build tool is necessary. The geometric graphics are original CSS illustrations, not documentation of actual artwork.

## Before public launch

The studio name is temporary. Dates, pricing, offer scope and testimonial are illustrative; the research note is demonstration copy. The conversation supplied the project names Fantasia and Andy, the producing role, community organising, yoga / meditation and portfolio-review direction. It did not supply final biography, credits, venues, project outcomes, verified testimonial, calendar, prices or contact details. Confirm and replace these before launch. Fantasia animation is described as a future direction, not completed work.

Contact and newsletter forms intentionally do not transmit or store data. Connect a contact endpoint and a newsletter provider, update the labels and success states, and supply the appropriate privacy, consent, cancellation and booking information before taking real enquiries or bookings. No payment collection is implemented.

Unlisted pages are **publicly accessible**, even if the GitHub repository is private. `noindex` is a search-engine request, not access control. Do not put confidential writing or sensitive material into this repository; use a service with real authentication for protected content. Do not use a client-side password prompt as protection.

## Design references inspected

The previous personal build (`omar-studio-dashboard-2026-10-02`) and Talpa label rebuild were available locally. Reused principles: broad navigation with discipline tags underneath, readable supporting text beside large display typography, shared spacing and color tokens, project groupings, clear active navigation, responsive grid changes and URL-aware filtering. Branding, logos, artwork and palette were not copied. This version uses warm paper, ink, orange and lilac / olive graphics, editorial serif accents and direct program pathways.

## Preview status

This package is repository-ready; it has not been uploaded to GitHub or published. The persistent deployable artifact is this folder or its accompanying ZIP. A local preview URL only works while the preview server is running.

## Verification completed

All local page links and assets were validated across 16 pages. Browser checks covered project filtering and reset, mobile menu navigation, contact and newsletter demo feedback, and program enquiry preselection. Homepage was visually inspected in desktop and narrow-screen views. Forms were tested with synthetic data only.

## Correction from the full original conversation

The named formats now anchor Programs: Erotics of Liberation, Epistemology of Embodiment, Parasympathetic, Embodied Audre Lorde Reading, Yoga / embodied practice, and Dance formats. Each has previous-edition and approved-feedback sections without invented dates or testimonials. Services now include movement/choreographic support, facilitation and cultural programming. Writing is request-based; the invented article and program examples are retired. The newsletter includes name and interest selection. Lap-dance information stays request-based pending an explicit visibility decision. Zurich/Leipzig references are unverified examples, not claimed edition records.

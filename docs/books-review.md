# Books library review

## Scope and source

Based on production `645942248d22da88bb08814808bea8eedad19b27` (including the Music icon correction). Books is a framework-free addition using the current V2 header and V1 footer. Existing page bodies and curriculum assets are unchanged. The only changes on existing public pages are Books links in the shared header/footer. Review Worker configuration is selected; production must not be deployed without visual approval.

Authoritative collection: https://drive.google.com/drive/folders/1cS00ZjCPHNP2OKQ_cfhrq0um5SPjy8lj

Metadata: https://docs.google.com/document/d/1fKqaY2JDH1cTFT8v4oEZ6c6vcSwrrsbXxs0lo6--k8Q/edit

URLs: https://docs.google.com/spreadsheets/d/15ruL1ThJ-21N6M9HMP4Kir6daAarrp4vJ_LUT8FMbfI/edit

## Inventory and publication

`books-inventory.json` records discovered titles, source IDs, missing components, PDF identity hashes and page counts. 24 titles have a cover, authoritative description and complete manuscript PDF. Covers retain their proportions and are optimized from the source JPGs. PDFs are unmodified copies of the source files, hosted under `/books/files/`.

`public/books/catalog.json` is the one editable catalog. The reading-list HTML is a generated no-JavaScript fallback derived from that catalog. No descriptions are duplicated in HTML or tests. One native dialog is populated at runtime; print links can be enabled with a catalog update.

The Book URLs sheet contains Amazon destinations, not Lulu product URLs. Lulu wrap artwork does not establish a product URL. All 24 print states therefore remain Coming soon. No guessed links or Amazon substitutions were introduced.

## Metadata restoration

Recovered and restored two descriptions to Book Cover Quotes, then verified both by readback:

- The Soldier’s Path: exact text from `The Soldiers Path - Lulu Exact Wrap with Barcode.png`, Drive ID `1D5yRBwSKIzipFj990ilBFa-cpsJYtuxk`.
- The Scandal of Grace: exact text from `The Scandal of Grace - Lulu Wrap Draft.png`, Drive ID `1MoeL9wmpfqKuN54zUwMUG_SKzJTX18Vn`.

These sources contained no contributor notes or keywords. The restoration records that limitation and provenance instead of inventing values. Existing document entries were preserved.

## Held from publication

- The Scandal of Choice and The Scandal of Dominion: manuscript documents and covers exist; finished PDFs were not found in their folders. Do not substitute a cover PDF or export a manuscript without confirming it is the approved final edition.
- Thorn and Grace: full PDF exists, but no cover or authoritative publishing description was found.
- The Kingdom Now: draft/project/video material; not ready.
- The Comfort Trap, The Windows of Heaven, The Scandal of Suffering, Alignment with God, and Kingdom Economy: explicitly stored in `in Progress`; not published.
- The “Birthday Minute” Book: referenced by Book URLs, without a matching folder/PDF/cover/description in the supplied collection.

## PDF verification

All 24 enabled PDFs were parsed, page counts and identity hashes recorded, and rendered content inspected. They contain 77–357 pages rather than cover-only files. Newer source files were selected where duplicate layouts exist. The older `Copy of Final Draft-The Unseen Dominion (1).pdf` has handwritten editorial markings and was rejected; the later full rewrite is used instead.

Source-quality observations: the supplied PDFs for Pre-Form-ing, De-Moral-ized, The Scandal of Peace, and The Identity Trap begin with a stray “Good.” before their title. PDFs are preserved as supplied; these should be reviewed before production. The Unseen Dominion full rewrite starts directly with Chapter 1 rather than a separate title page; identity is grounded in its source folder, filename and matching manuscript content.

## Checks

The 64-test baseline passed before implementation. The expanded 67-test suite includes Books navigation, single-dialog semantics, unique complete metadata, first-party PDF signatures, asset existence, valid Lulu structures and Coming soon states. Superseded Books-hidden assertions were updated; Doorway/app/auth exclusions remain.

Run: `node --test tests/*.test.mjs` and `git diff --check`.

Browser/deployment evidence is recorded separately once those checks complete.

## Local rendered verification

Chromium rendered checks passed at 1536, 1363, 768 and 375 pixels. All 24 dialogs were exercised at each width: correct title/description/cover/PDF mapping, Coming soon print state, close button, Escape, focus containment and focus return, and fixed background scrolling. No page/dialog horizontal overflow or JavaScript errors occurred. The mobile cover was centered after visual inspection.

All 24 first-party PDF endpoints returned PDF bytes and the correct content type. Three representative PDF buttons were actually activated (Soldier’s Path, Scandal of Grace, What If Trap). This headless Chromium build downloads PDFs instead of displaying its internal PDF viewer; correct download URLs were verified. Separate rendered manuscript inspections verify readable content. Ordinary visitor new-tab viewer behavior still needs the hosted review check.

Screenshots and structured results are in `docs/books-qa/`. Run `scripts/verify-books-browser.mjs` with Playwright available; `BOOKS_QA_CHROMIUM` may select an installed Chromium executable, and `BOOKS_QA_ORIGIN` may select the deployed review origin.

The GitHub connector can save this candidate. The CLI login used previously is absent in this session, and the connector exposes no Actions workflow-dispatch operation. Review deployment and hosted QA are pending that access; production is untouched.

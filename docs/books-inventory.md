# Books inventory and review handoff

| Metric | Result |
|---|---|
| Total books discovered | 34 |
| Complete manuscript PDFs found | 25; 24 have the other required publishing materials |
| Finished/published books without a supplied final PDF | 2: Choice and Dominion; final PDF still needed |
| Books with cover | 26 |
| Books with description | 26 after restoration |
| Books with finished PDF | 25 |
| Books with verified Lulu URL | 0 |
| Books needing Lulu URL | All 24 ready books; none verified for the other 10 records |
| Finished-book descriptions missing from Book Cover Quotes before repair | Soldier’s Path, Scandal of Grace, Thorn and Grace |
| Book Cover Quotes entries restored | 2; Thorn and Grace remains unresolved |
| Books included in candidate | 24 |
| Books published on hosted review | 0 in this task; deployment pending |

“Finished” is not inferred from a folder name: in-progress titles remain excluded even when an older publishing URL exists.

| Title | Collection | Cover | Description | PDF | Lulu | Print status | Review status |
|---|---|---|---|---|---|---|---|
| The Soldier’s Path: Basic Training for the Kingdom of God | — | Yes | Yes | 137 pages | Not verified | Coming soon | Included in candidate |
| The Path: A Journey to Sanctification | — | Yes | Yes | 118 pages | Not verified | Coming soon | Included in candidate |
| The Kingdom Now | — | Not found | Not found | Not found | Not verified | Not published | PDF MISSING; COVER MISSING; DESCRIPTION MISSING; IN PROGRESS / NOT READY |
| Thorn and Grace | — | Not found | Not found | Found | Not verified | Not published | COVER MISSING; DESCRIPTION MISSING |
| Thy Kingdom Come | — | Yes | Yes | 126 pages | Not verified | Coming soon | Included in candidate |
| God's Will, My Way | — | Yes | Yes | 108 pages | Not verified | Coming soon | Included in candidate |
| The Sanctification Cycle | — | Yes | Yes | 104 pages | Not verified | Coming soon | Included in candidate |
| AM I a Bad god? | — | Yes | Yes | 136 pages | Not verified | Coming soon | Included in candidate |
| The Ache | — | Yes | Yes | 137 pages | Not verified | Coming soon | Included in candidate |
| The Awakening | — | Yes | Yes | 145 pages | Not verified | Coming soon | Included in candidate |
| The Step | — | Yes | Yes | 195 pages | Not verified | Coming soon | Included in candidate |
| The Signposts of Sin | — | Yes | Yes | 110 pages | Not verified | Coming soon | Included in candidate |
| The Journey Home | — | Yes | Yes | 103 pages | Not verified | Coming soon | Included in candidate |
| Jesus Wants to Kill You: What the Church Neglected to Mention | — | Yes | Yes | 116 pages | Not verified | Coming soon | Included in candidate |
| Surely, This Was… | — | Yes | Yes | 278 pages | Not verified | Coming soon | Included in candidate |
| The Unseen Dominion | — | Yes | Yes | 357 pages | Not verified | Coming soon | Included in candidate |
| The Comfort Trap | — | Not certified | Not certified | Not certified | Not verified | Not published | IN PROGRESS / NOT READY |
| The Windows of Heaven  | — | Not certified | Not certified | Not certified | Not verified | Not published | IN PROGRESS / NOT READY |
| The Scandal of Suffering | — | Not certified | Not certified | Not certified | Not verified | Not published | IN PROGRESS / NOT READY |
| Alignment with God | — | Not certified | Not certified | Not certified | Not verified | Not published | IN PROGRESS / NOT READY |
| Kingdom Economy | — | Not certified | Not certified | Not certified | Not verified | Not published | IN PROGRESS / NOT READY |
| Pre-Form-ing | Re-Design-ed Series | Yes | Yes | 131 pages | Not verified | Coming soon | Included in candidate |
| Mis-Align-ment | Re-Design-ed Series | Yes | Yes | 163 pages | Not verified | Coming soon | Included in candidate |
| De-Moral-ized | Re-Design-ed Series | Yes | Yes | 150 pages | Not verified | Coming soon | Included in candidate |
| The Scandal of Dominion | Scandal Collection | Yes | Yes | Not found | Not verified | Not published | PDF MISSING |
| The Scandal of Peace | Scandal Collection | Yes | Yes | 126 pages | Not verified | Coming soon | Included in candidate |
| The Scandal of Love | Scandal Collection | Yes | Yes | 121 pages | Not verified | Coming soon | Included in candidate |
| The Scandal of Choice | Scandal Collection | Yes | Yes | Not found | Not verified | Not published | PDF MISSING |
| The Scandal of Grace | Scandal Collection | Yes | Yes | 119 pages | Not verified | Coming soon | Included in candidate |
| The Identity Trap | Trap Collection | Yes | Yes | 105 pages | Not verified | Coming soon | Included in candidate |
| The "What if" Trap | Trap Collection | Yes | Yes | 80 pages | Not verified | Coming soon | Included in candidate |
| The Pride Trap | Trap Collection | Yes | Yes | 107 pages | Not verified | Coming soon | Included in candidate |
| The Comparison Trap | Trap Collection | Yes | Yes | 77 pages | Not verified | Coming soon | Included in candidate |
| The “Birthday Minute” Book | — | Not found | Not found | Not found | Not verified | Not published | PDF MISSING; COVER MISSING; DESCRIPTION MISSING |

| Implementation | Result |
|---|---|
| Books route | `/books/` |
| PDF directory | `public/books/files/` |
| Central data | `public/books/catalog.json` |
| Book Cover Quotes | Two source-grounded descriptions restored and verified |
| Book URLs | Amazon URLs only; no Lulu substitutions or guesses |
| Tests | 67 passed; whitespace and internal link/asset checks passed |
| Modal | One native dialog; all 24 books tested at every requested width |
| PDF function | 24 correct PDF responses; 3 real button activations in headless browser |
| Print stub | Coming soon for all 24; data supports verified Lulu links later |
| Rendered result | 1536 / 1363 / 768 / 375 passed locally; no horizontal overflow |
| Review deployment | Pending Actions dispatch access and hosted verification |
| Production | Untouched |

See `books-review.md` for provenance, source PDF quality issues, test details, and the deployment limitation. See `books-qa/` for screenshots and machine-readable browser results.

## Files changed

- New Books page, stylesheet, dialog script, centralized catalog and generated reading-list fallback.
- 24 manuscript PDFs and 24 optimized cover JPGs.
- Books links in shared public headers/footers on Home, Conversations, Music, About and Contact.
- Books tests and the superseded Books-hidden navigation assertions.
- Review-only Worker configuration.
- Inventory, review notes, screenshots and browser verification/generation scripts.

No curriculum content, approved page body, production route, or production branch was changed.

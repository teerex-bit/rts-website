# Pages 01–40 Visual Compliance Implementation Plan
1. Preserve approved Page 01, Page 02, and Page 38 state and record lock checks.
2. Audit and correct Pages 03–10 using `src/pages-03-10/` and page-scoped corrections.
3. Audit and correct Pages 11–15 in `src/page-ranges/range-11-15/`.
4. Audit and correct Pages 16–20 in `src/page-ranges/range-16-20/`.
5. Audit and correct Pages 21–25 in `src/page-ranges/range-21-25/`.
6. Audit and correct Pages 26–30 in `src/page-ranges/range-26-30/`.
7. Audit and correct Pages 31–35 in `src/page-ranges/range-31-35/`.
8. Audit and correct Pages 36–37 and 39–40 in `src/page-ranges/range-36-40/`, preserving Page 38.
9. Add or update range validation before implementation changes; confirm each new assertion fails for the expected mismatch and passes after correction.
10. Generate all public routes once centrally, run full link/asset/server checks, check responsive overflow where browser support is available, and verify locked snapshots are unchanged.
11. Commit the integrated source, push the exact commit, and publish one consolidated version to the existing private review site.

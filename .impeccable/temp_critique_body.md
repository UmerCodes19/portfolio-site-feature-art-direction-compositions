# Design Critique — src/components/experience/ExperienceSection.tsx

## Method
⚠️ DEGRADED: single-context (sequential evaluation)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Excessive status indicators and pinging dots add noise |
| 2 | Match System / Real World | 1/4 | Complete disconnect: Uses AI corporate jargon instead of real software engineering terms |
| 3 | User Control and Freedom | 3/4 | Standard scroll navigation |
| 4 | Consistency and Standards | 1/4 | Violates portfolio software engineering standards with theatrical jargon |
| 5 | Error Prevention | 3/4 | N/A |
| 6 | Recognition Rather Than Recall | 2/4 | Over-decorated labels (`03.01 // CHAPTER`, `[ COMPANY ]`) confuse scannability |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 1/4 | High visual noise: brackets, dots, stars, catalog numbers, uppercase everywhere |
| 9 | Error Recovery | 3/4 | N/A |
| 10 | Help and Documentation | n/a | Portfolio surface |
| **Total** | | **13/32** | **Poor (40.6%)** |

## Design Specificity Verdict
**FAILED**: The current direction completely misunderstands the user's identity. It paints the developer as a "creative technologist / enterprise architecture strategist" using artificial corporate jargon and theatrical magazine layout, rather than presenting a clean, honest, credible Software Engineer.

## Priority Issues
- **[P0] Fundamental Identity Mismatch**: Overloaded with AI-generated corporate poetry ("Enterprise Architecture", "Visual Artifacts", "Editorial Chronicle"). Needs immediate complete replacement with simple, direct software engineering copy.
- **[P0] Typographic & Visual Over-Decoration**: Heavy use of brackets `[]`, `//`, random dots, stars, and fake catalog numbers. Must be stripped entirely so typography alone creates hierarchy.
- **[P1] Overdesigned Boxy Layout**: Excessive cards, badges, and sticky magazine columns create visual clutter. Needs clean whitespace, clear layout, and understated software engineering presentation.

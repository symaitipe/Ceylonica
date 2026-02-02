# Developer Instructions


## Branching Strategy

In a microservice architecture, use the service name as the branch name to ensure consistency and clarity.

    Example:
        - `product` as a branch name
        - `order` as a branch name
        - `payment` as a branch name


## *Recommended Format for Commits on git*

Use this single-line short description most of time.

**Types (common):**

- feat — new feature
- fix — bug fix
- docs — documentation
- style — formatting, whitespace, no code change
- refactor — code change that neither fixes a bug nor adds a feature
- perf — performance improvement
- test — adding or fixing tests
- chore — build, tooling, maintenance
- ci — CI config
- build — build system
- revert — revert a previous commit

**Practical examples**

1) Small feature:
   - feat(cache): add in-memory cache for profiles
2) Bug fix with scope and issue:
   - fix(storage): handle nil pointer on empty bucket
3) Documentation update:
   - docs: update installation instructions in README
4) Style:
   - style: format code with goimports
5) Refactoring:
   - refactor: simplify authentication middleware logic
6) Performance improvement:
   - perf: optimize database query for better performance
7) Test:
   - test: add unit tests for authentication module
8) Chore:
   - chore: update dependencies
9) CI configuration:
   - ci: add GitHub Action for automated testing
10) Build:
   - build: add build configuration for Docker
11) Revert:
   - revert: revert previous commit


# 💻 Coding & Pull Request Guidelines

This guide lists best practices for students when writing code and submitting Pull Requests.

---

## 🧠 1️⃣  Best Coding Practices (20 items)

| #    | Practice                          | Description                           |
| ---- | --------------------------------- | ------------------------------------- |
| 1    | **Use clear variable names**      | e.g., `cleaned_lines` instead of `x`. |
| 2    | **Keep functions short**          | One purpose per function.             |
| 3    | **Comment wisely**                | Explain *why*, not *what*.            |
| 4    | **Consistent indentation**        | Use 4 spaces.                         |
| 5    | **Avoid hard-coded paths**        | Use variables/configs.                |
| 6    | **Handle file errors gracefully** | Check if file exists.                 |
| 7    | **Use `with open()`**             | Prevents file handle leaks.           |
| 8    | **Organize imports**              | No unused imports.                    |
| 9    | **Follow PEP8**                   | Standard Python formatting.           |
| 10   | **Avoid globals**                 | Pass values as arguments.             |
| 11   | **Add docstrings**                | Explain functions.                    |
| 12   | **Avoid deep nesting**            | Use early returns.                    |
| 13   | **Use constants**                 | For repeated values.                  |
| 14   | **Write modular code**            | Split logic into functions.           |
| 15   | **Use Git**                       | Commit early and often.               |
| 16   | **Keep code DRY**                 | Don’t repeat yourself.                |
| 17   | **Validate inputs**               | Add checks for file/data.             |
| 18   | **Predictable output**            | No debug prints.                      |
| 19   | **Use .gitignore**                | Exclude `.venv/` & caches.            |
| 20   | **Document setup**                | Clear README instructions.            |

---

## 🔍 2️⃣  Best Pull Request (PR) Quality Standards (10 items)

| #    | Standard                  | Description                                             |
| ---- | ------------------------- | ------------------------------------------------------- |
| 1    | **Clear PR title**        | Follow Conventional Commits (`feat:`, `fix:`, `docs:`). |
| 2    | **Descriptive summary**   | Explain *what* and *why*.                               |
| 3    | **Small PRs**             | One logical change per PR.                              |
| 4    | **Link issues**           | e.g., `Closes #12`.                                     |
| 5    | **Code runs locally**     | No runtime errors.                                      |
| 6    | **Tests passing**         | Run `pytest` before PR.                                 |
| 7    | **No commented-out code** | Clean before PR.                                        |
| 8    | **No debug prints**       | Remove `print()` calls.                                 |
| 9    | **Docs updated**          | Update README if needed.                                |
| 10   | **Peer review ready**     | Code easy to read/review.                               |

---

🎓 Follow these rules to write cleaner, more professional code!
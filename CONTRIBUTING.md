# Contributing to NodeApiCrud 🚀

Thank you for your interest in contributing! To maintain project quality and organization, please follow these guidelines:

## How to Contribute

1.  **Fork the repository.**
2.  **Create a branch** for your feature or fix (`git checkout -b feature/amazing-improvement`).
3.  **Commit your changes** with descriptive messages (following conventional commits is encouraged).
4.  **Push to the branch** (`git push origin feature/amazing-improvement`).
5.  **Open a Pull Request** describing your changes in detail.

## Coding Standards

- **Use ES Modules:** Always use `import`/`export` syntax.
- **Asynchronous Code:** Use `async/await` for any I/O or file system operations.
- **Validation:** If adding new fields, update the corresponding **Zod** schema in `src/middlewares/`.
- **Documentation:** If adding new routes, update `swagger.yaml` to reflect the changes.
- **Clean Code:** Keep the code clean, dry (DRY), and commented where necessary.
- **Pre-flight Check:** Ensure the server starts without errors and passes basic validation before submitting your PR.

## Bug Reports and Feature Requests

Please use the **Issues** tab to report bugs or suggest new features. Provide as much context as possible, including steps to reproduce bugs.

---

Thank you for making this project better! 🛡️🗿

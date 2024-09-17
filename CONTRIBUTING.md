# Contributing to CyberCat Academy

We're excited that you're interested in contributing to CyberCat Academy! This document provides guidelines for contributing to the project.

## Project Structure

Our project follows this structure:
- `src/components/`: React components
- `src/lib/`: Utility functions and shared code
- `src/pages/`: Next.js pages and API routes
- `src/styles/`: Global styles and CSS modules
- `src/utils/`: Utility functions
- `src/backend/`: Backend code (controllers, models, services)

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
    ```bash
    git clone https://github.com/your-username/cybercat-academy.git
    cd cybercat-academy
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```

## Development Workflow

1. Make your changes in the appropriate directories:
   - For frontend changes, work in `src/pages/`, `src/components/`, and `src/styles/`
   - For backend changes, work in `src/backend/` and `src/pages/api/`
   - For shared utilities, use `src/lib/` or `src/utils/`

2. Test your changes locally:
    ```bash
    npm run dev
    ```

3. Ensure your code follows our style guidelines (we use ESLint and Prettier).

4. Write or update tests as necessary.

5. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
    ```bash
    git commit -m "feat: add new feature"
    ```

6. Push to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```

7. Create a Pull Request on GitHub.

## Pull Request Guidelines

- Provide a clear title and description of your changes.
- Link any related issues in the PR description.
- Ensure all tests pass and there are no linting errors.
- Include screenshots or GIFs for UI changes if applicable.

## Code Style

- We use TypeScript for type safety.
- Follow the existing code style in the project.
- Use meaningful variable and function names.
- Comment your code when necessary, especially for complex logic.

## Working with the Backend

- Backend code is located in `src/backend/`.
- Use the appropriate directories for controllers, models, and services.
- When adding new API routes, make sure to add them in pages/api.

## Environment Variables

- Never commit sensitive information or environment variables.
- Use `.env.local` for local development (it's gitignored).
- Document any new environment variables in the README.md.

## Reporting Bugs

- Use the GitHub Issues tab to report bugs.
- Provide a clear title and description of the bug.
- Include steps to reproduce, expected behavior, and actual behavior.
- If possible, include screenshots or error messages.

## Requesting Features

- Use the GitHub Issues tab to request new features.
- Clearly describe the feature and its potential benefits.
- Be open to discussion and feedback from maintainers and other contributors.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

Thank you for contributing to CyberCat Academy!
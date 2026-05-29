# GitHub Pages Setup

This site is ready for free GitHub Pages hosting.

## Deploy Steps

1. Push this repo to GitHub.
2. In the GitHub repo, open `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. Push to the `main` or `master` branch.
5. The workflow in `.github/workflows/deploy-pages.yml` will build and publish `out`.

## GitHub CLI Commands

After signing in with GitHub CLI:

```powershell
gh auth login
gh repo create SehwaajSingh/resume-website --public --source . --remote origin --push
```

If the remote already exists:

```powershell
git remote add origin https://github.com/SehwaajSingh/resume-website.git
git push -u origin master
```

The workflow supports both normal project Pages URLs and `SehwaajSingh.github.io`.

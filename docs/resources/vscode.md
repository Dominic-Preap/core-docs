---
id: vscode
title: Managing VSCode
sidebar_label: Managing VSCode
---

## VSCode Extensions

A good set of extensions can make working with a particular workspace or programming language more productive and you'd often like to share this list with your team or colleagues.

### Workspace Recommended Extensions

Create an `.vscode/extensions.json` file in the workspace folder and populate it with a list of extensions you want to include or check in the core project.

_example:_

```json
{
  "recommendations": [
    "CoenraadS.bracket-pair-colorizer",
    "EditorConfig.EditorConfig",
    "Tyriar.sort-lines",
    "aaron-bond.better-comments",
    "alefragnani.Bookmarks",
    "christian-kohler.path-intellisense",
    "dbaeumer.vscode-eslint",
    "eamodio.gitlens",
    "esbenp.prettier-vscode",
    "formulahendry.code-runner",
    "jebbs.plantuml",
    "kisstkondoros.vscode-codemetrics",
    "kumar-harsh.graphql-for-vscode",
    "mikestead.dotenv",
    "quicktype.quicktype",
    "rbbit.typescript-hero",
    "sensourceinc.vscode-sql-beautify",
    "streetsidesoftware.code-spell-checker",
    "vscode-icons-team.vscode-icons",
    "wayou.vscode-todo-highlight",
    "xabikos.JavaScriptSnippets",
    "yzhang.markdown-all-in-one"
  ]
}
```

This allows you to provide a list of extensions that will show up in the Extensions tab when the "**Show Recommended Extensions**" flag (`@recommended` in the search box) is checked.

![vscode-recommended-extensions.png](/img/docs/vscode-recommended-extensions.png)

### List of Extensions

You can also list the installed extensions with command line.

```bash
code --list-extensions
```

Here the list of the most used and recommended vscode extensions:

- [Better Comments](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf) improve your code commenting by with alert, informational, TODOs, and more!
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) mark lines and jump to them
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) a customizable extension for colorizing matching brackets
- [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) run code snippet or code file for multiple languages
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) spelling checker for source code
- [CodeMetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics) computes complexity in TypeScript / JavaScript files
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) support for dotenv file syntax
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) integrates ESLint JavaScript into VS Code
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) EditorConfig Support for Visual Studio Code
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) supercharge the Git capabilities built into Visual Studio Code
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) GraphQL syntax highlighting, linting, auto-complete, and more!
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) code snippets for JavaScript in ES6 syntax
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) keyboard shortcuts, table of contents, auto preview ...
- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype) copy JSON, paste as Go, TypeScript, C#, C++ and more
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) Visual Studio Code plugin that autocompletes filenames
- [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) Rich PlantUML support for Visual Studio Code
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code plugin for prettier/prettier
- [SQL Beautify](https://marketplace.visualstudio.com/items?itemName=sensourceinc.vscode-sql-beautify) VS Code extension that beautifies SQL
- [Sort lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines) Sorts lines of text
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) highlight TODOs, FIXMEs, and any keywords, annotations...
- [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero) Additional tooling for the typescript language
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) Icons for Visual Studio Code

### References

- [Is there a way to install a list of extensions in Visual Studio Code?](https://stackoverflow.com/questions/46652291/is-there-a-way-to-install-a-list-of-extensions-in-visual-studio-code)
- [How can you export VS Code extension list](https://stackoverflow.com/questions/35773299/how-can-you-export-vs-code-extension-list)
- [Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)

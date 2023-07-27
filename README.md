# How to contribute?
Just follow the Github PR process. see the guide from Github [contributing-to-projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

# How to Deploy/Run the page with VitePress
## Prerequisites
- Node.js version 16 or higher: [node install](https://nodejs.org/en)
- Terminal for accessing VitePress via its command line interface (CLI).
- Text Editor with Markdown syntax support.
    - VSCode is recommended, along with the official Vue extension.

VitePress can be used on its own, or be installed into an existing project. In both cases, you can install it with:
```sh
npm install -D vitepress
```
## Up and Running
The tool should have also injected the following npm scripts to your package.json if you allowed it to do so during the setup process:
```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}

```
The docs:dev script will start a local dev server with instant hot updates. Run it with the following command:
```sh
npx vitepress dev docs
```
More command line usage is documented in the CLI Reference.

The dev server should be running at http://localhost:5173. Visit the URL in your browser to see your new site in action!

For more detail: [VitePress Docs](https://vitepress.dev/guide/getting-started)

# About this Repo
Created by DevBase and [OpenBuild](https://openbuild.xyz), Use [MIT license](https://github.com/devbasecom/celestia-cn/blob/main/LICENSE).

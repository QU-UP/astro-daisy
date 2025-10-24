# Astro-Daisy

A template project to let you get started with [Astro JS](https://astro.build/) and [Daisy UI](https://daisyui.com/), with [tinaCMS](https://tina.io/) for easy content authoring. The template has basically **no design** outside a navbar, and dumping content from the blog collection on the respective pages. 

## Running locally

Make sure you have npm installed, on first run you need to install dependencies with `npm i`, then to start the dev server run:

```bash
npm run dev
```

You can then navigate to [http://localhost:4321/astro-daisy](http://localhost:4321/astro-daisy) to see the preview of the site, and [http://localhost:4321/astro-daisy/admin](http://localhost:4321/astro-daisy/admin) to edit content with [tina](https://tina.io/). For other commands see the [commands section](#commands)


## Development Guide

To start go into the `astro.config.mjs` and fill out any sections with `// todo` this includes setting your base URL and base paths. You should also setup the github workflow if you want to use it. You will ned a github PAT with `workflow` and `repo` permissions.

### Stack

The tech stack is relatively simple, it consists of

- [Astro JS](https://astro.build/) ([docs](https://docs.astro.build)); The framework for rendering the site
- [TinaCMS](https://tina.io/); A handy frontend "cms" for building out content quickly locally
- [Daisy UI](https://daisyui.com/); The Tailwind-based UI library used to make everything look nice

### Adding & Updating themes

To update a theme, find the theme in `/src/styles/daisy.css`, and update the variables to whatever values you want. If you're making large changes, it's probably easier to generate a new theme following the steps below.

If you want to generate a new theme, I would use the tool available at [this link](https://daisyui.com/theme-generator), this is the fastest easiest way to generate a theme, then click the `CSS` button to get the snippet you need for the next part.

To add a theme first add it to `/src/styles/daisy.css` it should look something like:

```css
@plugin "daisyui/theme" {
  name: "mytheme";
    /*More code*/
}

```

To use the theme, update the top of `/src/styles/daisy.css` to set it as either the light or dark theme (or both), for example if I wanted my new theme `mytheme` to be the light theme, I would change the top to:

```css
/*Set dark and light themes*/
@plugin "daisyui" {
  themes: mytheme --default, luxury --prefersdark;
  root: ":root";
  include: ;
  exclude: ;
  prefix: ;
  logs: true;
}
```

If you are using the `ThemeToggle`, you need to also update `src/components/ThemeToggle.astro`.

### Folder structure

Important folders:

- `/public`: Where static assets like images and fonts are stored
    - `/public/admin`: Required files for [tina](https://tina.io/) to work
    - `/public/img`: Folder for blog images, if you change this also change the config in `/tina/config.ts`
- `src/styles/daisy.css`; This is the file that contains the CSS themes, to create a new one, see [this guide](https://daisyui.com/docs/themes/) and [this tool](https://daisyui.com/theme-generator/)
- `/src/pages`: This folder contains the *templates* for all the pages. So, `index.astro` is `/`, `about.astro` is `/about`, etc. This is where you would also define the templates for any [collections](https://docs.astro.build/en/guides/content-collections/)
    - `/src/pages/blog`: These are the *templates* for the blog pages. `index.astro` is `/blog` and `[...slug].astro` is for individual pages
- `/src/content`: This is where the actual *content* for [collections](https://docs.astro.build/en/guides/content-collections/) go (like blog posts)
- `/src/content.config.ts`: this is where [collections](https://docs.astro.build/en/guides/content-collections/) are defined, so if you need to add fields you need to update this file and the tina config (below)
- `/tina`: Contains the config for all of the local tina stuff (our "cms")
    - `/tina/config.ts`: Contains the important configuration for tina, see [https://tina.io/docs/tina-folder/overview](https://tina.io/docs/tina-folder/overview)

### Deployment

This repo comes with an automatic deployment system to github pages when changes are pushed to the main branch. The file for this configuration is found in `/.github/workflows/deploy.yml`


### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

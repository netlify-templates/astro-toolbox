 [![astro](https://user-images.githubusercontent.com/3611928/167888733-9bf21eda-d051-46f3-9184-12b14e21a10a.png)](https://ntl.fyi/3LZGn73)

# Astro Quickstart Template   

This is a bare-bones Astro project that has everything you need to quickly deploy it to [Netlify](https://netlify.com). 

Hate reading, here's a video: https://youtu.be/SknFflQVOys!

Love reading, here's blog post: www.netlify.app/blog/deploy-your-astro-project-fast/!

## Table of Contents:

- [Quick Setup + Deploy Option](#quick-setup--deploy-option)
- [Regular Setup](#regular-setup)
  - [Cloning + Install Packages](#1-cloning--install-packages)
  - [Deploying](#2-deploying)
- [Netlify Functions](#netlify-functions)
  - [Netlify Functions Resources](#netlify-functions-resources)
- [Astro + Netlify Resources](#astro--netlify-resources)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Testing](#testing)
  - [Included Default Testing](#included-default-testing)
  - [Removing Renovate](#removing-renovate)
  - [Removing Cypress](#removing-cypress)
- [Want to learn more?](#want-to-learn-more)

## Quick Setup + Deploy Option

Click this button and it will help you create a new repo, create a new Netlify project, and deploy!

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/astro-quickstart)

## Regular Setup

 ### 1. Cloning + Install Packages

  - Clone this repo with one of these options:

    - Click the 'Use this template' button at the top of the page
    - Or via the command line `git clone https://github.com/netlify-templates/astro-quickstart`

  - Then install the necessary packages and run the project locally to make sure everything works.

    ```bash
    npm install
    npm run dev
    ```

  > Alternatively, you can run this locally with [the Netlify CLI](https://docs.netlify.com/cli/get-started/)'s by running the `netlify dev` command for more options like receiving a live preview to share (`netlify dev --live`) and the ability to test [Netlify Functions](https://www.netlify.com/products/functions) and [redirects](https://docs.netlify.com/routing/redirects/). 

  ### 2. Deploying
  - Install the Netlify CLI globally `npm install netlify-cli -g`
    
  - Run `npm run build`

  - Then use the `netlify deploy` for a deploy preview link or `netlify deploy --prod` to deploy to production

  Here are a few other ways you can deploy this template:
    
  - Use the Netlify CLI's create from template command `netlify sites:create-template astro-quickstart` which will create a repo, Netlify project, and deploy it
    
  - If you want to utilize continuous deployment through GitHub webhooks, run the Netlify command `netlify init` to create a new project based on your repo or `netlify link` to connect your repo to an existing project

## Forms

Netlify Forms are a way to wire up your native HTML into being able to seamlessly handle submissions. To get a form working, we need to add two extra things:

1. An extra attribute on the `form` tag, `data-netlify="true"`

Adding this attribute to our `form` tag will let Netlify know when it loads the page, that it needs to be aware of submissions made through it.

2. A hidden input in the form, `<input type="hidden" name="form-name" value="feedback" />`

Adding this extra input allows our form to be given a name that Netlify can store submissions to. It is a hidden input so your users won't see it but it will pass along the name of our form to Netlify when we submit. In our Netlify Admins site under Forms, we will see our Active Form named `feedback` and all submissions will go there.

With both of those we're ready for folks to give us feedback!

### Adding a custom submission page

While Netlify provides a default submission page for folks, we can customize it as well! With the `action` attribute on the `form` tag we will be able to direct our users to our own page.

In [`components/FeedbackForm.js`](./components/FeedbackForm.js) you'll see the form has the attribute `action="/success"` this will take our user to the custom route `/success` which we created under [`pages/success.js`](./pages/success.js). As long as the page exists, you can direct folks to it!

### Blocking bot spam with a honeypot field

Many bots scan through webpages and try to see what pages and forms they can get access to. Instead of letting our website receive spam submissions, we can filter out unrelated submissions with a visually-hidden input field.

```html
<p class="hidden">
  <label>
    Don’t fill this out if you’re human: <input name="bot-field" />
  </label>
</p>
```

Since screenreader users will still have this announced, it is important for us to
communicate that this is a field not meant to be filled in.

For this to work we also need to add a `data-netlify-honeypot` attribute to the form element.

```html
<form data-netlify="true" data-netlify-honeypot="bot-field" action="/success" method="POST"></form>
```

[See it here in the template code.](https://github.com/netlify-templates/next-toolbox/blob/main/components/FeedbackForm.js#L8)

### Forms Resources

- [Netlify Forms Setup](https://docs.netlify.com/forms/setup/)
- [Netlify Forms](https://www.netlify.com/products/forms/#main)
- [Netlify Forms - Form Triggered Functions](https://docs.netlify.com/functions/trigger-on-events/)
- [Netlify Forms - Using reCAPTCHA 2](https://docs.netlify.com/forms/spam-filters/#recaptcha-2-challenge)

## Netlify Functions

With Netlify, you can build out server-side code without having to setup and maintain a dedicated server. Inside of our default folder path, [`netlify/functions`](./netlify/functions) you can see an example of the format for JavaScript functions with the [`joke.js`](./netlify/functions/joke.js) file.

The function format expects an `async` function named `handler` to be exported.*

```js
export const handler = async () => {
  // Your code goes in here!
}
```

* *Note: ESLint may report that the async is unnecessary if there is no `await` code within the function, but the `async` is required. Do not delete it.*

This will be the function that will be invoked whenever a client makes a request to the generated endpoints. The endpoint's format is followed as `/.netlify/functions/joke`. So whenever the site is deployed, if you go to `https://<site base url>/.netlify/functions/joke` you will see a random joke!

> Side note: In our example, we're using `import` to include data from another location and `export const const handler` to let our function be consumed by Netlify. We're able to do this because of [esbuild](https://esbuild.github.io). This is a bundler configuration we set in our `netlify.toml` under `[functions]`.

### Netlify Functions Resources

There is quite a bit you can do with these functions, so here are some additional resources to learn more!

- [Netlify Function Format](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format)
- [Build Netlify Functions with TypeScript](https://docs.netlify.com/functions/build-with-typescript/)
- [Event-triggered Functions](https://docs.netlify.com/functions/trigger-on-events/)
- [What are Background Functions](https://www.netlify.com/blog/2021/01/07/what-are-background-functions/)
- [Netlify Functions - Examples](https://functions.netlify.com/examples/)
- [Using esbuild as your bundler for new ECMAScript Features](https://www.netlify.com/blog/2021/04/02/modern-faster-netlify-functions/)

## Astro + Netlify Resources

Here are some resources to help you on your Astro + Netlify coding fun!

- [Astro on Netlify Integration Page](https://docs.netlify.com/integrations/frameworks/astro)

- [Build wicked fast sites with Astro: An Introduction](https://www.netlify.com/blog/2021/07/08/build-wicked-fast-sites-with-astro-an-introduction/#main)

- [A Template for Building Shopify Stores with Astro and the Storefront API](https://www.netlify.com/blog/2021/07/23/build-a-modern-shopping-site-with-astro-and-serverless-functions)

Hope this template helps :) Happy coding 👩🏻‍💻!

---

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components or layouts.

Any static assets, like images, can be placed in the `public/` directory.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Redirects

In the [`netlify.toml`](./netlify.toml) configuration file there is an example of how to implement redirects. Redirects can be used to do many things from redirecting Single Page Apps more predictably, redirecting based on country/language to leveraging On-Demand Builders for [Distributed Persistant Rendering](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/). 

In the example we'll be using redirects to have a shorter endpoint to Netlify functions. By default, you call a Netlify function when requesting a path like `https://yoursite.netlify.com/.netlify/functions/functionName`. Instead, we'll redirect all calls from a path including `/api` to call on the Netlify functions. So the path will be `https://yoursite.netlify.com/api/functionName`, a lot easier to remember too. 


### Example
```toml
[[redirects]]
from = "/api/*"
to = "/.netlify/functions/:splat"
status = 200
force = true
```

First we create a section in the `.toml` for the redirect using `[[redirects]]`. Each redirect should have this line to start the redirect code, and the redirects will be executed in the order they appear in the `.toml` from top to bottom.

The bare minimum needed is the `from` and `to`, letting the [CDN](https://www.netlify.com/blog/edge-cdn-serverless-cloud-meaaning) know when a route is requested, the `from`, forward it on to another path, the `to`. In the example, we also added an 'Ok' status code, 200, and set the `force` to true to make sure it _always_ redirects from the `from` path.

There are many ways to use redirects. Check out the resouces below to learn more.

### Redirect Resources

- [Redirect syntax and configuration](https://docs.netlify.com/routing/redirects/#syntax-for-the-netlify-configuration-file)
- [Redirect options](https://docs.netlify.com/routing/redirects/redirect-options/)
- [Creating better, more predicatable redirect rules for SPAs](https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas/)
- [Redirect by country or language](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language)
- [On-Demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/)

## Testing

### Included Default Testing

We’ve included some tooling that helps us maintain these templates. This template currently uses:

- [Renovate](https://www.mend.io/free-developer-tools/renovate/) - to regularly update our dependencies
- [Cypress](https://www.cypress.io/) - to run tests against how the template runs in the browser
- [Cypress Netlify Build Plugin](https://github.com/cypress-io/netlify-plugin-cypress) - to run our tests during our build process

If your team is not interested in this tooling, you can remove them with ease!

### Removing Renovate

In order to keep our project up-to-date with dependencies we use a tool called [Renovate](https://github.com/marketplace/renovate). If you’re not interested in this tooling, delete the `renovate.json` file and commit that onto your main branch.

### Removing Cypress

For our testing, we use [Cypress](https://www.cypress.io/) for end-to-end testing. This makes sure that we can validate that our templates are rendering and displaying as we’d expect. By default, we have Cypress not generate deploy links if our tests don’t pass. If you’d like to keep Cypress and still generate the deploy links, go into your `netlify.toml` and delete the plugin configuration lines:

```diff
[[plugins]]
  package = "netlify-plugin-cypress"
-  [plugins.inputs.postBuild]
-    enable = true
-
-  [plugins.inputs]
-    enable = false 
```

If you’d like to remove the `netlify-plugin-cypress` build plugin entirely, you’d need to delete the entire block above instead. And then make sure sure to remove the package from the dependencies using:

```bash
npm uninstall -D netlify-plugin-cypress
```

And lastly if you’d like to remove Cypress entirely, delete the entire `cypress` folder and the `cypress.config.ts` file. Then remove the dependency using:

```bash
npm uninstall cypress
```

## Want to learn more?

Feel free to check [our documentation](https://github.com/withastro/astro) or jump into our [Discord server](https://astro.build/chat).

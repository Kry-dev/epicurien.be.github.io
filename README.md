## Smogey content based on: Bootstrap 3 / SASS / PUG / GULP / WEBPACK

#### Need to be installed
* node.js You'll need to install [Node.js](https://nodejs.org/en/), you can use the `v6.11.0` or above. Then open up a console (Terminal, iTerm, PowerShell, etc.) and install the depencencies for this project.
* npm 5
* gulp-cli 

#### steps to install
1. clone this repo
2. npm i (or npm install)
3. npm install "gulpjs/gulp#4.0" --save-dev
4. gulp 


## How to run

### Locally

```sh
# Start the dev server with live reload
# on http://localhost:3000
gulp
```

### Build assets for upload

```sh
# Build the static assets for upload.
# They'll be put in the /build folder.
gulp
```

## Development

### Tech used

[Pug](http://pugjs.org) (formerly Jade) for HTML layout, you can check out the official [language reference](https://pugjs.org/api/getting-started.html) to see how it works. <br/>
If you find the syntax too heavy, you can also just write plain HTML and run it through a [converter](http://html2jade.org/) when you're happy with your code.

[Bootstrap 3](https://getbootstrap.com/docs/3.3/) with our own custom overrides in [`global.scss`](sass/global.scss). The idea is to 
customize and use as much of the existing components as possible.

### How to create a new page

1. Create `pug/my_page.pug` and `sass/my_page.scss`
2. Import your page styles in `sass/app.scss`, this is where we require all sass files for the final build ATM. `@import './my_page.scss'`
3. Your page must have `header` and `footer` elements
```pug
doctype html
html(lang='ro')
include head.pug
body
  include header.pug
  <!-- you code --->
  include footer.pug
```
4. Be sure that gulp verison is "github:gulpjs/gulp#4.0", if it's not true, install it : npm install gulpjs/gulp.git#4.0 --save-dev

5. Finally, build pages should be in the `build` folder. 


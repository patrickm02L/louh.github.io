Developer documentation
=======================

(e.g. notes for myself)

# Foundation

1. Use `bower update` to get the latest Foundation
2. You don't need all of it, just copy some of its files:

* Ignore the `css` folder, that is auto-generated from the `scss` anyway.
* Ignore third-party stylesheets of scripts, e.g. `normalize.css` or `normalize.scss`; anything in `js/vendor/`.
* Copy over `foundation.min.js` and `foundation.js` (if necessary for debugging). Ignore the `js/foundation/` folder since all of that has already been compiled into `foundation.js`.
* Copy over the `scss/foundation/` folder directly into `stylesheets/`.
* See if anything has changed in `scss/foundation.scss`
* We'll use `stylesheets/_settings.scss` to override anything in `stylesheets/foundation/_settings.scss`.

# Node server

There is a node server just for serving and testing a local server; it's not necessary for hosting since the output is a GitHub Pages-ready static site. Type `npm start` to run the development server.

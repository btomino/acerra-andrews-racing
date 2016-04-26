# Penn CPR Website

This site is built using the Concise CSS Framework (http://concisecss.com).

## First Setup

In the web folder, run:

    npm install

This will install all of the necessary modules to run the gulp processes.

Then run:

    gulp

This will do the initial build: create a css file out of compiled LESS files, and copy images/fonts/js from src to dist.

## Writing CSS with Concise

Concise has a pretty decent starting point for most page elements, you can find those at the bottom of the documentation page: http://concisecss.com/documentation/

Any customizations that need to be done to the framework to make it match the mockups is to be done in 

	src/style/custom/_custom.scss

You can change variables, colors, etc in 

	src/style/custom/_globals.scss

Just read through the documentation to see how things like grids work, and if you have any questions, please don't hesitate to ask.	

## JSHint

This boilerplate uses "gulp-jshint," a tool that helps to detect errors and potential problems in your JavaScript code.  Read more here: https://www.npmjs.com/package/gulp-jshint

By default, JSHint isn't doing anything.  It checks all JS files in src/js/.  If you'd like to run it, just run:

	gulp lint

This will show a report in Terminal.

## Icon Font Generator

This boilerplate uses "gulp-fontcustom" to generate a usable font out of icons placed in the src/icons/ folder. Read more here: https://www.npmjs.com/package/gulp-fontcustom

### Generating Icons

To get this tool set up correctly, you must first install two libraries.  In terminal, from anywhere, run these two commands:

    brew install fontforge eot-utils
    gem install fontcustom

This will install the necessary things to get the icon font generation working.

This generator exists outside of the rest of the gulp tools, so you can to run it only when necessary.  To generate the font once, run:

	gulp icons

To watch the src/icons/ folder for new icons and automatically update the font (while you're actively working on it), run:

	gulp watch-icons

### Building the Styleguide

I've left the styleguide out of the main build process for now, because we may not always want to use it.  To build the styleguide:

	gulp styleguide

This builds and runs the styleguide on localhost:3000

You can also have gulp watch for changes in LESS/CSS files and regenerate automatically by running this:

	gulp watch-styleguide

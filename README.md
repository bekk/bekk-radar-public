# Bekk Radar - public edition

This is an open source clone of Bekk's technology radar: https://radar.bekk.no (in norwegian). 
Our radar is an opinionated review of current and emerging technologies. Feel free to create your own radar! 

## Contributing

Anyone with read access to this repository can make contributions.

See [CONTRIBUTING.md](/CONTRIBUTING.md).

## Content editing

Content is changed by editing
[markdown](https://guides.github.com/features/mastering-markdown/) files.

Each radar is defined inside its own folder, i.e `./content/tech2018`.

Scores, categories and tags for each radar point can be changed by editing
`radar.yml` files.

Example radar file structure:

    tech2018/
        radar.yml     // radar and point metadata goes here
        intro.md      // intro text for the radar (in markdown)
        points/
            go.md     // description for the point go (in markdown)
            go.png    // image to be shown with the description for go
            react.md
            react.jpg
            scala.md
            scrum.md

The files can be edited through GitHub's interface or git. Files can also be
generated from a Trello board or a legacy radar.

### Importing from Trello

Content can be imported from a Trello board, using the `tools/trello2radar.js`
script.

Lists/lanes with content should be prefixed with `@`. I.e. `@Språk og
rammeverk`.

Tags are labels prefixed with a `#`. I.e. `#Animasjon`.

Labels are used to give points a score. Labels can be specified in order, using
the `--labels` flag.

If cards have cover images, the images are downloaded automatically.

***NOTE*** We only support jpg files as cover images, this is subject to change!

In order to use the script, you need an app key and a token from Trello. Get started with the Trello API by reading this 
documentation: https://developers.trello.com/docs/api-introduction

To obtain a token, you need to accept Trello's terms and get a token
from this url:
https://trello.com/1/connect?key=<yourAppKey>&name=Radar-importer&response_type=token

Then execute the script like this:

    node tools/trello2radar --board "Teknologiradar 2018" --appkey "<appkey here>" --token <your token here> --levels "Bruk" "Vurder" "Avstå"

You should now get a `radar.yml` and several `.md` files with the content from
your Trello board

## Development

Major technologies/patterns:

 * [webpack](https://webpack.github.io/) - build system
 * [react](https://facebook.github.io/react/) - view rendering
 * [redux](http://rackt.org/redux/) - for state management

### Dependencies

Only node and `npm` is needed.

In the root of the repository, run

    npm install

to get all other dependencies.

### Building

    npm start

Starts a server on `localhost:8000` with hot-loading enabled.

Or run

    npm run build-prod

To build production assets in the `./dist/` and `./bin` directory.

Or run

    npm run start-prod

To start the production client and server.

### Debugging

We're using
[`redux-devtools-log-monitor`](https://github.com/gaearon/redux-devtools-log-monitor)
to debug actions and state changes in development.

To enable it, click on the app to focus it and press `ctrl+d`.

### Tests

Tests are located in the `./src` folder and end in `.spec.js`.

I.e. `src/containers/App.spec.js` tests `src/containers/App.js`

The main test script to execute our tests is `test/runtests.sh`.The test framework used is [mocha](https://mochajs.org/) and we use [Karma](http://karma-runner.github.io/0.13/index.html) as a test runner.

To run the tests, execute

    npm test

or, to test continuously while watching for changes:

    npm run test:watch

or, to just run linting:

    npm run lint

#### Karma

The common config file for Karma is `test/karma/common.conf.js`

#### Browserstack

If you have a license, you can run our tests with [Browserstack](https://www.browserstack.com), giving the benefits of executing our tests on multiple platforms. To fully utilize testing with Browserstack, you can use these commands:

    // Will execute tests on local browsers, YMMV, each browser 
    // and the appropriate loader plugin has to be installed 
    npm run test-local

    // Will execute tests on mobile devices in the config
    BROWSER_STACK_USERNAME='<user>' BROWSER_STACK_ACCESS_KEY='<key>' npm run test-mobile

    // Will execute tests on desktops in the config
    BROWSER_STACK_USERNAME='<user>' BROWSER_STACK_ACCESS_KEY='<key>' npm run test-desktop

    // Will execute tests on chrome browsers in the config
    BROWSER_STACK_USERNAME='<user>' BROWSER_STACK_ACCESS_KEY='<key>' npm run test-chrome

    // Will execute tests on firefox browsers in the config
    BROWSER_STACK_USERNAME='<user>' BROWSER_STACK_ACCESS_KEY='<key>' npm run test-firefox

The script `test/runtests.sh` also contains some more test options, including IE testing.

For available browsers in the config, see the object `customLaunchers` in `test/karma/common.conf.js`. For a complete list of browsers, see ['list of browsers and plattforms'](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate).

A current list of supported browsers can be fetched from Browserstack:

    curl -u "<user>:<key>" https://www.browserstack.com/automate/browsers.json

### Coding style

For JavaScript, please ensure the linting is passing.

For stylus, please see [Medium's less style
guide](https://gist.github.com/fat/a47b882eb5f84293c4ed)

## Deployment

### Docker

The application can be run as a Docker container.

    docker build --t bekkradar .
    docker run -p 8080:8080 bekkradar

The app will now be available at port 8080

### Authentication

The radar can use authentication when deployed internally. There are several
relevant environment variables:

* `BEKKRADAR_CAS_URL`: the authentication server
* `BEKKRADAR_CAS_CALLBACK_URL`: where the authentication server should redirect
  after login
* `BEKKRADAR_SESSION_SECRET`: defaults to a randomly generated uuid, but can be
  overriden.

So, in order to launch the prod-server with encryption, run:

    $ BEKKRADAR_CAS_URL=<authserver> node bin/server.js

Or when running inside docker:

    $ docker run -p 8080:8080 --env BEKKRADAR_CAS_URL=<authserver> \
    --env BEKKRADAR_CAS_CALLBACK_URL=http://containerhostname:8080 bekkradar

### Not running on root of domain

All js use absolute paths when referring to assets (images, js, fonts etc).

The reason for this, is that we need to be able to use URL's relative from the
root of the domain, in order to serve the single page application and its
assets on all URL's. (Because we don't want to use the anchor tag hack, i.e.
`open.bekk.no/radar/#/tech2018`, in links)

It is possible to let the container not run on the root of the domain, by
specifying an environment variable, `BEKKRADAR_VIRTUAL_PATH`. Note that this
variable needs to be set both when building and running the prod-server.

   $ BEKKRADAR_VIRTUAL_PATH=/radar-beta NODE_ENV=production webpack --config ./client.webpack.config.js
   $ BEKKRADAR_VIRTUAL_PATH=/radar-beta NODE_ENV=production webpack --config ./server.webpack.config.js
   $ BEKKRADAR_VIRTUAL_PATH=/radar-beta NODE_ENV=production node bin/server.js


## Tips and tricks

To toggle hidden radars, use this bookmarklet:

    javascript:localStorage.getItem('radarToShow')?localStorage.removeItem('radarToShow'):localStorage.setItem('radarToShow', JSON.stringify('<radarToShow>')); window.location.reload();

Where `<radarToShow>` is the identifier of the radar you want to show.

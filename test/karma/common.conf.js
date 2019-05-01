// Karma configuration
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

var webpackCfg = require('../../client.webpack.config');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    client: {
      mocha: {},
    },
    browserStack: {
      project: 'Bekk Radar',
      captureTimeout: 1800,
      timeout: 1800,
    },
    customLaunchers: {
      bs_winphone_nokia_lumia_930: {
        base: 'BrowserStack',
        device: 'Nokia Lumia 930',
        os: 'winphone',
        os_version: '8.1',
      },
      bs_iphone5S: {
        base: 'BrowserStack',
        device: 'iPhone 5S',
        os: 'ios',
        os_version: '7.0',
      },
      bs_ipadair: {
        base: 'BrowserStack',
        device: 'iPad Air',
        os: 'ios',
        os_version: '8.3',
      },
      bs_android_lollipop_nexus6: {
        base: 'BrowserStack',
        device: 'Google Nexus 6',
        os: 'android',
        os_version: '5.0',
      },
      bs_android_kitkat_samsung_gs5: {
        base: 'BrowserStack',
        device: 'Samsung Galaxy S5',
        os: 'android',
        os_version: '4.4',
      },
      bs_android_jellybean_samsung_gs4: {
        base: 'BrowserStack',
        device: 'Samsung Galaxy S4',
        os: 'android',
        os_version: '4.3',
      },
      bs_android_jellybean_amazon_kindle_fire: {
        base: 'BrowserStack',
        device: 'Amazon Kindle Fire HDX 7',
        os: 'android',
        os_version: '4.3',
      },
      bs_android_icecreamsandwich_sgalaxynote: {
        base: 'BrowserStack',
        device: 'Samsung Galaxy Note 10.1',
        os: 'android',
        os_version: '4.0',
      },
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '35.0',
        os: 'OS X',
        os_version: 'Yosemite',
      },
      bs_firefox_windows: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '35.0',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_chrome39_windows: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '39.0',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_chrome38_windows: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '38.0',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_chrome37_windows: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '37.0',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_ie11_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_ie10_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '8',
      },
      bs_opera_windows: {
        base: 'BrowserStack',
        browser: 'opera',
        browser_version: '12.16',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_safari_windows: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '5.1',
        os: 'Windows',
        os_version: '8.1',
      },
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '8.0',
        os: 'OS X',
        os_version: 'Yosemite',
      },
      bs_opera_mac: {
        base: 'BrowserStack',
        browser: 'opera',
        browser_version: '12.15',
        os: 'OS X',
        os_version: 'Yosemite',
      },
      bs_chrome39_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '39.0',
        os: 'OS X',
        os_version: 'Yosemite',
      },
      bs_chrome38_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '38.0',
        os: 'OS X',
        os_version: 'Yosemite',
      },
      bs_chrome37_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '37.0',
        os: 'OS X',
        os_version: 'Yosemite',
      },
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['phantomjs-shim', 'mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: ['../../src/test/loadtests.js'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../../src/test/loadtests.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackCfg,
    webpackServer: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
    // If, during test execution, Karma does not receive any message from a browser within browserNoActivityTimeout (ms), it will disconnect from the browser.
    browserNoActivityTimeout: 100000,

    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 5, // default 0
    captureTimeout: 4 * 60 * 1000, //default 60000

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  });
};

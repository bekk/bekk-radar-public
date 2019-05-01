var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9878,
    browsers:  [
      'PhantomJS'
    ]

  });
};

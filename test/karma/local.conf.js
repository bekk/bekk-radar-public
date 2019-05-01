var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9882,
    browsers:  [
      'Chrome'
    ]

  });
};

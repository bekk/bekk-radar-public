var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9880,
    browsers:  [
      'bs_ie11_windows',
      'bs_ie10_windows'
    ]

  });
};

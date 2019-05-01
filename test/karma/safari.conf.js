var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9884,
    browsers:  [
      'bs_safari_windows',
      'bs_safari_mac'
    ]

  });
};

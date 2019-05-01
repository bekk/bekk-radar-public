var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9883,
    browsers:  [
      'bs_opera_windows',
      'bs_opera_mac'
    ]

  });
};

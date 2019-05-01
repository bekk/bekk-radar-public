var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9885,
    browsers:  [
      'bs_safari_mac',
      'bs_opera_mac',
      'bs_firefox_mac',
      'bs_chrome39_mac'
    ]

  });
};

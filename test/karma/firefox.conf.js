var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9877,
    browsers:  [
      'bs_firefox_mac',
      'bs_firefox_windows'
    ]

  });
};

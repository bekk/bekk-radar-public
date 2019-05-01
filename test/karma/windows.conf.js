var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9886,
    browsers:  [
      'bs_opera_windows',
      'bs_chrome39_windows',
      'bs_safari_windows',
      'bs_ie11_windows',
      'bs_firefox_windows'
    ]

  });
};

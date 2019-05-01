var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9879,
    browsers:  [
      'bs_chrome39_windows'/*,
      'bs_chrome38_windows',
      'bs_chrome39_mac',
      'bs_chrome38_mac',*/
    ]

  });
};

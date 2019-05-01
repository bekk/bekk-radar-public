var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9881,
    browsers:  [
      'bs_iphone5S',
      'bs_ipadair'
    ]

  });
};

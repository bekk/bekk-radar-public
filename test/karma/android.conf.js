var commonKarmaConfig = require('./common.conf');

module.exports = function(config) {

  commonKarmaConfig(config);

  config.set({

    port: 9876,
    browsers:  [
      'bs_android_lollipop_nexus6',
      'bs_android_kitkat_samsung_gs5',
      'bs_android_jellybean_amazon_kindle_fire',
      'bs_android_icecreamsandwich_sgalaxynote'
    ]

  });
};

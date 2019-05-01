#!/usr/bin/env bash

if [ "$TEST_ENVIRONMENT" == "LOCAL" ]
then

  karma start ./test/karma/local.conf.js

elif [ "$TEST_DEVICES" == "MOBILE" ]
then

  karma start ./test/karma/android.conf.js && karma start ./test/karma/ios.conf.js

elif [ "$TEST_DEVICES" == "DESKTOP" ]
then

  karma start ./test/karma/safari.conf.js && karma start ./test/karma/opera.conf.js && karma start ./test/karma/firefox.conf.js && karma start ./test/karma/chrome.conf.js && karma start ./test/karma/ie.conf.js


elif [ "$TEST_OS" == "IOS" ]
then

  karma start ./test/karma/ios.conf.js

elif [ "$TEST_OS" == "WINDOWS" ]
then

  karma start ./test/karma/mac.conf.js

elif [ "$TEST_OS" == "MAC" ]
then

  karma start ./test/karma/mac.conf.js

elif [ "$TEST_OS" == "ANDROID" ]
then

  karma start ./test/karma/android.conf.js

elif [ "$TEST_BROWSER" == "FIREFOX" ]
then

  karma start ./test/karma/firefox.conf.js

elif [ "$TEST_BROWSER" == "IE" ]
then

  karma start ./test/karma/ie.conf.js

elif [ "$TEST_BROWSER" == "OPERA" ]
then

  karma start ./test/karma/opera.conf.js

elif [ "$TEST_BROWSER" == "CHROME" ]
then

  karma start ./test/karma/chrome.conf.js

elif [ "$TEST_BROWSER" == "SAFARI" ]
then

  karma start ./test/karma/safari.conf.js

elif [ "$TEST_BROWSER" == "WATCH" ]
then

  karma start ./test/karma/default.conf.js --autoWatch=true --singleRun=false

else

  karma start ./test/karma/default.conf.js

fi

exit


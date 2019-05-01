var testsContext = require.context('..', true, /(\.spec\.jsx?$)|(Helper\.jsx?$)/);
testsContext.keys().forEach(testsContext);

/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
import config from 'config';

describe('appEnvConfigTests', () => {
  it('should load app config file depending on current process.env.NODE_ENV', () => {
    expect(config.appEnv).to.equal('test');
  });
});

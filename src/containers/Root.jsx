import config from 'config';

const Root = config.appEnv === 'development' ?
  require('./Root.dev').default:
  require('./Root.prod').default;

export default Root;

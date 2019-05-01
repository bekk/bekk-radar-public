import config from 'config';

export default config.appEnv === 'development' ?
  require('./configureStore.dev').default :
  require('./configureStore.prod').default;

import { radarSelector, pointSelector, categorySelector } from './selectors';
import buildTitle from './lib/buildTitle.js';

let previousLocation;
let previousTitle;

export default store => store.subscribe(() => {
  const state = store.getState();
  const radar = radarSelector(state);
  const category = categorySelector(state);
  const point = pointSelector(state);
  const title = buildTitle(radar, category, point);
  const pathname = state.router.location.pathname;

  if(title !== previousTitle){

    document.title = title;

    previousTitle = title;
  }

  if(pathname !== previousLocation){
    previousLocation = pathname;
  }

});

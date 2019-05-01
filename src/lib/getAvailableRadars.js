import hasLocalStorage from './hasLocalStorage';

export const allowedRadars = ['tech2018','tech2017','tech2016','tech2015','tech2014','tech2013'];

export default (radarContainers) => {

  let oldRadars = [
    radarContainers['tech2018'],
    radarContainers['tech2017'],
    radarContainers['tech2016'],
    radarContainers['tech2015'],
    radarContainers['tech2014'],
    radarContainers['tech2013']
  ];

  // Return old radars if no localStorage is available
  if(!hasLocalStorage){
    return oldRadars;
  }

  const radarToShow = JSON.parse(localStorage.getItem('radarToShow'));

  if(!radarToShow || !radarToShow.length){
    return oldRadars;
  } else {

    if(allowedRadars.indexOf(radarToShow) !== -1){
      const radar = radarContainers[radarToShow];
      if(radar){
        return [radar].concat(oldRadars);
      }
    }

    return oldRadars;
  }
};

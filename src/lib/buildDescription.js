import removeMd from 'remove-markdown';

export default (radar, category, point) => {

  if(point) {
    return `${removeMd(point.markdown).replace(/\n/g,'').substring(0,200)}..`;
  } else if (category) {
    return category.tagline;
  } else if (radar) {
    return radar.intro;
  }
  return 'Punktene i radaren er valgt ut med bakgrunn i de utfordringene våre kunder har, erfaringene vi gjør på våre prosjekter, og arbeidet vi gjør i faggruppene våre. Radaren er et bilde av hvordan vi ser på dette landskapet nå, med henblikk på teknologiens potensiale, modenhet og tilgjengelig kompetanse – alt i en norsk kontekst.';
};

[Yarn](https://yarnpkg.com/en/) er et alternativ til NPM og er laget av Facebook. Mye av motivasjonen bak var at NPM har en del svakheter som er spesielt merkbare i store applikasjoner med mange avhengigheter og mange utviklere.

Yarn benytter en yarn.lock-fil hvor alle prosjektets avhengigheter er listet opp med navn, eksakt versjonsnummer og hvor avhengigheten er hentet fra. Den store gevinsten med Yarn er måten alle Yarn-kommandoene jobber med denne fila på, og fører til at oppdateringer skjer gjennom vanlig arbeidsflyt.

Yarn er kompatibel med både NPM-repositoryet og NPM-kommandoene, så det kan direkte erstatte NPM i de aller fleste prosjekter.
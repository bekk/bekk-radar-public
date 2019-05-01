Mange applikasjoner bruker i dag tredjepartsbiblioteker og ‑rammeverk i stor grad. Over tid kan det bli oppdaget sikkerhetsfeil i disse bibliotekene, og metoden for å utnytte dem blir ofte offentliggjort på nettet. Dette kan medføre at applikasjonen din plutselig har et alvorlig sikkerhetshull som det er lett å utnytte.

Vi anbefaler å benytte verktøy som gir automatisk beskjed når det blir oppdaget sikkerhetsfeil i biblioteker og rammeverk man benytter. [OWASP Dependency Check](https://www.owasp.org/index.php/OWASP_Dependency_Check) er et verktøy vi har brukt mye, og som kan integreres med byggserveren.

Siden dagens webapplikasjoner i stor grad kjører på klientsiden i JavaScript, er det også viktig å følge med på sikkerhetsfeil i JavaScript‑biblioteker og ‑rammeverk. Til dette formålet kan man bruke [Retire.js](http://retirejs.github.io/retire.js/), som kan integreres med byggeserveren eller kjøre som en nettleserplugin. Hvis prosjektet ligger på GitHub, kan man også få koden automatisk sjekket ved hjelp av [GitHub Dependency Graph](https://help.github.com/articles/viewing-and-updating-vulnerable-dependencies-in-your-repository/).

Det blir mer og mer vanlig å kjøre applikasjoner i containere, og dermed er det også viktig å ta ansvaret for at programvare som er installert i selve containeren blir oppdatert når det blir funnet sikkerhetsfeil. [Clair](https://github.com/coreos/clair) er et åpen kildekode-verktøy som kan analysere container images for å finne sårbarheter. Dersom man bruker DockerHub, er [Image Scan](https://docs.docker.com/docker-cloud/builds/image-scan/) et alternativ man kan betale for.

Det viktigste er uansett at man får sjekket avhengighetene regelmessig, f.eks. hver natt, slik at man raskt får beskjed om at det har blitt funnet sikkerhetsfeil i koden som kjører i produksjon.



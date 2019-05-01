[Progressive enhancement](https://radar.bekk.no/tech2017/frontend-og-mobil/progressive-enhancement) er en kjent nøkkelfaktor når det gjelder å lage gode løsninger på web. Til nå har det vært utfordrende å bruke nettleseren – som opprinnelig var tiltenkt dokumentvisning – om man har behov for en mer applikasjonsaktig oppførsel og støtte for tjenestebasert funksjonalitet. Det har imidlertid skjedd en rekke nyvinninger innen nettleserteknologier den siste tiden, og disse er med på å dekke manglene som har eksistert.

[ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) er en programmerbar cache for nettleseren som gir et stort løft når det gjelder offline-støtte og også ytelsen på henting av ressurser. ServiceWorker kommer også med muligheten for å kunne registrere kode slik at den kjøres mens nettsiden er lukket. Dette gjør at webapplikasjoner kan kjøre periodiske jobber på lik linje med native mobilapplikasjoner.

[WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) er lettvekts prosesser som kan kjøre CPU-intensive prosesser i en annen tråd enn UI-tråden. Dette gir så et løft i opplevd ytelse. 

[WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) gir muligheter for å integrere webapplikasjoner i nettleseren med kameraer og mikrofoner, notifikasjons-API-er og mye mer.

Disse teknologiene, og den generelle retningen som web-en beveger seg i, gjør at vi ikke lenger er nødt til å gi avkall på det web-en er god på for å lage gode og brukervennlige applikasjoner. Vi kan fortsatt utnytte web-ens overlegne distribusjonsmekanismer, og samtidig få ytelse og funksjonalitet som kan konkurrere med native applikasjoner. Dette samtidig som offline-støtte og tettere integrasjon med hardwaren i enheten følger med på kjøpet.

Dette er relativt ny teknologi, men de fleste moderne browsere har fått på plass støtte for de fleste underliggende API-ene. Google gjør stadige forbedringer for Progressive Web Apps (PWA) på Android-platformen, mens iOS og Safari dessverre begynner å henge etter. Dette gjør at dersom man ønsker å utvikle en rendyrket mobilapplikasjon som en PWA, så må man gi avkall på  iOS-støtte. Når det er sagt, er det viktig å ta med at hele poenget med PWA-er er at webapplikasjonen sin oppførsel ikke ødelegges dersom nettleseren ikke støtter en gitt teknologi. Så for de teknologiene hvor nettleserstøtten er svært variabel innen ulike plattfomer, må man nøye vurdere fallbacks og alternative løsningsmåter. 
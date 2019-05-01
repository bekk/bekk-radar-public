[Node.js](https://nodejs.org/en/) blir mer utbredt for hvert år som går. Store aktører som PayPal, Facebook, Yahoo! og Netflix benytter det til strategisk viktige produkter og tjenester. Node.js tilbyr funksjonalitet som kan gi en del gevinster i forbindelse med web og realtime.

Den største gevinsten er tilgangen på en gjennomprøvd og moden runtime for JavaScript (V8) på serversiden. Dette muliggjør ting som serverside rendering for optimalisering og [progressive enhancement](https://radar.bekk.no/tech2016/frontend-og-mobil/progressive-enhancement) av JavaScript-applikasjoner.

Node.js kan fungere som en proxy mellom webapplikasjonen og resten av baksystemene, som beskrevet i punktet om [Backends For Frontends](https://radar.bekk.no/tech2016/frontend-og-mobil/backends-for-frontends). Den vil da typisk route API-kall en-til-en mot andre baksystemer, og sørge for at ressurser som JavaScript, CSS, HTML osv. blir levert på en god måte. Dette vil gi frontend-utviklerne bedre muligheter til å kontrollere webapplikasjonen på serversiden og utvikle i JavaScript, et språk de kjenner godt.

Andre mulige bruksområder for Node.js kan være å agere som et tynt kompatibilitetslag over legacy-systemer, for å tilby bedre og mer fleksible API-er, eller som en "soft realtime"-komponent, understøttet av førsteklasses støtte for asynkrone primitiver.

Node.js er optimalisert for asynkron IO, og passer derfor ikke for alle typer systemer. Spesielt er CPU-tunge operasjoner lite egnet. Siden JavaScript er et dynamisk scripting-språk med mangel på gode verktøy for å navigere og resonnere rundt kode, passer Node.js dårlig til logikktung kode.

Oppsummert er Node.js en nyttig platform å vurdere i sammenheng med webapplikasjoner, spesielt hvis du har en [microservice-orientert](https://radar.bekk.no/tech2016/arkitektur-og-plattform/mikrotjenester) arkitektur.
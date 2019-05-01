WebAssembly (WA) er webens assembly-språk. "Et portabelt, binært og innlastingseffektivt format" som de sier selv, på webassembly.org, men hva betyr dette?

Portabelt - Binærfiler som kjøres rett i operativsystemet i dag krever ofte at det kompileres for hver eneste versjon av operativsystemet det skal kjøres på. Skal man støtte de vanligste operativsystemene krever det at man kompilerer for win32, win64, mac64, linux32 og linux64 bit.
En WA binær-fil vil kjøre i alle nettlesere, da det er implementasjonen i nettlesereren som sørger for det operativsystemspesifikke.

Binært - I dag leveres JavaScript (JS) til nettleseren i form av tekstfiler. Filene må deretter analyseres og så tydes av nettleseren før den i det hele tatt starter kjøringen av filen. Denne prosessen bruker i dag en god del av tiden det tar å laste inn og vise en side. Med en binær fil kan man i stedet droppe hele dette steget og starte rett på utføringen.

Innlastingseffektiv - Som nevnt i forrige punkt vil dette øke hastigheten man kan laste inn en fil fordi man kan droppe tekst til program-analysen. I tillegg er en binær-fil mye mindre enn en tekstfil, og vil derfor lastes ned over nettet kjappere.

Hvem er dette for?
De fleste kommer aldri til å kode direkte i WA. På samme måte som det klassiske programmeringsspråket Assembly så er også WA veldig lavnivå.
Derimot kommer de fleste til å begynne å benytte seg indirekte av WA, etterhvert som frontend-byggrammeverk som Webpack og Gulp får bedre støtte for å deploye frontendkoden din som .wasm-filer (WA-filer).
Ved hjelp av transpilatorer er det allerede i dag mulig å gjøre om C/C++-programmer til API-er som er kallbare fra JS, noe som gjør det mulig å gjenbruke domenespesifikk logikk på nett uten å skrive om alt til JS.

Det er veldig sikkert at WA har kommet for å bli, men de aller fleste vil nok ikke tenke over det mer enn GZIP'ingen man setter opp i frontend-byggesteget sitt.

Teknologien har allerede fått godt fotfeste i alle moderne nettlesere og er tilgjengelig i eldre nettlesere via fallback polyfill-scripts. Selv om de aller fleste ikke vil trenge å bruke denne teknologien enda, vil det allerede i dag være mulig å få ytelsesforbedringer for tunge applikasjoner i frontend, for eksempel 3D via WebGL eller tyngre kalkulasjoner i nettleseren. Det kan og være at man ønsker å få tilgang på allerede eksisterende C/C++-kode via API-kall i nettleseren. Teknologien er fortsatt ung, men moden nok til å faktisk være nyttig.
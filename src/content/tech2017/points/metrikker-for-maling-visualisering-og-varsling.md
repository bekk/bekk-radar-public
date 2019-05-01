For å oppnå og sikre stabil funksjonalitet og god ytelse må man oppdage unormal oppførsel i applikasjoner og infrastruktur på tvers av tjenester tidlig. Ved å måle ulike metrikker fra applikasjoner, kjøretidsmiljø og infrastruktur over tid, kan man oppdage usunne trender tidlig, og samtidig få verdifull ny innsikt i hvordan applikasjonene faktisk brukes og kjører.

For å få til dette må både applikasjoner og infrastruktur tilby enten uthenting, eller push av metrikker. Disse bør man visualisere slik at man enkelt kan få en oversikt over systemets helhetstilstand, og dermed kan se om systemet har god helse kun med et øyekast. Når man først lager slike metrikker, bør man også definere grenseverdier for de ulike metrikkene slik at man kan koble på automatiserte varslingssystemer. Når man er trygg på at den automatiserte varslingen fungerer vil man slippe å følge med på visualiseringen, men heller kun bruke den for å få et mer detaljert bilde når det varsles om avvikstilstander.

Monitorering og overvåkning er tjenester de aller fleste har bruk for, derfor bør man tilstrebe å bruke standardiserte løsninger fremfor skreddersøm. Forretningsmessige metrikker må man selvfølgelig skrive kode for å måle selv, men for innsamlingen og aggregering av data bør man bruke standardiserte verktøy.

Det finnes mange gode SaaS-løsninger for rapportering av metrikker, og de fleste skyleverandører har tjenester for dette. F.eks. tilbyr AWS tjenesten [CloudWatch](https://aws.amazon.com/cloudwatch/), og kombinert med varslingstjenster som [PagerDuty](https://www.pagerduty.com/) kan man lage gode løsninger for datafangst, grenseverdier, vaktlister og varslinger. Ønsker man å holde metrikkene in-house kan man se på verktøy som [Prometheus](https://prometheus.io/), [Kibana](https://www.elastic.co/products/kibana), [Graphite](https://graphiteapp.org/) og [Grafana](https://grafana.com/).

Når man vurderer hva man skal måle bør man hele tiden tenke forretningsverdi. En varsling som sier at inntektsstrømmen gjennom applikasjonen har falt med 50%, er mye lettere å forstå for flere i bedriften enn en måling som sier at minnebruken har økt med 50%. Målinger av minnebruk er selvsagt viktig og noe man bør ha på plass, men forretningsmessige metrikker blir dessverre altfor ofte glemt da disse metrikkene ofte er mer jobb å sette opp, men de kan være minst like verdifulle.
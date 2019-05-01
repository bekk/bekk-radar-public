Konseptet med å kunne sette opp en virtuell simulert utgave av en fysisk datamaskin har eksistert i mange år, og har vært en svært nyttig abstraksjon både ved utvikling og drift av programvare. Med virtuelle maskiner kan man enkelt sette opp en maskin med kjent maskin- og programvare for å kjøre løsninger på, noe som gjorde livet lettere både for utviklere på sine lokale maskiner og for organisasjoners driftsavdeling.

Infrastructure as a Service tok dette konseptet til skyen, slik at oppsett av maskiner kan gjøres enkelt både manuelt og automatisk med skyleverandørenes uendelige fysiske ressurser i bakhånd. Men selv om serverne nå kjører i skyen må du fortsatt ivareta mange av de samme driftsfunksjonene som før! Det er ditt ansvar å holde hver maskin oppdatert med alt som trengs av OS og programvare. Du må fortsatt sørge for sikkerhetspatching. Du må konfigurere nettverksoppsett for maskinene og de andre komponentene dine, og du trenger å ha et forhold til f.eks. lagring og annen infrastruktur. Kort sagt innebærer IaaS mange av de samme uproduktive oppgavene som å drifte virtualiserte maskiner lokalt, bortsett fra vedlikeholdet av selve hardwaren.

Den tiden der man forholder seg til faktiske maskiner med alt av maskinvare, OS og programvare er imidlertid forbi. Det er langt mer effektivt å bruke plattformtjenester (PaaS) som kjøretidsmiljø, eller sy sammen tjenester og funksjoner gjennom en serverless-arkitektur. Dersom man likevel ønsker mer kontroll over infrastruktur, operativsystem og programvare, er containere veien å gå.
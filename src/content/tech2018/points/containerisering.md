Containerisering vil si å pakke sammen operativsystem og applikasjon i én pakke (container). Applikasjonen kjøres deretter isolert, men ikke i en egen virtuell maskin. Alle avhengighetene applikasjonen trenger eksisterer i containeren.

Containere gir bedre kontroll på miljøet rundt applikasjonen, og gjør det enkelt å kjøre den i et produksjonslikt miljø. Man kan kjøre applikasjonen på forskjellige maskiner uten å måtte tenke på maskinoppsett. Containere gjør det også enklere å bruke prinsippet om engangsinfrastruktur, hvor man kaster den gamle containeren og bygger en helt ny container når man lager en ny versjon av applikasjonen.

Vi i Bekk har tro på containerisering og har god erfaring med det, og vi ser at det forenkler og strømlinjeformer oppsett og oppstart av applikasjonen. Containerisering legger godt til rette for automatisering og et mer effektivt utviklingsløp. Det blir også enklere å teste applikasjonen akkurat slik den kommer til å kjøre i produksjon, noe som vil føre til færre feil.

[Docker](https://www.docker.com/) er en åpen plattform for å bygge, kjøre og distribuere applikasjoner. Den er uten tvil den mest populære systemcontaineren på markedet for tiden. Økosystemet har også vokst de siste årene, med bedre multi-host nettverksstøtte og bedre orkestreringsverktøy som Kubernetes og Rancher.

Vi ser dog at det fortsatt er kjente og ukjente utfordringer sikkerhetsmessig, som sikkerhetsoppdateringer og images med installerte bakdører. Vi synes Docker er vel verdt å bruke, men husk sikkerhetsaspektene.
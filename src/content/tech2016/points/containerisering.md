Containerisering er å pakke sammen OS og applikasjon i en pakke. Applikasjonen kjøres deretter isolert, men ikke i en egen virtuell maskin. Alle avhengighetene applikasjonen trenger eksisterer i containeren. 

Containere gir bedre kontroll på miljøet rundt applikasjonen, og gjør det enkelt å kjøre den i et produksjonslikt miljø. Man kan kjøre applikasjonen på forskjellige maskiner uten å måtte tenke på maskinoppsett. Containere gjør det også enklere å bruke Immutable Servers-prinsippet, hvor man kaster den gamle containeren når man lager en ny versjon av applikasjonen. Man bygger heller en helt ny container når man lager en ny versjon.

Vi har tro på dette, siden det forenkler og strømlinjeformer oppsett og oppstart av applikasjonen. Containerisering legger godt til rette for automatisering og et mer effektivt utviklingsløp. Det blir også enklere å teste applikasjonen akkurat slik den kommer til å kjøre i produksjon, noe som vil føre til færre feil. 

[Docker](https://www.docker.com/) er en åpen plattform for å bygge, kjøre og distribuere applikasjoner. Den er uten tvil den mest populære systemcontaineren på markedet for tiden. Økosystemet har også vokst det siste året, med bedre multi-host nettverksstøtte og mange alternativer for automatisering av clustere.

Vi ser dog at det fortsatt er kjente og ukjente utfordringer sikkerhetsmessig, som sikkerhetsoppdateringer og images med installerte bakdører. Vi synes Docker er vel verdt å bruke, men husk sikkerhetsaspektene.
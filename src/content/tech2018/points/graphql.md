[GraphQL](http://graphql.org/) er et svar på at mange API-er har vokst seg store og trege, typisk fordi de returnerer store responsobjekter og krever mange API-kall for å utføre en transaksjon. GraphQL eksponerer typede data gjennom ett endepunkt, og lar API-konsumenter hente nøyaktig de feltene og objektene de ønsker i ett enkelt kall. Dokumentasjon av API-et genereres automatisk, og muliggjør validering og kodefullføring (autocomplete) av spørringer i frontend. GraphQL er agnostisk til underliggende teknologier, og har klientbiblioteker for et titalls programmeringsspråk.

Responstiden er ofte mer utslagsgivende for interaksjon med webapplikasjoner enn det vi gjerne velger å tro. GraphQL hjelper til med å redusere responstid, delvis ved å minimere antall forespørsler, og dels ved å redusere størrelsen på disse. 

Fleksibiliteten i responsen fra et GraphQL-API understøtter raske endringer i frontend og støtter brukstilfeller der man ikke kjenner konsumentenes behov i detalj ved design av API-et. Ettersom det er konsumentens ansvar å definere responsens innhold minimeres den implisitte koblingen mellom ulike konsumenter. 

Den automatisk genererte dokumentasjonen, og kodefullføringen for frontendutviklere, senker samtidig mengden kommunikasjonsoverhead mellom frontend- og API-utviklere.

GraphQL kan gi store fordeler om man har større team, bruker datamodeller med høy grad av relasjoner, eller har API-er med mange ulike konsumenter. I andre tilfeller kan tradisjonelle API-er fungere like godt.
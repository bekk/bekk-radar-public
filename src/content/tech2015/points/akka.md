Akka gir deg Actors på Java plattform. Actors er et programmeringsparadigme som ble kjent via språket Erlang og som blant annet gir god støtte for asynkronitet, robusthet og concurrency.

Actors kan kort sies å være innkapslinger av tilstand i enheter som gjør meldingsutveksling og som har en eksplisitt og detaljert livssyklus-håndtering.

Akkas API fungerer meget godt sammen med Java eller Scala, og kan spesielt anbefales dersom man har standardisert på Java og ikke kan bruke Scala men har mulighet til å kjøre på Java 8. Det finnes også en .NET-implementasjon av APIet.

Om man har erfaring fra klassisk objekt-orientering kan det ta litt tid å komme ordentlig inn i asynkronitet og bruk av actor-hierarkier. Måten man må utvikle på endrer seg en del, og det å bruke konseptene slik at man utnytter - og ikke motarbeider - rammeverket krever litt trening.

I BEKK brukes Akka i en hel del prosjekter, og vi har gode erfaringer med hvordan ytelse, skalerbarhet og robusthet har blitt - også i tildels komplekse clustrede applikasjoner.
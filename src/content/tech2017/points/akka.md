[Akka](http://akka.io/) gir deg Actors på Java-plattformen. Actors er et programmeringsparadigme som ble kjent via språket [Erlang](https://www.erlang.org/), og som blant annet gir god støtte for asynkronitet, robusthet og concurrency.

Actors kan kort sies å være innkapslinger av tilstand i enheter som gjør meldingsutveksling, og som har en eksplisitt og detaljert livssyklus-håndtering.

Akkas API fungerer meget godt sammen med Java eller Scala, og kan spesielt anbefales dersom man har standardisert på Java og bruker Java 8. Det finnes også en .NET-implementasjon av API-et.

Om man har erfaring fra klassisk objektorientering kan det ta litt tid å komme ordentlig inn i asynkronitet og bruk av actor-hierarkier. Måten man utvikler på endrer seg en del, og det å bruke konseptene slik at man utnytter, og ikke motarbeider, rammeverket krever litt trening og erfaring.

I BEKK brukes Akka i noen prosjekter, og vi har gode erfaringer med hvordan ytelse, skalerbarhet og robusthet har blitt – også i tildels komplekse clustrede applikasjoner. Blant annet har vi erfart at Akka passer bra til innsamling av store datamengder, hvor Akka er effektiv til å håndtere og distribuere store meldingsstrømmer. Actor-systemet til Akka passer også fint på serverside som utgangspunkt for å sende push-meldinger til nettleser (via websockets, long polling eller lignende).
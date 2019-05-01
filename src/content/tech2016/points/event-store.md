[Event Store](https://geteventstore.com/) er en _append only_-database for lagring av hendelser. _Append only_ betyr at data som er skrevet til databasen ikke kan endres. 

En av de største fordelene med en append only-database er at man har en 100% korrekt revisjonslogg. I scenarier der man trenger dette, er Event Store et svært godt alternativ. 

Andre fordeler som kommer med Event Store, er innebygd [atom feed](https://radar.bekk.no/tech2016/arkitektur-og-plattform/atom-feeds) for hendelsesstrømmer, mulighet til å sette opp projeksjoner basert på andre strømmer og et enkelt json API.

Hvis man bruker Event Store i kontekst av [event sourcing](http://martinfowler.com/eaaDev/EventSourcing.html), får man også en fordel ved at man, i større grad enn ved tradisjonell lagring til SQL-database, blir tvunget til å faktisk definere hva applikasjonen skal gjøre. Skal man f.eks. registrere at en kunde har flyttet, ville man i et slikt system ha definert en hendelse som forteller at kunden har flyttet. Hendelsen gir langt mer informasjon enn en tradisjonell løsning der man bare endrer informasjonen direkte.
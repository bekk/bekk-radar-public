Polyglot lagring handler om å bruke det beste verktøyet for å løse et gitt behov. Relasjonelle databaser og SQL har lenge vært standarden for lagring, men utviklingen på internett og nye bruksområder har ført til krav som en tradisjonell relasjonsdatabase har utfordringer med å tilfredsstille. Å velge en data- og lagringsmodell laget spesifikt for applikasjonens behov, gjør at man unngår kompromisser.

Vi ser det som utfordrende å benytte flere ulike databaser i samme applikasjon. Men en moderne [mikrotjenestearkitektur](https://radar.bekk.no/tech2016/arkitektur-og-plattform/mikrotjenester) består av flere applikasjoner, som kan ha ulike krav til datamengde, datastruktur, responstid og endringshyppighet. Da er det naturlig å velge ulike databaseløsninger for applikasjonene.

På bakgrunn av dette har vi lite tro på alt-i-ett løsninger som [ArrangoDB](https://www.arangodb.com/) og [OrientDB](http://orientdb.com/orientdb/). Dette er databaser som er laget for å tilfredstille alle behov for en større applikasjon.

Vi anbefaler å benytte [Cassandra](http://cassandra.apache.org/) dersom man har store mengder data og ønsker høy redundans.
Vi anbefaler [Neo4j](http://neo4j.com/) dersom man ønsker en rask og velprøvd grafdatabase.
Vi anbefaler [Redis](http://redis.io/) dersom man har behov for en liten og rask database med mindre krav til lagringssikkerhet.
Vi anbefaler [MongoDB](https://www.mongodb.org/) dersom man har behov for en dokumentdatabase.
Vi anbefaler [Elastic Search](https://www.elastic.co/) dersom man har behov for en søkemotor/enkel dokumentdatabase.

Vi ser at polyglot lagring er en løsning for fremtiden, og flere prosjekter har allerede høstet gode erfaringer. Likevel er det viktig å fortsatt trå varsomt, og at utviklere og driftere har god kompetanse på løsningene før man benytter dem i applikasjonene.
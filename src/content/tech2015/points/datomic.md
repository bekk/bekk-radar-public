Arkitekturen til de fleste databasene som brukes kommer fra en tid der lagringsplass og minne var veldig dyrt. Disse gamle restriksjonene påvirker fortsatt i stor grad hvordan vi utvikler og designer applikasjoner. Prisen av disk og minne er en liten brøkdel av det det engang var. Likevel er måten vi lagrer data på i stor grad den samme. 

Datomic ble introdusert i 2012 og har en fundamentalt forskjellig måte å tenke på data enn tradisjonelle databaser. I Datomic er all data immutable, noe som betyr at de ikke kan endres. Klientene mellomlagrer også dataene lokalt i hver applikasjon, noe som gjør at spørringene kjøres lokalt på applikasjonene og ikke nødvendigvis tilfører last til lagringsbackenden.

I Datomic vil man alltid legge til nye fakta og aldri endre eller slette det som allerede finnes. Immutability fører i mange tilfeller til sikrere og mer vedlikeholdbare applikasjoner og disse har nå kommet til databaseverden med Datomic. Immutable egenskaper, kombinert med et kraftig spørrespråk, gjør Datomic til en database som i høyeste grad bør vurderes.
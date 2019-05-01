En logg-aggregator samler informasjonen fra applikasjons- og serverlogger fra  forskjellige maskiner, applikasjoner og miljø. Loggene sammenstilles, vises og er søkbare fra et felles dashboard, noe som gir muligheter for å finne feil raskt og effektivt. Tradisjonelt sett logger applikasjoner til fil, men mulighetene disse råloggene gir er begrenset. Ofte er loggene applikasjonens eneste mulighet til å si fra om hva som har skjedd i produksjon, og en logg-aggregator er et viktig verktøy når det oppstår feil i produksjon og gjør det mulig å respondere raskt. Spesielt i prosjekter med mange applikasjoner, eller i prosjekter med en micro-service arkitektur, er et logg-aggregeringsverktøy en nødvendighet.

En logg-aggregator har mange bruksområder og man kan tilpasse visningen til forskjellige bruksområder som overvåkning, debugging, feilsøking, eller statistikk og trendanalyser. Vi har hatt god erfaring med logg-aggregatorer i flere prosjekter som har applikasjoner med hundretusenvis av brukere hver dag. 

Splunk er et godt produkt som er enkelt å sette opp og konfigurere, men har en aggressiv lisensieringsmodell. Det finnes veldig gode, open-source alternativer, og en vanlig teknologistack er Elasticsearch, Logstash og Kibana (ELK). Vi har flere prosjekter som bruker ELK som logg-aggregator og har god erfaring med disse produktene.
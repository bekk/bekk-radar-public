En logg-aggregator samler informasjon fra applikasjons- og tjenestelogger fra ulike miljøer. Formålet med en aggregator er å få oversikt over alle hendelser i et sett med tjenester på én plattform, gjennom et dashboard. I tillegg til å gi muligheter for å finne feil og informasjon langt raskere og mer effektivt enn ved tradisjonell logging til fil, oppnår man bedre oversikt over tilstanden til en applikasjon/tjeneste over tid. Spesielt i prosjekter med mange applikasjoner eller i en mikrotjenestearkitektur er et logg-aggregeringsverktøy en nødvendighet.

Logg-aggregatorer har mange bruksområder, og visningen kan tilpasses ulik bruk som overvåkning, debugging og feilsøking, eller statistikk og trendanalyser. Ved å sette opp alarmer som trigges når noe unormalt har skjedd i loggene, kan man også reagere raskt når feilsituasjoner oppstår. Vi har hatt god erfaring med logg-aggregatorer i flere prosjekter som har applikasjoner med hundretusenvis av brukere hver dag.

Det finnes flere produkter som fungerer som logg-aggregatorer, både on-premises og SaaS-løsninger. [Splunk](https://www.splunk.com/) er et godt verktøy som er enkelt å sette opp og konfigurere, men har en aggressiv lisensieringsmodell. [Elastic-stacken](https://www.elastic.co/products) (Elasticsearch, Logstash og Kibana) er et godt åpen-kildekode-alternativ. Denne stacken tilbys også som en skyløsning sammen med AWS (Amazon Web Services). Andre alternativer som bør vurderes er [Papertrail](https://papertrailapp.com/) og [Loggly](https://www.loggly.com/).
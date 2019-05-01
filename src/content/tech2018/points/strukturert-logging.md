Logger blir i stadig mindre grad lest direkte fra fil, og i stadig større grad lest med verktøy som Splunk, Elastic Stack (tidligere ELK), eller liknende. Disse tilbyr overlegen mulighet til søking, filtrering, visualisering og utregning av statistikk basert på loggene, og blir enda kraftigere med mer kontekst enn bare tidspunkt og melding. For eksempel kan man finne alle meldinger tilhørende hvert API-kall vha. correlation ID. Eller hente ut request-URI-en til alle kall som tok mer enn 2 sekunder ved å ha felter for tidsforbruk og URI i aksess-loggen. Hva med en graf som viser hvor mye penger som kommer inn ved å logge totalbeløp for en ny ordre? 

Strukturert logging er på det enkleste et maskinlesbart format som kan tolkes som separate variabler som blir konteksten til loggmeldingen. En enkel variant er en sekvens av KEY=VALUE før loggmeldingen, mens det kraftigste er et helt strukturert format som JSON. Her er det lurt å se hva ditt eksisterende loggrammeverk kan tilby. Slike strukturer vil være mindre skjøre for endring enn f.eks. parsing med regex, og det blir også mindre jobb.

For eksempel kan man logge dette:
```
TIMESTAMP="2017-12-12 15:00:05.000", LEVEL="INFO", ELAPSED_TIME="563", REQUEST_URI="/", CODE="200" Request processed
```
i stedet for: 
```
2017-12-12 15:00:05.000 INFO -- Request for '/' processed with status-code 200. Took 563ms
```

Noen felter som alltid kan ha høy verdi å logge til konteksten er hostnavn, applikasjonsnavn, versjon, miljø og logger-name. På naturlige steder, som i databasekall og eksterne/interne tjenestekall, er det praktisk å logge forbrukt tid til visualisering eller enkel profilering av ytelse. Utover dette er det bare fantasien som setter grenser.
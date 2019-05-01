Tradisjonelt har man behandlet store datamengder gjennom batch-kjøringer. Man importerer data for deretter å analysere de, eller man gjør begge deler i samme operasjon. Dette er tunge jobber som krever mye minne og tar lang tid.

En annen måte å angripe denne utfordringen på er å benytte streaming. Avhengig av bruksområde kan dette løses på ulike måter. Import og tildels analyse kan kjøres som agenter, som f.eks. i Akka. Agenter muliggjør stor samtidighet og høy ytelse. Dette har vi god erfaring med gjennom flere prosjekter.

Analyse kan også løses gjennom streaming. Utfordringen er at nøyaktigheten ofte ikke blir like god som i batch-kjøringer. Dette kan man løse ved å benytte en kombinasjon av streaming og batch. En streaming-løsning som gir resultater basert på oppdaterte data, og en batch-løsning som gir nøyaktige resultater basert på gamle data.

Vi anbefaler Akka, Apache Storm eller Spark Streaming, evt Apache Samza dersom du har bruk for de egenskapene dette gir.
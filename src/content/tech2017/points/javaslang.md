**Beskrivelse**
Javaslang er et Java-bibliotek som er laget for å rette på feil og brister i Java 8, samt gi Java-utviklere tilgang til Scala sine egenskaper. 
Alle collections i Javaslang er immutable og persistente, så man behøver ikke å konvertere til en stream for å kalle metoder som map, filter og lignende. Det er heller ikke nødvendig å kjøre collect. Collections i Javaslang kan konverteres fra og til Java-collections, men det kan være litt slitomt å bruke dem ved siden av hverandre da de har samme navn. F.eks. java.util.List og io.javaslang.List.
Try og Either er nyttige for flyt kontroll, og gjør det eksplisitt i type-systemet at et resultat, typisk med side-effekter, kan feile. De gjør det også enkelt å håndtere sideeffekter i flyter, og passer veldig bra sammen med streams.
I tillegg til disse får man også støtte for Option, Tuples, Matching og Currying.
Javaslang har et godt momentum. Dette skyldes særlig at Scala-utviklere, som gjerne skulle programmert Scala, får tilfredstilt en del av sin Scala-hunger gjennom Javaslang. I tillegg har Java 8 ført til at Java-utviklere ønsker å programmere mer funksjonelt.
Man merker hvor godt Javaslang fungerer dersom man senere møter på Java sitt collection-api. Man har heller ikke brukt Option eller Tuples lenge før man ikke forstår hvordan man klarte seg uten. Alternativet til Javaslang er å utvikle egne api-er for dette, men all historikk viser at dette ikke er heldig. 

En siste fordel med Javaslang er at man lærer seg ordentlig funksjonell programmering. Dette vil gjøre overgangen til andre funksjonelle språk enklere.

***Linker***
http://www.javaslang.io/ - Hjemmesiden med dokumentasjon
https://git.io/vSmrk - Besvarelser på Knowits julekalender 2016 implementert med Javaslang.


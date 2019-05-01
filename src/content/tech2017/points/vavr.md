[Vavr](http://www.vavr.io), tidligere Javaslang, er et Java-bibliotek som er laget for å rette på en del mangler og svakheter i Java 8, samt gi Java-utviklere tilgang til Scala sine egenskaper.
 
Alle collections i Vavr er immutable og persistente, så i motsetning til i Java 8, behøver man ikke å konvertere en collection til en stream for å kalle metoder som map, filter og lignende. Det er heller ikke nødvendig å kjøre collect. Collections i Javaslang kan konverteres fra og til Java-collections, men det kan være litt slitomt å bruke dem ved siden av hverandre da de har samme navn. F.eks. `java.util.List` og `io.vavr.List`.

Try og Either er nyttige for flytkontroll, og gjør det eksplisitt i type-systemet at et resultat, typisk med side-effekter, kan feile. De gjør det også enkelere å håndtere sideeffekter i flyter, og passer veldig bra sammen med Vavr sine collections og Java 8-streams. I tillegg til disse får man også støtte for Option, Tuples, Matching og Currying.

Vavr har et godt momentum. Dette skyldes særlig at Scala-utviklere, som gjerne skulle programmert Scala, får tilfredsstilt en del av sin Scala-hunger gjennom Vavr. I tillegg har Java 8 ført til at Java-utviklere ønsker å programmere mer funksjonelt.

Man vil typisk merke hvor godt Vavr fungerer dersom man har brukt verktøyet en stund og så møter på Java sitt standard collection-API. Man skal heller ikke ha brukt Option eller Tuples lenge før det vil være vanskelig å se hvordan man klarte seg uten. Alternativet til Vavr er å utvikle egne APIer for dette, men all erfaring viser at dette ikke er heldig pga. vedlikeholdskostnaden det utløser og også risikoen for feil. 

En siste, men viktig fordel med Vavr er at man lærer seg ordentlig funksjonell programmering, noe som vil gjøre overgangen til andre funksjonelle språk enklere.
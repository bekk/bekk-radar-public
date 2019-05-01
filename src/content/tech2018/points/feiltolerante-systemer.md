Man må regne med at ting går galt noen ganger. Spesielt i en mikrotjenestearkitektur, og ellers hvis man har mange runtime-avhengigheter, kan det få store konsekvenser for brukeropplevelsen og systemet generelt hvis en tjeneste er nede. For å minimere konsekvensene av nedetid bør vi designe appene våre slik at de tåler at en tjeneste går ned, og de må da forsøke å levere som best de kan uten denne tjenesten.

Det finnes flere gode biblioteker som støtter oppunder målet om robuste og feiltolerante systemer, for eksempel [Hystrix](https://github.com/Netflix/Hystrix).

Vi anbefaler at du:

- Setter deg godt inn i hvilke timeoutmekanismer som finnes i bibliotekene du bruker. Databasetilkoblinger og trådmekanismer er et bra sted å begynne.
- Vurderer [circuit breaker](https://martinfowler.com/bliki/CircuitBreaker.html)-patternet ved integrasjonpunkt.
- Vurderer [bulkheads](https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead) om du har flere konsumenter av en tjeneste og det er viktig at disse ikke ødelegger for hverandre ved høy last.
- Setter deg inn i skaleringsmulighetene i driftsplattformen din.

Kilder:

- ["Release It! Second Edition"](https://pragprog.com/book/mnee2/release-it-second-edition) av Michael T. Nygard 

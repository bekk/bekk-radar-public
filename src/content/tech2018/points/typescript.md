**Beskrivelse**
Typet supersett av javascript som kompilerer til javascript

**Begrunnelse**
Sterk typing på klient reduserer faren for potensielle bugs.

**Ansvarlig for beskrivelse**


## Beskrivelse for punktet "Typet Javascript" fra 2017

Når en frontend-kodebase vokser kan det være nyttig å ha et statisk typesystem å støtte seg på for å unngå unødvendige runtime-feil. Et statisk typesystem fører også til at man kan få avansert støtte for autocomplete og for refaktorering av kode, noe som gir økt utviklingshastighet.

TypeScript fra Microsoft og Flow fra Facebook er teknologier som muliggjør statisk typesjekking av JavaScript-kode. Begge har en viss grad av typeinferens, og de tilfører muligheter for å skrive typeannotasjoner på funksjoner og verdier og å beskrive typer/interfacer. Begge verktøyene kan enkelt integreres i din eksisterende frontend-byggeprosess: Flow kjøres ved hjelp av Babel, mens TypeScript har sin egen kompilator. Både Flow og TypeScript er rene supersett av JavaScript, noe som betyr at gyldig JavaScript også er gyldig Flow/TypeScript.

Begge teknologiene støtter gradvis innføring av statisk typing i eksisterende kodebaser gjennom å være supersett av JavaScript. I tillegg kan man lage definisjonsfiler for JavaScript-moduler. TypeScript har et stort fellesskap rundt dette, og det finnes definisjonsfiler for de aller fleste kjente JavaScript-biblioteker.

En ulempe med TypeScript og Flow er at man er avhengig av at det lages støtte for nye features i JavaScript. Begge verktøyene har som mål å holde tritt med det nyeste endelige i ECMAScript-standarden (stage 4), men denne utviklingstakten kan føles treg hvis man er vant til å bruke Babel med for eksempel stage 2 eller stage 3. I større, langtlevende prosjekter kan dette også sees på som en fordel ved at man ikke bruker språkegenskaper som kan endre seg.

Vi i BEKK mener at typet JavaScript kan være et nyttig verktøy i prosjekter med store kodebaser, eller stort antall utviklere. Koden vil få tilført verdifull dokumentasjon gjennom typeinformasjonen, og terskelen og risikoen for å refaktorere eksisterende kode er lavere på grunn av kompilatorhjelpen en får.
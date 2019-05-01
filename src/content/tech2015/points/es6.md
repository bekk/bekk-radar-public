ES6 (endrer navn til ES2015) er neste iterasjon av ECMAScript-standarden som JavaScript er en implementasjon av. Standarden er i Release Candidate form nå og det finnes primært tre kategorier av nye features: Syntaktisk sukker, nye API-er og nye språkkonstruksjoner. Nye API-er (f.eks Promises) har alt vært brukt via biblioteker og polyfills en stund.

Syntaktisk sukker, eksempelvis destructuring og fat-arrows kan trygt tas i bruk da det finnes gode verktøy for å konvertere dette til standard ES5-kompatibel kode (f.eks Babel), i tillegg til at flere nye nettlesere allerede har innebygget støtte for dette.

Språkendringer som Map/Set/WeakMap/WeakSet, generators/iterators, symboler og tail-call recursion, er mer usikre, da disse krever store runtimes for å kjøre og ikke alle har gode implementasjoner. Kostnaden kan være for stor for utbyttet og bruk av disse bør derfor vurderes nøye.

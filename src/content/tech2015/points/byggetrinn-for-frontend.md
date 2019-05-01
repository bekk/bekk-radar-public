Alle JavaScript-applikasjoner må idag gjennom et byggetrinn, enten det bare er for å minifisere koden eller om det er større oppgaver, som for eksempel å transpilere TypeScript eller ES6, kjøre tester eller linte koden. Det har kommet en rekke verktøy de siste årene, hvorav de mest kjente er Grunt og Gulp. Vi har hatt positive erfaringer med begge.

Vi mener et viktig poeng er å kjøre koden under utvikling så nært som mulig til slik den vil kjøres i produksjon. Med watching av fil-endringer i byggeprosessen er det relativt smertefritt å kontinuerlig bygge en fil som ser lik ut i utvikling og produksjon, slik at du kan føle deg sikker mens du utvikler. En annen mulighet for watching er å kjøre testene hver gang du gjør kode-endringer. Da kan du kontinuerlig se status på testene.

Samtidig vil vi påpeke at det er viktig å holde byggetrinnet enkelt, så det ikke blir for mye magi.

Vi anbefaler å bruke JavaScript-baserte verktøy til bygging av JavaScript-applikasjoner, altså verktøy som kan kjøres fra Node.js eller io.js. For å få JavaScript-byggingen inn som en del av byggesteget for resten av applikasjonen din, finnes det i dag flere gode alternativer. Ett alternativ vi har brukt med stor suksess på flere prosjekter er frontend-maven-plugin.

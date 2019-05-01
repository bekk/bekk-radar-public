React er laget av Facebook, og har vokst raskt i popularitet gjennom det foregående året. Biblioteket brukes for å utvikle brukergrensesnittet i javascript-applikasjoner, gjerne som V-en i et MVC-rammeverk, eller med Flux-arkitekturen til Facebook. 

I motsetning til større js-rammeverk som Angular kan React tas i bruk på deler av applikasjonen, uten å kreve at hele applikasjonen benytter seg av React. Med React bygger man små gjenbrukbare komponenter med en deklarativ tilnærming - en uttrykker hvordan applikasjonen skal se ut, heller enn hvilke DOM-operasjoner som er nødvendige for å oppnå det man ønsker.

Gjennom å generere midlertidige DOM-noder i JavaScript og benytte en diff-algoritme, kan React beregne om det i det hele tatt trenger å gjøre en endring i DOM-en når data forandrer seg og hva som er den minimale endringen som skal til. Slik sett abstraherer man bort DOM-en og oppnår samtidig svært god ytelse.

Den deklarative tilnærmingen inspirert av funksjonell programmering oppleves som svært nyttig i utviklingen av komplekse grensesnitt.
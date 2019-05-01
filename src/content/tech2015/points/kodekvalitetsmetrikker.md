Kvalitetsmetrikker for kode kan være verdifulle når de brukes riktig. Automatiserte sjekker og rapporter kan raskt og effektivt gi oversikt over store kodebaser og avdekke svakheter eller risiko i struktur, logikk og syntaks.

Det er imidlertid viktig å bruke slike rapporter på riktig måte. De kan ta tid å sette opp og konfigurere på en måte som sikrer at problemer fanges opp uten at man får falske positiver.

Et viktig aspekt er hvordan rapportene benyttes. For å skape verdi må resultater fra rapportene tas med som innspill til den kontinuerlige prosessen det er å utvikle og forbedre kode. Vi har i en del tilfeller erfart at det stilles krav til å sette opp slike rapporter, men at de i liten grad blir lest. Det kan også være vanskelig å konfigurere verktøyene (Sonar, PMD, Checkstyle, Findbugs) godt nok til at rapportene fungerer som en pålitelig kilde.

Metrikker kan brukes til å komplettere den menneskelige delen av kodegjennomganger, men vi anbefaler å kombinere dette med tradisjonell code-review og spesielt pull requests etter modell fra GitHub.
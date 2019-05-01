Ende-til-ende-tester sjekker at applikasjonen din fungerer som den skal på et høyere nivå enn enhetstester, og uten å fokusere for mye på hvordan den er laget.

[Monitorering og hyppig deploy](https://radar.bekk.no/tech2016/prosess-og-kvalitet/monitorering-og-hyppig-deploy-fremfor-uttommende-testing) kan imøtegå mye av behovet for omfattende testing. Likevel kan det være relevant å sette opp automatiske ende-til-ende-tester for å verifisere at oppførsel er riktig og ikke ødelegges ved endringer. 

Vi har både gode og dårlige erfaringer med å teste hele applikasjoner automatisert, inkludert databasen. Det er derfor viktig å finne en god fremgangsmåte for å definere og kjøre slike tester. Applikasjonen bør kunne testes i isolasjon, og aller helst som en del av byggeprosessen uten avhengigheter til et eksisterende kjøretidsmiljø. Dette kan f.eks. gjøres ved at kommunikasjon med andre applikasjoner simuleres, og ved å sette opp en dedikert, midlertidig databaseinstans.

Testing gjennom GUI er også ofte vanskelig å vedlikeholde og bør vurderes nøye. Et bedre alternativ kan derfor være å benytte API-er, f.eks. applikasjonens REST-grensesnitt, for å drive testen fra et brukerperspektiv.
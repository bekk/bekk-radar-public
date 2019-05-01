Når alle team-medlemmer tar eierskap til og er observante på sikkerhetsutfordringer i det daglige arbeidet man gjør, da har man en fungerende sikkerhetskultur. For å bygge sikre løsninger er dette nødvendig. Det holder ikke å bare ha en sikkerhetsekspert på et eller annet ansvarsnivå i organisasjonen. Alle bør i stedet ta del i ansvaret og gjøre sitt beste i å se alle endringer fra et sikkerhetsperspektiv – uavhengig av kompetansenivå.

Her er noen ting man bør være ekstra bevisst på:
- Autentisering og autorisasjon, og tilgang til data
- Input fra bruker, datasanering (f.eks. SQL injection, cross-site scripting)
- Bruk av biblioteker og rammeverk som potensielt kan inneholde sårbarheter
- Trengs det en [risikovurdering](https://www.datatilsynet.no/regelverk-og-skjema/behandle-personopplysninger/risikovurdering/)?

I tillegg er [OWASP Top 10](https://www.owasp.org/index.php/Top_10-2017_Top_10) et fint hjelpemiddel.  

Det er viktig at alle har kjennskap til nettverkskommunikasjon, og at dette skjer på en sikker måte. Man trenger ikke ha dybdekunnskap om TLS og https. Det er en fin start bare å få seg en liten oversikt over hvordan sikker kommunikasjon er konfigurert, hvilke cipher suites som tillates, og kanskje vurdere om ting er satt opp etter dagens anbefalinger. Når går sertifikater ut, og hvordan er prosessen for å bytte ut disse?

For å automatisk detektere om det offentliggjøres sårbarheter i avhengigheter man bruker bør [OWASP Dependency-Check](https://www.owasp.org/index.php/OWASP_Dependency_Check) legges inn som en del av det automatiserte bygget.

Man kan ikke garantere at man alltid lager sikre løsninger, men en kultur og eierskap til sikkerhetsutfordringer kan betraktelig minske risikoen for at sikkerhetshull går ut i produksjon. I tillegg gir det økt sikkerhetskompetanse og -fokus hos alle. Akkurat som med leveranser har også _kontinuerlig_ sikkerhetsfokus den positive effekten av å bidra til systemer med mindre feil.
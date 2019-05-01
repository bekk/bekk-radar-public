Gjennom årene har vi gjennomført mange prosjekter basert på ulike komponentbaserte serverside-rammeverk og teknologier. Eksempler på dette er Wicket og JSF i Java, Web Forms for .NET, og Lift i Scala. 

Komponentbaserte serverside-rammeverk gjør et forsøk på å abstrahere bort mye av hvordan web-en egentlig fungerer, f.eks. http og request/response-flyten. Dersom man skal feilsøke, eller utvikle ting rammeverket ikke støtter "ut av boksen", må man likevel ofte forholde seg til, og forstå, det som er forsøkt abstrahert bort.

En annen utfordring med bruk av rammeverkene er at de gir tett binding mellom frontend og backend. Dette gjør det vanskelig å ha ulik endringstakt på de ulike delene av applikasjonen og det blir problematisk å oppgradere/bytte ut frontend-rammeverket uavhengig av backend.

Vi vil anbefale å avstå fra komponentbaserte serverside-rammeverk når man starter på nye prosjekter. I tillegg anbefaler vi å migrere gamle applikasjoner som er bygget på denne type rammeverk over til en mer moderne og fremtidsrettet arkitektur, som f.eks. JavaScript som frontend, og REST API-er som backend.
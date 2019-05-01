På flere av våre prosjekter blir det benyttet interne, egenutviklede rammeverk. Rammeverkene skal håndtere for eksempel sikkerhetsoppsett, integrasjon, batchfunksjonalitet og logging. Bakgrunnen for at en del har slike egenutviklede rammeverk er å unngå å duplisere kode på tvers av mange applikasjoner, og å standardisere hvordan man løser ulike utfordringer på tvers av team. Ofte stilles det krav om at alle applikasjoner skal benytte rammeverket. 

Disse rammeverkene er ofte omfattende, og setter et stort fotavtrykk i applikasjonene som bruker dem. De drar dessuten vanligvis med seg en del transitive avhengigheter, noe som kan legge begrensninger på hvilke versjoner av disse avhengighetene som du kan benytte i applikasjonen din. Man kan for eksempel risikere at man ikke kan oppgradere til en nyere versjon av et bibliotek fordi det kommer i konflikt med versjonen som brukes i det interne rammeverket. 

Å forvalte et rammeverk og holde det oppdatert krever mye proaktivt arbeid. Ofte har man ikke tilstrekkelige ressurser til å forvalte rammeverket aktivt, og da ender rammeverket fort opp med å hindre utvikling i applikasjonene som bruker det. 

Vi anbefaler at man unngår å utvikle eller benytte egne, interne rammeverk. Hvis det er helt nødvendig å tilby en felles løsning for et teknisk behov kan man vurdere å lage et lite og gjenbrukbart bibliotek som kun er for det konkrete behovet og som er frivillig å bruke. I så fall bør man ha et svært bevisst forhold til scoping av avhengigheter, og man kan gjerne lage biblioteket som et [opensource-prosjekt](https://radar.bekk.no/tech2018/prosess-og-kvalitet/dele-kildekode) slik at andre også kan benytte det og bidra til å gjøre det bedre. 
Håndtering av passord og hemmeligheter er utfordrende. Særlig når disse skal benyttes i automatiserte prosesser som bygging, kontinuerlig integrasjon og deployment. Passord bør være unike for hver tjeneste og bruker, og de bør kunne deles mellom medlemmer av team uten at teammedlemmene trenger å bruke et felles master-passord. Hvert teammedlem bør ha et unikt og personlig passord for å få tilgang til delte hemmeligheter.

I rammeverk som [pass](https://www.passwordstore.org/) og [gopass](https://www.justwatch.com/gopass/) lever hver hemmelighet i en [gpg](https://www.gnupg.org/)-kryptert fil hvor filnavnet kan være navnet på web-siden eller ressursen som krever passordet. De krypterte filene kan organiseres i meningsfulle hierarkier, kopieres fra maskin til maskin, sjekkes inn i kildekodekontroll og generelt leses og endres med standard filhåndteringsverktøy på kommandolinjen. Hver fil kan krypteres med et sett av offentlige gpg-nøkler som muliggjør at hver person som skal ha tilgang kan benytte sin private nøkkel for å dekryptere hemmelighetene. Når et nytt team-medlem kommer til, legges dennes offentlige nøkkel til, og hemmelighetene rekrypteres. Når noen slutter, fjernes den offentlige nøkkelen og det rekrypteres uten denne.

I og med at hemmelighetene kan aksesseres ved hjelp av kommandolinjeverktøy, er det lett å lage skript for automatiserte prosesser som  trenger tilgang til passordene.

For øvrig opplever vi at security keys fra leverandører som f.eks. [Yubico](https://www.yubico.com), brukes i stadig større utstrekning for å gpg-kryptere hemmeligheter. Fordelen med slike er at sikkerheten er overlegen sammenlignet med filbaserte gpg-nøkler. Samtidig kan de ofte benyttes som [U2F-device](https://en.wikipedia.org/wiki/Universal_2nd_Factor) for å få tilgang til admin-konsoller i skyplattformer.
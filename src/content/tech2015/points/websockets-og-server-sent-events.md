Med WebSockets kan vi opprette en toveis kobling mellom nettleser og server. Dette gjør at vi blant annet kan sende data fra serveren til nettleseren idet data endres. Vi har sett at WebSockets kan muliggjøre en rekke nye features, og ettersom IE10 nå har fått full støtte for WebSockets, er denne funksjonaliteten kompatibel med alle vanlige nettleser. Vi har stor tro på WebSockets og bruker det på flere prosjekter.

Infrastrukturen mellom ytre brannmur og applikasjonsserver kan i noen tilfeller utløse problemer ved bruk av WebSockets, spesielt oppsett av reverse proxy eller selve applikasjonsserveren. Feil eller manglende støtte her kan bli omfattende å feilsøke. Så undersøk hvordan WebSockets fungerer på ditt prosjekt før du baserer deg for mye på teknologien.

Dersom man kun trenger å sende data fra server til klient, og ikke er avhengig av støtte for Internet Explorer, kan Server-Sent Events være et godt alternativ.

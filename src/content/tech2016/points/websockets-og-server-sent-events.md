Med [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) kan man opprette en toveis kobling mellom nettleser og server. Dette gjør at man blant annet kan sende data fra serveren til nettleseren idet data endres. WebSockets kan muliggjøre mye bra funksjonalitet og er støttet i alle vanlige nettlesere. Vi har stor tro på WebSockets videre og bruker det på mange prosjekter.

Komponentene i infrastrukturen rundt selve applikasjonsserveren kan noen ganger skape problemer for WebSockets. Feil eller manglende støtte i brannmur eller reverse proxy kan gi overraskelser eller bli omfattende å feilsøke. Så undersøk hvordan WebSockets fungerer i din infrastruktur før du  baserer deg for sterkt på dette.

Dersom man kun trenger å sende data fra server til klient, og ikke er avhengig av støtte for Internet Explorer, kan [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) være et godt alternativ.
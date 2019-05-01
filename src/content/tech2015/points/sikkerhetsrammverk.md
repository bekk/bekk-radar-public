Implementasjon av mekanismer som håndterer passord, kryptering eller beskytter mot "Cross Site Scripting", er ofte mye vanskeligere enn man tror. Eksempelvis finnes det på StackOverflow store mengder aksepterte svar som er direkte feil. Innen sikkerhet bør man derfor velge rammeverk som er godt testet og bruker mekanismene på riktig måte. 

Spring Security er et modent Java-rammeverk for autentisering og autorisering. For enklere eller mindre løsninger, kan Apache Shiro være et godt alternativ. Apache Shiro er et Java-rammeverk som håndterer autentisering, autorisering, sesjonshåndtering og kryptering. Det har god støtte for tilleggsfunksjonalitet en vanligvis ikke finner i slike rammeverk, som korrekt caching av bruker-objekter og "husk meg"-støtte ved innlogging. 

OWASP AntiSamy gjør det mulig å la brukere publisere HTML uten at det utsetter applikasjonen for XSS-sårbarheter. Det er viktig at Antisamy-policyen er restriktiv. Jo åpnere policyen er, jo større risiko har en for å introdusere hull som gjør at en ondsinnet bruker kan injisere kjørbar kode. 

BEKK benytter denne type rammeverk i de fleste av våre prosjekter.
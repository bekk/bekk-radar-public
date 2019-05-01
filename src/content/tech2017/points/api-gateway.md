En API Gateway legges foran API-er for å tilby felles funksjonalitet som autentisering, trafikkbegrensning, logging, analyse etc., slik at ikke hvert enkelt API må duplisere denne funksjonaliteten. Ofte blir en slik gateway brukt i grensesnittet ut mot eksterne konsumenter. 

Fra et arkitekturperspektiv kan det være mange fordeler ved å innføre en gateway, men det bør gjøres en grundig vurdering av hvordan. Som med en tjenestebuss, kan man bli tvunget til å utvikle innenfor produktets rammer, noe som både kan være kostbart og bli en flaskehals ved utvikling og utrulling.

I løpet av 2016 har både Red Hat og Google stått for oppkjøp av etablerte aktører i dette markedet, og vi har også sett en videreutvikling av skyleverandørenes egne implementasjoner knyttet til sin skyplattform.

I tillegg til de mer lukkede aktørene, finnes det foreløpig tre gode åpen kildekode-alternativer, alle med mulighet for support: [wso2](http://wso2.com/api-management/), [Kong](https://getkong.org/) og [Tyk](https://tyk.io/). Dette kan være gode utgangspunkt som ofte er enklere å tilpasse etter behov.
[OkHttp](http://square.github.io/okhttp/) er et lettvekts HTTP-rammeverk. Biblioteket er primært utviklet for bruk i Android-applikasjoner, men egner seg og godt i vanlige Java-applikasjoner.
OkHttp bør brukes dersom man først og fremst bruker HTTP til å konsumere REST-tjenester. Til dette formålet kjenner vi ikke til noe enklere og mer brukervennlig HTTP API. OkHttp støtter også mer avansert funksjonalitet som bl.a. avansert caching, HTTP/2, asynkrone kall og gzip for kompresjon.

APIet er enkelt å forstå og relativt stabilt, men mellom hver hovedversjon av biblioteket har det vært større ikke-bakoverkompatible endringer. Siste versjon i skrivende stund er 3.2.0.

BEKK bruker OkHttp i flere av våre prosjekter.
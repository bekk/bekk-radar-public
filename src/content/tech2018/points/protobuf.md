Protobuf, eller Protocol Buffers, er et dataformat og bibliotek for serialisering av strukturert data.

Ved at formatet er språk- og plattformagnostisk, kan Protobuf erstatte bruk av XML og JSON som meldingsformat ved integrasjon med andre systemer. I motsetning til XML og JSON, er Protobuf et binært format som ikke parses. Det gjør at formatet er raskere i bruk, og krever mindre båndbredde.

Formatet støtter de samme datatyper som JSON, og tilbyr på toppen av dette mulighet for rå data i form av byte streams. Etter man har satt opp strukturen på dataobjektet, kompilerer man det ned til kildekode i det språket man jobber i. Dette gjør at man kan dele dataobjekter på tvers av prosjekter uten å måtte duplisere og vedlikeholde dem flere steder.

En annen fordel med Protobuf er frem- og bakoverkompatibilitet. Dataobjektet kan redigeres, og software som benytter eldre versjoner kan like fint snakke med software som benytter den nyeste versjonen.

Protobuf egner seg godt når en har krav om høy ytelse og lav latens, og i server-til-server-kommunikasjon. Det åpner for bruk av GRPC, og derfra er veien kort for å ta i bruk Rejoiner for å implementere GraphQL-støtte.

Blant aktører som benytter Protobuf finner vi Google, Cisco, Juniper, Netflix, og CoreOS.
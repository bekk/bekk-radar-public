De nye mulighetene som finnes når det gjelder layout på web har gitt stor verdi. Layout som før var kompleks og skjør blir nå enklere og mer robust.
Og, ting som før var umulige – eller så vanskelige at ingen gjorde det – har nå blitt mulige og overkommelige.

For å starte med det første punktet så støtter alle moderne nettlesere nå CSS Flexbox og CSS Grid. Layout som tidligere baserte seg på nøye balanserte floating og inline-block elementer og clearfix-hacks, kan nå implementeres på en måte som utnytter nettleserteknologi som faktisk er designet for formålet. Ofte kan både flexbox og grid brukes til å løse et gitt problem, men de to konseptene har hver sine styrker og svakheter. CSS Grid passer best til å definere makro layout, dvs. hvordan de ulike "boksene" i designet skal forholde seg til hverandre, mens CSS Flexbox egner seg best til å beskrive designet inne i boksene. Angivelsen `position: sticky` har også blitt lansert for å løse det klassiske "sticky header"-problemet.

Fremtiden for layout på web ser også ganske lys ut. Vi har fått en rekke nye verktøy i CSS-verktøykassen som lar oss lage ting som før ikke var mulig. CSS Shapes lar oss gjengi tekst langs kurver – dvs. på en måte som før kun var mulig i illustrasjonsverktøy. [SVG](https://radar.bekk.no/tech2017/frontend-og-mobil/svg) gir oss nye muligheter innen transisjoner og grafikk, og kompletterer eksisterende CSS-teknologier som animations og transitions på en god måte. CSS har fått clip-path, mask, filters og blend-modes som lar oss modifisere synligheten og utformingen til elementer på nye og interessante måter. 

Så – den store utfordringen har blitt å endre måten vi designer og tenker layout på.

Kravene til hva en normal nettleser skal støtte har blitt veldig mye høyere det siste året. Kombinert med CSS sin overlegne feiltoleranse er det nå få grunner til å ikke bruke nye ting når det gjelder implementasjon av layout og design av websider. Bruk [Progressive Enhancement](https://radar.bekk.no/tech2017/frontend-og-mobil/progressive-enhancement) for alt det er verdt, og husk at en nettside ikke trenger å se eksakt lik ut i alle nettlesere!
Testing av frontend-applikasjonene vi produserer er viktig for å verifisere at ting fungerer som det skal. Det beste verktøyet for den jobben er Jest.

[Jest](https://facebook.github.io/jest/) er et testrammeverk utviklet av Facebook, som har blitt mer og mer populært det siste året. Siden det ble skrevet om fra bunnen av i 2016, har det blitt et de facto valg for de fleste av Bekks prosjekter.

Man trenger lite eller ingen konfigurasjon for å komme i gang med Jest. Rammeverket er komplett med både verktøy for testdekning og mocking av avhengigheter, og Jest finner som regel testene i prosjektet ditt helt automatisk.

En veldig nyttig funksjon i Jest er såkalt snapshot-testing, som gjør sammenligning av to komplekse verdier veldig enkelt. Dette fungerer perfekt med React-komponenter, men kan også brukes sammen med enhver serialiserbar verdi.

Jest tilbyr også en avansert utvikleropplevelse med et interaktivt "dashboard", hvor man kan kjøre tester basert på regex-uttrykk eller om de feiler eller ei. Testene kjøres i parallell, som gjør testkjøringene raskere i de aller fleste tilfeller.

Det finnes mange alternativer til Jest, som alle har sine fordeler og ulemper. [Mocha](https://mochajs.org/) er et flott og konfigurerbart testrammeverk som er endel raskere enn Jest i visse tilfeller. Her trenger man riktignok å konfigurere opp litt mer.
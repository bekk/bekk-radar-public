Java EE-standardene spesifiserer hvilke tjenester og krav Java EE applikasjonsservere må oppfylle. Dessverre er det flere uklarheter og hull i disse spesifikasjonene som gjør at forskjellen mellom de ulike implementasjonene kan være stor. Samtidig har flere av implementasjonene (spesielt de kommersielle) utviklet egne tjenester som utvidelser eller tillegg til spesifikasjonen. Dette vanskeliggjør senere migrering og oppgradering av applikasjonsservere, og binder i større grad applikasjonene til en spesiell applikasjonsserver. I tillegg tilbyr applikasjonsserverene ofte så mange tjenester at det kan være vanskelig å utvikle, tilpasse og drifte løsningene på denne plattformen. Mangel på enkelhet og oversikt gjør kontinuerlige leveranser tyngre. Resultatet kan være utilsiktede driftsbrudd og feil i applikasjonene. Et annet aspekt er at utviklere ofte velger rammeverk (f.eks. Spring) som i liten grad har behov for de innebygde tjenestene. Vi setter derfor spørsmålstegn ved verdien av de store Java EE applikasjonsserverene, og mener man bør vurdere å velge lettvektsvariantene i nye prosjekter.
AWS Elastic Beanstalk er en plattform for enkel skydrift av backend-applikasjoner. Med kun et par enkle konfigurasjonsfiler får man deploymentrutiner, lastbalansering, autoskalering, helsesjekker, automatisk patching, loggaggregering og annet du trenger for fornuftig drifting. 

Plattformen gjør det svært enkelt å komme i gang med driften, samtidig som det er nok features og konfigurasjonsmuligheter til at det også fungerer for mer avanserte behov.

Elastic Beanstalk er et godt alternativ til containerbasert drifting, og så lenge du har en applikasjon som enkelt lar seg pakke og er støttet av plattformen (Java, .NET, PHP, Node.js, Python, Ruby, Go) så fungerer det godt. Du slipper å drifte dine egne container-images, og kan heller stole på at AWS oppdaterer og patcher serverne dine. 

Dersom du ønsker å bruke containere støtter Elastic Beanstalk drift av Docker-images også, men da kan det nok være vel så lurt å velge en av de andre driftsmetodene for containere som AWS tilbyr.
Med infrastruktur som kode bærer provisjoneringskoden ofte preg av at man blander logikk og data på samme abstraksjonsnivå. Ved å behandle infrastruktur som data lar man logikken avhenge av datastrukturer, definert i f.eks. en database eller en YML-fil. Dataene beskriver hvordan systemene skal se ut i enkle maskinlesbare formater. Dataformatene eksekveres og sikrer at infrastrukturen matcher beskrivelsen. 

Resultatet er konfigurasjon som er fleksibel, lett å prototype, enkel å revidere, og lett å vedlikeholde. 

Infrastruktur som data er støttet av rammeverk som Ansible, Salt, og i nyere tid også Puppet.
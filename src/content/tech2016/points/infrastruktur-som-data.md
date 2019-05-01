Med infrastruktur som kode, bærer provisjoneringskoden ofte preg av at man blander logikk og data på samme abstraksjonsnivå. Ved å behandle infrastruktur som _data_ lar man logikken avhenge av datastrukturer, definert i f.eks. en database eller en YML-fil. 

I enkle, maskinlesbare formater, beskriver dataene hvordan systemene skal se ut. Dataformatene eksekveres, og sikrer at infrastrukturen matcher beskrivelsen. Resultatet er konfigurasjon som er fleksibel, enkel å revidere, lett å vedlikeholde og løsere koblet til rammeverket. 

[Ansible](https://www.ansible.com/) og [Salt](https://docs.saltstack.com/) ble begge laget med støtte for infrastruktur som data. I ettertid har også [Puppet](https://puppetlabs.com/) fått støtte for dette gjennom [Hiera](http://docs.puppetlabs.com/hiera/).
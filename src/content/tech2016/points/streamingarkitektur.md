Tradisjonelt har behandling av store datamengder vært forbundet med batch-jobber som kjøres på store datasett i [Hadoop](http://hadoop.apache.org/) eller datavarehus. Disse er ofte tid- og ressurskrevende.

I moderne applikasjoner oppstår data kontinuerlig fra flere kilder, og man ønsker å alltid være oppdatert og å kunne handle raskt på bakgrunn av dataene. Da produserer de tradisjonelle batch-jobbene resultater for sent.

I en streamingarkitektur prosesseres data kontinuerlig i nær sanntid i stedet for i batcher. Typiske bruksområder er monitorering, brukeraktivitet på nettsider, sensordata, anbefalingsmotorer, svindeldeteksjon og andre scenarier der det er avgjørende å reagere raskt basert på sanntidsdata.

[Akka](https://radar.bekk.no/tech2016/sprak-og-rammeverk/akka), [Apache Storm](http://storm.apache.org/) eller [Spark Streaming](http://spark.apache.org/streaming/) gjør det mulig å bygge skalerbare applikasjoner som kan behandle store mengder samtidige data. Vi har god erfaring med bruk av disse i våre prosjekter.
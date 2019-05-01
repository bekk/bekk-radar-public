Entity Framework (EF) Core 2.0 er den nyeste versjon av Microsofts object-relational mapper. EF Core er bygd opp fra bunnen av for å være stabil, rask, modulær og kryssplattform.

Man er ikke lenger avhengig av Visual Studio; alt av migreringskommandoer som i gamle EF kun var tilgjengelig via Package Manager Console, kan nå utføres i terminalen med egne CLI-kommandoer, eller i en egen plugin til Visual Studio Code.

EF Core støtter et bredt utvalg databaseprovidere: Microsoft stiller med SQLite, SQL Server og InMemory-database providere, i tillegg finnes det tredjeparts providere for PostgreSQL, MySQL/MariaDB, SQL Server Compact, Oracle og flere. Det er også planlagt støtte for Azure CosmosDB.

Spesielt InMemory-databasen gjør det meget enkelt å skrive enhetstester for database-logikk, noe som var utfordrende å få gjort med gamle EF.

Dersom man trenger å kjøre egne SQL-spørringer men få tilbake mappede entiteter, er dette støttet med FromSql-metoden. I neste versjon (2.1) vil det også være mulig å mappe resultater til vilkårlige typer (Query Types), slik man kjenner til fra Dapper.

Siden EF Core er skrevet fra bunnen av, er det noe funksjonalitet som ikke er implementert enda, som Group By, Lazy loading, Initial Seeding, Complex Types og mapping av stored procedures. Denne funksjonaliteten vil være på plass i neste versjon av EF core (2.1) som kommer i løpet av 2018.

Vi anbefaler alle nye prosjekter som trenger et ORM å ta i bruk EF Core 2.0. For eksisterende prosjekter som bruker EF 6 kan det være verdt å undersøke om man i dag benytter funksjonalitet som ikke er på plass enda i EF Core, før man oppgraderer. Siden EF Core sine Code First migreringer ikke er kompatible med EF 6, vil det også være nødvendig å reverse-engineere eksisterende databaseskjema dersom man ønsker å ta i bruk genererte migreringer, heldigvis støtter EF Core dette ut av boksen. Hvis du er i tvil om du virkelig har behov for et fullverdig ORM kan kanskje [SQL eller mikro-ORM](https://radar.bekk.no/tech2018/sprak-og-rammeverk/sql-og-mikro-orm) være et bedre alternativ.
JooQ er et eksempel på ett av flere domenespesifikke språk for SQL som er laget. JooQ skiller seg ut ved at det er en av de mer modne. Å bruke objekt-relasjonell-mapping (ORM) kan fungere bra i mange tilfeller, men veldig ofte må man uansett skrive SQL. Hvorfor ikke droppe abstraksjonen som denne mappingen gir og skrive ren SQL i ditt språk?

JooQ bruker kodegenerering fra databaseskjema og den genererte DSL-en støtter et bredt spekter av SQL-dialekter. Oppsiden er at du får tilbakemelding i kompilering av din SQL, typesikre verdier og SQL-injeksjoner blir en historisk problemstilling.
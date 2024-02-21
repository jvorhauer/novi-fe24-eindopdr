# Verantwoording

## Technische Keuzes

Meeste technische keuzes zijn gemaakt door Novi. Alleen JavaScript zou ik zelf niet meer kiezen.

De backend is een voortgaande ontwikkeling op basis van de eindopdracht voor de Backend (Java met Spring Boot) module van Novi.
Deze host ik zelf, heb ik zelf ontwikkeld en beheer ik ook zelf. Maximale DevOps met minimaal team...

### JavaScript

Door Novi opgelegd. Zou ik zelf niet meer voor kiezen: TypeScript of een andere hoger niveau taal en omgeving.
Blijft een vreemde programmeertaal ten opzichte van de bij mij meer bekende talen als Java, Kotlin, Python en Scala. Een programmeertaal zonder
een type-system dat me helpt om tijdens het bouwen en uitvoeren van een applicatie veelgemaakte fouten te voorkomen is echt wennen en zorgt voor veel
langere ontwikkel- en testtijd.

### React

Is best een fijn en veelzijdig framework. Vlot nieuwe applicaties bouwen en bestaande applicaties uitbreiden zijn na enig oefenen goed te doen.

### Axios

Maakt communiceren met mijn eigen en andere backends/APIs overzichtelijk en beheersbaar.

### html

Niet aan te ontkomen en dat zou ik ook niet willen. Ik vind, na 25 jaar regelmatig ermee werken, dat html niet voor niets nergens door vervangen is. Soms wat veel
tekst nodig om iets te definieren, met name tabellen, maar over het algemeen begrijpelijk en structureel goed doordacht.

### css

Voor layout, kleuren en typografie is css onmisbaar. Ondanks veel bezwaren vanuit ontwikkelaar-vriendelijkheid is css onlosmakelijk verbonden met het ontwikkelen van
mooie en aansprekende websites en webapplicaties.

## Limitaties

### Algemeen

Werkt alleen met Internet verbinding, aangezien backend daar ergens draait; geen offline mogelijkheid.

### Functioneel

1. Een gebruiker heeft maar erg weinig mogelijkheden om zijn of haar informatie te bewaren: naam, email adres en password. Een profiel met (veel) meer data zou aantrekkelijk kunnen zijn;
2. Een taak is opzettelijk inhoudelijk beperkt opgezet. Dit is in lijn met het BaseCamp gedachtengoed: zorg dat de tool geen doel op zich wordt, waarmee ook gezorgd
   wordt dat de functioneliteit niet ondergesneeud wordt door vele velden;
3. Een notitie is om dezelfde reden bescheiden gehouden. Het risico dat veel verschillende invoer/data om steeds meer functionaliteit vraagt is te groot (zie Jira);
4. Gebruikers leven nu in het backend systeem van NoPaN. Gegeven de grote hoeveelheden Google, GitHub, Microsoft, etc. bestaande accounts zou OAuth als autenticatie
   mechanisme wellicht makkelijker en zelfs drempelverlagend kunnen zijn.

### Technisch

1. De enige formattering in de tekst-velden van notitie en taak zijn regelovergangen (linebreaks), maar om die goed weer te geven moet je in React nogal wat zoeken, en dan kom je uit op `dangerouslySetInnerHTML` waarvan de naam nogal afschrikwekkend klinkt. Doordat de backend alle html tags encodeert voor de veiligheid gaat het alleen om `<br>`s dus niet heel erg gevaarlijk
2. Heel soms werkt het automatisch verversen van de inhoud van een pagina niet de eerste keer: als bijvoorbeeld een notitie gewijzigd werd, dan wordt bijna altijd de inhoud van die notitie direct correct weergegeven. Maar heel soms niet.
3. Graag had ik `useForm` gebruikt, maar dat wilde niet werken met de door mij gekozen opzet met een pagina waarop een herbruikbare `dialog` het invul-formulier toont: alle velden werden dan read-only en dat is wel veilig, maar niet gewenst.

## enige persoonlijke opmerkingen achteraf

Het deel Figma-prototype heb ik expres overgeslagen: kost veel tijd en levert minder dan 5% van het eind-cijfer op, aangezien wireframes + figma in totaal 5%
oplevert. Wel geprobeerd om er een design systeem in te krijgen zodat in ieder geval kleuren, typografie en elementaire elementen enigszins voorgekookt zijn, maar dat
had ik nog van een aparte cursus Figma van Novi overgehouden. Daarbij komt: ik ben geen grafische vormgever of designer. Dat is een vak apart.

Ik heb grote moeite gehad om de 50 gevraagde functionele en niet-functionele eisen vol te krijgen.

Zoals eerder al aangegeven ben ik geen vormgever, waardoor layout zaken erg veel tijd en vallen-en-opstaan-energie kosten.

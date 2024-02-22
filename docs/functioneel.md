# Novi Planning en Notities: Functioneel Ontwerp

* [Introductie](#introductie)
* [Functionele Eisen](#functionele-eisen)
* [Niet-Functionele Eisen](#niet-functionele-eisen)
* [Use Cases](#use-cases)
* [Inspiratie](#inspiratie-bronnen)

## Introductie

Een taak- en notitie registratie en beheer systeem:

* Taken worden overzichtelijk weergegeven en zijn eenvoudig van status te veranderen.
* Notities worden in een nette lijst weergegeven.

## Functionele Eisen

* Als gebruiker wil ik me kunnen registreren zodat ik van de faciliteiten van NoPaN gebruik kan maken
  * registratie met email adres, password en naam
  * email adres moet uniek zijn
  * naam mag niet leeg zijn
  * password moet minimaal 7 karakters lang zijn
* Als gebruiker wil ik me kunnen aanmelden, zodat ik mijn taken en notities kan beheren
* Als geregistreerde gebruiker wil ik mijn [Gravatar](https://gravatar.com/profile) die bij mijn email adres hoort zien zodat de boel wat vrolijker wordt
* Als aangemelde gebruiker wil ik me kunnen afmelden zodat mijn device door iemand anders gebruikt kan worden (praktisch wordt men afgemeld als er op 
  die gravatar afbeelding wordt geklikt; heeft een email adres geen bijbehorende gravatar, dan wordt een generieke afbeelding getoond)

* Als gebruiker wil ik een nieuwe taak aanmaken, zodat ik deze kan onthouden
  * Als gebruiker wil ik een taak een titel, vrije tekst en een deadline datum + tijd kunnen geven zodat ik later kan teruglezen wat ik bedoelde
  * de titel en vrije tekst mogen niet leeg zijn
  * de datum + tijd moeten in de toekomst liggen
* Als gebruiker wil ik een bestaande taak een andere status kunnen geven zodat ik de voortgang kan (laten) zien
  * door middel van drag & drop kan de status aangepast worden
* Als gebruiker wil ik een bestaande taak inhoudelijk wijzigen zodat deze weer de werkelijke bedoeling weergeven
  * titel en vrije tekst mogen wederom niet leeg zijn
* Als gebruiker wil ik een bestaande taak kunnen verwijderen zodra deze niet meer relevant is

* Als gebruiker wil ik een nieuwe notitie aanmaken zodat ik mijn aantekeningen kwijt kan
  * een notitie heeft een titel en vrije tekst
  * titel en vrije tekst mogen niet leeg zijn
  * voor een nieuwe notitie wordt een 'slug' gegenereerd op basis van de titel
* Als gebruiker wil ik een bestaande notitie kunnen wijzigen zodat de notitie weer de gewijzigde realiteit weergeeft
  * titel en vrije tekst mogen wederom niet leeg zijn
* Als gebruiker wil ik een bestaande notitie verwijderen omdat deze geen relevante inhoud meer heeft

## Niet-functionele Eisen

* eenvoudige installatie, zonder overmatige technische kennis, liefst een één-knops intallatie!
  * script, maar voor Windows is dat moeilijk omdat ik geen beschikking over een Windows machine beschik
  * andere optie(s) onderzoeken
* moet uitgevoerd kunnen worden op Windows 10 of 11, macOS of Linux
* moet uitgevoerd kunnen worden met Firefox, Chrome (incl. Edge, Arc, Brave, etc. etc.) en Safari
* installatie en uitvoering van deze frontend applicatie hebben een internet verbinding nodig
* testen op Chrome, Firefox en Safari, maar alleen op macOS, er vanuit gaand dat die browsers genoeg cross-platform zijn.
* security is geen harde eis voor deze frontend: de bedoeling is dat de app alleen lokaal op de machine van een gebruiker draait en niet op een server in het grote,
  boze internet.
* wel worden alle html tags vervangen door veilige tekst. Dit om te voorkomen dat iemand bijvoorbeeld javascript scripts gaat 
  kunnen uitvoeren. Of nare video's gaat kunnen laten afspelen. De < (begin html tag) en > (eind html tag) worden vervangen door respectievelijk [ en ]
* er zijn geen grenezen aan aantallen notities en taken (kan wel moelijker worden om inhoud terug te vinden, maar daar is deze frontend niet uniek in).

## Use Cases

In de beschrijving van de Use Cases worden "het systeem" en "de applicatie" gebruikt als synoniem voor de hier beschreven eindopdracht implementatie. 

### template

Doel: 
Scope:
Niveau:
Voorwaarden:
Succesvol afgerond als:
Falende afloop:
Actor: 

### Nieuwe gebruiker registreren

Doel: registreer een gebruiker die nog geen account heeft
Scope: gebruikers
Niveau: primair
Voorwaarden: voor registratie moet een gebruiker vier velden invoeren: naam, email en tweemaal wachtwoord (password):
1. naam mag niet leeg zijn
2. email adres mag niet leeg zijn
3. password mag niet korter dan 7 karakters zijn
4. het password en het tweede password moeten gelijk zijn
5. het email adres van de gebruiker is nog niet bekend in het systeem

Succesvol afgerond als: alle velden (naam, email en password) voldoen aan de voorwaarden én de het email adres is nog niet bekend
Falende afloop:
1. als niet alle velden correct zijn ingevuld
2. als het email adres al eerder werd gebruikt voor registratie

Actor: nog niet geregistreerde gebruiker
Trigger: de nog niet geregistreerde gebruiker klikt op de "Registreer" link/knop van de applicatie.

### Aanmelden geregistreerde gebruiker (login)

Doel: aanmelden zodat de eigen notities en taken getoond en bewerkt kunnen worden
Scope: gebruikers
Niveau: primair
Voorwaarden: voor aanmelden moet de gebruiker een reeds geregistreerd email adres en bijbehorend password invoern:
1. email mag niet leeg zijn
2. password mag niet leeg zijn
3. de combinatie van ingevuld email adres en password moet al bekend zijn in het systeem

Succesvolle afloop: de beide velden tot een vindbare gebruiker leiden
Falende afloop:
1. als de ingevoerde gegevens niet aan de voorwaarden voldoen

Actor: geregistreerde gebruiker
Trigger: de nog niet aangemelde gebruiker klikt op de "Login" link/knop van de applicatie.



ToDo:
* nieuwe taak aanmaken,
* taak-status veranderen,

## Inspiratie Bronnen

* Trello
* Jira
* Basecamp

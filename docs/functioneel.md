# Noviaal Planning and Notes (NoPaN): Functioneel Ontwerp


NoPaN is een taak- en notitie registratie en beheer systeem:

* Taken worden overzichtelijk weergegeven en zijn eenvoudig van status te veranderen.
* Notities worden in een nette lijst, gepagineerd weergegeven.

NB: hoe kom ik aan 50 functionele en niet-functionele eisen?

## Functionele Eisen

* Als gebruiker wil ik me kunnen registreren zodat ik van de faciliteiten van NoPaN gebruik kan maken
  * registratie met email adres, password en naam
  * email adres moet uniek zijn
  * naam mag niet leeg zijn
  * password moet minimaal 7 karakters lang zijn
* Als gebruiker wil ik me kunnen aanmelden, zodat ik mijn taken en notities kan beheren
* Als aangemelde gebruiker wil ik me kunnen afmelden zodat mijn device door iemand anders gebruikt kan worden
* Als geregistreerde gebruiker wil ik mijn Gravatar dat bij mijn email adres hoort zien zodat de boel wat vrolijker wordt

* Als gebruiker wil ik een nieuwe taak aanmaken, zodat ik deze kan onthouden
  * een taak heeft een titel, vrije tekst en een deadline datum + tijd
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
* wel worden alle html tags vervangen door veilige, maar correct getoonde tekst. Dit om te voorkomen dat iemand bijvoorbeeld javascript scripts gaat 
  kunnen uitvoeren. Of nare video's gaat kunnen laten afspelen.
* er zijn geen grenezen aan aantallen notities en taken (kan wel moelijker worden om inhoud terug te vinden, maar daar is deze frontend niet uniek in).

## Use-Cases

ToDo:
nieuwe gebruiker registreren,
aanmelden geregistreerde gebruiker,
nieuwe taak aanmaken,
taak-status veranderen door drag & drop en
nieuwe notitie aanmaken.

## Inspiratie Bronnen

* Trello
* Jira
* Basecamp

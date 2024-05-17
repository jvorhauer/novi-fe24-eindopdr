---
title: QuickScan
date: 2024-05-17
author: Jurjen Vorhauer, 800009793
email: j.vorhauer@novi-education.nl
---

| Algemene eisen                                                                                                | Voldaan | Toelichting                      |
|---------------------------------------------------------------------------------------------------------------|---------|----------------------------------|
| Documentatie ingeleverd als .pdf                                                                              | Ja      |                                  |
| Document bevat geen bronnen of verwijzingen buiten het document                                               | Ja      |                                  |
| De eindopdracht is goed leesbaar zonder storende aanwezigheid van grammatica- en spellingsfouten              | Ja      |                                  |
| Het volledige project en bijbehorende documenten wordt aangeleverd d.m.v. één ZIP-bestand van maximaal 50 MB. | Ja      |                                  |
| Het ZIP-bestand bevat alle gevraagde onderdelen                                                               | Ja      |                                  |
| Herkansing feedback?                                                                                          | Ja      |                                  |

| Inhoudelijke eisen                                                                                                                                                          | Voldaan | Toelichting                                                                               |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|-------------------------------------------------------------------------------------------|
| Alle deelopdrachten zijn uitgewerkt en de gevraagde deelproducten zijn aanwezig                                                                                             | Ja      |                                                      |
| Het project is geüpload naar een GitHub repository: deze repository staat op public.                                                                                        | Ja      |                                                                                           |
| De applicatie is geprogrammeerd met JavaScript en React (geen TypeScript) en er is gebruik gemaakt van React Context (geen Redux)                                           | Ja      |                                                                                           |
| Er is GEEN gebruik gemaakt van out-of-the box styling systemen zoals Bootstrap, Material-UI of Tailwind                                                                     | Ja      |                                                                                           |
| De broncode wordt ingeleverd zonder ‘node_modules’-map en ’.idea’-map                                                                                                       | Ja      |                                                                                           |
| De wireframes zijn getekend op papier                                                                                                                                       | Ja      |                                                                                           |
| De schermontwerpen zijn ontworpen met een design tool zoals Figma of Adobe XD                                                                                               | Ja      | Zie [Figma - Novi FrontEnd 2024 - EindOpdracht](https://www.figma.com/file/Vi2bZkZk4EhVTvV5S9iAEf/Novi-FrontEnd-2024---EindOpdracht?type=design&node-id=6-3&mode=design&t=u26nJ6uof02vqOIU-0) |
| Er wordt gebruik gemaakt van een externe API en een backend voor het inloggen en registreren van gebruikers <br/>(NOVI backend of backend uit eerdere leerlijn of Firebase) | Ja      |                                                                                           |
| De applicatie start op zonder te crashen                                                                                                                                    | Ja      | Dit is natuurlijk nooit voor iedere configuratie (OS, node/npm versies, etc.) te bewijzen |

## Opmerkingen

In bovenstaande QuickScan zijn wel een paar punten die niet helemaal overeenkomen met de eisen verderop in 'Frontend Eindopdracht v3.3.pdf', met name
het registreren en inloggen via de NOVI backend of Firebase. Gebruikers opslag vindt plaats in de eigen backend, zie [GitHub - KoNoMaS](https://github.com/jvorhauer/konomas).

De laatste eis, de applicatie start op zonder te crashen, is al erg moeilijk te garanderen voor (commerciele/grote) bedrijven, maar voor een solo dev is dat geen
haalbare eis. Er zijn eenvoudigweg te veel mogelijke configuraties. Ik zou deze eis laten vallen. Misschien iets met Docker? Of een werkende versie ergens op een
static hosting partij? Bijvoorbeeld, zoals beschreven op [Vite - Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html), via GitHub Pages.

Het Figma ontwerp is ook in deze `docs` folder te vinden: `Novi FrontEnd 2024 - Eindopdracht.fig`. Mocht de link onverhoopt
niet (meer) werken...

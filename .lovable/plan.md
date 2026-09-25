# Finjustera hero-sektionen

## Mål
Göra den befintliga hero-sektionen mer premium och levande utan att ändra dess färgpalett eller grundlayout.

## Genomförande
- Låsa hero, telefon och scenariotext till stabila, reserverade mått på stora och små skärmar.
- Behålla telefonens ram på plats och endast animera skärminnehållet.
- Ta bort föregående/nästa-pilar och behålla diskret nummer- och progressindikator.
- Synkronisera telefoninnehåll och högerspalt med ett lugnt horisontellt svep, mjuk oskärpa och subtil ljussvans.
- Pausa autoplay vid hover, fokus och beröring samt respektera reducerad rörelse.
- Ge de sex scenarierna tydligt skilda innehållsmönster: produktkort, servicebesked, leveranssteg, bostadsfakta, bonusstatus och biljett.

## Teknisk detalj
Telefonkomponenten får ett hero-läge där det fasta skalet separeras från det animerade scenariolagret. Kampanjdata utökas med strukturerade visningsvarianter, och endast hero-specifik CSS ändras.

## Kontroll
Kontrollera hero-höjd och elementposition före/efter scenariobyte, autoplay, hover-paus, frånvaro av pilar, mobil svepning, reducerad rörelse och horisontell overflow.

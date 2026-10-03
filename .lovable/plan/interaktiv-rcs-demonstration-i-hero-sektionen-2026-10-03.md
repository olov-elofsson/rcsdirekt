# Interaktiv RCS-demonstration i hero-sektionen

## Mål
Ersätta den nuvarande statiska telefonbilden på startsidan med en interaktiv RCS-konversation som tydligt visar vad formatet kan göra.

## Genomförande
- Bygg en centrerad telefon med verifierad avsändare, läskvitto, rich-card-karusell, åtgärdsknappar, skrivindikator och föreslagna svar.
- Placera sex numrerade förklaringar runt telefonen på stora skärmar och som en tydlig lista under telefonen på mobil.
- Låt markeringar i telefonen och förklaringarna framhäva varandra vid pekning eller fokus.
- Gör karusellen svepbar och komplettera den med små pilknappar på större skärmar.
- Låt svarschips skapa en ny fråga, visa skrivindikator och därefter ett relevant svar.
- Lägg till en enkel bokningsruta för demo samt kontroller för att visa förklaringar och spela upp konversationen.
- Samla allt redigerbart innehåll i en separat datafil och återanvänd befintlig RCS Direkt-logotyp.

## Teknisk detalj
Implementationen görs som en fristående React-komponent med tillhörande datafil. Den använder projektets befintliga designkomponenter, färgtokens och animationer och ersätter endast telefonytan i hero-sektionen.

## Kontroll
Kontrollera interaktioner, tangentbordsfokus, reducerad rörelse, mobil layout, horisontell overflow och att startsidans övriga innehåll förblir oförändrat.

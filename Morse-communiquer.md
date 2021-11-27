# Morse-communiquer

## Etape 1 - Définir le groupe radio

Pour pouvoir envoyer un message, tu dois:
1. Choisir le bloc "définir groupe", et le glisser
sous le bloc au démarrage.
2. Changer le chiffre 1 avec un autre chiffre en
fonction du groupe qui t'as été affecté
(le receveur aura le même chiffre de groupe).
3. Dans le menu broche, prendre le bloc "définir
la broche audio P0" et le glisser dans le bloc au
démarrage.
4. Clique sur le bouton suivant dans le communiquer
supérieur droit de l'écran pour passer aux 
instructions suivantes.

```blocks
radio.setGroup(1)
pins.setAudioPin(AnalogPin.P0)
```
## Etape 2- Programmer et envoyer un point (mode émetteur)

Maintenant tu dois programmer le point du code
Morse que tu enverras à ton coéquipier.

1. Fais glisser le bloc "Lorsque le bouton A est pressé"
dans ton espace de travail.
2. Dans l'onglet radio, choisis le bloc "envoyer le nombre(0)
par radio" et place le sous le bloc précédent.
3. Ensuite, fais glisser dessous le bloc "montrer LEDs" 
et choisis la led qui va s'éclairer (led centrale).

4. Ajoute un bloc "pause" (ms) à la séquence (200ms est correct).
5. Enfin, ajoute un bloc "effacer l'écran", pour compléter
la séquence.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(200)
    basic.clearScreen()
})
radio.setGroup(1)
pins.setAudioPin(AnalogPin.P0)
```
## Etape 3- Programmer et envoyer un tiret

A part quelques petites différences, les étapes du tiret
sont les mêmes que celles du point.

1. Fais glisser un nouveau bloc "Lorsque le bouton A pressé"
Remplace le A par le B.
2. Dans l'onglet radio, choisi le bloc "envoyer le nombre
0 par radio" et change le 0 en 1.
3. Choisis le bloc "Montrer LEDs" et insère le dans le
bloc "Lorsque le bouton B est pressé".
4. Clique sur les leds pour afficher un tiret.
5. Ajoute un bloc pause (mettre à 200 ms).
6. Et enfin, ajoute le bloc "effacer l'écran" pour compléter 
la séquence.

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(1)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
    basic.pause(200)
    basic.clearScreen()
})

```
## Etape 4- Programmer un symbôle de fin de transmission

Pour que ton partenaire récepteur (trice) sache que
le message est terminé, tu programmera un autre symbôle
en suivant les mêmes étapes que pour le point et le tiret.

1. Fais glisser un bloc "lorsque secouer"
2. Ajoute un bloc "envoyer le nombre 0 par radio", change le 0
en 2.
2. Ajoute un bloc "montrer l'icône" et choisi la croix (X).
3. Ajoute un bloc pause (mettre 5s).
4. Ajoute un bloc effacer l'écran pour terminer la séquence.

```blocks
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(2)
    basic.showIcon(IconNames.No)
    basic.pause(5000)
    basic.clearScreen()
})
```
## Etape 5- Programmer la radio pour recevoir le message (récepteur).

1. Pour commencer, choisis dans le menu radio, le bloc
"quand une donnée est reçue par radio (receiveNumber).
2. Ensuite, choisis le bloc "si vrai alors" dans la section logique.
Insère le en dessous du bloc précédent.
3. Tu dois modifier la varaible "vrai" dans la fonction logique.
Place un bloc 0=0 par dessus vrai.
4. Remplace le premier zéro du bloc en faisant glisser dessus la
variable "receiveNumber" que tu prends juste au dessus
dans le bloc "quand une donnée..."

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
    	
    }
})
```

## Etape 6- Réception des messages suite...

1. Dans le bloc "si...alors", tu dois ajouter
un bloc "montrer leds". Puis sélectionner d'afficher la led centrale.
2. Ajoute un bloc pause (200ms), puis un bloc "effacer l'écran".
3. Et enfin, choisis dans le menu musique, un bloc
"jouer ton middleC pendant 1/4 temps"

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.pause(200)
        basic.clearScreen()
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
})
```
## Etape 7- Reception suite

1. Rajoute un autre bloc "si...alors" sous le précédent.
2. Ajoute un bloc "0=0", change le premier 0 par la variable
receivedNumber. Et remplace le deuxième 0 par un 1.
3. Glisse à la suite un bloc "montrer LEDs", affiche dessus
un tiret.
4. Rajoute un bloc pause (toujours à 200ms), puis à la suite
un bloc "effacer l'écran".
5. Et enfin, dans musique prends un bloc "jouer ton middleC
pendant 1/2 temps".

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.pause(200)
        basic.clearScreen()
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
    if (receivedNumber == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        basic.pause(200)
        basic.clearScreen()
        music.playTone(262, music.beat(BeatFraction.Half))
    }
})
```

## Etape 8- Programmer fin de Réception

1. rajoute un dernier bloc "si...alors" à la suite des précédents.
2. Prends un bloc logique "0=0", change le premier zéro
par la variable "receivedNumber". Et le deuxième zéro par un 2.
3. Ajoute un bloc "montrer symbôle" prends la croix.
4. Ajoute un bloc pause (5s) et enfin un bloc "effacer l'écran.

```blocks
  radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.pause(200)
        basic.clearScreen()
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
    if (receivedNumber == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        basic.pause(200)
        basic.clearScreen()
        music.playTone(262, music.beat(BeatFraction.Half))
    }
    if (receivedNumber == 2) {
        basic.showIcon(IconNames.No)
        basic.pause(5000)
        basic.clearScreen()
    }  
     
```

## Une dernière étape

Félicitations, tu as réussi le programme de l'activité "Morse 2022".
Maintenant, il est temps de l'essayer en vrai !

1. Télécharge ta programmation par la procédure habituelle:
Bouton télécharger- récupérer le fichier dans téléchargement-
cliquer droit avec la souris- envoyer vers et choisir la carte microbit
branchée en USB.
2. Attendre que le groupe récepteur soit prêt aussi et envoyerle message qu'il doit décoder.
3. Ne pas oublier de brancher le shiel pour module grove avec le buzzer en P0.
Celui ne fonctionnera que pour le récepteur, mais comme ensuite vous allez
inverser les rôles...emetteur/récepteur.
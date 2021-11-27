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
})
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
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(2)
    basic.showIcon(IconNames.No)
    basic.pause(5000)
    basic.clearScreen()
})
radio.setGroup(1)
pins.setAudioPin(AnalogPin.P0)

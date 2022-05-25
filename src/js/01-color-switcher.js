import '../css/buttons.css'

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body")

const startButton = document.querySelector("button[data-start]")
const stopButton = document.querySelector("button[data-stop]")
let interval

const resetButton = document.createElement("button")
resetButton.textContent = 'Reset'
resetButton.type = 'button'
resetButton.setAttribute('data-reset','')

stopButton.after(resetButton)

stopButton.disabled = true
resetButton.disabled = true

const changeColor = () => {
    interval = setInterval(() => {
        const color = getRandomHexColor()

        body.style.backgroundColor = color
    }, 1000)
}

const resetColor = () => {
    body.style.backgroundColor = '#FFFFFF'
}

const disableButton = (button) => {
    button.disabled = true
}

const enableButton = (button) => {
    button.disabled = false
}

startButton.addEventListener('click', () => {
    changeColor()
    disableButton(startButton)
    enableButton(stopButton)
})

stopButton.addEventListener('click', () => {
    clearInterval(interval)
    enableButton(startButton)
    disableButton(stopButton)
    enableButton(resetButton)
})

resetButton.addEventListener('click', () => {
    resetColor()
    disableButton(resetButton)
})
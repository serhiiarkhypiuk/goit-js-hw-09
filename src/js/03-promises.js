import "../css/promises.css"
import Notiflix from "notiflix"

const form = document.querySelector('form')

const resolved = ({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
}
const rejected = ({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}

const handleSubmit = (event) => {
  event.preventDefault()
  
  let firstDelay = event.currentTarget.elements.delay.value
  let amount = event.currentTarget.elements.amount.value
  let delayStep = event.currentTarget.elements.step.value
  let totalDelay
  
  for (let i = 1; i <= amount; i += 1) {
    totalDelay = firstDelay
    if (i >= 2) {
      totalDelay = Number(firstDelay) + Number(delayStep * (i - 1))
    } 

    createPromise(i, totalDelay)
      .then(resolved)
      .catch(rejected)
    
    console.log(`Promise #${i} will be processed after ` + totalDelay + 'ms')
  }
  
  event.currentTarget.reset()
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

form.addEventListener('submit', handleSubmit)

import { Module } from '../core/module.js'

export class countdownTimerModule extends Module {
  #bodyHTML
  #timerBlock
  #minutesInTheTimer
  #startBtn
  #stopBtn
  #closeBtn
  #timer
  #startTime
  #stopTime
  #now
  #restOfTheTime
  #min
  #sec
  #makeCountdown

  constructor() {
    super('countdownTimer', 'Сountdown Timer')

    this.#bodyHTML = document.querySelector('body')
  }

  trigger() {
    this.#timerBlock = document.createElement('div')
    this.#timerBlock.className = 'timer-block'
    this.#bodyHTML.append(this.#timerBlock)

    this.#startBtn = document.createElement('button')
    this.#startBtn.id = 'start-btn'
    this.#startBtn.textContent = 'Старт'
    this.#timerBlock.append(this.#startBtn)

    this.#stopBtn = document.createElement('button')
    this.#stopBtn.id = 'stop-btn'
    this.#stopBtn.textContent = 'Стоп'
    this.#timerBlock.append(this.#stopBtn)

    this.#closeBtn = document.createElement('button')
    this.#closeBtn.id = 'close-btn'
    this.#closeBtn.textContent = 'Закрыть'

    this.#timerBlock.append(this.#closeBtn)
    this.#timer = document.createElement('div')
    this.#timer.id = 'timer'
    this.#timerBlock.append(this.#timer)

    this.#minutesInTheTimer = 0
    this.#startTime = 0
    this.#stopTime = 0
    this.#now = 0
    this.#restOfTheTime = 0

    this.#min = 0
    this.#sec = 0

    this.#makeCountdown

    let updateTime = () => {
      this.#minutesInTheTimer = prompt('На сколько минут хотите поставить таймер?')
      this.#minutesInTheTimer = Number(this.#minutesInTheTimer.trim())
      if (!isNaN(this.#minutesInTheTimer) && Math.floor(this.#minutesInTheTimer) === this.#minutesInTheTimer) {
        this.#startTime = new Date()
        this.#stopTime = this.#startTime.setMinutes(this.#startTime.getMinutes() + this.#minutesInTheTimer)
        this.#makeCountdown = setInterval(() => {
          this.#now = new Date().getTime()
          this.#restOfTheTime = this.#stopTime - this.#now

          this.#min = Math.floor((this.#restOfTheTime % (1000 * 60 * 60)) / (1000 * 60))
          this.#sec = Math.floor((this.#restOfTheTime % (1000 * 60)) / 1000)

          if (this.#sec < 10) {
            this.#sec = '0' + this.#sec
          }
          document.getElementById('timer').innerHTML = this.#min + ':' + this.#sec
          if (this.#restOfTheTime < 0) {
            clearInterval(this.#makeCountdown)
            document.getElementById('timer').innerHTML = '00:00'
            this.#startBtn.disabled = false
            this.#stopBtn.disabled = true
          }
        }, 1000)
      } else {
        alert('Введите целое число')
        this.#startBtn.disabled = false
        this.#stopBtn.disabled = true
      }
    }

    this.#startBtn.addEventListener('click', () => {
      this.#startBtn.disabled = true
      this.#stopBtn.disabled = false
      updateTime()
    })

    this.#stopBtn.addEventListener('click', () => {
      clearInterval(this.#makeCountdown)
      this.#minutesInTheTimer = 0
      this.#startTime = 0
      this.#stopTime = 0
      this.#now = 0
      this.#restOfTheTime = 0

      this.#min = 0
      this.#sec = 0
      document.getElementById('timer').innerHTML = '00:00'

      this.#startBtn.disabled = false
      this.#stopBtn.disabled = true
    })

    this.#closeBtn.addEventListener('click', () => {
      clearInterval(this.#makeCountdown)
      this.#minutesInTheTimer = 0
      this.#startTime = 0
      this.#stopTime = 0
      this.#now = 0
      this.#restOfTheTime = 0

      this.#min = 0
      this.#sec = 0
      document.getElementById('timer').innerHTML = '00:00'

      this.#startBtn.disabled = false
      this.#stopBtn.disabled = true
      this.#timerBlock.remove()
    })
  }

  remove() {
    clearInterval(this.#makeCountdown)
    this.#timerBlock.remove()
  }
}

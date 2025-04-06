import { Module } from '../core/module'

export class BoardModule extends Module {
  #colors
  #squareNumber
  #board
  #btn
  #body

  constructor() {
    super('board', 'Board')

    this.#colors = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      '#ffc8dd',
      '#83c5be',
      '#f72585',
      '#03045e',
      '#540b0e',
      '#ffffff',
      '#5a189a',
    ]
    this.#squareNumber = 400
    this.#board = document.createElement('div')
    this.#board.className = 'boardContainer'

    this.#btn = document.createElement('button')
    this.#btn.className = 'boardBtn'
    this.#btn.textContent = 'Закрыть Board'

    this.#body = document.querySelector('body')
  }

  trigger() {
    this.#board.innerHTML = ''

    for (let i = 0; i < this.#squareNumber; i++) {
      let square = document.createElement('div')
      square.classList.add('boardSquare')

      square.addEventListener('mouseover', () => this.setColor(square))
      square.addEventListener('mouseleave', () => this.removeColor(square))

      this.#btn.addEventListener('click', () => {
        this.remove()
      })

      this.#board.append(square)
      this.#body.style.background = '#111'
      this.#body.append(this.#board, this.#btn)
    }
  }

  random() {
    let indexColor = Math.floor(Math.random() * this.#colors.length)
    return this.#colors[indexColor]
  }

  setColor(el) {
    let color = this.random()
    el.style.backgroundColor = color
    el.style.boxShadow = `0 0 3px ${color}, 0 0 15px ${color}`
  }

  removeColor(el) {
    el.style.backgroundColor = '#1d1d1d'
    el.style.boxShadow = `0 0 2px #000`
  }

  remove() {
    this.#board.remove()
    this.#btn.remove()
    this.#body.style.background = ''
  }
}

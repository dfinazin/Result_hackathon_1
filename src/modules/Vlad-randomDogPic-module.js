import { Module } from '../core/module'

export class RandomDogPic extends Module {
  #url
  #dogWrapper
  #buttonsContainer

  constructor() {
    super('randomDogPic', 'Random Dog Pic')

    this.#url = 'https://dog.ceo/api/breeds/image/random'
    this.#dogWrapper = document.createElement('div')
    this.#buttonsContainer = document.createElement('div')
  }

  trigger() {
    this.#asd()
  }

  #asd = async () => {
    try {
      let response = await fetch(this.#url)
      if (!response.ok) {
        throw new Error('!response.OK Error ошибка при запросе данных')
      }
      let data = await response.json()
      this.#addDomFunc(data)
    } catch (error) {
      console.error('Произошла ошибка при запросе данных:', error)
      alert('Не удалось загрузить изображение')
    }
  }

  #addDomFunc(dogObj) {
    const container = document.querySelector('.dogWrapper')
    const btnsContainer = document.querySelector('.buttonsContainer')

    if (container) {
      container.remove()
      btnsContainer.remove()
    }

    this.#buttonsContainer.innerHTML = ''
    this.#dogWrapper.className = 'dogWrapper'
    this.#buttonsContainer.className = 'buttonsContainer'

    this.#dogWrapper.innerHTML = `
			<div class="dogContainer">
				<img src="${dogObj.message}" alt="Dog_image" />
				<h1>Говорят собаки похожи на своих хозяев</h1>
			</div>
		`
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Закрыть'
    deleteButton.className = 'button deleteButton'

    const randomButton = document.createElement('button')
    randomButton.textContent = 'Случайная собака'
    randomButton.className = 'button randomButton'

    deleteButton.addEventListener('click', () => {
      const container = document.querySelector('.dogWrapper')
      if (container) {
        container.remove()
        this.#buttonsContainer.remove()
      }
    })

    randomButton.addEventListener('click', () => {
      this.#asd()
    })

    this.#buttonsContainer.append(deleteButton, randomButton)
    document.body.append(this.#dogWrapper, this.#buttonsContainer)
  }

  remove() {
    this.#dogWrapper.remove()
    this.#buttonsContainer.remove()
  }
}

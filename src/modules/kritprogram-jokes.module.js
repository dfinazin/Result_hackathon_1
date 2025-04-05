import { Module } from '../core/module.js';
import { fetchRandomProgrammingJoke } from '../utils.js';

export class JokesModule extends Module {
    #modalElement = null;

    constructor() {
        super('jokes', 'Programming Jokes');
    }

    async trigger() {
        try {
            const joke = await fetchRandomProgrammingJoke();
            this.#renderModal(joke);
            this.#setupEventListeners();
        } catch (error) {
            this.#handleError(error);
        }
    }

    #renderModal(joke) {
        this.#modalElement = document.createElement('div');
        this.#modalElement.className = 'jokes-modal';

        this.#modalElement.innerHTML = `
        <div class="jokes-modal__content">
          <p class="jokes-modal__setup">${joke.setup}</p>
          <p class="jokes-modal__punchline">${joke.punchline}</p>
          <button class="jokes-modal__close-button">Close</button>
        </div>
      `;

        document.body.appendChild(this.#modalElement);
    }

    #setupEventListeners() {
        const punchline = this.#modalElement.querySelector('.jokes-modal__punchline');
        const closeButton = this.#modalElement.querySelector('.jokes-modal__close-button');

        punchline.addEventListener('click', this.#revealPunchline.bind(this));
        closeButton.addEventListener('click', this.#closeModal.bind(this));
        this.#modalElement.addEventListener('click', this.#handleOutsideClick.bind(this));
    }

    #revealPunchline(e) {
        e.target.classList.add('jokes-modal__punchline--visible');
    }

    #closeModal() {
        if (this.#modalElement) {
            document.body.removeChild(this.#modalElement);
            this.#modalElement = null;
        }
    }

    #handleOutsideClick(e) {
        if (e.target === this.#modalElement) {
            this.#closeModal();
        }
    }

    #handleError(error) {
        console.error('JokesModule error:', error);
        alert(error.message);
    }
}
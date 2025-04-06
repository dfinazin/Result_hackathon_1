import { Module } from '../core/module.js';
import { fetchRandomProgrammingJoke } from '../utils.js';

export class JokesModule extends Module {
    #modalElement = null;
    #contentElement = null;
    #isLoading = false;

    constructor() {
        super('jokes', 'Programming Jokes');
    }

    async trigger() {
        if (this.#isLoading) return;

        if (!this.#modalElement) {
            this.#createModal();
        }

        await this.#loadNewJoke();
    }

    #createModal() {
        this.#modalElement = document.createElement('div');
        this.#modalElement.className = 'jokes-modal';

        this.#contentElement = document.createElement('div');
        this.#contentElement.className = 'jokes-modal__content';

        this.#modalElement.appendChild(this.#contentElement);
        document.body.appendChild(this.#modalElement);

        this.#setupEventListeners();
    }

    async #loadNewJoke() {
        this.#isLoading = true;
        this.#showLoader();

        try {
            const joke = await fetchRandomProgrammingJoke();
            this.#renderJokeContent(joke);
        } catch (error) {
            this.#handleError(error);
        } finally {
            this.#isLoading = false;
        }
    }

    #showLoader() {
        this.#contentElement.innerHTML = `
        <div class="jokes-modal__loader-container">
          <div class="jokes-modal__loader"></div>
          <p class="jokes-modal__loading-text">Loading joke...</p>
        </div>
      `;
    }

    #renderJokeContent(joke) {
        this.#contentElement.innerHTML = `
        <p class="jokes-modal__setup">${joke.setup}</p>
        <p class="jokes-modal__punchline">${joke.punchline}</p>
        <div class="jokes-modal__buttons-container">
          <button class="jokes-modal__refresh-button">New Joke</button>
          <button class="jokes-modal__close-button">Close</button>
        </div>
      `;

        this.#setupContentEventListeners();
    }

    #setupEventListeners() {
        this.#modalElement.addEventListener('click', (e) => {
            if (e.target === this.#modalElement) {
                this.#closeModal();
            }
        });
    }

    #setupContentEventListeners() {
        const punchline = this.#contentElement.querySelector('.jokes-modal__punchline');
        const refreshButton = this.#contentElement.querySelector('.jokes-modal__refresh-button');
        const closeButton = this.#contentElement.querySelector('.jokes-modal__close-button');

        punchline?.addEventListener('click', () => {
            punchline.classList.add('jokes-modal__punchline--visible');
        });

        refreshButton?.addEventListener('click', () => this.#loadNewJoke());
        closeButton?.addEventListener('click', () => this.#closeModal());
    }

    #closeModal() {
        if (this.#modalElement) {
            document.body.removeChild(this.#modalElement);
            this.#modalElement = null;
            this.#contentElement = null;
        }
    }

    #handleError(error) {
        console.error('JokesModule error:', error);
        this.#contentElement.innerHTML = `
        <div class="jokes-modal__error">
          <p>Error loading joke. Please try again.</p>
          <button class="jokes-modal__refresh-button">Retry</button>
        </div>
      `;
        this.#contentElement.querySelector('.jokes-modal__refresh-button')
            .addEventListener('click', () => this.#loadNewJoke());
    }
}
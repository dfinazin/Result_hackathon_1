import { Module } from '../core/module.js'

export class CryptoVolumeModule extends Module {
    constructor() {
        super('crypto', 'Топ-10 криптовалют (объём MEXC)');
    }

    async trigger() {
        try {
            const res = await fetch('https://corsproxy.io/?url=https://api.mexc.com/api/v3/ticker/24hr');

            const data = await res.json();

            const sorted = data
                .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
                .slice(0, 10);

            this.container = document.createElement('div');
            this.container.className = 'crypto-module';

            const title = document.createElement('h3');
            title.textContent = '🔝 Топ 10 криптовалют по объёму (MEXC)';
            this.container.appendChild(title);

            const list = document.createElement('ul');
            sorted.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${item.symbol} — $${(+item.quoteVolume).toLocaleString()}`;
                list.appendChild(li);
            })

            this.container.appendChild(list);
            document.body.appendChild(this.container);

            setTimeout(() => {
                this.container.remove();
            }, 5000);

        } catch (err) {
            console.error('Ошибка при получении данных с MEXC:', err);
        }
    }

    remove() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
}

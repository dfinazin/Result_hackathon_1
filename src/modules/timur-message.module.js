import { Module } from '../core/module'

export class MessageModule extends Module {
    constructor() {
        super('message', 'Показать сообщение');
    }

    trigger(text) {
        const message = document.createElement('div');
        message.className = 'message-module';
        message.textContent = text;

        document.body.append(message);

        setTimeout(() => {
            message.classList.add('open');
        }, 200);

        setTimeout(() => {
            message.classList.remove('open');
        }, 4500);

        setTimeout(() => {
            message.remove();

        }, 5000);
    }
}
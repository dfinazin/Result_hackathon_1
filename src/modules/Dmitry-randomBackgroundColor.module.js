import {Module} from '../core/module'
import {getRandomColorHex} from '../utils'

export class randomBackgroundColor extends Module {
    constructor() {
        super('randomBackgroundColor', 'Поменять цвет фона')
    }

    trigger() {
        const $body = document.querySelector('body')
        $body.style.backgroundColor = getRandomColorHex()
    }
}
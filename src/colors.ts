import Colors from './data/colors.json';
import HTMLColors from './data/htmlColors.json';
import { randomByte } from './numbers';
import {
    randFrac,
    randFromArray,
    randInt,
    randPerc,
    withDigits,
} from './utils';

const colorHex = Object.keys(Colors);
const colorNames = Object.values(Colors);
const htmlColorName = Object.keys(HTMLColors);
const htmlColorHex = Object.values(HTMLColors);

export function randomColorHex(): string {
    return `#${randInt(0xffffff).toString(16).padStart(6, '0').toUpperCase()}`;
}

export function randomColorHexSimple(): string {
    const r = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    const g = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    const b = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    return `#${r}${g}${b}`;
}

export function randomColorHexUseful(): string {
    return randFromArray(colorHex);
}

export function randomColorRGB(): string {
    return `rgb(${randomByte()}, ${randomByte()}, ${randomByte()})`;
}

export function randomColorRGBA(): string {
    return `rgb(${randomByte()}, ${randomByte()}, ${randomByte()}, ${withDigits(
        Math.random(),
        2,
    )})`;
}

export function randomColorHSL(): string {
    return `hsl(${randInt(360)}, ${randFrac()}, ${randFrac()})`;
}

export function randomColorHSB(): string {
    return `hsb(${randInt(360)}, ${randFrac()}, ${randFrac()})`;
}

export function randomColorCMYK(): string {
    return `cmyk(${randPerc()}, ${randPerc()}, ${randPerc()}, ${randPerc()})`;
}

export function randomHTMLHexColor(): string {
    return randFromArray(htmlColorHex);
}

export function randomHTMLColorName(): string {
    return randFromArray(htmlColorName);
}

export function randomColorName(): string {
    return randFromArray(colorNames);
}

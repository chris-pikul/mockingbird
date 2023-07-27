import { randomByte } from './numbers';
import { randFrac, randInt, randPerc, withDigits } from './utils';

export function randomColorHex(): string {
    return `#${randInt(0xffffff).toString(16).padStart(6, '0').toUpperCase()}`;
}

export function randomColorHexSimple(): string {
    const r = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    const g = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    const b = (randInt(4) * 4).toString(16).toUpperCase().repeat(2);
    return `#${r}${g}${b}`;
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

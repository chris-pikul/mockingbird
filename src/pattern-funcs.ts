import {
    randomColorCMYK,
    randomColorHSB,
    randomColorHSL,
    randomColorHex,
    randomColorHexUseful,
    randomColorName,
    randomColorRGB,
    randomHTMLColorName,
    randomHTMLHexColor,
} from './colors';
import { randomBool } from './misc';
import { degree, radians, randomDigits } from './numbers';
import { PatternFunction } from './pattern';
import { fromRegex } from './regex';
import {
    loremIpsumParagraphs,
    loremIpsumSentences,
    loremIpsumWords,
    randomASCIICharacterLength,
    randomASCIISymbolLength,
    randomLatinLetterLength,
} from './text';
import { rand, randInt } from './utils';

export const directiveDB: Record<string, PatternFunction> = {
    bool: () => randomBool(),
    boolean: () => randomBool(),
    float: (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) =>
        rand(min, max).toString(),
    unit: () => rand().toString(),
    int: (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) =>
        randInt(min, max).toString(),
    byte: () => randInt(0, 0xff + 1).toString(),
    short: () => randInt(0, 0xffff + 1).toString(),
    hex8: () =>
        randInt(0, 0xff + 1)
            .toString(16)
            .padStart(2, '0'),
    hex16: () =>
        randInt(0, 0xffff + 1)
            .toString(16)
            .padStart(4, '0'),
    hex24: () =>
        randInt(0, 0xffffff + 1)
            .toString(16)
            .padStart(6, '0'),
    hex32: () =>
        randInt(0, 0xffffffff + 1)
            .toString(16)
            .padStart(8, '0'),
    digit: (len: number = 1) => randomDigits(len.toString()),
    degree: () => degree(),
    radian: () => radians(),
    letter: (len: number = 1) => randomLatinLetterLength(len.toString()),
    symbol: (len: number = 1) => randomASCIISymbolLength(len.toString()),
    character: (len: number = 1) => randomASCIICharacterLength(len.toString()),
    color: () => randomColorHexUseful(),
    colorhex: () => randomColorHex(),
    colorrgb: () => randomColorRGB(),
    colorhsl: () => randomColorHSL(),
    colorhsb: () => randomColorHSB(),
    colorcmyk: () => randomColorCMYK(),
    htmlcolor: () => randomHTMLHexColor(),
    htmlcolorname: () => randomHTMLColorName(),
    colorname: () => randomColorName(),
    word: (len: number = 1) => loremIpsumWords(len.toString()),
    sentence: (len: number = 1) => loremIpsumSentences(len.toString()),
    paragraph: (len: number = 1) => loremIpsumParagraphs(len.toString()),
    regex: (pattern: string) => fromRegex(pattern),
} as const;

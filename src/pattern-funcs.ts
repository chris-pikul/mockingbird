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
import { bigserial, guid, serial, urid, uuid } from './identifiers';
import { randomBool } from './misc';
import { degree, hex, radians, randomDigits } from './numbers';
import { PatternFunction } from './pattern';
import {
    age,
    email,
    firstName,
    fullName,
    lastName,
    middleName,
    phoneNumberDE,
    phoneNumberE164,
    phoneNumberEU,
    phoneNumberFR,
    phoneNumberIT,
    phoneNumberUK,
    phoneNumberUS,
    ssn,
} from './person';
import { fromRegex } from './regex';
import {
    englishAdjective,
    englishAdverb,
    englishNoun,
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
    hex: (len: number = 1) => hex(len),
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
    adjective: englishAdjective,
    adverb: englishAdverb,
    noun: englishNoun,
    regex: (pattern: string) => fromRegex(pattern),
    firstname: () => firstName(),
    lastname: () => lastName(),
    middlename: () => middleName(),
    fullname: () => fullName(),
    phoneus: phoneNumberUS,
    phoneuk: phoneNumberUK,
    phonede: phoneNumberDE,
    phonefr: phoneNumberFR,
    phoneit: phoneNumberIT,
    phoneeu: phoneNumberEU,
    e164: phoneNumberE164,
    email,
    age,
    ssn,
    serial,
    bigserial,
    guid,
    uuid,
    urid,
} as const;

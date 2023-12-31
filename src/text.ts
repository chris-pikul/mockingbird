import { loremIpsum } from 'lorem-ipsum';

import Adjectives from './data/adjectives.json';
import Adverbs from './data/adverbs.json';
import Nouns from './data/nouns.json';
import {
    RandRange,
    buildLengthRepeater,
    buildRandomCharFromSet,
    randFromArray,
    randFromRanges,
    randInt,
} from './utils';
import { getConfigValue } from './vscode';

const LATIN_LETTERS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LATIN_LETTERS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const LATIN_NUMBERS = '0123456789';
const ASCII_SYMBOLS = '!@#$%^&*()_+-=[]\\{}|;\':",./<>?`~';

const EMOJI_RANGES: RandRange[] = [
    [0x1f600, 0x1f64f],
    [0x2600, 0x26ff],
    [0x1f300, 0x1f5ff],
    [0x1f900, 0x1f9ff],
    [0x1fa70, 0x1fa7c],
    [0x1fa80, 0x1fa88],
    [0x1fa90, 0x1fabd],
    [0x1fabf, 0x1fac5],
    [0x1face, 0x1fadb],
    [0x1fae0, 0x1f1e8],
    [0x1faf0, 0x1faf8],
];

export const randomLatinLetterUpper =
    buildRandomCharFromSet(LATIN_LETTERS_UPPER);
export const randomLatinLetterUpperLength = buildLengthRepeater(
    randomLatinLetterUpper,
);

export const randomLatinLetterLower =
    buildRandomCharFromSet(LATIN_LETTERS_LOWER);
export const randomLatinLetterLowerLength = buildLengthRepeater(
    randomLatinLetterLower,
);

export const randomLatinNumber = buildRandomCharFromSet(LATIN_NUMBERS);
export const randomLatinNumberLength = buildLengthRepeater(randomLatinNumber);

export const randomASCIISymbol = buildRandomCharFromSet(ASCII_SYMBOLS);
export const randomASCIISymbolLength = buildLengthRepeater(randomASCIISymbol);

export const randomLatinLetter = buildRandomCharFromSet(
    LATIN_LETTERS_LOWER,
    LATIN_LETTERS_UPPER,
);
export const randomLatinLetterLength = buildLengthRepeater(randomLatinLetter);

export const randomLatinLetterNumber = buildRandomCharFromSet(
    LATIN_LETTERS_LOWER,
    LATIN_LETTERS_UPPER,
    LATIN_NUMBERS,
);
export const randomLatinLetterNumberLength = buildLengthRepeater(
    randomLatinLetterNumber,
);

export const randomASCIICharacter = buildRandomCharFromSet(
    LATIN_LETTERS_LOWER,
    LATIN_LETTERS_UPPER,
    LATIN_NUMBERS,
    ASCII_SYMBOLS,
);
export const randomASCIICharacterLength =
    buildLengthRepeater(randomASCIICharacter);

export function randomEmoji(): string {
    const code = randInt(EMOJI_RANGES[0][0], EMOJI_RANGES[0][1] + 1);
    return String.fromCodePoint(code);
}

export function randomEmojiPicto(): string {
    const code = randFromRanges(...EMOJI_RANGES);
    return String.fromCodePoint(code);
}

function generateLoremIpsum(
    count: number,
    units: 'words' | 'sentences' | 'paragraphs',
    isHTML = false,
): string {
    return loremIpsum({
        count,
        units,
        format: isHTML ? 'html' : 'plain',
        sentenceLowerBound: getConfigValue('text.lorem_ipsum.sentenceWordsMin'),
        sentenceUpperBound: getConfigValue('text.lorem_ipsum.sentenceWordsMax'),
        paragraphLowerBound: getConfigValue(
            'text.lorem_ipsum.paragraphSentencesMin',
        ),
        paragraphUpperBound: getConfigValue(
            'text.lorem_ipsum.paragraphSentencesMax',
        ),
    });
}

export function loremIpsumWords(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'words');
}

export function loremIpsumSentences(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'sentences');
}

export function loremIpsumParagraphs(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'paragraphs');
}

export function loremIpsumHTMLWords(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'words', true);
}

export function loremIpsumHTMLSentences(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'sentences', true);
}

export function loremIpsumHTMLParagraphs(length?: string): string {
    const len = length ? parseInt(length) : 1;
    return generateLoremIpsum(len, 'paragraphs', true);
}

export function englishAdjective(): string {
    return randFromArray(Adjectives);
}

export function englishAdverb(): string {
    return randFromArray(Adverbs);
}

export function englishNoun(): string {
    return randFromArray(Nouns);
}

import { buildLengthRepeater, buildRandomCharFromSet } from './utils';

const LATIN_LETTERS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LATIN_LETTERS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const LATIN_NUMBERS = '0123456789';
const ASCII_SYMBOLS = '!@#$%^&*()_+-=[]\\{}|;\':",./<>?`~';

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

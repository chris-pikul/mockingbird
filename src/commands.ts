import {
    randomColorCMYK,
    randomColorHSB,
    randomColorHSL,
    randomColorHex,
    randomColorHexSimple,
    randomColorHexUseful,
    randomColorName,
    randomColorRGB,
    randomColorRGBA,
    randomHTMLColorName,
    randomHTMLHexColor,
} from './colors';
import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
    currentLocaleDate,
    currentLocaleTime,
    currentLocaleTimestamp,
    currentTimestampFormatted,
    randomDay,
    randomISODate,
    randomISOTime,
    randomISOTimestamp,
    randomMonth,
    randomYear,
} from './date-time';
import { bigserial, guid, serial, urid, uuid } from './identifiers';
import {
    city,
    countryCode,
    countryName,
    gpsDD,
    gpsDMM,
    gpsDMS,
    latitude,
    longitude,
    postZip,
    stateCode,
    stateName,
    usStreetAddress,
} from './locations';
import { randomBool } from './misc';
import {
    degree,
    getE,
    getEpsilon,
    getPI,
    hex,
    radians,
    randomBinaryInteger16,
    randomBinaryInteger24,
    randomBinaryInteger32,
    randomByte,
    randomDigit,
    randomDigits,
    randomFloat,
    randomFloatRange,
    randomHexInteger16,
    randomHexInteger24,
    randomHexInteger32,
    randomInteger,
    randomInteger32,
    randomIntegerRange,
    randomNegativeFloat,
    randomNegativeInteger,
    randomOctalInteger16,
    randomOctalInteger24,
    randomOctalInteger32,
    randomPercentage,
    randomPositiveFloat,
    randomPositiveInteger,
    randomPrime,
    randomShort,
    randomSignedByte,
    randomSignedShort,
    randomSimpleFloat,
    randomUnit,
} from './numbers';
import {
    age,
    email,
    firstName,
    fullName,
    lastName,
    middleInitial,
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
import { PROMPT_LENGTH, PROMPT_PATTERN, PROMPT_SAVE_REGEX } from './prompts';
import { fromRegex, saveRegexPreset, useRegexPreset } from './regex';
import { cacheTemplate, provideTemplate, useCachedTemplate } from './template';
import {
    englishAdjective,
    englishAdverb,
    englishNoun,
    loremIpsumHTMLParagraphs,
    loremIpsumHTMLSentences,
    loremIpsumHTMLWords,
    loremIpsumParagraphs,
    loremIpsumSentences,
    loremIpsumWords,
    randomASCIICharacter,
    randomASCIICharacterLength,
    randomASCIISymbol,
    randomASCIISymbolLength,
    randomEmoji,
    randomEmojiPicto,
    randomLatinLetter,
    randomLatinLetterLength,
    randomLatinLetterLower,
    randomLatinLetterLowerLength,
    randomLatinLetterNumber,
    randomLatinLetterNumberLength,
    randomLatinLetterUpper,
    randomLatinLetterUpperLength,
    randomLatinNumber,
    randomLatinNumberLength,
} from './text';
import { Command } from './vscode';

const commands: Command[] = [
    {
        key: 'others.randomBool',
        category: 'Random',
        title: 'Boolean',
        func: randomBool,
    },
    {
        key: 'regular_expression.fromRegex',
        category: 'Regular Expression',
        title: 'Generate Using Regular Expression',
        shortTitle: 'RegEx',
        func: fromRegex,
        prompt: {
            message:
                'Enter a regular expression to generate random data using, you can provide a standard syntax including `/d{2,10} w/i` using flags, or just the pattern as a string',
            placeholder: '/hello [A-Z][a-z]{3,10}/',
            validator: (input?: string) => !!(input && input.length > 0),
            errorMessage: 'Please enter a non-empty regular expression',
        },
    },
    {
        key: 'regular_expression.saveRegex',
        category: 'Regular Expression',
        title: 'Save Selection as Regular Expression Preset',
        shortTitle: 'Save RegEx',
        func: saveRegexPreset,
        prompt: PROMPT_SAVE_REGEX,
        isCommand: true,
    },
    {
        key: 'regular_expression.useRegex',
        category: 'Regular Expression',
        title: 'Use Regular Expression Preset',
        shortTitle: 'Use RegEx',
        func: useRegexPreset,
        isCommand: true,
    },
    {
        key: 'template.cacheSet',
        category: 'Template',
        title: 'Cache Selection As Template',
        shortTitle: 'Cache Template',
        func: cacheTemplate,
        isCommand: true,
    },
    {
        key: 'template.input',
        category: 'Template',
        title: 'Template From Input',
        shortTitle: 'Input Template',
        func: provideTemplate,
        prompt: PROMPT_PATTERN,
    },
    {
        key: 'template.cacheUse',
        category: 'Template',
        title: 'Use Cached Template',
        shortTitle: 'Use Template',
        func: useCachedTemplate,
    },
    {
        key: 'template.cacheUseLength',
        category: 'Template',
        title: 'Use Cached Template Multiple Times',
        shortTitle: 'Use Template Multiple',
        func: useCachedTemplate,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'date-time.currentISOTimestamp',
        category: 'Insert Date/Time',
        title: 'Current ISO Timestamp',
        shortTitle: 'ISO Timestamp',
        func: currentISOTimestamp,
    },
    {
        key: 'date-time.currentISODate',
        category: 'Insert Date/Time',
        title: 'Current ISO Date',
        shortTitle: 'ISO Date',
        func: currentISODate,
    },
    {
        key: 'date-time.currentISOTime',
        category: 'Insert Date/Time',
        title: 'Current ISO Time',
        shortTitle: 'ISO Time',
        func: currentISOTime,
    },
    {
        key: 'date-time.currentLocaleTimestamp',
        category: 'Insert Date/Time',
        title: 'Current Timestamp Using Local Locale',
        shortTitle: 'Timestamp Local Locale',
        func: currentLocaleTimestamp,
    },
    {
        key: 'date-time.currentLocaleDate',
        category: 'Insert Date/Time',
        title: 'Current Date Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleDate,
    },
    {
        key: 'date-time.currentLocaleTime',
        category: 'Insert Date/Time',
        title: 'Current Time Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleTime,
    },
    {
        key: 'date-time.currentFormatted',
        category: 'Insert Date/Time',
        title: 'Current Date/Time With Formatting',
        shortTitle: 'Formatted Date/Time',
        func: currentTimestampFormatted,
        prompt: {
            message:
                'Supply a formatting string that uses Moment.JS/Date-FNS acceptable tokens',
            placeholder: 'h:mm do MMMM uuuu',
            defaultValue: "h:mmaaa, do 'of' MMMM uuuu",
            validator: (input?: string) => !!(input && input.length > 0),
            errorMessage: 'Please enter a formatting string',
        },
    },
    {
        key: 'date-time.randomYear',
        category: 'Random Date/Time',
        title: 'Year (1900-Now)',
        shortTitle: 'Random Year',
        func: randomYear,
    },
    {
        key: 'date-time.randomYearCustom',
        category: 'Random Date/Time',
        title: 'Year With Custom Range',
        shortTitle: 'Random Year Custom',
        func: randomYear,
        prompt: {
            message:
                'Supply a range as a space separated minimum and maximum, the maximum is inclusive',
            placeholder: '1900 2000',
            defaultValue: `1900 ${new Date().getFullYear()}`,
            validator: (input?: string) => !!(input && input.indexOf(' ') > 0),
            errorMessage:
                'Please enter a valid space-deliminated integer range',
        },
    },
    {
        key: 'date-time.randomMonth',
        category: 'Random Date/Time',
        title: 'Month (1..12)',
        shortTitle: 'Random Month',
        func: randomMonth,
    },
    {
        key: 'date-time.randomDay',
        category: 'Random Date/Time',
        title: 'Day (1..30)',
        shortTitle: 'Random Day',
        func: randomDay,
    },
    {
        key: 'date-time.randomISOTimestamp',
        category: 'Random Date/Time',
        title: 'ISO Timestamp (1970..Now)',
        shortTitle: 'Random ISO Timestamp',
        func: randomISOTimestamp,
    },
    {
        key: 'date-time.randomISODate',
        category: 'Random Date/Time',
        title: 'ISO Date (1970..Now)',
        shortTitle: 'Random ISO Date',
        func: randomISODate,
    },
    {
        key: 'date-time.randomISOTime',
        category: 'Random Date/Time',
        title: 'ISO Time',
        shortTitle: 'Random ISO Time',
        func: randomISOTime,
    },
    {
        key: 'number.pi',
        category: 'Insert Number',
        title: 'Insert Pi',
        shortTitle: 'Pi',
        func: getPI,
    },
    {
        key: 'number.e',
        category: 'Insert Number',
        title: "Insert Euler's Number",
        shortTitle: 'Euler',
        func: getE,
    },
    {
        key: 'number.epsilon',
        category: 'Insert Number',
        title: 'Insert Epsilon (Really Small Number)',
        shortTitle: 'Epsilon',
        func: getEpsilon,
    },
    {
        key: 'number.randomUnit',
        category: 'Random Number',
        title: 'Unit Float (0..1)',
        shortTitle: 'Random Unit',
        func: randomUnit,
    },
    {
        key: 'number.randomPositiveFloat',
        category: 'Random Number',
        title: 'Positive Float (0..MAX)',
        shortTitle: 'Random Positive Float',
        func: randomPositiveFloat,
    },
    {
        key: 'number.randomNegativeFloat',
        category: 'Random Number',
        title: 'Negative Float (0..-MAX)',
        shortTitle: 'Random Negative Float',
        func: randomNegativeFloat,
    },
    {
        key: 'number.randomFloat',
        category: 'Random Number',
        title: 'Complex Float (-MAX/2..MAX/2)',
        shortTitle: 'Random Complex Float',
        func: randomFloat,
    },
    {
        key: 'number.randomSimpleFloat',
        category: 'Random Number',
        title: 'Simple Float',
        shortTitle: 'Random Float',
        func: randomSimpleFloat,
    },
    {
        key: 'number.randomFloatRange',
        category: 'Random Number',
        title: 'Float in Range',
        shortTitle: 'Random Float',
        func: randomFloatRange,
        prompt: {
            message:
                'Provide a range by specifying the minimum and maximum values separated by a space.',
            defaultValue: '0 100',
            placeholder: 'MIN MAX',
            validator: (input?: string) => !!(input && input.indexOf(' ') > 0),
        },
    },
    {
        key: 'number.randomPositiveInteger',
        category: 'Random Number',
        title: 'Positive Integer',
        shortTitle: 'Random Positive Integer',
        func: randomPositiveInteger,
    },
    {
        key: 'number.randomNegativeInteger',
        category: 'Random Number',
        title: 'Negative Integer',
        shortTitle: 'Random Negative Integer',
        func: randomNegativeInteger,
    },
    {
        key: 'number.randomInteger',
        category: 'Random Number',
        title: 'Integer',
        shortTitle: 'Random Integer',
        func: randomInteger,
    },
    {
        key: 'number.randomInteger32',
        category: 'Random Number',
        title: 'Integer (32bit)',
        shortTitle: 'Random Integer 32',
        func: randomInteger32,
    },
    {
        key: 'number.randomIntegerRange',
        category: 'Random Number',
        title: 'Integer Range',
        shortTitle: 'Random Integer Range',
        func: randomIntegerRange,
        prompt: {
            message:
                'Provide a range by specifying the minimum and maximum values separated by a space.',
            defaultValue: '0 100',
            placeholder: 'MIN MAX',
            validator: (input?: string) => !!(input && input.indexOf(' ') > 0),
        },
    },
    {
        key: 'number.randomByte',
        category: 'Random Number',
        title: 'Byte (Unsigned)',
        shortTitle: 'Random Byte',
        func: randomByte,
    },
    {
        key: 'number.randomSignedByte',
        category: 'Random Number',
        title: 'Byte (Signed)',
        shortTitle: 'Random Signed Byte',
        func: randomSignedByte,
    },
    {
        key: 'number.randomShort',
        category: 'Random Number',
        title: 'Short (16bit Integer)',
        shortTitle: 'Random Short',
        func: randomShort,
    },
    {
        key: 'number.randomSignedShort',
        category: 'Random Number',
        title: 'Signed Short (16bit Integer)',
        shortTitle: 'Random Signed Short',
        func: randomSignedShort,
    },
    {
        key: 'number.randomHexInteger16',
        category: 'Random Number',
        title: 'Hexidecimal Integer (16bit)',
        shortTitle: 'Random 16bit Hex',
        func: randomHexInteger16,
    },
    {
        key: 'number.randomHexInteger24',
        category: 'Random Number',
        title: 'Hexidecimal Integer (24bit)',
        shortTitle: 'Random 24bit Hex',
        func: randomHexInteger24,
    },
    {
        key: 'number.randomHexInteger32',
        category: 'Random Number',
        title: 'Hexidecimal Integer (32bit)',
        shortTitle: 'Random 32bit Hex',
        func: randomHexInteger32,
    },
    {
        key: 'number.hexCharacters',
        category: 'Random Number',
        title: 'Hexidecimal Characters To Length',
        shortTitle: 'Random Hex',
        func: hex,
    },
    {
        key: 'number.randomDigit',
        category: 'Random Number',
        title: 'Digit (0-9)',
        shortTitle: 'Random Digit',
        func: randomDigit,
    },
    {
        key: 'number.randomOctalInteger16',
        category: 'Random Number',
        title: 'Octal Integer (16bit)',
        shortTitle: 'Random Octal 16',
        func: randomOctalInteger16,
    },
    {
        key: 'number.randomOctalInteger24',
        category: 'Random Number',
        title: 'Octal Integer (24bit)',
        shortTitle: 'Random Octal 24',
        func: randomOctalInteger24,
    },
    {
        key: 'number.randomOctalInteger32',
        category: 'Random Number',
        title: 'Octal Integer (32bit)',
        shortTitle: 'Random Octal 32',
        func: randomOctalInteger32,
    },
    {
        key: 'number.randomBinaryInteger16',
        category: 'Random Number',
        title: 'Binary Integer (16bit)',
        shortTitle: 'Random Binary 16',
        func: randomBinaryInteger16,
    },
    {
        key: 'number.randomBinaryInteger24',
        category: 'Random Number',
        title: 'Binary Integer (24bit)',
        shortTitle: 'Random Binary 24',
        func: randomBinaryInteger24,
    },
    {
        key: 'number.randomBinaryInteger32',
        category: 'Random Number',
        title: 'Binary Integer (32bit)',
        shortTitle: 'Random Binary 32',
        func: randomBinaryInteger32,
    },
    {
        key: 'number.randomPrime',
        category: 'Random Number',
        title: 'Prime',
        shortTitle: 'Random Prime',
        func: randomPrime,
    },
    {
        key: 'number.randomPercentage',
        category: 'Random Number',
        title: 'Percentage',
        func: randomPercentage,
    },
    {
        key: 'number.randomDigits',
        category: 'Random Number',
        title: 'Digits To Length',
        shortTitle: 'Digits',
        func: randomDigits,
        prompt: {
            message: 'Please enter the total length of random digits you want',
            placeholder: '100',
            validator: (input?: string) => !!(input && parseInt(input) > 0),
            errorMessage: 'Please enter a positive integer',
        },
    },
    {
        key: 'number.degree',
        category: 'Random Number',
        title: 'Degree (whole number)',
        func: degree,
    },
    {
        key: 'number.radian',
        category: 'Random Number',
        title: 'Radian (2-digit precision)',
        func: radians,
    },
    {
        key: 'color.randomHex',
        category: 'Random Color',
        title: 'Hex Color',
        func: randomColorHex,
    },
    {
        key: 'color.randomHexSimple',
        category: 'Random Color',
        title: 'Hex Color (Simple Limited-Precision)',
        func: randomColorHexSimple,
    },
    {
        key: 'color.randomHexUseful',
        category: 'Random Color',
        title: 'Hex Color (Known Colors)',
        func: randomColorHexUseful,
    },
    {
        key: 'color.randomRGB',
        category: 'Random Color',
        title: 'RGB Color',
        func: randomColorRGB,
    },
    {
        key: 'color.randomRGBA',
        category: 'Random Color',
        title: 'RGBA Color',
        func: randomColorRGBA,
    },
    {
        key: 'color.randomHSL',
        category: 'Random Color',
        title: 'HSL Color',
        func: randomColorHSL,
    },
    {
        key: 'color.randomHSB',
        category: 'Random Color',
        title: 'HSB Color',
        func: randomColorHSB,
    },
    {
        key: 'color.randomCMYK',
        category: 'Random Color',
        title: 'CMYK Color',
        func: randomColorCMYK,
    },
    {
        key: 'color.htmlHex',
        category: 'Random Color',
        title: 'Hex Color From HTML/CSS Colors',
        shortTitle: 'HTML Hex Color',
        func: randomHTMLHexColor,
    },
    {
        key: 'color.htmlName',
        category: 'Random Color',
        title: 'Named Color From HTML/CSS',
        shortTitle: 'Named Color',
        func: randomHTMLColorName,
    },
    {
        key: 'color.name',
        category: 'Random Color',
        title: 'Color Name',
        shortTitle: 'Color Name',
        func: randomColorName,
    },
    {
        key: 'text.latin-ascii.letterUpper',
        category: 'Random Text',
        title: 'Latin Upper-case Letter',
        func: randomLatinLetterUpper,
    },
    {
        key: 'text.latin-ascii.latinLetterUpperLength',
        category: 'Random Text',
        title: 'Latin Upper-case Letter To Length',
        func: randomLatinLetterUpperLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.latinLetterLower',
        category: 'Random Text',
        title: 'Latin Lower-case Letter',
        func: randomLatinLetterLower,
    },
    {
        key: 'text.latin-ascii.latinLetterLowerLength',
        category: 'Random Text',
        title: 'Latin Lower-case Letter To Length',
        func: randomLatinLetterLowerLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.latinLetter',
        category: 'Random Text',
        title: 'Latin Letter (A-Z, a-z)',
        func: randomLatinLetter,
    },
    {
        key: 'text.latin-ascii.latinLetterLength',
        category: 'Random Text',
        title: 'Latin Letter (A-Z, a-z) To Length',
        func: randomLatinLetterLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.latinNumber',
        category: 'Random Text',
        title: 'Latin Number/Digit',
        func: randomLatinNumber,
    },
    {
        key: 'text.latin-ascii.latinNumberLength',
        category: 'Random Text',
        title: 'Latin Number/Digit To Length',
        func: randomLatinNumberLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.latinCharacter',
        category: 'Random Text',
        title: 'Latin Character (A-Z, a-z, 0-9)',
        func: randomLatinLetterNumber,
    },
    {
        key: 'text.latin-ascii.latinCharacterLength',
        category: 'Random Text',
        title: 'Latin Character (A-Z, a-z, 0-9) To Length',
        func: randomLatinLetterNumberLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.asciiSymbol',
        category: 'Random Text',
        title: 'Latin/ASCII Symbol',
        func: randomASCIISymbol,
    },
    {
        key: 'text.latin-ascii.asciiSymbolLength',
        category: 'Random Text',
        title: 'Latin/ASCII Symbol To Length',
        func: randomASCIISymbolLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.latin-ascii.asciiCharacter',
        category: 'Random Text',
        title: 'ASCII Character (A-Z, a-z, 0-9, symbols)',
        func: randomASCIICharacter,
    },
    {
        key: 'text.latin-ascii.asciiCharacterLength',
        category: 'Random Text',
        title: 'ASCII Character (A-Z, a-z, 0-9, symbols) To Length',
        func: randomASCIICharacterLength,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.emoji',
        category: 'Random Text',
        title: 'Emoji (Standard Block)',
        shortTitle: 'Emoji',
        func: randomEmoji,
    },
    {
        key: 'text.emojiPicto',
        category: 'Random Text',
        title: 'Emoji (Extended Blocks)',
        shortTitle: 'Emoji',
        func: randomEmojiPicto,
    },
    {
        key: 'text.lorem_ipsum.word',
        category: 'Random Text',
        title: 'Lorem Ipsum Word (Single)',
        shortTitle: 'Word',
        func: loremIpsumWords,
    },
    {
        key: 'text.lorem_ipsum.words',
        category: 'Random Text',
        title: 'Lorem Ipsum Words To Length',
        shortTitle: 'Words',
        func: loremIpsumWords,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.lorem_ipsum.sentence',
        category: 'Random Text',
        title: 'Lorem Ipsum Sentence (Single)',
        shortTitle: 'Sentence',
        func: loremIpsumSentences,
    },
    {
        key: 'text.lorem_ipsum.sentences',
        category: 'Random Text',
        title: 'Lorem Ipsum Sentences To Length',
        shortTitle: 'Sentences',
        func: loremIpsumSentences,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.lorem_ipsum.paragraph',
        category: 'Random Text',
        title: 'Lorem Ipsum Paragraph (Single)',
        shortTitle: 'Paragraph',
        func: loremIpsumParagraphs,
    },
    {
        key: 'text.lorem_ipsum.paragraphs',
        category: 'Random Text',
        title: 'Lorem Ipsum Paragraphs To Length',
        shortTitle: 'Paragraphs',
        func: loremIpsumParagraphs,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.lorem_ipsum.wordHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Word (Single)',
        shortTitle: 'Word',
        func: loremIpsumHTMLWords,
    },
    {
        key: 'text.lorem_ipsum.wordsHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Words To Length',
        shortTitle: 'Words',
        func: loremIpsumHTMLWords,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.lorem_ipsum.sentenceHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Sentence (Single)',
        shortTitle: 'Sentence',
        func: loremIpsumHTMLSentences,
    },
    {
        key: 'text.lorem_ipsum.sentencesHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Sentences To Length',
        shortTitle: 'Sentences',
        func: loremIpsumHTMLSentences,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.lorem_ipsum.paragraphHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Paragraph (Single)',
        shortTitle: 'Paragraph',
        func: loremIpsumHTMLParagraphs,
    },
    {
        key: 'text.lorem_ipsum.paragraphsHTML',
        category: 'Random Text',
        title: 'Lorem Ipsum HTML Paragraphs To Length',
        shortTitle: 'Paragraphs',
        func: loremIpsumHTMLParagraphs,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'text.adjective',
        category: 'Random Text',
        title: 'English Adjective',
        func: englishAdjective,
    },
    {
        key: 'text.adverb',
        category: 'Random Text',
        title: 'English Adverb',
        func: englishAdverb,
    },
    {
        key: 'text.noun',
        category: 'Random Text',
        title: 'English Noun',
        func: englishNoun,
    },
    {
        key: 'person.firstName',
        category: 'Random Person',
        title: 'First Name',
        func: firstName,
    },
    {
        key: 'person.lastName',
        category: 'Random Person',
        title: 'Last Name',
        func: lastName,
    },
    {
        key: 'person.anyName',
        category: 'Random Person',
        title: 'Any Name',
        func: middleName,
    },
    {
        key: 'person.middleInitial',
        category: 'Random Person',
        title: 'Middle Initial',
        func: middleInitial,
    },
    {
        key: 'person.fullName',
        category: 'Random Person',
        title: 'Full Name',
        func: fullName,
    },
    {
        key: 'person.phone_number.phoneNumberUS',
        category: 'Random Person',
        title: 'Phone Number (US)',
        func: phoneNumberUS,
    },
    {
        key: 'person.phone_number.phoneNumberUK',
        category: 'Random Person',
        title: 'Phone Number (UK)',
        func: phoneNumberUK,
    },
    {
        key: 'person.phone_number.phoneNumberDE',
        category: 'Random Person',
        title: 'Phone Number (DE)',
        func: phoneNumberDE,
    },
    {
        key: 'person.phone_number.phoneNumberFR',
        category: 'Random Person',
        title: 'Phone Number (FR)',
        func: phoneNumberFR,
    },
    {
        key: 'person.phone_number.phoneNumberIT',
        category: 'Random Person',
        title: 'Phone Number (IT)',
        func: phoneNumberIT,
    },
    {
        key: 'person.phone_number.phoneNumberEU',
        category: 'Random Person',
        title: 'Phone Number (EU)',
        func: phoneNumberEU,
    },
    {
        key: 'person.phone_number.phoneNumberE164',
        category: 'Random Person',
        title: 'Phone Number (E.164)',
        func: phoneNumberE164,
    },
    {
        key: 'person.email',
        category: 'Random Person',
        title: 'Email Address (Known Providers)',
        func: email,
    },
    {
        key: 'person.age',
        category: 'Random Person',
        title: 'Age (Normal Distribution)',
        shortTitle: 'Age',
        func: age,
    },
    {
        key: 'person.ageMin',
        category: 'Random Person',
        title: 'Age With Minimum (Normal Distribution)',
        shortTitle: 'Minimum Age',
        func: age,
        prompt: PROMPT_LENGTH,
    },
    {
        key: 'person.ssn',
        category: 'Random Person',
        title: 'Social Security Number (US)',
        shortTitle: 'SSN',
        func: ssn,
    },
    {
        key: 'identifier.serial',
        category: 'Random Identifier',
        title: 'Serial (32bit Integer)',
        func: serial,
    },
    {
        key: 'identifier.bigserial',
        category: 'Random Identifier',
        title: 'Big Serial (64bit Integer)',
        func: bigserial,
    },
    {
        key: 'identifier.guid',
        category: 'Random Identifier',
        title: 'GUID',
        func: guid,
    },
    {
        key: 'identifier.uuid',
        category: 'Random Identifier',
        title: 'UUID',
        func: uuid,
    },
    {
        key: 'identifier.urid',
        category: 'Random Identifier',
        title: 'URID',
        func: urid,
    },
    {
        key: 'location.longitude',
        category: 'Random Location',
        title: 'Longitude',
        func: longitude,
    },
    {
        key: 'location.latitude',
        category: 'Random Location',
        title: 'Latitude',
        func: latitude,
    },
    {
        key: 'location.gpsDMS',
        category: 'Random Location',
        title: 'GPS Coordinate (DMS)',
        shortTitle: 'GPS DMS',
        func: gpsDMS,
    },
    {
        key: 'location.gpsDMM',
        category: 'Random Location',
        title: 'GPS Coordinate (DMM)',
        shortTitle: 'GPS DMM',
        func: gpsDMM,
    },
    {
        key: 'location.gpsDD',
        category: 'Random Location',
        title: 'GPS Coordinate (DD)',
        shortTitle: 'GPS DD',
        func: gpsDD,
    },
    {
        key: 'location.city',
        category: 'Random Location',
        title: 'City (US)',
        func: city,
    },
    {
        key: 'location.stateCode',
        category: 'Random Location',
        title: 'State Code (US)',
        func: stateCode,
    },
    {
        key: 'location.stateName',
        category: 'Random Location',
        title: 'State Name (US)',
        func: stateName,
    },
    {
        key: 'location.countryCode',
        category: 'Random Location',
        title: 'Country Code (ISO 2-letter)',
        shortTitle: 'Country Code',
        func: countryCode,
    },
    {
        key: 'location.countryName',
        category: 'Random Location',
        title: 'Country Name',
        shortTitle: 'Country',
        func: countryName,
    },
    {
        key: 'location.postZip',
        category: 'Random Location',
        title: 'US Zip Code',
        func: postZip,
    },
    {
        key: 'location.streetAddress',
        category: 'Random Location',
        title: 'US Street Address',
        func: usStreetAddress,
    },
];
export default commands;

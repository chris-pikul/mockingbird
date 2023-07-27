import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
    currentLocaleDate,
    currentLocaleTime,
    currentLocaleTimestamp,
    currentTimestampFormatted,
} from './date-time';
import {
    getE,
    getEpsilon,
    getPI,
    randomBinaryInteger16,
    randomBinaryInteger24,
    randomBinaryInteger32,
    randomByte,
    randomDigit,
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
    randomPositiveFloat,
    randomPositiveInteger,
    randomPrime,
    randomShort,
    randomSignedByte,
    randomSignedShort,
    randomSimpleFloat,
    randomUnit,
} from './numbers';
import { Command } from './vscode';

const commands: Command[] = [
    {
        key: 'date-time.currentISOTimestamp',
        title: 'Insert: Current ISO Timestamp',
        shortTitle: 'ISO Timestamp',
        func: currentISOTimestamp,
    },
    {
        key: 'date-time.currentISODate',
        title: 'Insert: Current ISO Date',
        shortTitle: 'ISO Date',
        func: currentISODate,
    },
    {
        key: 'date-time.currentISOTime',
        title: 'Insert: Current ISO Time',
        shortTitle: 'ISO Time',
        func: currentISOTime,
    },
    {
        key: 'date-time.currentLocaleTimestamp',
        title: 'Insert: Current Timestamp Using Local Locale',
        shortTitle: 'Timestamp Local Locale',
        func: currentLocaleTimestamp,
    },
    {
        key: 'date-time.currentLocaleDate',
        title: 'Insert: Current Date Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleDate,
    },
    {
        key: 'date-time.currentLocaleTime',
        title: 'Insert: Current Time Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleTime,
    },
    {
        key: 'date-time.currentFormatted',
        title: 'Insert: Current Date/Time With Formatting',
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
        key: 'number.pi',
        title: 'Insert: Pi',
        shortTitle: 'Pi',
        func: getPI,
    },
    {
        key: 'number.e',
        title: "Insert: Euler's Number",
        shortTitle: 'Euler',
        func: getE,
    },
    {
        key: 'number.epsilon',
        title: 'Insert: Epsilon (Really Small Number)',
        shortTitle: 'Epsilon',
        func: getEpsilon,
    },
    {
        key: 'number.randomUnit',
        title: 'Random: Unit Float (0..1)',
        shortTitle: 'Random Unit',
        func: randomUnit,
    },
    {
        key: 'number.randomPositiveFloat',
        title: 'Random: Positive Float (0..MAX)',
        shortTitle: 'Random Positive Float',
        func: randomPositiveFloat,
    },
    {
        key: 'number.randomNegativeFloat',
        title: 'Random: Negative Float (0..-MAX)',
        shortTitle: 'Random Negative Float',
        func: randomNegativeFloat,
    },
    {
        key: 'number.randomFloat',
        title: 'Random: Complex Float (-MAX/2..MAX/2)',
        shortTitle: 'Random Complex Float',
        func: randomFloat,
    },
    {
        key: 'number.randomSimpleFloat',
        title: 'Random: Simple Float',
        shortTitle: 'Random Float',
        func: randomSimpleFloat,
    },
    {
        key: 'number.randomFloatRange',
        title: 'Random: Float in Range',
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
        title: 'Random: Positive Integer',
        shortTitle: 'Random Positive Integer',
        func: randomPositiveInteger,
    },
    {
        key: 'number.randomNegativeInteger',
        title: 'Random: Negative Integer',
        shortTitle: 'Random Negative Integer',
        func: randomNegativeInteger,
    },
    {
        key: 'number.randomInteger',
        title: 'Random: Integer',
        shortTitle: 'Random Integer',
        func: randomInteger,
    },
    {
        key: 'number.randomInteger32',
        title: 'Random: 32bit Integer',
        shortTitle: 'Random Integer 32',
        func: randomInteger32,
    },
    {
        key: 'number.randomIntegerRange',
        title: 'Random: Integer Range',
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
        title: 'Random: Byte (Unsigned)',
        shortTitle: 'Random Byte',
        func: randomByte,
    },
    {
        key: 'number.randomSignedByte',
        title: 'Random: Byte (Signed)',
        shortTitle: 'Random Signed Byte',
        func: randomSignedByte,
    },
    {
        key: 'number.randomShort',
        title: 'Random: Short (16bit Integer)',
        shortTitle: 'Random Short',
        func: randomShort,
    },
    {
        key: 'number.randomSignedShort',
        title: 'Random: Signed Short (16bit Integer)',
        shortTitle: 'Random Signed Short',
        func: randomSignedShort,
    },
    {
        key: 'number.randomHexInteger16',
        title: 'Random: Hexidecimal Integer (16bit)',
        shortTitle: 'Random 16bit Hex',
        func: randomHexInteger16,
    },
    {
        key: 'number.randomHexInteger24',
        title: 'Random: Hexidecimal Integer (24bit)',
        shortTitle: 'Random 24bit Hex',
        func: randomHexInteger24,
    },
    {
        key: 'number.randomHexInteger32',
        title: 'Random: Hexidecimal Integer (32bit)',
        shortTitle: 'Random 32bit Hex',
        func: randomHexInteger32,
    },
    {
        key: 'number.randomDigit',
        title: 'Random: Digit (0-9)',
        shortTitle: 'Random Digit',
        func: randomDigit,
    },
    {
        key: 'number.randomOctalInteger16',
        title: 'Random: Octal Integer (16bit)',
        shortTitle: 'Random Octal 16',
        func: randomOctalInteger16,
    },
    {
        key: 'number.randomOctalInteger24',
        title: 'Random: Octal Integer (24bit)',
        shortTitle: 'Random Octal 24',
        func: randomOctalInteger24,
    },
    {
        key: 'number.randomOctalInteger32',
        title: 'Random: Octal Integer (32bit)',
        shortTitle: 'Random Octal 32',
        func: randomOctalInteger32,
    },
    {
        key: 'number.randomBinaryInteger16',
        title: 'Random: Binary Integer (16bit)',
        shortTitle: 'Random Binary 16',
        func: randomBinaryInteger16,
    },
    {
        key: 'number.randomBinaryInteger24',
        title: 'Random: Binary Integer (24bit)',
        shortTitle: 'Random Binary 24',
        func: randomBinaryInteger24,
    },
    {
        key: 'number.randomBinaryInteger32',
        title: 'Random: Binary Integer (32bit)',
        shortTitle: 'Random Binary 32',
        func: randomBinaryInteger32,
    },
    {
        key: 'number.randomPrime',
        title: 'Random: Prime',
        shortTitle: 'Random Prime',
        func: randomPrime,
    },
];
export default commands;

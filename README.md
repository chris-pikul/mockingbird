# Mockingbird

Have you ever needed randomly generated data? Maybe you are building mock data for API testing, or you need to check that your UI will look correct when real data comes in. Perhaps you just want to build unit tests that have reasonable test data. Either way, that's what Mockingbird is for.

Mockingbird generates random data of all sorts. And not just numbers and random characters: you can also generate _Lorem Ipsum_ text, reverse regular expression (data that passes a given RegEx), names, identifiers, JSON pattern templates, and more!

## Features

There are plenty of features to list here, so they are broken up into categories just like the context menu is. If there is something missing, check the [Contributing](#contributing) section below.

### Regular Expressions

Provided a Regular Expression, will generate random data that conforms to it. This is the most powerful, and easiest way to get data if another generator doesn't work for you. You can provide a full expression with flags, or just the pattern portion.

Example: Given the pattern `/[a-z0-9]{3,16}@[a-z0-9]{3,32}\.(?:com|net|org)/i`, will generate random "email address" looking text.

<details>
    <summary>Example Output</summary>
    <pre>0M1cMByJsC8j@aSqqoNXbognNtR2nwAjVe.NET
Wco0nh2A44@i5s9.com
Vtp@U3GTp.neT</pre>
</details>
<br>

For extra flexibility there are commands to create new presets that are saved to your settings
and recall them later.

### Patterns

For other cases that don't fit with the provided generators, you can customize the output by building a pattern string. Unlike the [Regular Expression](#regular-expressions) feature, these are a bit more readable and useful for when static and dynamic text intersect.

They use a formatting string that takes double-brace `{{directive}}` style formatting strings. Within the formatting directive you can specify the data type generator to use for part.

Example: `Hello {{name}}, your birthday is on {{localeDate}}, your favorite color is {{namedColor}} and you have {{int(0, 10)}} cats.`

Outputs: `Hello Johnathan Smith, your birthday is on 2/4/1981, your favorite color is mauve and you have 3 cats.`

See the documentation at [Patterns](https://github.com/chris-pikul/mockingbird/blob/main/PATTERNS.md) for
more information.

### Templates

__This feature is WIP, and below is the idea of how it WILL work__

To help facilitate making mock data, usually you need to fill structures to build some sort of database. This is useful for API testing before you really wire things up. To do this, you can leverage the [Patterns](#patterns) feature and super charge it by building a multi-line pattern of how the data should look. You can then generate as many copies of that as you want.

To do this, you can write the template out in a file view, select it, and use the `Use Selection As Pattern Template` command to have it parsed and ready. Now, wherever you want to insert this, you can use either the `Generate Using Cached Pattern Template` to execute the template once, or `Generate Multiple Using Cached Pattern Template` to specify how many times you want it executed.

### Date/Time

- __Current Timestamps__: Insert the current date/time using the system locale, or using ISO formats. You can specify either date, time, or both.
- __Formatted Timestamps__: Leveraging [Date-FNS](https://date-fns.org/v2.30.0/docs/format) you can format the date/time output using the current time.
- __Random Timestamps__: Generate random days, months, years, and ISO timestamps.

### Number

- __Math Constants__: Insert PI, Euler's Number, or Epsilon easily.
- __Random Floats__: Generate floats like units, positive, negative, or both. Can specify a range as well.
- __Random Integers__: Generate integers either signed, or unsigned. Positive, or negative. Even bytes, and shorts (16-bit). You can specify a range as well.
- __Hexidecimal__: Make hexidecimal numbers with a customizable prefix. Allows for 16-bit, 24-bit, and 32-bit.
- __Octals__: Make octal numbers with a customizable prefix. Allows for 16-bit, 24-bit, and 32-bit.
- __Binary__: Make binary numbers with a customizable prefix. Allows for 16-bit, 24-bit, and 32-bit.
- __Primes__: Using a table of the first 100,000 prime numbers, can insert a random one.
- __Percentage__: Make a random whole percentage between 0 and 100.
- __Degree__: Random whole-number degree between 0..360 (non-inclusive).
- __Radian__: Random radian to 2-digit precision.

### Color

- __Hexidecimal__: Generate a random hexidecimal color (24-bit).
- __Simple Hexidecimal__: Make a hexidecimal, but with limited precision so the color contrast is higher. Results in less "muddy" colors.
- __RGB__: Make functional notation RGB colors like CSS accepts, can optionally include an alpha opacity.
- __HSL/HSB__: Make functional notation HSL/HSB colors like CSS accepts.
- __CMYK__: Make functional notation CMYK colors using percentages.

### Text

- __Latin/ASCII__: Make characters, or strings to length of letters, numbers, symbols or any combination of them.
- __Emojis__: Insert emoji characters either using the limited simple block of original smilies, or the extended blocks of Unicode pictograms as well. Warning, not all of them display correctly in VSCode.
- __Lorem Ipsum__: Create dummy text of either words, sentences, or paragraphs. Can also have them wrapped in HTML `<p></p>` tags.
- __Adjectives__: Based on common English adjectives
- __Adverbs__: Based on common English adverbs
- __Nouns__: Based on common English nouns

### Person
- __Names__: Generate first names, last names, middle names, full names.
- __Phone Numbers__: Using US format, common EU formats, or even E.164 format.
- __Email__: Make an email using known providers
- __Age__: Generate an age using Normal Distribution for realistic results
- __SSN__: US Social Security Numbers

### Locations
- __GPS__: Longitude, latitude, different notations, anywhere on the planet.
- __Cities__: Grab a random city name from the US
- __States__: Use the state code, or the full name
- __Countries__: ISO 2-letter codes, and the written name
- __Zip Code__: US Postal zip code (5 digits)
- __Street Address__: Make a fake US street address

### Miscellaneous

- __Boolean__: Generate a random "true" or "false".

## Extension Settings

This extension contributes the following settings:

* `mockingbird.contextMenu.enabled`: Enable/disable using the context menu (right click) for quick data insertion.
* `mockingbird.date-time.randomTimezone`: Enable/disable using a random timezone when generating random date/time strings.
* `mockingbird.numbers.hexPrefix`: Prefix to use when generating hexidecimal numbers. By default, this is `0x`, resulting in something like `0xF821`.
* `mockingbird.numbers.octalPrefix`: Prefix to use when generating octal numbers. By default, this is `0o`, resulting in something like `0o5781`.
* `mockingbird.numbers.binaryPrefix`: Prefix to use when generating binary numbers. By default, this is `0b`, resulting in something like `0b10011010`.
* `mockingbird.text.lorem_ipsum.sentenceWordsMin`: When generating Lorem Ipsum, specifies the minimum number of words in a sentence. Defaults to 3.
* `mockingbird.text.lorem_ipsum.sentenceWordsMax`: When generating Lorem Ipsum, specifies the maximum number of words in a sentence. Defaults to 10.
* `mockingbird.text.lorem_ipsum.paragraphSentencesMin`: When generating Lorem Ipsum, specifies the minimum number of sentences in a paragraph. Defaults to 2.
* `mockingbird.text.lorem_ipsum.paragraphSentencesMax`: When generating Lorem Ipsum, specifies the maximum number of sentences in a paragraph.

## Available Commands

Here is the list of all commands this extension provides:

* `mb.others.randomBool` Random: Boolean
* `mb.regular_expression.fromRegex` Regular Expression: Generate Using Regular Expression
* `mb.regular_expression.saveRegex` Regular Expression: Save Selection as Regular Expression Preset
* `mb.regular_expression.useRegex` Regular Expression: Use Regular Expression Preset
* `mb.pattern.cacheSet` Pattern: Cache Selection As Pattern
* `mb.pattern.input` Pattern: Pattern From Input
* `mb.pattern.cacheUse` Pattern: Use Cached Pattern
* `mb.pattern.cacheUseLength` Pattern: Use Cached Pattern Multiple Times
* `mb.date-time.currentISOTimestamp` Insert Date/Time: Current ISO Timestamp
* `mb.date-time.currentISODate` Insert Date/Time: Current ISO Date
* `mb.date-time.currentISOTime` Insert Date/Time: Current ISO Time
* `mb.date-time.currentLocaleTimestamp` Insert Date/Time: Current Timestamp Using Local Locale
* `mb.date-time.currentLocaleDate` Insert Date/Time: Current Date Using Local Locale
* `mb.date-time.currentLocaleTime` Insert Date/Time: Current Time Using Local Locale
* `mb.date-time.currentFormatted` Insert Date/Time: Current Date/Time With Formatting
* `mb.date-time.randomYear` Random Date/Time: Year (1900-Now)
* `mb.date-time.randomYearCustom` Random Date/Time: Year With Custom Range
* `mb.date-time.randomMonth` Random Date/Time: Month (1..12)
* `mb.date-time.randomDay` Random Date/Time: Day (1..30)
* `mb.date-time.randomISOTimestamp` Random Date/Time: ISO Timestamp (1970..Now)
* `mb.date-time.randomISODate` Random Date/Time: ISO Date (1970..Now)
* `mb.date-time.randomISOTime` Random Date/Time: ISO Time
* `mb.number.pi` Insert Number: Insert Pi
* `mb.number.e` Insert Number: Insert Euler's Number
* `mb.number.epsilon` Insert Number: Insert Epsilon (Really Small Number)
* `mb.number.randomUnit` Random Number: Unit Float (0..1)
* `mb.number.randomPositiveFloat` Random Number: Positive Float (0..MAX)
* `mb.number.randomNegativeFloat` Random Number: Negative Float (0..-MAX)
* `mb.number.randomFloat` Random Number: Complex Float (-MAX/2..MAX/2)
* `mb.number.randomSimpleFloat` Random Number: Simple Float
* `mb.number.randomFloatRange` Random Number: Float in Range
* `mb.number.randomPositiveInteger` Random Number: Positive Integer
* `mb.number.randomNegativeInteger` Random Number: Negative Integer
* `mb.number.randomInteger` Random Number: Integer
* `mb.number.randomInteger32` Random Number: Integer (32bit)
* `mb.number.randomIntegerRange` Random Number: Integer Range
* `mb.number.randomByte` Random Number: Byte (Unsigned)
* `mb.number.randomSignedByte` Random Number: Byte (Signed)
* `mb.number.randomShort` Random Number: Short (16bit Integer)
* `mb.number.randomSignedShort` Random Number: Signed Short (16bit Integer)
* `mb.number.randomHexInteger16` Random Number: Hexidecimal Integer (16bit)
* `mb.number.randomHexInteger24` Random Number: Hexidecimal Integer (24bit)
* `mb.number.randomHexInteger32` Random Number: Hexidecimal Integer (32bit)
* `mb.number.hexCharacters` Random Number: Hexidecimal Characters To Length
* `mb.number.randomDigit` Random Number: Digit (0-9)
* `mb.number.randomOctalInteger16` Random Number: Octal Integer (16bit)
* `mb.number.randomOctalInteger24` Random Number: Octal Integer (24bit)
* `mb.number.randomOctalInteger32` Random Number: Octal Integer (32bit)
* `mb.number.randomBinaryInteger16` Random Number: Binary Integer (16bit)
* `mb.number.randomBinaryInteger24` Random Number: Binary Integer (24bit)
* `mb.number.randomBinaryInteger32` Random Number: Binary Integer (32bit)
* `mb.number.randomPrime` Random Number: Prime
* `mb.number.randomPercentage` Random Number: Percentage
* `mb.number.randomDigits` Random Number: Digits To Length
* `mb.number.degree` Random Number: Degree (whole number)
* `mb.number.radian` Random Number: Radian (2-digit precision)
* `mb.color.randomHex` Random Color: Hex Color
* `mb.color.randomHexSimple` Random Color: Hex Color (Simple Limited-Precision)
* `mb.color.randomHexUseful` Random Color: Hex Color (Known Colors)
* `mb.color.randomRGB` Random Color: RGB Color
* `mb.color.randomRGBA` Random Color: RGBA Color
* `mb.color.randomHSL` Random Color: HSL Color
* `mb.color.randomHSB` Random Color: HSB Color
* `mb.color.randomCMYK` Random Color: CMYK Color
* `mb.color.htmlHex` Random Color: Hex Color From HTML/CSS Colors
* `mb.color.htmlName` Random Color: Named Color From HTML/CSS
* `mb.color.name` Random Color: Color Name
* `mb.text.latin-ascii.letterUpper` Random Text: Latin Upper-case Letter
* `mb.text.latin-ascii.latinLetterUpperLength` Random Text: Latin Upper-case Letter To Length
* `mb.text.latin-ascii.latinLetterLower` Random Text: Latin Lower-case Letter
* `mb.text.latin-ascii.latinLetterLowerLength` Random Text: Latin Lower-case Letter To Length
* `mb.text.latin-ascii.latinLetter` Random Text: Latin Letter (A-Z, a-z)
* `mb.text.latin-ascii.latinLetterLength` Random Text: Latin Letter (A-Z, a-z) To Length
* `mb.text.latin-ascii.latinNumber` Random Text: Latin Number/Digit
* `mb.text.latin-ascii.latinNumberLength` Random Text: Latin Number/Digit To Length
* `mb.text.latin-ascii.latinCharacter` Random Text: Latin Character (A-Z, a-z, 0-9)
* `mb.text.latin-ascii.latinCharacterLength` Random Text: Latin Character (A-Z, a-z, 0-9) To Length
* `mb.text.latin-ascii.asciiSymbol` Random Text: Latin/ASCII Symbol
* `mb.text.latin-ascii.asciiSymbolLength` Random Text: Latin/ASCII Symbol To Length
* `mb.text.latin-ascii.asciiCharacter` Random Text: ASCII Character (A-Z, a-z, 0-9, symbols)
* `mb.text.latin-ascii.asciiCharacterLength` Random Text: ASCII Character (A-Z, a-z, 0-9, symbols) To Length
* `mb.text.emoji` Random Text: Emoji (Standard Block)
* `mb.text.emojiPicto` Random Text: Emoji (Extended Blocks)
* `mb.text.lorem_ipsum.word` Random Text: Lorem Ipsum Word (Single)
* `mb.text.lorem_ipsum.words` Random Text: Lorem Ipsum Words To Length
* `mb.text.lorem_ipsum.sentence` Random Text: Lorem Ipsum Sentence (Single)
* `mb.text.lorem_ipsum.sentences` Random Text: Lorem Ipsum Sentences To Length
* `mb.text.lorem_ipsum.paragraph` Random Text: Lorem Ipsum Paragraph (Single)
* `mb.text.lorem_ipsum.paragraphs` Random Text: Lorem Ipsum Paragraphs To Length
* `mb.text.lorem_ipsum.wordHTML` Random Text: Lorem Ipsum HTML Word (Single)
* `mb.text.lorem_ipsum.wordsHTML` Random Text: Lorem Ipsum HTML Words To Length
* `mb.text.lorem_ipsum.sentenceHTML` Random Text: Lorem Ipsum HTML Sentence (Single)
* `mb.text.lorem_ipsum.sentencesHTML` Random Text: Lorem Ipsum HTML Sentences To Length
* `mb.text.lorem_ipsum.paragraphHTML` Random Text: Lorem Ipsum HTML Paragraph (Single)
* `mb.text.lorem_ipsum.paragraphsHTML` Random Text: Lorem Ipsum HTML Paragraphs To Length
* `mb.text.adjective` Random Text: English Adjective
* `mb.text.adverb` Random Text: English Adverb
* `mb.text.noun` Random Text: English Noun
* `mb.person.firstName` Random Person: First Name
* `mb.person.lastName` Random Person: Last Name
* `mb.person.anyName` Random Person: Any Name
* `mb.person.middleInitial` Random Person: Middle Initial
* `mb.person.fullName` Random Person: Full Name
* `mb.person.phone_number.phoneNumberUS` Random Person: Phone Number (US)
* `mb.person.phone_number.phoneNumberUK` Random Person: Phone Number (UK)
* `mb.person.phone_number.phoneNumberDE` Random Person: Phone Number (DE)
* `mb.person.phone_number.phoneNumberFR` Random Person: Phone Number (FR)
* `mb.person.phone_number.phoneNumberIT` Random Person: Phone Number (IT)
* `mb.person.phone_number.phoneNumberEU` Random Person: Phone Number (EU)
* `mb.person.phone_number.phoneNumberE164` Random Person: Phone Number (E.164)
* `mb.person.email` Random Person: Email Address (Known Providers)
* `mb.person.age` Random Person: Age (Normal Distribution)
* `mb.person.ageMin` Random Person: Age With Minimum (Normal Distribution)
* `mb.person.ssn` Random Person: Social Security Number (US)
* `mb.identifier.serial` Random Identifier: Serial (32bit Integer)
* `mb.identifier.bigserial` Random Identifier: Big Serial (64bit Integer)
* `mb.identifier.guid` Random Identifier: GUID
* `mb.identifier.uuid` Random Identifier: UUID
* `mb.identifier.urid` Random Identifier: URID
* `mb.location.longitude` Random Location: Longitude
* `mb.location.latitude` Random Location: Latitude
* `mb.location.gpsDMS` Random Location: GPS Coordinate (DMS)
* `mb.location.gpsDMM` Random Location: GPS Coordinate (DMM)
* `mb.location.gpsDD` Random Location: GPS Coordinate (DD)
* `mb.location.city` Random Location: City (US)
* `mb.location.stateCode` Random Location: State Code (US)
* `mb.location.stateName` Random Location: State Name (US)
* `mb.location.countryCode` Random Location: Country Code (ISO 2-letter)
* `mb.location.countryName` Random Location: Country Name
* `mb.location.postZip` Random Location: US Zip Code
* `mb.location.streetAddress` Random Location: US Street Address

## Contributing

If you have a feature suggestion, or something you want to implement yourself, I'm open to ideas and PRs. The repository is on [GitHub](https://github.com/chris-pikul/mockingbird). If it's just a request, you can use the [Issues](https://github.com/chris-pikul/mockingbird/issues) page.

## Acknowledgments

Thanks to Jorge Rebocho for the inspiration with their [vscode-random](https://marketplace.visualstudio.com/items?itemName=jrebocho.vscode-random) extension.

Uses the following third-party packages:

* [`date-fns`](https://npmjs.org/package/date-fns)
* [`lorem-ipsum`](https://npmjs.org/package/lorem-ipsum)
* [`randexp`](https://npmjs.org/package/randexp)

## License

Licensed under Apache 2.0, see the license file at [LICENSE](./LICENSE) for the full text. Copyright 2023 Chris Pikul.
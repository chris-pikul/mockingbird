# Mockingbird Patterns

Mockingbird supplies a templating engine that fills the gap when boring data just
doesn't cut it anymore. This is particularly useful if you need structured mocks
such as JSON examples.

The patterns, or templates, take the form of text that includes the `{{}}`
double-bracket tokens. Within the brackets you can specify a generator to use
for that portion. When executed, the pattern will replace the token with the
generators output. Each generator is expected to return random data on each
execution.

Some generators allow the usage of arguments to help define how they work. For
some, this is optional and a reasonable default exists. Refer to the
documentation below for how to call these directives.

## Available Template Directives

Here is the list of available directives you can use in your patterns. Note that
any argument that features a default using an `=` sign is optional, and the
default value after the equals will fill it's place if absent.

Also, these directives are case-insensitive, but any strings entered as
arguments will keep their casing.

Only `boolean`, `number`, and `string` arguments are accepted at this moment.

* `bool`/`boolean` - Boolean true/false
* `float(min = MIN_SAFE_INTEGER, max = MAX_SAFE_INTEGER)` - Float within the given range
* `unit` - Float between 0 and 1
* `int(min = MIN_SAFE_INTEGER, max = MAX_SAFE_INTEGER)` - Integer within the given range
* `byte` - Integer between 0 and 0xFF
* `short` - Integer between 0 and 0xFFFF
* `hex8` - 8-bit hexidecimal number
* `hex16` - 16-bit hexidecimal number
* `hex24` - 24-bit hexidecimal number
* `hex32` - 32-bit hexidecimal number
* `hex` - Hexidecimal characters to length
* `degree` - Whole-number degree 0..360
* `radian` - Radian with up to 2-digits precision
* `digit(len = 1)` - Latin digits to length
* `letter(len = 1)` - Latin letters to length (case-insensitive)
* `symbol(len = 1)` - ASCII symbols to length
* `character(len = 1)` - ASCII/Latin characters to length
* `color` - Random hex color from a premade list
* `colorHEX` - Random hex color
* `colorRGB` - Random RGB color
* `colorHSL` - Random HSL color
* `colorHSB` - Random HSB color
* `colorCMYK` - Random CMYK color
* `htmlColor` - Hexidecimal color from the HTML/CSS named colors table
* `htmlColorName` - Color name from the HTML/CSS named colors table
* `colorName` - Name of a color from a premade list
* `word(len = 1)` - Lorem Ipsum words to length
* `sentence(len = 1)` - Lorem Ipsum sentences to length
* `paragraph(len = 1)` - Lorem Ipsum paragraphs to length
* `adjective` - English Adjective
* `adverb` - English Adverb
* `noun` - English Noun
* `regex(pattern)` - Execute a reverse Regular Expression using the given pattern
* `firstName` - Common first name
* `lastName` - Common last name
* `middleName` - Middle name generated from random first/last name
* `fullName` - Generates a random full name with optional middle names
* `phoneUS` - Phone number in US format
* `phoneUK` - Phone number in UK format
* `phoneDE` - Phone number in DE format
* `phoneFR` - Phone number in FR format
* `phoneIT` - Phone number in IT format
* `phoneEU` - Phone number in EU format, being one of the above countries
* `e164` - Phone number in international E.164 format
* `email` - Valid email using known providers
* `age(min = 1)` - Age using Normal Distribution, can supply a minimum age
* `ssn` - US Social Security Number
* `serial` - 32-bit Integer
* `bigserial` - 64-bit Integer
* `guid` - Globally Unique Identifier (Microsoft)
* `uuid` - Universally Unique Identifier version 4
* `urid` - Modified UUID that is compressed using Base-32
* `longitude` - Longitude degrees -180..180
* `latitude` - Latitude degrees -90..90
* `gps` - GPS Coordinates in Degrees-Minutes-Seconds
* `gpsDMS` - GPS Coordinates in Degrees-Minutes-Seconds
* `gpsDMM` - GPS Coordinates in Degrees and Decimal Minutes
* `gpsDD` - GPS Coordinates in Decimal Degrees
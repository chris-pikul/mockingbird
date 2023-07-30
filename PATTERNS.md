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
* `digit(len = 1)` - Latin digits to length
* `letter(len = 1)` - Latin letters to length (case-insensitive)
* `symbol(len = 1)` - ASCII symbols to length
* `character(len = 1)` - ASCII/Latin characters to length
* `colorHEX` - Random hex color
* `colorRGB` - Random RGB color
* `colorHSL` - Random HSL color
* `colorHSB` - Random HSB color
* `colorCMYK` - Random CMYK color
* `word(len = 1)` - Lorem Ipsum words to length
* `sentence(len = 1)` - Lorem Ipsum sentences to length
* `paragraph(len = 1)` - Lorem Ipsum paragraphs to length
* `regex(pattern)` - Execute a reverse Regular Expression using the given pattern

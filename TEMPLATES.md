# Mockingbird Templates

Templates are structured pieces of text that have template-tag instructions imbedded in them. These templat-tags can perform a number of the Mockingbird generators. These templates are powered by [Handlebars.js](https://handlebarsjs.com/), so following their documentation can also help you.

At the very root, the template-tags take the form of double-brace enclosed annotations such as `{{ float }}`. Inserting these tags anywhere in your text will have them replaced with the output of that generator.

Some generators accept inputs, such as the `regex` generator, or the `digits` generator. To provide arguments to a tag, just space separate them after the the generator name. Such as `{{float 10 20}}` to generate a random float between 10 and 20.

It's important to note that if a generator expects a string, you can wrap them in quotes. This is especially important for the `regex` generator which expects a regular expression to be passed into it. For example: `{{regex "[A-Z]\-\d{10}"}}` is properly formed.

## Repeating Blocks

For your convienience there is a "block helper" provided to repeat sections of template for you. Using the handlebars notation, it is prefixed with a `#` for the opening tag, and requires a closing tag prefixed with `/`. The block helper is simply "`repeat`" and it optionally accepts up to 2 arguments:

* __No Arguments__ it will only execute the block once.
* __One Argument__ is taken as the number of times to repeat the block. 
* __Two Arguments__ is understood as a range, and will execute a random number of times between the first and second argument.

Example:
```handlebars
{{! execute the generators between 2 and 5 times}}
{{#repeat 2 5}}
    {{ word }}
    {{ digit }}
{{/repeat}}
```

<details>
    <summary>Example Output</summary>
    <pre>    ipsum
    0
    nisi
    7
    officia
    5</pre>
</details>

## Maybe Yes, Maybe No

In case you might want to output something, or might not, there's the `mayb` block. This simple blocks just flips a virtual coin and decides whether it wants to output or not. That simple.

## Available Generators

* `bool | boolean` Boolean
* `regex | regexp` __(accepts input)__ Generate Using Regular Expression
* `year` __(accepts input)__ Year With Custom Range
* `month` Month (1..12)
* `day` Day (1..30)
* `timestamp` ISO Timestamp (1970..Now)
* `date` ISO Date (1970..Now)
* `time` ISO Time
* `unit` Unit Float (0..1)
* `float` __(accepts input)__ Float in Range
* `integer | int` __(accepts input)__ Integer Range
* `byte` Byte (Unsigned)
* `signed-byte` Byte (Signed)
* `short` Short (16bit Integer)
* `signed-short` Signed Short (16bit Integer)
* `hex16` Hexidecimal Integer (16bit)
* `hex24` Hexidecimal Integer (24bit)
* `hex32` Hexidecimal Integer (32bit)
* `hex` Hexidecimal Characters To Length
* `digit` Digit (0-9)
* `octal16` Octal Integer (16bit)
* `octal24` Octal Integer (24bit)
* `octal32` Octal Integer (32bit)
* `binary16` Binary Integer (16bit)
* `binary24` Binary Integer (24bit)
* `binary32` Binary Integer (32bit)
* `prime` Prime
* `percent | percentage` Percentage
* `digits | number | numbers` __(accepts input)__ Digits To Length
* `degree` Degree (whole number)
* `radian` Radian (2-digit precision)
* `color-hex` Hex Color
* `color` Hex Color (Known Colors)
* `rgb` RGB Color
* `rgba` RGBA Color
* `hsl` HSL Color
* `hsb` HSB Color
* `cmyk` CMYK Color
* `html-color` Named Color From HTML/CSS
* `color-name` Color Name
* `uppercase-letter` __(accepts input)__ Latin Upper-case Letter To Length
* `lowercase-letter` __(accepts input)__ Latin Lower-case Letter To Length
* `letter` __(accepts input)__ Latin Letter (A-Z, a-z) To Length
* `alpha-numeric` __(accepts input)__ Latin Character (A-Z, a-z, 0-9) To Length
* `symbol` __(accepts input)__ Latin/ASCII Symbol To Length
* `char | character` __(accepts input)__ ASCII Character (A-Z, a-z, 0-9, symbols) To Length
* `emoji` Emoji (Extended Blocks)
* `word | words` __(accepts input)__ Lorem Ipsum Words To Length
* `sentence | sentences` __(accepts input)__ Lorem Ipsum Sentences To Length
* `paragraph | paragraphs` __(accepts input)__ Lorem Ipsum Paragraphs To Length
* `html-words` __(accepts input)__ Lorem Ipsum HTML Words To Length
* `html-sentences` __(accepts input)__ Lorem Ipsum HTML Sentences To Length
* `html-paragraphs` __(accepts input)__ Lorem Ipsum HTML Paragraphs To Length
* `adjective` English Adjective
* `adverb` English Adverb
* `noun` English Noun
* `first-name` First Name
* `last-name` Last Name
* `middle-name` Any Name
* `middle-initial` Middle Initial
* `name | full-name` Full Name
* `phone-us` Phone Number (US)
* `phone-uk` Phone Number (UK)
* `phone-de` Phone Number (DE)
* `phone-fr` Phone Number (FR)
* `phone-it` Phone Number (IT)
* `phone-eu` Phone Number (EU)
* `phone | e164` Phone Number (E.164)
* `email` Email Address (Known Providers)
* `age` __(accepts input)__ Age With Minimum (Normal Distribution)
* `ssn` Social Security Number (US)
* `serial` Serial (32bit Integer)
* `bigserial | long` Big Serial (64bit Integer)
* `guid` GUID
* `uuid` UUID
* `urid` URID
* `longitude` Longitude
* `latitude` Latitude
* `gps-dms` GPS Coordinate (DMS)
* `gps | gps-dmm` GPS Coordinate (DMM)
* `gps-dd` GPS Coordinate (DD)
* `city` City (US)
* `state-code` State Code (US)
* `state` State Name (US)
* `country-code` Country Code (ISO 2-letter)
* `country` Country Name
* `zip` US Zip Code
* `address` US Street Address

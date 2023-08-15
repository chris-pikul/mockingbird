# Mockingbird

Have you ever needed randomly generated data? Maybe you are building mock data for API testing, or you need to check that your UI will look correct when real data comes in. Perhaps you just want to build unit tests that have reasonable test data. Either way, that's what Mockingbird is for.

Mockingbird generates random data of all sorts. And not just numbers and random characters: you can also generate _Lorem Ipsum_ text, reverse regular expression (data that passes a given RegEx), names, identifiers, JSON pattern templates, and more!

## Features

There are plenty of features to list here, so they are broken up into categories just like the context menu is. If there is something missing, check the [Contributing](#contributing) section below.

### Templates

To facilitate making structured data, Mockingbird provides a templating engine to help build these. You can generate data in any format you want, just as: json, yaml, xml, csv, text, etc.. This is possible because the templating engine does not care about the text format, and only cares about it's template tags.

These tags follow a familiar Handlebars style of wrapping the template tag in double-curly-braces `{{}}`. There are a ton of tag functions you can use, and some even accept arguments to customize them.

See the documentation at [Templates](https://github.com/chris-pikul/mockingbird/blob/main/TEMPLATES.md) for
more information.

### Regular Expressions

Provided a Regular Expression, Mockingbird will generate random data that conforms to it. This is the most powerful, and easiest way to get data if another generator doesn't work for you. You can provide a full expression with flags, or just the pattern portion.

Example: Given the pattern `/[a-z0-9]{3,16}@[a-z0-9]{3,32}\.(?:com|net|org)/i`, will generate random "email address" looking text.

<details>
    <summary>Example Output</summary>
    <pre>0M1cMByJsC8j@aSqqoNXbognNtR2nwAjVe.NET
Wco0nh2A44@i5s9.com
Vtp@U3GTp.neT</pre>
</details>
<br>

For extra flexibility there are commands to create new presets that are saved to your settings so you can recall them later.

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
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
    <pre>
0M1cMByJsC8j@aSqqoNXbognNtR2nwAjVe.NET
Wco0nh2A44@i5s9.com
Vtp@U3GTp.neT
    </pre>
</details>

### Patterns

__This feature is WIP, and below is the idea of how it WILL work__

For other cases that don't fit with the provided generators, you can customize the output by building a pattern string. Unlike the [Regular Expression](#regular-expressions) feature, these are a bit more readable and useful for when static and dynamic text intersect.

They use a formatting string that takes double-brace `{{directive}}` style formatting strings. Within the formatting directive you can specify the data type generator to use for part. Additionally, any generator can be repeated if needed using an array style `[]` within the formatting tag.

Example: `Hello {{name}}, your birthday is on {{localeDate}}, your favorite color is {{namedColor}} and you have {{int(0, 10)}} cats.`

Outputs: `Hello Johnathan Smith, your birthday is on 2/4/1981, your favorite color is mauve and you have 3 cats.`

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


## Contributing

If you have a feature suggestion, or something you want to implement yourself, I'm open to ideas and PRs. The repository is on [GitHub](https://github.com/chris-pikul/mockingbird). If it's just a request, you can use the [Issues](https://github.com/chris-pikul/mockingbird/issues) page.

## License

Licensed under Apache 2.0, see the license file at [LICENSE](./LICENSE) for the full text. Copyright 2023 Chris Pikul.
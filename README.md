# Mockingbird

Have you ever needed randomly generated data? Maybe you are building mock data for API testing, or you need to check that your UI will look correct when real data comes in. Perhaps you just want to build unit tests that have reasonable test data. Either way, that's what Mockingbird is for.

Mockingbird generates random data of all sorts. And not just numbers and random characters: you can also generate _Lorem Ipsum_ text, reverse regular expression (data that passes a given RegEx), names, identifiers, JSON pattern templates, and more!

## Features


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
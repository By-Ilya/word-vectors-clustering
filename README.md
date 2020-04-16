# word-vectors-simularity
Calculate context for word using WordContextMatrix with smoothed positive PMI values, and simularity between word vectors using different algorithms of similarity calculations.

## Description
Algorithm performs the following steps:
1. Extracts texts from `.txt` files that contains texts from `corpus` folder.
2. Analyzes corpus, tokenizes texts to words, remove stop words and single character words and creates list with lemmas (base form of the word).
3. Creates word-context-matrix with smoothed positive PMI values from lemmas.
4. Calculates similarities between word vectors from word-context-matrix (using chosen method for calculating similarities).
5. Create an `XML`-file with potential context for each word.

## Requirements
1. `Node JS` library and `NPM` package manager.
2. Libraries installed from `package.json` file.

## Install and configure
1. Go to the project root directory.
2. Run `npm i` or `npm install` command. This command installs necessary libraries.
3. Open `.env` file and configure the following parameters:
- `CORPUS_DIRECTORY`: `string` value, that specifies directory to the corpus with texts
(absolute or relative path).
- `WINDOW_SIZE`: `integer` value, that specifies number of words left and right to the main word.
- `ALPHA`: `float` value in `[0, 1]`, that specifies alpha parameter for PMI calculations.
- `COUNT_COUNTEXT_WORDS`: `integer` value, that specifies count of top context words for each word
from word-context-matrix, that are shown in output `XML`-file.
- `OUTPUT_FOLDER`: `string` value, that specifies location for output `XML`-file 
(absolute or relative path).

After that, place into `CORPUS_DIRECTORY` folders `.txt`-files with texts.

## Running command
In the project root directory run `npm start <i>` command, where `<i>` specifies number of simularity calculations algorithm:

`1` - specifies _cosine simularity algorithm_;

`2` - specifies _Jaccard simularity algorithm_;

`3` - specifies _Jenson-Shennon divergence algorithm_. 

See the result in the configured `OUTPUT_FOLDER` directory.

## Output example
As the output you get an `OUTPUT_FOLDER/wordsContext.xml` file in such format:

`<?xml version="1.0"?>
<document name="wordsContext">
  <context type="contextWords" word="...">
    <word type="word" similarity="...">...</word>
    <word type="word" simularity="...">...</word>
    ...
  </context>
  <context type="contextWords" word="...">
  	...
  </context>
</document>`

## Used `Node JS` libraries
- `natural` (version `0.6.3`) is used for _tokenizing_ input texts from corpus to words.
- `stopwords` (version `0.0.9`) is used to _remove stopwords_ from corpus.
- `lemmatizer` (version `0.0.1`) is used for _creating lemmas_ from words.
- `xmlbuilder` (version `15.1.0`) is used for _creting XML-file_ with context words.


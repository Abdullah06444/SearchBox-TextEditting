const { TurkishSplitter } = require('nlptoolkit-corpus/dist/TurkishSplitter');
const { NGramDeasciifier } = require('nlptoolkit-deasciifier/dist/NGramDeasciifier');
const { FsmMorphologicalAnalyzer } = require('nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer');
const { NGram } = require('nlptoolkit-ngram/dist/NGram');
const { NoSmoothing } = require('nlptoolkit-ngram/dist/NoSmoothing');
const { NGramSpellChecker } = require('nlptoolkit-spellchecker/dist/NGramSpellChecker');
const { SpellCheckerParameter } = require('nlptoolkit-spellchecker/dist/SpellCheckerParameter');
const { TxtDictionary } = require('nlptoolkit-dictionary/dist/Dictionary/TxtDictionary');
const WordComparator_1 = require("nlptoolkit-dictionary/dist/Dictionary/WordComparator");
const getSentence = require("./corpus");



'use strict';
var fs = require('fs');
let turkishSplitter = new TurkishSplitter();
let txtDictionary = new TxtDictionary(WordComparator_1.WordComparator.TURKISH,
    "turkish_dictionaryOLD.txt","turkish_misspellings.txt","turkish_morphological_lexicon.txt");
let fsmMorphologicalAnalyzer = new FsmMorphologicalAnalyzer("turkish_finite_state_machine.xml",txtDictionary,100000);
//let fsmMorphologicalAnalyzer = new FsmMorphologicalAnalyzer();
let nGram = new NGram("root_ngram.txt".toString());
let deasciifier = new NGramDeasciifier(fsmMorphologicalAnalyzer, nGram);
nGram.calculateNGramProbabilitiesSimple(new NoSmoothing());
let spellCheckerParameter = new SpellCheckerParameter();
spellCheckerParameter.setDeMiCheck(false);
let nGramSpellChecker = new NGramSpellChecker(fsmMorphologicalAnalyzer, nGram, spellCheckerParameter);

class NGramSpellCheckerClass{

    /**
     * 
     * @param {string} sentence 
     * @returns save values before and after analysis of the ngram spell checker as array
     */
    nGramSpellCheckerAnalysis(string){

        let array = [];

        string = string.toString().replace("="," ");
        string = string.toString().replace("{"," ");
        string = string.toString().replace("}"," ");

        // split all words
        let string2 = "";
        turkishSplitter.split(string).forEach(i => string2 = string2 + i.toWords() + " ");
        // get lower case all letters
        string2 = string2.toLocaleLowerCase('tr');
        array.push(string2);
        // control deascifier class before analyze
        let sentence = deasciifier.deasciify(getSentence().createSentence(string2));
        // analyze with ngram spell checker
        string2 = nGramSpellChecker.spellCheck(sentence).toWords();
        array.push(string2);

        return array;
    }

    /*nGramSpellCheckerAnalysis(domain, string){

        let array = [];

        string = string.toString().replace("="," ");
        string = string.toString().replace("{"," ");
        string = string.toString().replace("}"," ");

        // split all words
        let string2 = "";
        turkishSplitter.split(string).forEach(i => string2 = string2 + i.toWords() + " ");
        // get lower case all letters
        string2 = string2.toLocaleLowerCase('tr');
        array.push(string2);
        // control deascifier class before analyze
        let sentence = deasciifier.deasciify(getSentence().createSentence(string2));
        // analyze with ngram spell checker
        string2 = nGramSpellChecker.spellCheck(sentence).toWords();
        array.push(string2);

        return array;
    }*/
}

function getNGramSpellChecker(){

    return new NGramSpellCheckerClass();
}

module.exports = getNGramSpellChecker;
const { SentenceSplitter } = require('nlptoolkit-corpus');
const { FsmMorphologicalAnalyzer } = require('nlptoolkit-morphologicalanalysis');
const { NGram, NoSmoothing } = require('nlptoolkit-ngram');
const { NGramSpellChecker } = require('nlptoolkit-spellchecker');

var fs = require('fs');

let sentenceSplitter = new SentenceSplitter();
let fsmMorphologicalAnalyzer = new FsmMorphologicalAnalyzer();
let nGram = new NGram<Symbol>("root_ngram.txt");
nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<Symbol>());
let nGramSpellChecker = new NGramSpellChecker(fsm, nGram, true);

class NGramSpellCheckerClass{

    nGramSpellCheckerAnalysis(sentence){

        sentence = sentence.replace("="," ");
        sentence = sentence.replace("{"," ");
        sentence = sentence.replace("}"," ");

        // split all words
        sentence = sentenceSplitter.split(sentence);
        // get lower case all letters
        sentence = sentence.toString().toLocaleLowerCase('tr');
        // analyze with ngram spell checker
        sentence = nGramSpellChecker.spellCheck(sentence);

        //compareSentences();

        return sentence;
    }

    compareSentences(){


    }
}

function getNGramSpellChecker(){

    return new NGramSpellCheckerClass();
}

module.exports = getNGramSpellChecker;
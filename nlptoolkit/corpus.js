const {Sentence} = require("nlptoolkit-corpus/dist/Sentence");

class SentenceClass{

    /**
     * 
     * @param {type string} string 
     * @returns convert from string to sentence
     */
    sentenceAnalysis(string){

        return new Sentence(string);
    }

    /**
     * 
     * @param {type Sentence} sentence 
     * @returns make first letter capital of all words
     */
    toCapital(sentence){

        for(let i=0; i<sentence.wordCount(); i++){

            let word = sentence.getWord(i).getName();
            console.log(word);
            sentence.getWord(i).setName(word.substring(0,1).toLocaleUpperCase("tr") + word.slice(1).toLocaleLowerCase("tr"));
            console.log(sentence.getWord(i).getName());
        }
        return sentence;
    }
}

function getSentence(){

    return new SentenceClass();
}

module.exports = getSentence;

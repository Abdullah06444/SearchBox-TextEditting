const {Sentence} = require("nlptoolkit-corpus/dist/Sentence");

function getSentence(){
    console.log("getSentence method");

    let sentence = new Sentence("Ahmet bugün eve geç geldi.");
    console.log(sentence.getWords());

    return sentence;
}

module.exports = getSentence;

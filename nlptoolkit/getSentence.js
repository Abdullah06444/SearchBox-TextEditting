const {Sentence} = require("nlptoolkit-corpus/dist/Sentence");

function getSentence(){

    return new Sentence("Ahmet dün ders çalışmadı.");
}

module.exports = getSentence;

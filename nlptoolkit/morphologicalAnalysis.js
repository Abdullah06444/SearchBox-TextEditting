const { FsmMorphologicalAnalyzer } = require('nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer.js');
const getSentence = require("./corpus");
let fsmMorphologicalAnalyzer = new FsmMorphologicalAnalyzer();
        
class FsmMorphologicalAnalyzerClass{

    sentencesample(){

        let sentence = getSentence().createSentence("Partiyi dün evdeki organizasyonla kutladılar.");
        let parseLists = fsmMorphologicalAnalyzer.morphologicalAnalysisFromSentence(sentence);
        console.log("girsene ")
        for(let i = 0; i < parseLists.length; i++){
            console.log("fsm list " + parseLists[i].size())
            for(let j = 0; j < parseLists[i].size(); j++){
                let parse = parseLists[i].getFsmParse(j);
                console.log(parse.getFsmParseTransitionList());
            }
            console.log("-----------------");
        }
    }

    wordsample(){

        let word = "evdeler";
        let parseLists = fsmMorphologicalAnalyzer.morphologicalAnalysis(word);
        for (let i = 0; i < parseLists.size(); i++){
            console.log(parseLists.getFsmParse(i).getFsmParseTransitionList());
        }
    }

    /**
     * 
     * @param {type string} string 
     */
    fsmMorphologic(string){

        let sentence = getSentence().createSentence(string);
        let parseLists = fsmMorphologicalAnalyzer.morphologicalAnalysisFromSentence(sentence);
        
        for(let i = 0; i < parseLists.length; i++){
            
            console.log(parseLists[i] + " fsm list " + parseLists[i].size())
            for(let j = 0; j < parseLists[i].size(); j++){
                let parse = parseLists[i].getFsmParse(j);
                console.log(parse.getFsmParseTransitionList());
            }
        }
    }
}

function getFsmMorphologicalAnalyzer(){

    return new FsmMorphologicalAnalyzerClass();
}

module.exports = getFsmMorphologicalAnalyzer;
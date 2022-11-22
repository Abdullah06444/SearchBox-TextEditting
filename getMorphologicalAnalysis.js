const {FsmMorphologicalAnalyzer} = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer");

function getMorphologicalAnalysis(){

    console.log("getMorphologicalAnalysis method");

    let fsm = new FsmMorphologicalAnalyzer();
    let fsmParseList = fsm.morphologicalAnalysis("akın");
    for(let i=0; i<fsmParseList.size(); i++){

        console.log(fsmParseList.getFsmParse(i).getFsmParseTransitionList());
    }
    return fsm;
}

module.exports = getMorphologicalAnalysis;

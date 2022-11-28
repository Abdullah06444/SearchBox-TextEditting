const {FsmMorphologicalAnalyzer} = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer");

function getMorphologicalAnalysis(){

    return new FsmMorphologicalAnalyzer();
}

module.exports = getMorphologicalAnalysis;

const {Parameter} = require("nlptoolkit-informationretrieval/dist/Document/Parameter");
const {DocumentType} = require("nlptoolkit-informationretrieval/dist/Document/DocumentType");
const {Collection} = require("nlptoolkit-informationretrieval/dist/Document/Collection");
const {Query} = require("nlptoolkit-informationretrieval/dist/Query/Query");
const {SearchParameter} = require("nlptoolkit-informationretrieval/dist/Query/SearchParameter");
const {RetrievalType} = require("nlptoolkit-informationretrieval/dist/Query/RetrievalType");
var fs = require('fs');

let parameter = new Parameter();
parameter.setDocumentType(DocumentType.CATEGORICAL);
parameter.setLoadIndexesFromFile(true);
parameter.setPhraseIndex(false);
parameter.setNGramIndex(false);

// let path1 = __dirname + "/../../testCollectionEmpty"
// let path2 = __dirname + "/../../testCollectionEmpty"
// let path3 = __dirname + "/../../testCollectionEmpty"
// let path4 = __dirname + "/../../testCollectionEmpty"
// let path5 = __dirname + "/../../testCollectionEmpty"
// let path6 = __dirname + "/../../testCollectionEmpty"
let path1 = __dirname + "/../../testCollectionHepsiburada";
let path2 = __dirname + "/../../testCollectionAmazon";
let path3 = __dirname + "/../../testCollectionN11";
let path4 = __dirname + "/../../testCollectionCiceksepeti";
let path5 = __dirname + "/../../testCollectionTrendyol";
let path6 = __dirname + "/../../testCollectionGittigidiyor";

let collection1 = new Collection(path1, parameter);
console.log("1st document index loaded")

let collection2 = new Collection(path2, parameter);
console.log("2nd document index loaded")

let collection3 = new Collection(path3, parameter);
console.log("3rd document index loaded")

let collection4 = new Collection(path4, parameter);
console.log("4th document index loaded")

let collection5 = new Collection(path5, parameter);
console.log("5th document index loaded")

let collection6 = new Collection(path6, parameter);
console.log("6th document index loaded")

let searchParameter = new SearchParameter();
searchParameter.setDocumentsRetrieved(8);

var startTime, endTime;

class InformationRetrievalClass{

    /**
     *  Ranked Index Scopes for 6 e-commerce platform
     */
    rankedIndexHepsiburada(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection1.searchCollection(query, searchParameter);

        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            //process.stdout.write(docId + " [" + score + "] ");
            console.log(docId + " [" + score + "] ");
            
            //eachLine = array[docId].toString().split("$");
            eachLine[i] = fs.readFileSync(path1 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    rankedIndexAmazon(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection2.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path2 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    rankedIndexN11(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection3.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path3 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    rankedIndexCiceksepeti(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection4.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path4 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    rankedIndexTrendyol(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection5.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path5 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    rankedIndexGittigidiyor(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.RANKED);
        let result = collection6.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path6 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }

    /**
     *  Positional Index Scopes for 6 e-commerce platform
     */
    positionalIndexHepsiburada(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection1.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path1 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    positionalIndexAmazon(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection2.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path2 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    positionalIndexN11(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection3.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path3 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    positionalIndexCiceksepeti(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection4.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path4 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    positionalIndexTrendyol(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection5.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path5 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    positionalIndexGittigidiyor(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.POSITIONAL);
        let result = collection6.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path6 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    
    /**
     *  Inverted Index Scopes for 6 e-commerce platform
     */
    invertedIndexHepsiburada(string){
        
        startTime = performance.now();

        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection1.searchCollection(query, searchParameter);

        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path1 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }

        return eachLine;
    }
    invertedIndexAmazon(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection2.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path2 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    invertedIndexN11(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection3.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path3 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    invertedIndexCiceksepeti(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection4.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path4 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    invertedIndexTrendyol(string){

        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection5.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path5 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }
    invertedIndexGittigidiyor(string){
        
        startTime = performance.now();
        
        let query = new Query(string);

        searchParameter.setRetrievalType(RetrievalType.BOOLEAN);
        let result = collection6.searchCollection(query, searchParameter);
    
        endTime = performance.now();
    
        console.log("size : " + result.getItems().length + " ");
    
        var eachLine = [];
        var docId, score;
        for(let i = 0; i < searchParameter.getDocumentsRetrieved() && i < result.getItems().length; i++){
    
            docId = result.getItems()[i].getDocId();
            score = result.getItems()[i].getScore();
            
            console.log(docId + " [" + score + "] ");
            
            eachLine[i] = fs.readFileSync(path6 + "/doc" + ("00000" + docId).slice(-6) + ".txt",'utf-8').toString().split("\n");
        }
        return eachLine;
    }

    /**
     * 
     * @returns get query time of any information retrieval indexes
     */
    getTime(){

       return endTime-startTime; 
    }
}

function getInformationRetrieval(){

    return new InformationRetrievalClass();
}

module.exports = getInformationRetrieval;
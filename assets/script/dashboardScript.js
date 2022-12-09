const { Sentence } = require("nlptoolkit-corpus/dist/Sentence");
const getInformationRetrieval = require("../../nlptoolkit/informationRetrieval")
//var XMLHttpRequest = require("/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/node_modules/typescript/lib/lib.dom.d.ts")
//var DOMParser = require("/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/node_modules/typescript/lib/lib.dom.d.ts")
//var XMLHttpRequest = require("typescript/lib/lib.dom.d.ts")
//var DOMParser = require("typescript/lib/lib.dom.d.ts")

//var XMLHttpRequest = require("xhr2");
//var DomParser = require("dom-parser");
//const { DomParser } = require("dom-parser").DomParser;
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


//var jsdom = require("jsdom");

class DashboardClass{

    allRetrievalTypeCases(value, platform, type){

        // Hepsiburada e-commerce site
        if(value != "..." && platform == 1 && type == 1){

            return getInformationRetrieval().rankedIndexHepsiburada(value);
        }
        if(value != "..." && platform == 1 && type == 2){

            return getInformationRetrieval().positionalIndexHepsiburada(value);
        }
        if(value != "..." && platform == 1 && type == 3){

            return getInformationRetrieval().invertedIndexHepsiburada(value);
        }
        // Amazon e-commerce site
        if(value != "..." && platform == 2 && type == 1){

            return getInformationRetrieval().rankedIndexAmazon(value);
        }
        if(value != "..." && platform == 2 && type == 2){

            return getInformationRetrieval().positionalIndexAmazon(value);
        }
        if(value != "..." && platform == 2 && type == 3){

            return getInformationRetrieval().invertedIndexAmazon(value);
        }
        // N11 e-commerce site
        if(value != "..." && platform == 3 && type == 1){

            return getInformationRetrieval().rankedIndexN11(value);
        }
        if(value != "..." && platform == 3 && type == 2){

            return getInformationRetrieval().positionalIndexN11(value);
        }
        if(value != "..." && platform == 3 && type == 3){

            return getInformationRetrieval().invertedIndexN11(value);
        }
        // Ciceksepeti e-commerce site
        if(value != "..." && platform == 4 && type == 1){

            return getInformationRetrieval().rankedIndexCiceksepeti(value);
        }
        if(value != "..." && platform == 4 && type == 2){

            return getInformationRetrieval().positionalIndexCiceksepeti(value);
        }
        if(value != "..." && platform == 4 && type == 3){

            return getInformationRetrieval().invertedIndexCiceksepeti(value);
        }
        // Trendyol e-commerce site
        if(value != "..." && platform == 5 && type == 1){

            return getInformationRetrieval().rankedIndexTrendyol(value);
        }
        if(value != "..." && platform == 5 && type == 2){

            return getInformationRetrieval().positionalIndexTrendyol(value);
        }
        if(value != "..." && platform == 5 && type == 3){

            return getInformationRetrieval().invertedIndexTrendyol(value);
        }
        // Gittigidiyor e-commerce site
        if(value != "..." && platform == 6 && type == 1){

            return getInformationRetrieval().rankedIndexGittigidiyor(value);
        }
        if(value != "..." && platform == 6 && type == 2){

            return getInformationRetrieval().positionalIndexGittigidiyor(value);
        }
        if(value != "..." && platform == 6 && type == 3){

            return getInformationRetrieval().invertedIndexGittigidiyor(value);
        }
        return [];
    }

    getArrayOfProductInfo(arrayOfProductInfo, platform){
        
        var request = new XMLHttpRequest();
        var parser = new DOMParser();

        request.onreadystatechange = function() {
            console.log("readyState " + request.readyState + " status " + request.status)
            
            if (request.readyState === 4 && request.status === 200) {

                var dom = parser.parseFromString(request.response,"text/html");
                //var dom = new jsdom.JSDOM(request.response, "text/html")
                //dom = dom.window.document

                //return `<img class="s-image" src="https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY218_.jpg" srcset="https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY218_.jpg 1x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY327_QL65_.jpg 1.5x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY436_QL65_.jpg 2x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY545_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY654_QL65_.jpg 3x" alt="Apple iPhone 13 Pro Max, 128GB, Sierra Blue - Unlocked (Renewed)" data-image-index="1" data-image-load="" data-image-latency="s-product-image" data-image-source-density="1">`
                //console.log(dom)
                return getDashboard().displayImage(dom, platform)
            }
        }

        //this.requestOpen(arrayOfProductInfo);

        let query = this.getSpecificQuery(arrayOfProductInfo);

        if(platform == 1)
            request.open("GET", "https://www.hepsiburada.com/ara?q=" + query, true);
        if(platform == 2)
            request.open("GET", "https://www.amazon.com/s?k=" + query, true);
        if(platform == 3)
            request.open("GET", "https://www.n11.com/arama?q=" + query, true);
        if(platform == 4)
            request.open("GET", "https://www.ciceksepeti.com/arama?query=" + query, true);
        if(platform == 5)
            request.open("GET", "https://www.trendyol.com/sr?q=" + query, true);
        
        request.send();

    }

    getSpecificQuery(arrayOfProductInfo){

        let query;

        // if(arrayOfProductInfo.length > 2){
            
        //     let sentence = new Sentence(arrayOfProductInfo[2]);
        //     let productCode = sentence.getWord(sentence.wordCount()-1).getName();
        //     console.log("productCode : " + productCode)
        //     query = productCode;
        // }
        // else{

            if(arrayOfProductInfo.length > 1){

                let sentence = new Sentence(arrayOfProductInfo[1]);
                let productSubTitle = "";

                for(let i=0; i < sentence.wordCount() && i < 4; i++){

                    productSubTitle += sentence.getWord(i).getName() + " ";
                }
                console.log("productSubTitle : " + productSubTitle)
                query = productSubTitle;
            }
        //}

        return query;
    }
    
    displayImage(httpDoc, platform){

        console.log(httpDoc)
        console.log("giriyor")
        
        let s = "";
        if(platform == 1){
            console.log(httpDoc.getElementsByTagName("img"))
            console.log(httpDoc.getElementsByTagName("img").length)
            for(let i=0; i<httpDoc.getElementsByTagName("picture").length; i++){
                if(httpDoc.getElementsByTagName("img").item(i).parentNode.nodeName == "PICTURE"
                /*&& httpDoc.getElementsByTagName("img").item(i).className.match("moria-ProductCard-.*")*/){
    
                    console.log("HEPSİBURADA img " + i)
                    s += httpDoc.getElementsByTagName("img").item(i).parentNode.innerHTML;
                }
            }
        }
        if(platform == 2){
            console.log(httpDoc.getElementsByTagName("img"))
            console.log(httpDoc.getElementsByTagName("img").length)
            for(let i=0; i<httpDoc.getElementsByTagName("img").length; i++){
                if(httpDoc.getElementsByTagName("img").item(i).parentNode.nodeName == "DIV"
                && httpDoc.getElementsByTagName("img").item(i).className == "s-image"){
    
                    console.log("AMAZON img " + i)
                    s += httpDoc.getElementsByTagName("img").item(i).parentNode.innerHTML;
                    //s = `<img class="s-image" src="https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY218_.jpg" srcset="https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY218_.jpg 1x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY327_QL65_.jpg 1.5x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY436_QL65_.jpg 2x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY545_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/61FZC+6hDFL._AC_UY654_QL65_.jpg 3x" alt="Apple iPhone 13 Pro Max, 128GB, Sierra Blue - Unlocked (Renewed)" data-image-index="1" data-image-load="" data-image-latency="s-product-image" data-image-source-density="1">`
                }
            }
        }
        if(platform == 3){
            console.log(httpDoc.getElementsByTagName("img"))
            console.log(httpDoc.getElementsByTagName("img").length)
            for(let i=0; i<httpDoc.getElementsByTagName("img").length; i++){
                if(httpDoc.getElementsByTagName("img").item(i).parentNode.nodeName == "DIV"
                && httpDoc.getElementsByTagName("img").item(i).className == "lazy cardImage"
                /*&& httpDoc.getElementsByTagName("img").item(i).parentNode.className == "imgHolder  cargoCampaign "*/){
    
                    console.log("N11 img " + i)
                    s += httpDoc.getElementsByTagName("img").item(i).parentNode.innerHTML;
                }
            }
        }
        if(platform == 4){
            console.log(httpDoc.getElementsByTagName("img"))
            console.log(httpDoc.getElementsByTagName("img").length)
            for(let i=0; i<httpDoc.getElementsByTagName("img").length; i++){
                if(httpDoc.getElementsByTagName("img").item(i).parentNode.nodeName == "DIV"
                && httpDoc.getElementsByTagName("img").item(i).parentNode.className == "products__item-img-container ratio-container"){
    
                    //httpDoc.getElementsByTagName("img").setAttribute("data-src","src");
    
                    console.log("ÇİÇEKSEPETİ img " + i)
                    s += httpDoc.getElementsByTagName("img").item(i).parentNode.innerHTML;
                }
            }
        }
        if(platform == 5){
            console.log(httpDoc.getElementsByTagName("img"))
            console.log(httpDoc.getElementsByTagName("img").length)
            for(let i=0; i<httpDoc.getElementsByTagName("img").length; i++){
                if(httpDoc.getElementsByTagName("img").item(i).parentNode.nodeName == "DIV"
                && httpDoc.getElementsByTagName("img").item(i).className == "p-card-img"){
            
                    console.log("TRENDYOL img " + i)
                    s += httpDoc.getElementsByTagName("img").item(i).parentNode.innerHTML;
                }
            }
            // var txt = "";
            // if (httpDoc.evaluate) {
    
            //     console.log("girer evaluate")
            //     //var path = `//*[@id="search-app"]/div/div[1]/div[2]/div[5]/div[1]/div/div[2]/div[1]/a/div[1]/div[1]`;
            //     var path = `/html/body`;
            //     var nodes = httpDoc.evaluate(path, httpDoc, null, XPathResult.ANY_TYPE, null);
            //     var result = nodes.iterateNext();
            //     while (result) {
            //         console.log("txt : " + txt)
    
            //         txt += result.childNodes[0].innerHTML + "<br>";
            //         result = nodes.iterateNext();
            //     }
            // }
            // s = txt;
        }
    
        return s;
    }
}

function getDashboard(){

    return new DashboardClass();
}

module.exports = getDashboard;

const getInformationRetrieval = require("../../nlptoolkit/informationRetrieval")

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
}

function getDashboard(){

    return new DashboardClass();
}

module.exports = getDashboard;

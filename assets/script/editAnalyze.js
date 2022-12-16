function editTextArea(lines){

    let array = []
    let wordA = ""
    let wordB = ""
    let status = "normal"
    let tempAIndex = 0, tempBIndex = 0

    for(let i = 0; i < lines.length; i++){

        //console.log(lines[i])
        
        if(lines[i].line === ' ' && lines[i].aIndex !== -1 && lines[i].bIndex === -1){

            wordA += lines[i].line;
            tempAIndex++
            continue;
        }
        if(lines[i].line === ' ' && lines[i].aIndex === -1 && lines[i].bIndex !== -1){

            wordB += lines[i].line;
            tempBIndex++
            continue;
        }
        if(lines[i].line === '\r'){

            lines[i].aIndex !== -1 ? tempAIndex++ : tempAIndex
            lines[i].bIndex !== -1 ? tempBIndex++ : tempBIndex
            continue;
        }
        if(lines[i].line === ' ' && lines[i].aIndex !== -1 && lines[i].bIndex !== -1 && lines[i].moved === undefined){

            if(wordA !== wordB){

                status = "editted";
            }

            array.push({

                word : wordA,
                editWord : wordB,
                status : status
            })
            wordA = ""
            wordB = ""
            status = "normal"
            tempAIndex++
            tempBIndex++
            continue;
        }

        if(lines[i].aIndex !== -1 && lines[i].aIndex === tempAIndex){

            wordA += lines[i].line
            tempAIndex++
        }
        if(lines[i].bIndex !== -1 && lines[i].bIndex === tempBIndex){
            
            wordB += lines[i].line
            tempBIndex++
        }
    }
    // if(wordA !== wordB){

    //     status = "editted";
    // }
    // array.push({

    //     word : wordA,
    //     editWord : wordB,
    //     status : status
    // })


    console.log({array : array})
    return array;
}

module.exports = editTextArea;
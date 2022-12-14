function editTextArea(lines){

    let array = []
    let wordA = ""
    let wordB = ""
    let status = "normal"

    for(let i = 0; i < lines.length; i++){

        //console.log(lines[i])
        
        if(lines[i].line === ' ' && lines[i].bIndex === -1){

            wordA += lines[i].line;
            continue;
        }
        if(lines[i].line === ' ' && lines[i].aIndex === -1){

            wordB += lines[i].line;
            continue;
        }
        if(lines[i].line === '\r'){

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
            continue;
        }

        if(lines[i].aIndex !== -1)
            wordA += lines[i].line
        if(lines[i].bIndex !== -1)
            wordB += lines[i].line
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
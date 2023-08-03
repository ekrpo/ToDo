let tokensBlackList = []

function automaticDeletionTokens(){
    for(let i = 0; i<=tokensBlackList.length-1; i++){
        if(tokensBlackList[i].expireTime<=Date.now()){
            tokensBlackList.pop(i)
        }
        return
    }
}

module.exports = {tokensBlackList, automaticDeletionTokens}
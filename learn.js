function getsum(n1, n2){
    var isneg = ()=>{
        return n1<0||n2<0
    }

    var promise = new Promise((resolve, reject)=>{
            if(isneg()){
                reject(Error('Negative not'))
            }
            resolve(n1 + n2)
    })
    return promise
}

getsum(4,5)
.then(result=>{
    console.log(result)
    return getsum(5,1)
},error=>console.log(error))
.then(result=>console.log(result),error=>console.log(error))
console.log('hello world')
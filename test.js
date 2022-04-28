var msg = 'hello world';
console.log(msg);

//concateno due chiamate sincrone, attendo 1 sec, dopo altri 5sec
setTimeout(()=>{
    setTimeout(()=>{
            console.log("testing Time Out")
        }, 1000)
}, 3000)

//stessa cosa con promise
myPromisifiedTimeout = function (time) {
    return new Promise( (res) => setTimeout(res, time) )
}

myPromisifiedTimeout(1000)
.then(()=>{return myPromisifiedTimeout(5000)})
.then(()=>console.log("Testing Time Out with promises"))
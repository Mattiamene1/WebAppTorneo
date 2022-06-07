async function sendData(){
    var casaVal= document.getElementById("casa").value;
    var ospiteVal= document.getElementById("ospite").value;
    var luogoVal= document.getElementById("luogo").value;
    var dataVal= document.getElementById("data").value;
    var arbitronomeVal= document.getElementById("arbitronome").value;
    var arbitrocognomeVal= document.getElementById("arbitrocognome").value;
    var CF = document.getElementById("arbitrocf").value;
    var faseVal= document.getElementById("fase").value;

    var token=getCookie("token")
    if(!token){
        alert("questa pagina richiede l'autenticazione")
        return
    }

    //console.log(casa+" "+ospite+" "+luogo+" "+data+" "+arbitro+" "+fase)
    var apiUrl= API_V2+"partita"
    var toBeSent={
        casa:casaVal,
        ospite:ospiteVal,
        luogo:luogoVal,
        data:dataVal,
        arbitro:{
            nome:arbitronomeVal,
            cognome:arbitrocognomeVal,
            codiceFiscale:CF
        },
        fase:faseVal
    }
    await postData(apiUrl,{
        method:'POST',
        headers: {
            'x-access-token': token
        },
        body:JSON.stringify(toBeSent)
    })
    .then((res)=>{
        alert("partita salvata correttamente");
    })
    .catch((error)=>{
        alert(error);
    })

}

async function clear(){
    document.getElementById("myform").reset();
    document.getElementById("casa").focus();
}

async function backToHome(){
    window.location.href="https://ids-frontend.herokuapp.com/";
}

async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
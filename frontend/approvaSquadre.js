async function loadSquadre(){
    var apiUrl="http://127.0.0.1:8080/api/v2/mostraiscrizionisquadre"
    await fetch(apiUrl,{
        headers: {
            'x-access-token': getCookie("token")
        }
    })//creo la richiesta inserendo il token
    .then(res=>res.json())
    .then(function(res) { //carica tutte le squadre e i giocatori
        //var squadre=JSON.parse(res)
        var squadre=res;
        for(var i=0;i<squadre.length;i++){
            addsquadra(squadre[i],i);
        }
        
    })
    .catch(function(result) {
        alert("Errore durante il caricamento delle squadre")
        console.log(result)
    })
}

async function addsquadra(squadra,index){
    var contenitore=document.getElementById("squadre");
    var i = document.createElement('div');
    var titolosquadre=document.createElement("h2");
    titolosquadre.innerHTML="Squadra #"+(index+1)
    i.setAttribute("id", squadra.nome);
    var divisore=document.createElement("hr");
    var bottoneApprova=document.createElement("Button")
    bottoneApprova.innerHTML="Approva squadra"
    bottoneApprova.setAttribute("onClick","approvaSquadra('"+squadra._id+"');")

    //inizio a comporre la stringa contenuta nell'html
    let html="nome="+squadra.nome
    i.innerHTML=html;

    //aggiungo un div per i giocatori
    var gio = document.createElement('div');
    gio.setAttribute("id", "giocatori");
    i.appendChild(gio)

    //vado a recuperare le informazioni sui giocatori
    
    for(var j=0;j<squadra.giocatori.length;j++){
        var titologioc=document.createElement('h3');
        titologioc.innerHTML="Giocatore "+(j+1)
        var g = document.createElement('div');
        await loadGiocatore(squadra.giocatori[j])
        .then((giocatore)=>{
            g.setAttribute("id", giocatore.nome);
            console.log(giocatore)
            var text="";
            if(j==squadra.giocatori.length-1){
                text=" nome= "+giocatore.nome+"<br>cognome= "+giocatore.cognome+"<br>mail= "+giocatore.email
            }
            else{
                text=" nome= "+giocatore.nome+"<br>cognome= "+giocatore.cognome+"<br>mail= "+giocatore.email+","
            }
            g.innerHTML=text
            gio.appendChild(titologioc)
            gio.appendChild(g)  
        });
             
    } 
    contenitore.appendChild(titolosquadre)
    contenitore.appendChild(i);
    contenitore.appendChild(bottoneApprova)
    contenitore.appendChild(divisore)
    
    
}

async function loadGiocatore(id){
    var apiUrl="http://127.0.0.1:8080/api/v2/giocatore/"+id
    var giocatore= await fetch(apiUrl)
    .then(res=>res.json())
    .then(function(res) { //restituisci giocatore
        return res
    })
    .catch(function(result) {
        alert("Errore nel caricamento del giocatore "+apiUrl);
        return
    })
    return giocatore;
    
}

async function approvaSquadra(id){
    var apiUrl="http://127.0.0.1:8080/api/v2/approvazionesquadra/"+id

    await fetch(apiUrl,{
                            method: 'PUT',
                            headers: {
                                'x-access-token': getCookie("token")
                            }
    })
    .then(res=>res.json())
    .then(function(res) { //restituisci giocatore
        if(res.success)
            alert("squadra iscritta correttamente")
        else
            alert(res.error)
    })
    .catch(function(result) {
        alert("Errore nel caricamento del giocatore "+apiUrl);
        return
    })
}
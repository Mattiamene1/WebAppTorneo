async function loadSquadre(){
    var apiUrl="http://127.0.0.1:8080/api/v2/mostraiscrizionisquadre"
    await fetch(apiUrl)
    .then(res=>res.json())
    .then(function(res) { //carica tutte le squadre e i giocatori
        //var squadre=JSON.parse(res)
        var squadre=res;
        for(var i=0;i<squadre.length;i++){
            addsquadra(squadre[i]);
        }
        
    })
    .catch(function(result) {
        alert("Errore durante il caricamento delle squadre")
        console.log(result)
    })
}

async function addsquadra(squadra){
    var contenitore=document.getElementById("squadre");
    var i = document.createElement('div');
    i.setAttribute("id", squadra.nome);

    //inizio a comporre la stringa contenuta nell'html
    let html="nome="+squadra.nome
    html=html+squadra.giocatori[0]
    i.innerHTML=html;

    //aggiungo un div per i giocatori
    var gio = document.createElement('div');
    gio.setAttribute("id", "giocatori");
    i.appendChild(gio)

    //vado a recuperare le informazioni sui giocatori
    
    for(var j=0;j<squadra.giocatori.length;j++){

        var g = document.createElement('div');
        await loadGiocatore(squadra.giocatori[j])
        .then((giocatore)=>{
            g.setAttribute("id", giocatore.nome);
            console.log(giocatore)
            var text="";
            if(j==squadra.giocatori.length-1){
                text=" nome= "+giocatore.nome+" cognome= "+giocatore.cognome
            }
            else{
                text=" nome= "+giocatore.nome+" cognome= "+giocatore.cognome+","
            }
            g.innerHTML=text
            gio.appendChild(g)  
        });
             
    } 
    contenitore.appendChild(i);
    
    
}

async function loadGiocatore(id){
    var apiUrl="http://127.0.0.1:8080/api/v2/getgiocatore/"+id
    alert(apiUrl)
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
const API_V1 = "http://localhost:3000/api/v1/"
const API_V2 = "http://localhost:3000/api/v2/"
let AUTH_TOKEN = null;

function login() {
    let token_cookie = document.cookie.split('; ').find(row => row.startsWith('token='))
    if (token_cookie) {
        AUTH_TOKEN = token_cookie.split("=")[1];
    } else {
        alert("Questa pagina richiede un'autenticazione ma l'utente non risulta autenticato");
    }
    
};
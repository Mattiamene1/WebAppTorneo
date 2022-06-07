function getCookie(cookieName){
    const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(cookieName+'='))
    if(!cookie)
        return
    
    var cookieValue=cookie.split('=')[1];
    return cookieValue;
}

function getCookie(cookieName){
    const cookie = document.cookie
    if(!cookie)
        return
    var cookie1=cookie.split('; ').find(row => row.startsWith(cookieName+'='))
    if(!cookie1)
        return
    var cookieValue=cookie.split('=')[1];
    return cookieValue;
}

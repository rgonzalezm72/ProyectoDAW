/*
* Javascript to show and hide cookie banner using localstorage
*/

/**
 * @description Shows the cookie banner
 */
function mostrarCookieBanner(){
  let cookieBanner = document.getElementById("cb-cookie-banner");
  cookieBanner.style.display = "block";
}

/**
 * @description Hides the Cookie banner and saves the value to localstorage
 */
function ocultarCookieBanner(){
  localStorage.setItem("cb_isCookieAccepted", "yes");
  let cookieBanner = document.getElementById("cb-cookie-banner");
  cookieBanner.style.display = "none";
}

/**
 * @description Checks the localstorage and shows Cookie banner based on it.
 */
function inicializarCookieBanner(){
  let isCookieAccepted = localStorage.getItem("cb_isCookieAccepted");
  if(isCookieAccepted === null)  {
    localStorage.setItem("cb_isCookieAccepted", "no");
    mostrarCookieBanner();
  }
  if(isCookieAccepted === "no") {
    mostrarCookieBanner();
  }
}

// Assigning values to window object
window.onload = inicializarCookieBanner();
window.cb_hideCookieBanner = ocultarCookieBanner;

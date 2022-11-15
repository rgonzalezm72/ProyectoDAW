/*
* Javascript para mostrar y ocultar el Cookie Banner usando LocalStorage
*/

document.addEventListener("DOMContentLoaded", function () {
  /**
   * @description Muestra el Cookie Banner
   */
  function mostrarCookieBanner(){
    let cookieBanner = document.getElementById("cb-cookie-banner");
    cookieBanner.style.display = "block";
  }

  /**
   * @description Oculta el Cookie Banner y mete el valor en LocalStorage
   */
  function ocultarCookieBanner(){
    localStorage.setItem("cb_isCookieAccepted", "yes");
    let cookieBanner = document.getElementById("cb-cookie-banner");
    cookieBanner.style.display = "none";
  }

  /**
   * @description Comprueba el LocalStorage y muestra el Cookie Banner dependiendo de ello
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

  window.onload = inicializarCookieBanner();
  window.cb_hideCookieBanner = ocultarCookieBanner;
});



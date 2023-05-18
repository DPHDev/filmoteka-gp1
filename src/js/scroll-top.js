import { varDOM } from "./var-selector-dom";


// Función para mostrar u ocultar el SVG según la posición de desplazamiento
export let scrollTop = () => {
  // Get scroll position
  let scrollPosition = window.pageYOffset;

  // Get height total of page
  let pageHeight = document.documentElement.scrollHeight / 2 ;

  // Svg on
  if (scrollPosition > pageHeight) {
      varDOM.scrollTopBtn.style.display = 'block';
  } else {
    varDOM.scrollTopBtn.style.display = 'none';
  }
};


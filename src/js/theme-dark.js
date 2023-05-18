const btnThemeHeader = document.querySelector('#switch-label');
const bodyTheme = document.querySelector('body');
const checked = document.querySelector('.switch-button__checkbox');
let theme = localStorage.getItem('ui-theme');

window.addEventListener('DOMContentLoaded', saveTheme);
btnThemeHeader.addEventListener('click', onTheme);

function saveTheme() {
  theme = localStorage.getItem('ui-theme');

  if (theme === 'dark') {
    bodyTheme.classList.add('body-theme');
    checked.checked = true; // Establecer el estado del interruptor en true
  } else {
    bodyTheme.classList.remove('body-theme');
    checked.checked = false; // Establecer el estado del interruptor en false
  }
}

function onTheme() {
  theme = localStorage.getItem('ui-theme');

  if (theme === 'dark') {
    bodyTheme.classList.remove('body-theme');
    localStorage.setItem('ui-theme', 'light');
  } else {
    bodyTheme.classList.add('body-theme');
    localStorage.setItem('ui-theme', 'dark');
  }
}
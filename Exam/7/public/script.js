let colorsChanged = false;

function swapColors() {
  colorsChanged = !colorsChanged;

  greenSquare.style.background = colorsChanged ? '#ed7d31' : '#70ad47';
  redSquare.style.background = colorsChanged ? '#70ad47' : '#ed7d31';
}

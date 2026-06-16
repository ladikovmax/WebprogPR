document.body.innerHTML = `
  <h1>Практичне завдання №8</h1>

  <div id="content">
    <div id="greenSquare">Зелений</div>
    <div id="redSquare">Червоний</div>
    <button onclick="swapColors()">Старт</button>
  </div>
`;

document.head.innerHTML += `<style>
  body {
    width: 900px;
    margin: auto;
    font: 21px "Times New Roman";
  }

  #content {
    display: flex;
    align-items: center;
  }

  #greenSquare,
  #redSquare {
    width: 158px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #777;
    color: white;
    font-size: 24px;
  }

  #greenSquare {
    background: #70ad47;
  }

  #redSquare {
    background: #ed7d31;
  }

  button {
    margin-left: 46px;
    padding: 12px 22px;
    border-radius: 8px;
    background: #aaa;
    color: white;
  }
</style>`;

let colorsChanged = false;

function swapColors() {
  colorsChanged = !colorsChanged;

  greenSquare.style.background = colorsChanged ? '#ed7d31' : '#70ad47';
  redSquare.style.background = colorsChanged ? '#70ad47' : '#ed7d31';
}

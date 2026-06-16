document.head.insertAdjacentHTML('beforeend', `<style>
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

  button {
    margin-left: 46px;
    padding: 12px 22px;
    border-radius: 8px;
    background: #aaa;
    color: white;
  }
</style>`);

function App() {
  const [colorsChanged, setColorsChanged] = React.useState(false);

  return (
    <>
      <h1>Практичне завдання №9</h1>

      <div id="content">
        <div
          id="greenSquare"
          style={{ background: colorsChanged ? '#ed7d31' : '#70ad47' }}
        >
          Зелений
        </div>

        <div
          id="redSquare"
          style={{ background: colorsChanged ? '#70ad47' : '#ed7d31' }}
        >
          Червоний
        </div>

        <button onClick={() => setColorsChanged(!colorsChanged)}>Старт</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

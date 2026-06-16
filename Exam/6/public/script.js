document.head.insertAdjacentHTML('beforeend', `<style>
  body {
    width: 600px;
  }

  form {
    padding: 24px;
    border: 2px solid #000;
  }

  div {
    margin: 23px;
  }

  label {
    display: inline-block;
    width: 210px;
    text-align: center;
  }

  button {
    display: block;
    margin: 0 0 0 auto;
    padding: 8px 20px;
    border-radius: 8px;
    background: #aaa;
    color: white;
    font: inherit;
  }
</style>`);

function App() {
  function showData(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const age = event.target.age.value;

    alert(`Ваше ім’я: ${name}\nВаш вік: ${age}`);
  }

  return (
    <>
      <h1>Практичне завдання №6</h1>
      <form onSubmit={showData}>
        <p>Введіть наступні дані:</p>

        <div>
          <label htmlFor="name">Ім’я:</label>
          <input id="name" name="name" type="text" />
        </div>

        <div>
          <label htmlFor="age">Вік:</label>
          <input id="age" name="age" type="number" />
        </div>

        <button type="submit">Старт</button>
      </form>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

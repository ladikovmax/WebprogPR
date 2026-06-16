document.body.innerHTML = `
  <h1>Практичне завдання №5</h1>

  <form id="dataForm">
    <p>Введіть наступні дані:</p>

    <div>
      <label for="name">Ім’я:</label>
      <input id="name" name="name" type="text">
    </div>

    <div>
      <label for="age">Вік:</label>
      <input id="age" name="age" type="number">
    </div>

    <button type="submit">Старт</button>
  </form>
`;

document.head.innerHTML += `<style>
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
</style>`;

document.getElementById('dataForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  alert(`Ваше ім’я: ${name}\nВаш вік: ${age}`);
});

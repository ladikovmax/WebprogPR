document.getElementById('dataForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  alert(`Ваше ім’я: ${name}\nВаш вік: ${age}`);
});

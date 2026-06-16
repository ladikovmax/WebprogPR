document.body.innerHTML = `
<div>
  <table>
    <tr><th>№<br>п/п</th><th>Посада</th><th>ПІБ</th><th>Вік</th></tr>
    <tr><td>1.</td><td>викладач</td><td>Степанов Степан Степанович</td><td class="age">33</td></tr>
    <tr><td>2.</td><td>викладач</td><td>Федоров Федір Федорович</td><td class="age">25</td></tr>
    <tr><td>3.</td><td>викладач</td><td>Антоненко Антон Антонович</td><td class="age">31</td></tr>
    <tr><td colspan="2" style="border: none;"></td><td class="sum">Середній вік:</td><td id="avg"></td></tr>
  </table>
  <button onclick="countAverage()">Старт</button>
</div>`;

document.head.innerHTML += `<style>
  div { width: 685px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #000; padding: 2px 8px; }
  th { text-align: center; }
  .sum { text-align: right; font-weight: bold; }
  button { display: block; margin: 8px 0 0 auto; padding: 12px 22px; }
</style>`;

function countAverage() {
  const ages = [...document.querySelectorAll('.age')].map(td => +td.textContent);
  const sum = ages.reduce((a, b) => a + b, 0);

  avg.textContent = (sum / ages.length).toFixed(1);
}

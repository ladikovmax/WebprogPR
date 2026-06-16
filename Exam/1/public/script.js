function countAverage() {
  const ages = [...document.querySelectorAll('.age')].map(td => +td.textContent);
  const sum = ages.reduce((a, b) => a + b, 0);

  avg.textContent = (sum / ages.length).toFixed(1);
}

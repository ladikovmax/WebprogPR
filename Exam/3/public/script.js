const rows = [
  ['Степанов Степан Степанович', 33],
  ['Федоров Федір Федорович', 25],
  ['Антоненко Антон Антонович', 31]
];

function App() {
  const [avg, setAvg] = React.useState('');

  return <>
    <div>
      <table>
        <tbody>
          <tr><th>№<br/>п/п</th><th>Посада</th><th>ПІБ</th><th>Вік</th></tr>
          {rows.map((row, i) =>
            <tr key={i}><td>{i + 1}.</td><td>викладач</td><td>{row[0]}</td><td>{row[1]}</td></tr>
          )}
          <tr><td colSpan="2" style={{ border: 'none' }}></td><td className="sum">Середній вік:</td><td>{avg}</td></tr>
        </tbody>
      </table>

      <button onClick={() => setAvg(((33 + 25 + 31) / 3).toFixed(1))}>Старт</button>
    </div>
  </>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

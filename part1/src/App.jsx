import { useState } from "react";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <button type="button" onClick={() => setGood(p => p + 1)}>good</button>
      <button type="button" onClick={() => setNeutral(p => p + 1)}>neutral</button>
      <button type="button" onClick={() => setBad(p => p + 1)}>bad</button>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App;

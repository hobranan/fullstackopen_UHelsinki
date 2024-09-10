import { useState } from 'react'

// copilot suggested these, which i think are very good as they are decoupled from App's onClick functions
const calcAll = (good, neutral, bad) => {
  const all = good + neutral + bad
  return all
}

const calcAverage = (good, neutral, bad) => {
  const average = (good - bad) / calcAll(good, neutral, bad)
  return average
}

const calcPositive = (good, neutral, bad) => {
  const positive = (good / calcAll(good, neutral, bad)) * 100
  return positive
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((good) => good + 1)}> good </button>
      <button onClick={() => setNeutral((neutral) => neutral + 1)}> neutral </button>
      <button onClick={() => setBad((bad) => bad + 1)}> bad </button>

      <h1>statistics</h1>
      <p> good {good} </p>
      <p> neutral {neutral} </p>
      <p> bad {bad} </p>
      <p> all {calcAll(good, neutral, bad)} </p>
      <p> average {calcAverage(good, neutral, bad)} </p>
      <p> positive {calcPositive(good, neutral, bad)} % </p>
    </div>
  )
}

export default App

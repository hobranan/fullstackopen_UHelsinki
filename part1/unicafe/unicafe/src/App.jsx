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

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p> good {props.good} </p>
      <p> neutral {props.neutral} </p>
      <p> bad {props.bad} </p>
      <p> all {calcAll(props.good, props.neutral, props.bad)} </p>
      <p> average {calcAverage(props.good, props.neutral, props.bad)} </p>
      <p> positive {calcPositive(props.good, props.neutral, props.bad)} % </p>
    </div>
  )
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

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

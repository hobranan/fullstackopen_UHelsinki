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

// not sure if this Button was enough because it seems redundant to me
const Button = (props) => {
  return (
    <button onClick={props.onClick}> {props.text} </button>
  )
}

const StatisticLine = (props) => {
  return (
    <p> {props.text} {props.value} </p>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <p> No feedback given </p>
      </div>
    )
  } else {
      return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={calcAll(props.good, props.neutral, props.bad)} />
      <StatisticLine text="average" value={calcAverage(props.good, props.neutral, props.bad)} />
      <StatisticLine text="positive" value={calcPositive(props.good, props.neutral, props.bad) + " %"} />
    </div>
  )
  }

}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((good) => good + 1)} text="good" />
      <Button onClick={() => setNeutral((neutral) => neutral + 1)} text="neutral" />
      <Button onClick={() => setBad((bad) => bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

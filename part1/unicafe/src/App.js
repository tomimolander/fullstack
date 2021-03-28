import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <td>{props.text} {props.value} {props.text === "positive" ? '%' :''}</td>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad} = props

  if ( good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <tr><StatisticLine text="good" value ={good} /></tr>
        <tr><StatisticLine text="neutral" value ={neutral} /></tr>
        <tr><StatisticLine text="bad" value ={bad} /></tr>
        <tr><StatisticLine text="all" value ={good + neutral + bad} /></tr>
        <tr><StatisticLine text="average" value ={(good - bad) / (good + neutral + bad)} /></tr>
        <tr><StatisticLine text="positive" value ={good / (good + neutral + bad) * 100} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
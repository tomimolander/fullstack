import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  //const pointsArray = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

  const changePoints = newPoints => {
    console.log(points)
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const setToSelected = newIndex => {
    console.log(newIndex)
    setSelected(newIndex)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p> 
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => changePoints(1)} text="vote"/>
      <Button handleClick={() => setToSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {Math.max(...points)} votes</p>
    </div>
  )
}

export default App
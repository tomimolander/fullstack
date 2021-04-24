import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </>
    )
}

const Header = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <>
    <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
    </ul>
    <b>total of {parts.reduce(function(result,item){
      return result + item.exercises;
    }, 0)} exercises</b>
    </>
  )
}

const Part = ({part}) => {
  return (
    <li>
        {part.name} {part.exercises}
    </li>
  )
}
export default Course
import React from 'react'

const Filter = ({value, onChange}) => {
    return (
        <div>
        filter shown with: <input
          value={value}
          onChange={onChange}
          />
        </div>
    )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input
          value={props.valueName}
          onChange={props.onChangeName}
          />
        </div>
        <div>
          number: <input
          value={props.valueNumber}
          onChange={props.onChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, onButtonClick}) => {
  return (
    persons.map(function(person, index){
        return (
          <div key={ person.name }>
            <span key={ person.name }>{person.name} {person.number}</span>
            <button onClick={() => onButtonClick(person.name)}>delete</button>
          </div>
        )
      })
  )
}

const Notification = ({ message }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'solid',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'solid',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorMessageStyle}>
      {message}
    </div>
  )
}

export {Filter, PersonForm, Persons, Notification, ErrorMessage};
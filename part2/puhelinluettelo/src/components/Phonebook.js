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

const Persons = ({persons}) => {
  return (
    persons.map(function(person, index){
        return <p key={ person.name }>{person.name} {person.number}</p>;
      })
  )
}

export {Filter, PersonForm, Persons};
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const existsName = persons.find((person) => person.name === newName)

        if (existsName) {
            alert(`${newName} is already added to phonebook`)
            return;
        }

        setPersons(p => ([
            ...p,
            {
                name: newName
            }
        ]))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, index) => (
                    <li key={index}>{person.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
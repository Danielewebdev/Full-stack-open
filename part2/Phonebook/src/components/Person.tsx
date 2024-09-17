const Person = ({ person, handleRemove }: any) => {

    return (
        <li>{person.content} 
        {person.number}
        <button onClick={() => {
            if (window.confirm(`Remove ${person.content}?`)){
                handleRemove(person.id)
            }
        }}>
        Delete
        </button>
        </li>

    )
}

export default Person
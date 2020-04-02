const PersonChecker = ({persons, newName}) => {
    console.log(persons, newName)
    const names = persons.map(p => p.name)
    return(
        names.includes(newName)
    )
}

export default PersonChecker
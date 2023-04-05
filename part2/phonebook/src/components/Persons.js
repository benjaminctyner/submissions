const Persons = ({ person, onClick }) => {
  return (
    <li className='number' key={person.id} name={person.name}>
      {person.name} {person.number}
      <button onClick={onClick}>Delete</button>
    </li>
  );
};

export default Persons;

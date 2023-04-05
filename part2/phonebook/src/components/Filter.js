const Filter = ({ value, onChange }) => (
  <div>
    Filter Phonebook Results: <input value={value} onChange={onChange} />
  </div>
);

export default Filter;

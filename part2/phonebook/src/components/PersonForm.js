const PersonForm = ({ onSubmit, name, number, onChangeName, onChangeNum }) => (
  <form onSubmit={onSubmit}>
    <div>
      Name: <input value={name} onChange={onChangeName} />
    </div>
    <div>
      Number: <input value={number} onChange={onChangeNum} />
    </div>
    <div>
      <button type='submit'>Add Person</button>
    </div>
  </form>
);

export default PersonForm;

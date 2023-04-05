const Query = ({ name, onChangeName }) => {
  return (
    <div>
      Search for a country:
      <input value={name} onChange={onChangeName} />
    </div>
  );
};

export default Query;

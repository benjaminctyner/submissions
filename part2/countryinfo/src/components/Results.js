const Results = ({ country, onClick }) => {
  return (
    <li className='listCountries'>
      {country.name.common}
      <button onClick={onClick}>Show</button>
    </li>
  );
};

export default Results;

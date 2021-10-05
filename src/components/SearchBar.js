import './SearchBar.css'
export default function SearchBar(props) {
  const { search, onSearchParamsChange } = props;

  return (
    <div className="SearchBar_container">
      <label>Topic:
        <input name="topic" type="text" onChange={onSearchParamsChange}></input>
      </label>
      <label>Minimun stars:
        <input name="stars" type="number" onChange={onSearchParamsChange}></input>
      </label>
      <button onClick={search}>Search</button>
    </div>
  );
}

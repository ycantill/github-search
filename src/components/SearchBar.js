import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  searchBar: {
    display: 'block',
    '& *': {
      marginRight: '10px'
    },
    '& input': {
      marginLeft: '10px'
    }
  }
});

export const SearchBar = (props) => {
  const { searchRepositories, onSearchParamsChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.searchBar}>
      <label>Topic:
        <input name="topic" type="text" onChange={onSearchParamsChange}></input>
      </label>
      <label>Minimun stars:
        <input name="stars" type="number" onChange={onSearchParamsChange}></input>
      </label>
      <button onClick={searchRepositories}>Search</button>
    </div>
  );
}

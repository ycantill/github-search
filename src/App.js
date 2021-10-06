import { useState } from "react";
import useOctokit from "./hooks/octokit";
import { SearchBar } from './components/SearchBar';
import { Repositories } from './components/Repositories';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px'
  }
});

function App() {
  const classes = useStyles();
  const octokit = useOctokit();
  const [repositories, setRepositories] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  async function search() {
    const { topic = '', stars = 0 } = searchParams;
    const q = `topic:${topic}+stars:>=${stars}`;
    const { data: { items: repositories } } = await octokit.rest.search.repos({ q, sort: 'stars', per_page: 10 });

    setRepositories(repositories);
  }

  function onSearchParamsChange(event) {
      setSearchParams((previousSearchParams) => {
          return Object.assign({}, previousSearchParams, { [event.target.name]: event.target.value });
      });
  }

  return (
    <div className={classes.app}>
      <h1>Github repositories search</h1>
      <SearchBar search={search} onSearchParamsChange={onSearchParamsChange}></SearchBar>
      <Repositories repositories={repositories}></Repositories>
    </div>
  );
}

export default App;

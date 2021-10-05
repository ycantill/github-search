import './App.css';
import { useState } from "react";
import useOctokit from "./hooks/octokit";
import SearchBar from './components/SearchBar';
import RepositoriesList from './components/RepositoriesList';

function App() {
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
    <div className="App_container">
      <h1>Github repositories search</h1>
      <SearchBar search={search} onSearchParamsChange={onSearchParamsChange}></SearchBar>
      <RepositoriesList repositories={repositories}></RepositoriesList>
    </div>
  );
}

export default App;

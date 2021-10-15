import { SyntheticEvent, useState, useContext } from "react";
import { SearchBar } from './SearchBar';
import { Repositories } from './Repositories';
import { createUseStyles } from 'react-jss'
import { OctokitContext } from './OctokitAuth';
import { SearchParams } from "../types/SearchParams";
import { Repository } from "../types/Repository";

const useStyles = createUseStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px'
  }
});

export const GithubSearch = () => {
  const classes = useStyles();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({} as SearchParams);
  const { search } = useContext(OctokitContext);

  function onSearchParamsChange(event: SyntheticEvent) {
      const target = event.target as HTMLInputElement;

      setSearchParams((previousSearchParams) => {
          return Object.assign({}, previousSearchParams, { [target.name]: target.value });
      });
  }

  const searchRepositories = () => {
    search(searchParams, (repositories: Repository[]) => {
      setRepositories(repositories);
    });
  }

  return (
    <div className={classes.app}>
      <h1>Github repositories search</h1>
      <SearchBar searchRepositories={searchRepositories} onSearchParamsChange={onSearchParamsChange}></SearchBar>
      <Repositories repositories={repositories}></Repositories>
    </div>
  );
}

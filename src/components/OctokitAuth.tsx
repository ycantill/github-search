import { useEffect, useState, createContext} from "react";
import { SearchParams } from "../types/SearchParams";
import { Endpoints } from "@octokit/types";
import { Octokit } from "octokit";
import { Repository } from "../types/Repository";

type RespositoriesSearchResponse = Endpoints["GET /search/repositories"]["response"];

export const OctokitContext = createContext<any>({});
export const OctokitAuth = (props: any) => {
  const [octokit, setOctokit] = useState<Octokit>({} as Octokit);

  useEffect(() => {
    const AUTH_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";
    const octokit = new Octokit({
      auth: AUTH_TOKEN,
    });
    (async () => {
      try {
        await octokit.rest.users.getAuthenticated();

        setOctokit(octokit);
      } catch (error) {
        // TODO: HANDLE ERRORS
        throw new Error(`Ups there was a problem authenticating into github, error details: ${error}`);
      }
    })();
  }, []);

  const search = async (searchParams: SearchParams, callback: Function) => {
    const { topic = '', stars = 0 } = searchParams;
    const q = `topic:${topic}+stars:>=${stars}`;
    const { data: { items } }: RespositoriesSearchResponse = await octokit.rest.search.repos({ q, sort: 'stars', per_page: 10 });

    // TODO: ADD TYPE TO ITEMS
    const repositories: Repository[] = items.map(item => {
      return { id: item.id, name: item.full_name, stars: item.stargazers_count };
    });

    callback(repositories);
  }

  if (!octokit) {
    return null;
  }

  return (
    <OctokitContext.Provider value={{ search }}>
      {props.children}
    </OctokitContext.Provider>)
};

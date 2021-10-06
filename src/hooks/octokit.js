import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export default function useOctokit() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const AUTH_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';
    const octokit = new Octokit({
      auth: AUTH_TOKEN,
    });
    (async () => {
        try {
            await octokit.rest.users.getAuthenticated();
      
            setIsAuthenticated(octokit);
        } catch (error) {
            throw new Error(`Ups there was a problem authenticating into github, error details: ${error}`);
        }
    })();
  }, []);

  return isAuthenticated;
}

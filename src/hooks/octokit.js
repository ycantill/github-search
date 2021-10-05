import { Octokit } from "octokit";
import { useEffect, useState } from "react";
const AUTH_TOKEN = `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`;

export default function useOctokit() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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

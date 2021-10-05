export default function RepositoriesList(props) {
  const { repositories } = props;

  return (
    <div>
      <ol>
        {repositories.map((repository) => {
          return <li key={repository.id}>
            {`full name: ${repository.full_name}`}
            <br></br>
            {`stars: ${repository.stargazers_count}`}
            </li>;
        })}
      </ol>
    </div>
  );
}

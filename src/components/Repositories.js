export const Repositories = (props) => {
  const { repositories } = props;

  return (
    <div>
      <ol>
        {repositories.map((repository) => {
          return <li key={repository.id}>
            {`full name: ${repository.name}`}
            <br></br>
            {`stars: ${repository.stars}`}
            </li>;
        })}
      </ol>
    </div>
  );
}

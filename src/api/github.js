export function getRepositoryList(username) {
  return fetch(`https://api.github.com/users/${username}/repos`);
}

export async function getRepositoryDetails(username, repoName) {
  return await fetch(`https://api.github.com/repos/${username}/${repoName}`);
}

export async function getRepositoryList(username) {
    return await fetch(`https://api.github.com/users/${username}/repos`)
}

export async function getRepositoryDetails(repoName) {
    return await fetch(`https://api.github.com/repos/amednin/${repoName}`)
}

export interface ProjectFetchResponse {
  name: string,
  stargazers_count: number,
  forks_count: number,
  owner: {
    login: string,  //name
    avatar_url: string,
  },
  description: string,
  html_url: string,
}


export interface ProjectsFetchResponse {
  total_count: number,
  items: {
    name: string,
    stargazers_count: number,
    owner: {
      login: string
    }
  }[]
}

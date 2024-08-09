export interface FetchReposParams {
    query: string;
    sortField: string;
    sortOrder: 'asc' | 'desc';
    page: number;
}

export interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    description?: string;
    license?: {
        name: string;
    };
}

export interface FetchReposResponse {
    items: Repo[];
    total_count: number;
}

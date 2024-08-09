import {FetchReposParams} from "./types.ts";

export const fetchReposFromGitHub = async ({ query, sortField, sortOrder, page }:FetchReposParams) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=${sortField}&order=${sortOrder}&per_page=10&page=${page}`);

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных: ' + response.statusText);
    }

    const data = await response.json();
    console.log(data)
    return data;
};
// Интерфейс для параметров запроса к API GitHub для получения репозиториев
export interface FetchReposParams {
    // Поисковой запрос, например, 'react' или 'redux'
    query: string;

    // Поле для сортировки, например, 'name', 'stargazers_count', 'forks_count'
    sortField: string;

    // Порядок сортировки: 'asc' (возрастание) или 'desc' (убывание)
    sortOrder: 'asc' | 'desc';

    // Номер страницы для пагинации
    page: number;
}

// Интерфейс для описания репозитория
export interface Repo {
    // Уникальный идентификатор репозитория
    id: number;

    // Название репозитория
    name: string;

    // Язык программирования, на котором написан репозиторий
    language: string;

    // Количество форков (репозиториев, созданных на основе этого)
    forks_count: number;

    // Количество звезд (оценок) у репозитория
    stargazers_count: number;

    // Дата последнего обновления репозитория в формате ISO 8601
    updated_at: string;

    // Описание репозитория (опционально)
    description?: string;

    // Лицензия репозитория (опционально)
    license?: {
        // Название лицензии
        name: string;
    };
}

// Интерфейс для ответа от API GitHub при запросе репозиториев
export interface FetchReposResponse {
    // Массив объектов Repo, представляющий список репозиториев
    items: Repo[];

    // Общее количество репозиториев, соответствующих запросу
    total_count: number;
}

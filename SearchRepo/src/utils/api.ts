import {FetchReposParams} from "./types.ts";

// Функция для получения репозиториев с GitHub API
// Принимает параметры запроса в виде объекта FetchReposParams
export const fetchReposFromGitHub = async ({query, sortField, sortOrder, page}: FetchReposParams) => {
    try {
        // Формирование URL для запроса к GitHub API
        // Включает параметры запроса: query (поисковый запрос), sortField (поле сортировки),
        // sortOrder (порядок сортировки: 'asc' или 'desc'), page (номер страницы)
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=${sortField}&order=${sortOrder}&per_page=10&page=${page}`);

        // Проверка, успешен ли ответ (status code 200-299)
        if (!response.ok) {
            // Если ответ не успешен, выбрасываем ошибку с сообщением
            throw new Error('Ошибка при загрузке данных');
        }

        // Преобразование ответа в формат JSON
        const data = await response.json();

        // Логирование данных в консоль (для отладки)
        console.log(data);

        // Возврат данных из функции
        return data;
    } catch (error) {
        // Обработка возможных ошибок
        console.error('Ошибка при выполнении запроса', error);
        throw error; // Перебрасывание ошибки для дальнейшей обработки
    }
};

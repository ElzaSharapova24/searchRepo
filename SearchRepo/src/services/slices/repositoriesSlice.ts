import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchReposParams, Repo} from "../../utils/types.ts";
import {fetchReposFromGitHub} from "../../utils/api.ts";

export interface RepositoriesState {
    items: Repo[];  // Список репозиториев
    status: 'idle' | 'loading' | 'succeeded' | 'failed';  // Статус запроса
    error: string | null;  // Сообщение об ошибке, если запрос не удался
    totalCount: number;  // Общее количество репозиториев
}

export const sliceName = "repos";  // Имя среза (slice), используемое в приложении

/**
 * Асинхронный thunk для получения репозиториев с GitHub.
 * Вызов fetchReposFromGitHub происходит асинхронно, и результат (или ошибка) будет
 * передан в соответствующие case-обработчики (fulfilled, rejected).
 */
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',  // Имя действия (action) для этого thunk
    async (params: FetchReposParams) => {
        const data = await fetchReposFromGitHub(params);  // Асинхронный запрос к API
        return data;  // Возвращает данные, которые будут переданы в action.payload
    }
);

/**
 * Создание slice (среза) с названием `repos` и его состоянием (initialState).
 * Slice автоматически создаёт действия (actions) и редюсеры (reducers) на основе заданных полей.
 */
export const repositoriesSlice = createSlice({
    name: sliceName,  // Имя среза
    initialState: {
        items: [],  // Начальный список репозиториев
        status: 'idle',  // Начальный статус (idle - ожидание)
        error: null,  // Ошибок на старте нет
        totalCount: 0,  // Начальное количество репозиториев
    } as RepositoriesState,  // Приведение к типу RepositoriesState
    reducers: {
        /**
         * Очищает список репозиториев и сбрасывает состояние до начального.
         * Этот редюсер может быть вызван для сброса состояния перед новым поиском или при необходимости очистки данных.
         */
        clearRepos: (state) => {
            state.items = [];  // Очищает список репозиториев
            state.totalCount = 0;  // Сбрасывает общее количество на 0
            state.status = 'idle';  // Устанавливает статус в idle
            state.error = null;  // Удаляет сообщение об ошибке, если было
        },
    },
    /**
     * Обработка дополнительных действий (extraReducers), связанных с асинхронным thunk fetchRepos.
     * Здесь определяются три возможных состояния для этого thunk: pending, fulfilled, и rejected.
     */
    extraReducers: (builder) => {
        builder
            // Действие, которое происходит, когда fetchRepos отправлен, но еще не завершен
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';  // Устанавливаем статус в "загрузка"
            })
            // Действие, которое происходит, когда fetchRepos успешно завершен
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Устанавливаем статус в "успех"
                state.items = action.payload.items;  // Обновляем список репозиториев
                state.totalCount = action.payload.total_count;  // Обновляем общее количество
            })
            // Действие, которое происходит, когда fetchRepos завершен с ошибкой
            .addCase(fetchRepos.rejected, (state, action) => {
                state.status = 'failed';  // Устанавливаем статус в "ошибка"
                state.error = action.error.message || 'Что-то пошло не так';  // Сохраняем сообщение об ошибке
            });
    },
});

// Экспортируем действие (action) для очистки репозиториев
export const {clearRepos} = repositoriesSlice.actions;

// Экспортируем редюсер для включения в store
export const repositoriesReducers = repositoriesSlice.reducer;

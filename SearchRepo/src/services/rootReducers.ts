import {combineReducers} from "@reduxjs/toolkit";
import {repositoriesReducers, repositoriesSlice} from "./slices/repositoriesSlice.ts";

// Создание корневого редюсера для приложения
// Здесь мы объединяем все редюсеры в один корневой редюсер
export const rootReducers = combineReducers({
    // Мы добавляем редюсер для среза (slice) репозиториев
    // Имя ключа в объекте совпадает с именем среза (slice) для правильного связывания
    [repositoriesSlice.name]: repositoriesReducers,
});

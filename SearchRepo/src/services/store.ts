import {configureStore} from "@reduxjs/toolkit";
import {rootReducers} from "./rootReducers.ts";

// Тип для диспетчера (dispatch) приложения
// Он будет использоваться для типизации диспетчера в вашем приложении
export type AppDispatch = typeof store.dispatch;

// Тип для состояния корневого хранилища приложения
// Он будет использоваться для типизации состояния при использовании useSelector и других хуков
export type RootState = ReturnType<typeof store.getState>;

// Создание хранилища Redux
// configureStore автоматически добавляет thunk middleware и Redux DevTools Extension
export const store = configureStore({
    reducer: rootReducers,  // Используем корневой редюсер для управления состоянием
});

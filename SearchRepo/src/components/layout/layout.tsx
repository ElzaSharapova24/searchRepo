import AppHeader from "../app-header";
import SearchResults from "../search-results";
import {Box} from "@mui/material";
import {Repo} from "../../utils/types.ts";
import {ChangeEvent} from "react";
import StartPage from "../start-page";

interface LayoutProps {
    sortOrder?: "asc" | "desc",
    sortField?: string,
    page?: number,
    selectedRepo?: Repo | null,
    handleSort?: (field: string) => void,
    handlePageChange?: (_event: ChangeEvent<unknown>, value: number) => void,
    setSelectedRepo?: (value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void,
    hasInput?: boolean,
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Компонент Layout управляет отображением основного содержимого страницы.
 * В зависимости от того, введены ли данные в поле ввода, отображается либо стартовая страница,
 * либо результаты поиска.
 */
function Layout({
                    sortOrder,
                    sortField,
                    page,
                    selectedRepo,
                    handleSort,
                    handlePageChange,
                    setSelectedRepo,
                    hasInput,
                    handleInputChange
                }: LayoutProps) {

    /**
     * Рендеринг компонента Layout.
     * Включает заголовок приложения (`AppHeader`) и основное содержимое страницы,
     * которое изменяется в зависимости от состояния `hasInput`.
     */
    return (
        <>
            <AppHeader
                sortOrder={sortOrder}
                sortField={sortField}
                page={page}
                onInputChange={handleInputChange} // Передаем обработчик ввода текста в AppHeader
            />
            <Box component={'main'}>
                {/* Показываем StartPage или SearchResults в зависимости от наличия ввода */}
                {hasInput ? (
                    <SearchResults
                        sortOrder={sortOrder}
                        sortField={sortField}
                        page={page}
                        selectedRepo={selectedRepo}
                        handleSort={handleSort}
                        handlePageChange={handlePageChange}
                        setSelectedRepo={setSelectedRepo}
                    />
                ) : (
                    <StartPage/>
                )}
            </Box>
        </>
    );
}

export default Layout;

import Layout from "../layout";
import {Container} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ChangeEvent, useState} from "react";
import {Repo} from "../../utils/types.ts";

/**
 * Основной компонент приложения.
 * Управляет состояниями сортировки, страниц и выбранного репозитория,
 * а также передает эти данные в компонент Layout.
 */
function App() {

    /**
     * Состояние, которое хранит порядок сортировки.
     * Значения могут быть 'asc' (по возрастанию) или 'desc' (по убыванию).
     */
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    /**
     * Состояние, которое хранит поле, по которому происходит сортировка.
     */
    const [sortField, setSortField] = useState<string>('stargazers_count');

    /**
     * Состояние, которое хранит текущую страницу пагинации.
     */
    const [page, setPage] = useState<number>(1);

    /**
     * Состояние, которое хранит информацию о выбранном репозитории.
     */
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

    /**
     * Обработчик для изменения порядка сортировки и поля сортировки.
     * @param field - Поле, по которому должна производиться сортировка.
     */
    const handleSort = (field: string) => {
        setSortOrder((prevOrder: string) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setSortField(field);
    };

    /**
     * Обработчик для изменения страницы в пагинации.
     * @param _event - Событие изменения страницы (не используется).
     * @param value - Новое значение страницы.
     */
    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    /**
     * Состояние `hasInput` отслеживает, вводит ли пользователь данные в поле ввода.
     * Если поле ввода содержит текст, значение `true`, если пустое — `false`.
     */
    const [hasInput, setHasInput] = useState<boolean>(false);

    /**
     * Обработчик изменений текста в поле ввода.
     * Обновляет состояние `hasInput` в зависимости от того, есть ли текст в поле ввода.
     * @param event - Событие изменения текста в поле ввода.
     */
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHasInput(event.target.value.length > 0);
    };

    /**
     * Рендеринг компонента App.
     * Включает в себя контейнер Material-UI и компонент Layout,
     * которому передаются состояния и обработчики.
     */
    return (
        <Container fixed sx={{display: 'flex', flexDirection: 'column'}}>
            <Layout
                sortOrder={sortOrder}
                sortField={sortField}
                page={page}
                selectedRepo={selectedRepo}
                handleSort={handleSort}
                handlePageChange={handlePageChange}
                setSelectedRepo={setSelectedRepo}
                hasInput={hasInput}
                handleInputChange={handleInputChange}

            />
        </Container>
    )
}

export default App;

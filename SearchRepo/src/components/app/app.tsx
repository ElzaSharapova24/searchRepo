import Layout from "../layout";
import {Container} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ChangeEvent, useState} from "react";
import {Repo} from "../../utils/types.ts";


function App() {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [sortField, setSortField] = useState<string>('stargazers_count');
    const [page, setPage] = useState<number>(1);
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);


    const handleSort = (field: string) => {
        setSortOrder((prevOrder: string) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setSortField(field);
    };

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Container fixed>
            <Layout sortOrder={sortOrder} sortField={sortField} page={page} selectedRepo={selectedRepo} handleSort={handleSort} handlePageChange={handlePageChange} setSelectedRepo={setSelectedRepo}/>
        </Container>
    )
}

export default App

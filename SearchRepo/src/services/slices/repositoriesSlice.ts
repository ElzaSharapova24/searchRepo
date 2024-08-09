import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {FetchReposParams, Repo} from "../../utils/types.ts";
import {fetchReposFromGitHub} from "../../utils/api.ts";

export interface RepositoriesState {
    items: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    totalCount: number;
}


export const sliceName = "repos";


export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async (params: FetchReposParams) => {
        const data = await fetchReposFromGitHub(params);
        return data;
    }
);

export const repositoriesSlice = createSlice({
    name: sliceName,
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        totalCount: 0,
    } as RepositoriesState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCount = action.payload.total_count;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            });
    },
});

export const repositoriesReducers = repositoriesSlice.reducer;

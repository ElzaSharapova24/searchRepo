import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/app";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {Provider} from "react-redux";
import {store} from "./services/store.ts";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}>
                <App/>
            </DevSupport>
        </Provider>
    </React.StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

// third party
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { NotificationContainer } from 'react-notifications';

// default theme
import themes from 'themes';

// style + assets
import 'assets/scss/styles.scss';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes()}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
        <NotificationContainer />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

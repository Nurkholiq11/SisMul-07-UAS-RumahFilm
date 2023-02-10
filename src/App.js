import { lazy } from 'react';

// third party
import { Routes, Route } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';

// pages
const MoviesPage = Loadable(lazy(() => import('views/pages/Movies.js')));

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MoviesPage />} />
        </Routes>
    );
}

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from './Pages/SearchPage.tsx';
import { WatchlistPage } from './Pages/WatchlistPage.tsx';
import { MovieDetailsPage } from './Pages/MovieDetailsPage.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/my-watchlist" element={<WatchlistPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
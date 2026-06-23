import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Catalog } from './pages/Catalog/Catalog';
import { GameDetail } from './pages/GameDetail/GameDetail';
import { Plans } from './pages/Plans/Plans';
import { Profile } from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

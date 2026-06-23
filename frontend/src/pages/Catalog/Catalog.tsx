import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { gameService } from '../../services/gameService';
import { categoryService } from '../../services/categoryService';
import { GameCard } from '../../components/GameCard/GameCard';
import type { Game, Category } from '../../types';
import './Catalog.css';

export function Catalog() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    async function load() {
      try {
        const [gamesData, categoriesData] = await Promise.all([
          gameService.list(),
          categoryService.list(),
        ]);
        setGames(gamesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || 
      game.categories?.some((c) => c.id === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  function handleCategoryFilter(catId: string) {
    if (catId === selectedCategory) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="catalog-page" id="catalog-page">
      <div className="container">
        <div className="catalog-header slide-up">
          <h1 className="catalog-title">
            Catálogo de <span className="hero-highlight">Jogos</span>
          </h1>
          <p className="catalog-subtitle">
            Encontre seu próximo jogo favorito entre nosso acervo completo.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="catalog-filters slide-up">
          <div className="catalog-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="input search-input"
              placeholder="Buscar jogos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="catalog-search-input"
            />
          </div>

          {categories.length > 0 && (
            <div className="catalog-categories">
              <Filter size={16} className="filter-icon" />
              <button
                className={`category-chip ${!selectedCategory ? 'active' : ''}`}
                onClick={() => { searchParams.delete('category'); setSearchParams(searchParams); }}
                id="filter-all"
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(cat.id)}
                  id={`filter-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="catalog-count">
              {filtered.length} jogo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="games-grid stagger">
              {filtered.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <Search size={48} />
            <h3>Nenhum jogo encontrado</h3>
            <p>Tente buscar com outros termos ou limpe os filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

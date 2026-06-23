import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap, Globe, ChevronRight, Layers } from 'lucide-react';
import { gameService } from '../../services/gameService';
import { categoryService } from '../../services/categoryService';
import { GameCard } from '../../components/GameCard/GameCard';
import type { Game, Category } from '../../types';
import './Home.css';

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge badge badge-green">
            <Zap size={12} />
            Streaming em Nuvem
          </div>
          <h1 className="hero-title">
            Jogue em <span className="hero-highlight">qualquer lugar</span>,
            <br />sem limites.
          </h1>
          <p className="hero-subtitle">
            Acesse centenas de jogos diretamente do navegador.
            Sem downloads, sem espera. Apenas diversão instantânea com a potência do cloud gaming.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn btn-accent btn-lg" id="hero-cta-catalog">
              <Gamepad2 size={20} />
              Explorar Catálogo
            </Link>
            <Link to="/plans" className="btn btn-ghost btn-lg" id="hero-cta-plans">
              Ver Planos
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <Globe size={16} className="hero-stat-icon" />
              <span className="hero-stat-value">{games.length}+</span>
              <span className="hero-stat-label">Jogos</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <Layers size={16} className="hero-stat-icon" />
              <span className="hero-stat-value">{categories.length}</span>
              <span className="hero-stat-label">Categorias</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <Zap size={16} className="hero-stat-icon" />
              <span className="hero-stat-value">&lt;30ms</span>
              <span className="hero-stat-label">Latência</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="section" id="categories-section">
          <div className="container">
            <h2 className="section-title">
              Navegue por <span className="highlight">Categorias</span>
            </h2>
            <div className="categories-grid stagger">
              {categories.map((cat) => (
                <Link
                  to={`/catalog?category=${cat.id}`}
                  className="category-pill"
                  key={cat.id}
                  id={`cat-pill-${cat.id}`}
                >
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Games Section */}
      <section className="section" id="games-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Jogos <span className="highlight">Disponíveis</span>
            </h2>
            <Link to="/catalog" className="btn btn-ghost btn-sm" id="see-all-games">
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          ) : games.length > 0 ? (
            <div className="games-grid stagger">
              {games.slice(0, 8).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Gamepad2 size={48} />
              <h3>Nenhum jogo cadastrado ainda</h3>
              <p>Os jogos aparecerão aqui quando forem adicionados ao catálogo.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

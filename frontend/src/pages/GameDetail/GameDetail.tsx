import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Shield, Globe, Play, Gamepad2 } from 'lucide-react';
import { gameService } from '../../services/gameService';
import type { Game } from '../../types';
import './GameDetail.css';

export function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data = await gameService.getById(id);
        setGame(data);
      } catch (err) {
        setError('Jogo não encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="game-detail-page">
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-detail-page">
        <div className="container">
          <div className="empty-state">
            <Gamepad2 size={48} />
            <h3>{error || 'Jogo não encontrado'}</h3>
            <Link to="/catalog" className="btn btn-primary">
              <ArrowLeft size={16} />
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const releaseYear = game.releaseDate ? new Date(game.releaseDate).getFullYear() : '—';
  const releaseFormatted = game.releaseDate
    ? new Date(game.releaseDate).toLocaleDateString('pt-BR')
    : '—';

  // Gradient for the game banner
  const gradients = [
    'linear-gradient(135deg, #1a472a 0%, #0d2818 50%, #050f09 100%)',
    'linear-gradient(135deg, #1a2a47 0%, #0d1828 50%, #050913 100%)',
    'linear-gradient(135deg, #47331a 0%, #281e0d 50%, #130d05 100%)',
    'linear-gradient(135deg, #471a1a 0%, #280d0d 50%, #130505 100%)',
    'linear-gradient(135deg, #2d1a47 0%, #190d28 50%, #0d0513 100%)',
  ];
  let hash = 0;
  for (let i = 0; i < game.id.length; i++) hash = game.id.charCodeAt(i) + ((hash << 5) - hash);
  const gradient = gradients[Math.abs(hash) % gradients.length];

  return (
    <div className="game-detail-page" id="game-detail-page">
      {/* Banner */}
      <div className="game-banner" style={{ background: gradient }}>
        <div className="game-banner-overlay" />
        <div className="game-banner-icon">
          <Gamepad2 size={96} strokeWidth={0.8} />
        </div>
      </div>

      <div className="container">
        <Link to="/catalog" className="back-link" id="back-to-catalog">
          <ArrowLeft size={16} />
          Voltar ao Catálogo
        </Link>

        <div className="game-detail-content fade-in">
          <div className="game-detail-main">
            <h1 className="game-detail-title">{game.title}</h1>

            <div className="game-detail-badges">
              {game.minimumAge > 0 && (
                <span className="badge badge-default">
                  <Shield size={12} />
                  {game.minimumAge}+
                </span>
              )}
              <span className="badge badge-green">
                <Calendar size={12} />
                {releaseYear}
              </span>
            </div>

            <p className="game-detail-description">{game.description}</p>

            <div className="game-detail-info">
              <div className="info-row">
                <span className="info-label">Data de Lançamento</span>
                <span className="info-value">{releaseFormatted}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Idade Mínima</span>
                <span className="info-value">{game.minimumAge}+</span>
              </div>
              {game.developer && (
                <div className="info-row">
                  <span className="info-label">Desenvolvedora</span>
                  <span className="info-value">
                    <Globe size={14} />
                    {game.developer.name}
                  </span>
                </div>
              )}
            </div>

            {game.categories && game.categories.length > 0 && (
              <div className="game-detail-categories">
                <span className="info-label">Categorias</span>
                <div className="game-detail-cat-list">
                  {game.categories.map((cat) => (
                    <span key={cat.id} className="badge badge-default">{cat.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="game-detail-sidebar">
            <div className="game-play-card glass">
              <Gamepad2 size={32} className="play-card-icon" />
              <h3>Pronto para jogar?</h3>
              <p>Inicie uma sessão de streaming agora mesmo.</p>
              <button className="btn btn-accent btn-lg" style={{ width: '100%' }} id="play-game-btn">
                <Play size={20} />
                Jogar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

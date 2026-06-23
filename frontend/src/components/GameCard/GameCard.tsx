import type { Game } from '../../types';
import { Gamepad2, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GameCard.css';

interface GameCardProps {
  game: Game;
}

// Pre-generated gradient backgrounds for game cards (no external images needed)
const gradients = [
  'linear-gradient(135deg, #1a472a 0%, #0d2818 50%, #0a1f13 100%)',
  'linear-gradient(135deg, #1a2a47 0%, #0d1828 50%, #0a1320 100%)',
  'linear-gradient(135deg, #47331a 0%, #281e0d 50%, #20170a 100%)',
  'linear-gradient(135deg, #471a1a 0%, #280d0d 50%, #200a0a 100%)',
  'linear-gradient(135deg, #2d1a47 0%, #190d28 50%, #130a20 100%)',
  'linear-gradient(135deg, #1a4747 0%, #0d2828 50%, #0a2020 100%)',
  'linear-gradient(135deg, #3d471a 0%, #22280d 50%, #1b200a 100%)',
  'linear-gradient(135deg, #471a3d 0%, #280d22 50%, #200a1b 100%)',
];

function getGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function GameCard({ game }: GameCardProps) {
  const year = game.releaseDate ? new Date(game.releaseDate).getFullYear() : '—';

  return (
    <Link to={`/games/${game.id}`} className="game-card card" id={`game-card-${game.id}`}>
      <div className="game-card-cover" style={{ background: getGradient(game.id) }}>
        <div className="game-card-cover-icon">
          <Gamepad2 size={48} strokeWidth={1} />
        </div>
        <div className="game-card-badges">
          {game.minimumAge > 0 && (
            <span className="badge badge-default">
              <Shield size={10} />
              {game.minimumAge}+
            </span>
          )}
        </div>
      </div>
      <div className="game-card-body">
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-desc">{game.description}</p>
        <div className="game-card-meta">
          <span className="game-card-meta-item">
            <Calendar size={12} />
            {year}
          </span>
          {game.developer && (
            <span className="game-card-meta-item">
              {game.developer.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

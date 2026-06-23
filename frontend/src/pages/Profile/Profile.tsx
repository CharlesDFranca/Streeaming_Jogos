import { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus, Clock, Gamepad2, CreditCard } from 'lucide-react';
import { userService } from '../../services/userService';
import { subscriptionService } from '../../services/subscriptionService';
import { gameSessionService } from '../../services/gameSessionService';
import type { User as UserType, Subscription, GameSession } from '../../types';
import './Profile.css';

export function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await userService.getById(loginId);
      setUser(data);
      // Load subscriptions and sessions
      const [subs, sess] = await Promise.all([
        subscriptionService.getByUserId(data.id).catch(() => []),
        gameSessionService.getByUserId(data.id).catch(() => []),
      ]);
      setSubscriptions(subs);
      setSessions(sess);
    } catch {
      setError('Usuário não encontrado. Verifique o ID.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await userService.create(formData);
      setUser(data);
      setSubscriptions([]);
      setSessions([]);
    } catch (err) {
      setError('Erro ao criar usuário. Verifique os dados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setSubscriptions([]);
    setSessions([]);
    setLoginId('');
    setFormData({ name: '', email: '', password: '' });
  }

  // Not logged in
  if (!user) {
    return (
      <div className="profile-page" id="profile-page">
        <div className="container">
          <div className="auth-container slide-up">
            <div className="auth-card glass">
              <div className="auth-header">
                <User size={32} className="auth-icon" />
                <h1 className="auth-title">Bem-vindo</h1>
                <p className="auth-subtitle">Acesse sua conta ou crie uma nova</p>
              </div>

              <div className="auth-tabs">
                <button
                  className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                  id="tab-login"
                >
                  <LogIn size={16} />
                  Entrar
                </button>
                <button
                  className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                  id="tab-register"
                >
                  <UserPlus size={16} />
                  Cadastrar
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}

              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="auth-form">
                  <div className="input-group">
                    <label htmlFor="login-id">ID do Usuário</label>
                    <input
                      id="login-id"
                      className="input"
                      placeholder="Cole seu ID aqui..."
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Carregando...' : 'Entrar'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="auth-form">
                  <div className="input-group">
                    <label htmlFor="reg-name">Nome</label>
                    <input
                      id="reg-name"
                      className="input"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="reg-email">E-mail</label>
                    <input
                      id="reg-email"
                      className="input"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="reg-password">Senha</label>
                    <input
                      id="reg-password"
                      className="input"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Criando...' : 'Criar Conta'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in
  return (
    <div className="profile-page" id="profile-page">
      <div className="container">
        <div className="profile-content fade-in">
          {/* User Info */}
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">
                <Mail size={14} />
                {user.email}
              </p>
              <p className="profile-id">
                <Lock size={14} />
                ID: {user.id}
              </p>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost" id="logout-btn">
              Sair
            </button>
          </div>

          {/* Subscriptions */}
          <section className="profile-section">
            <h2 className="section-title">
              <CreditCard size={20} />
              Minhas <span className="highlight">Assinaturas</span>
            </h2>
            {subscriptions.length > 0 ? (
              <div className="profile-list">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="profile-list-item">
                    <div className="profile-list-icon">
                      <CreditCard size={18} />
                    </div>
                    <div className="profile-list-info">
                      <span className="profile-list-title">
                        {sub.plan?.name || 'Plano'}
                      </span>
                      <span className="profile-list-meta">
                        {new Date(sub.startDate).toLocaleDateString('pt-BR')} → {new Date(sub.endDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <span className={`badge ${sub.status === 'active' ? 'badge-green' : 'badge-default'}`}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty">
                <p>Nenhuma assinatura ativa.</p>
              </div>
            )}
          </section>

          {/* Game Sessions */}
          <section className="profile-section">
            <h2 className="section-title">
              <Gamepad2 size={20} />
              Sessões de <span className="highlight">Jogo</span>
            </h2>
            {sessions.length > 0 ? (
              <div className="profile-list">
                {sessions.map((sess) => (
                  <div key={sess.id} className="profile-list-item">
                    <div className="profile-list-icon">
                      <Gamepad2 size={18} />
                    </div>
                    <div className="profile-list-info">
                      <span className="profile-list-title">
                        {sess.game?.title || `Jogo ${sess.gameId?.slice(0, 8)}...`}
                      </span>
                      <span className="profile-list-meta">
                        <Clock size={12} />
                        {sess.playedMinutes} min • {sess.averagePingMs}ms ping
                      </span>
                    </div>
                    <span className="profile-list-date">
                      {new Date(sess.startDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty">
                <p>Nenhuma sessão de jogo registrada.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

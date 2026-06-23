import { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus, Clock, Gamepad2, CreditCard, Pencil, Trash2, X, Save, AlertTriangle } from 'lucide-react';
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

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
    setEditing(false);
    setShowDeleteConfirm(false);
    setSuccessMessage('');
  }

  // ===== UPDATE =====
  function startEditing() {
    if (!user) return;
    setEditData({ name: user.name, email: user.email });
    setEditError('');
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setEditError('');
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setEditLoading(true);
    setEditError('');

    try {
      const updated = await userService.update(user.id, editData);
      setUser(updated);
      setEditing(false);
      setSuccessMessage('Dados atualizados com sucesso!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setEditError('Erro ao atualizar dados. Verifique as informações.');
    } finally {
      setEditLoading(false);
    }
  }

  // ===== DELETE =====
  async function handleDelete() {
    if (!user) return;

    setDeleteLoading(true);

    try {
      await userService.delete(user.id);
      handleLogout();
      setSuccessMessage('Conta excluída com sucesso.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      setShowDeleteConfirm(false);
    } finally {
      setDeleteLoading(false);
    }
  }

  // Not logged in
  if (!user) {
    return (
      <div className="profile-page" id="profile-page">
        <div className="container">
          {successMessage && (
            <div className="toast-container">
              <div className="toast toast-success">{successMessage}</div>
            </div>
          )}
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
        {successMessage && (
          <div className="toast-container">
            <div className="toast toast-success">{successMessage}</div>
          </div>
        )}

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
            <div className="profile-actions">
              <button onClick={startEditing} className="btn btn-secondary btn-sm" id="edit-profile-btn">
                <Pencil size={14} />
                Editar
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-danger btn-sm" id="delete-account-btn">
                <Trash2 size={14} />
                Excluir
              </button>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm" id="logout-btn">
                Sair
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <section className="profile-section fade-in">
              <div className="edit-card">
                <div className="edit-card-header">
                  <h2 className="edit-card-title">
                    <Pencil size={18} />
                    Editar Perfil
                  </h2>
                  <button onClick={cancelEditing} className="btn btn-icon btn-ghost" id="cancel-edit-btn">
                    <X size={18} />
                  </button>
                </div>

                {editError && <div className="auth-error">{editError}</div>}

                <form onSubmit={handleUpdate} className="auth-form">
                  <div className="input-group">
                    <label htmlFor="edit-name">Nome</label>
                    <input
                      id="edit-name"
                      className="input"
                      placeholder="Seu nome"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="edit-email">E-mail</label>
                    <input
                      id="edit-email"
                      className="input"
                      type="email"
                      placeholder="seu@email.com"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="edit-card-actions">
                    <button type="button" onClick={cancelEditing} className="btn btn-ghost" id="cancel-edit-form-btn">
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={editLoading} id="save-edit-btn">
                      <Save size={16} />
                      {editLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* Subscriptions */}
          <section className="profile-section">
            <h2 className="section-title">
              <CreditCard size={20} />
              Minhas <span className="highlight">Assinaturas</span>
            </h2>
            {subscriptions && subscriptions.length > 0 ? (
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
            {sessions && sessions.length > 0 ? (
              <div className="profile-list">
                {sessions.map((sess) => (
                  <div key={sess.id} className="profile-list-item">
                    <div className="profile-list-icon">
                      <Gamepad2 size={18} />
                    </div>
                    <div className="profile-list-info">
                      <span className="profile-list-title">
                        {sess.game?.title || `Jogo ${sess.gameId?.slice(0, 8) || sess.id.slice(0, 8)}...`}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)} id="delete-modal-overlay">
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <AlertTriangle size={40} />
            </div>
            <h2 className="delete-modal-title">Excluir Conta</h2>
            <p className="delete-modal-desc">
              Tem certeza que deseja excluir sua conta? Esta ação é <strong>irreversível</strong> e todos os seus dados serão removidos permanentemente.
            </p>
            <div className="delete-modal-actions">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost"
                id="cancel-delete-btn"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                disabled={deleteLoading}
                id="confirm-delete-btn"
              >
                <Trash2 size={16} />
                {deleteLoading ? 'Excluindo...' : 'Sim, Excluir Conta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

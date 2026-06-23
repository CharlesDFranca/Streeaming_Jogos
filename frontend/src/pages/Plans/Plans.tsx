import { useEffect, useState } from 'react';
import { Check, Sparkles, Monitor } from 'lucide-react';
import { planService } from '../../services/planService';
import type { Plan } from '../../types';
import './Plans.css';

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await planService.list();
        setPlans(data);
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Features by plan tier (visual only - enriches the plan display)
  function getPlanFeatures(plan: Plan) {
    const base = [
      `Resolução até ${plan.maxResolution}`,
      'Acesso ao catálogo completo',
      'Streaming instantâneo',
    ];
    const price = Number(plan.monthlyPrice);
    if (price >= 40) {
      base.push('Prioridade de servidor');
      base.push('Latência ultra-baixa');
      base.push('Suporte prioritário');
    } else if (price >= 25) {
      base.push('Prioridade de servidor');
      base.push('Suporte via chat');
    }
    return base;
  }

  function getPlanTier(plan: Plan): 'basic' | 'pro' | 'ultimate' {
    const price = Number(plan.monthlyPrice);
    if (price >= 40) return 'ultimate';
    if (price >= 25) return 'pro';
    return 'basic';
  }

  return (
    <div className="plans-page" id="plans-page">
      <div className="container">
        <div className="plans-header slide-up">
          <div className="plans-badge badge badge-green">
            <Sparkles size={12} />
            Assinatura
          </div>
          <h1 className="plans-title">
            Escolha seu <span className="hero-highlight">plano</span>
          </h1>
          <p className="plans-subtitle">
            Desbloqueie o poder do cloud gaming. Jogue sem limites, sem downloads.
          </p>
        </div>

        {loading ? (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        ) : plans.length > 0 ? (
          <div className="plans-grid stagger">
            {plans.map((plan) => {
              const tier = getPlanTier(plan);
              const features = getPlanFeatures(plan);
              return (
                <div
                  key={plan.id}
                  className={`plan-card ${tier === 'pro' ? 'plan-card-featured' : ''}`}
                  id={`plan-${plan.id}`}
                >
                  {tier === 'pro' && (
                    <div className="plan-popular-badge">
                      <Sparkles size={12} />
                      Mais Popular
                    </div>
                  )}
                  <div className="plan-card-header">
                    <Monitor size={24} className={`plan-icon plan-icon-${tier}`} />
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-resolution">{plan.maxResolution}</div>
                  </div>
                  <div className="plan-price">
                    <span className="plan-currency">R$</span>
                    <span className="plan-amount">
                      {Number(plan.monthlyPrice).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="plan-period">/mês</span>
                  </div>
                  <ul className="plan-features">
                    {features.map((f, i) => (
                      <li key={i} className="plan-feature">
                        <Check size={16} className="plan-feature-check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn ${tier === 'pro' ? 'btn-accent' : 'btn-primary'} btn-lg`}
                    style={{ width: '100%' }}
                    id={`subscribe-${plan.id}`}
                  >
                    Assinar Agora
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Monitor size={48} />
            <h3>Nenhum plano disponível</h3>
            <p>Os planos de assinatura aparecerão aqui quando configurados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

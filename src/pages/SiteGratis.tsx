import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Instagram, Linkedin, Facebook,
  CheckCircle2, X, Menu,
} from 'lucide-react';

const WA_NUMBER = '5544998541023';
const WA_MSG = 'Olá, vim pela Teczz e quero resgatar o meu site grátis, pagando apenas a hospedagem e domínio';
const TIMER_START = 10 * 60; // 10 minutos em segundos

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease } },
};

const vp = { once: true, amount: 0.08, margin: '0px 0px -40px 0px' } as const;

const faqs = [
  {
    q: 'Isso é golpe? Como assim de graça?',
    a: 'Não é golpe. Nosso modelo é simples: nós criamos o site sem cobrar pelo desenvolvimento. O único custo é a plataforma de hospedagem + domínio (Wix), que custa R$198/ano — valor que vai direto para o Wix, não para nós. Fazemos isso para construir portfólio com negócios locais reais. Você sai com um site profissional; nós saímos com mais um case.',
  },
  {
    q: 'O que exatamente eu pago?',
    a: 'Somente o plano anual do Wix com domínio incluso: R$198/ano (equivale a cerca de R$16,50/mês). Nada de taxa de criação, nada de cobrança surpresa. O trabalho de criar o site é feito pela Teczz, de graça.',
  },
  {
    q: 'Quanto tempo leva pra ficar pronto?',
    a: 'Em média 3 a 7 dias úteis após você aprovar o conteúdo e ativar o plano do Wix. Quanto mais rápido você nos enviar fotos, textos e informações do seu negócio, mais rápido a gente entrega.',
  },
  {
    q: 'Posso pedir alterações no site depois?',
    a: 'Sim. Após a entrega, você tem 30 dias para solicitar 1 alteração (troca de texto, foto ou cor). Se não solicitar dentro desse prazo, o direito à alteração expira. Modificações além disso são tratadas como novo projeto — mas nada impede de você mesmo editar pelo painel do Wix.',
  },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function fireGA(eventName: string, params?: Record<string, string>) {
  const w = window as unknown as Record<string, ((...args: unknown[]) => void) | undefined>;
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params ?? {});
  }
}

export default function SiteGratis() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_START);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const rafRef = useRef(0);

  // Remove preloader imediatamente
  useEffect(() => {
    sessionStorage.setItem('tz', '1');
    const el = document.getElementById('tpre');
    if (el) el.style.display = 'none';
  }, []);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // SEO
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '',
      ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '',
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '',
    };
    document.title = 'Site Profissional Grátis — Teczz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Receba seu site profissional de graça. A Teczz cria sem cobrar para pequenos negócios e autônomos.');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Site Profissional Grátis — Teczz');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Receba seu site profissional de graça. A Teczz cria sem cobrar.');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://teczz.com.br/site-gratis');
    return () => {
      document.title = prev.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', prev.desc);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', prev.ogTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', prev.ogDesc);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', prev.ogUrl);
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Nav hide/show on scroll
  useEffect(() => {
    const isMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const nav = navRef.current;
        if (nav) {
          const scrolled = y > 40;
          const hidden = y > lastScrollY.current && y > 80;
          const blur = scrolled && isMouse() ? 'blur(18px)' : 'none';
          nav.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
          nav.style.background = scrolled ? 'rgba(5,5,8,0.82)' : 'linear-gradient(to bottom,rgba(0,0,0,0.75) 0%,transparent 100%)';
          nav.style.backdropFilter = blur;
          nav.style.setProperty('-webkit-backdrop-filter', blur);
          nav.style.borderBottomColor = scrolled ? 'rgba(255,255,255,0.06)' : 'transparent';
        }
        lastScrollY.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function openWA(label: string) {
    fireGA('lead_whatsapp_click', { event_category: 'lead', event_label: label });
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`,
      '_blank', 'noopener,noreferrer'
    );
  }

  const isUrgent = timeLeft <= 60;

  return (
    <>
      <style>{`
        @keyframes cta-pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(0,220,100,0.55), 0 0 70px rgba(0,220,100,0.25), 0 8px 40px rgba(0,0,0,0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(0,230,110,0.85), 0 0 130px rgba(0,230,110,0.4), 0 8px 40px rgba(0,0,0,0.5);
            transform: scale(1.045);
          }
        }
        @keyframes timer-urgent {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        .cta-green {
          background: linear-gradient(135deg, #00e664 0%, #00c853 50%, #00b248 100%);
          color: #003d18;
          font-size: clamp(1.2rem, 3.5vw, 1.75rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: clamp(1.1rem, 3vw, 1.6rem) clamp(2.5rem, 6vw, 5rem);
          border-radius: 999px;
          border: 3px solid rgba(0,255,110,0.4);
          cursor: pointer;
          animation: cta-pulse 2s ease-in-out infinite;
          transition: transform 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
        }
        .cta-green:hover {
          animation: none;
          transform: scale(1.06);
          box-shadow: 0 0 80px rgba(0,230,110,0.9), 0 0 150px rgba(0,230,110,0.4);
        }
        .cta-green:active { transform: scale(0.97); }
      `}</style>

      {/* ── TIMER BANNER ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          background: isUrgent
            ? 'linear-gradient(90deg, #dc2626, #b91c1c)'
            : 'linear-gradient(90deg, #b45309, #d97706, #b45309)',
          padding: '0.6rem 1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          animation: isUrgent ? 'timer-urgent 0.6s ease-in-out infinite' : 'none',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>🔥</span>
        <span style={{
          color: '#fff', fontWeight: 700, fontSize: 'clamp(0.78rem, 2.5vw, 0.95rem)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          PROMOÇÃO VÁLIDA POR MAIS
        </span>
        <span style={{
          color: '#fff', fontWeight: 900, fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace',
          background: 'rgba(0,0,0,0.25)', borderRadius: '6px',
          padding: '2px 10px',
          animation: isUrgent ? 'shake 0.5s ease-in-out infinite' : 'none',
        }}>
          {formatTime(timeLeft)}
        </span>
        <span style={{ fontSize: '1.1rem' }}>🔥</span>
      </div>

      <div className="grain-overlay bg-black text-white font-grotesk">

        {/* ── NAV ── */}
        <nav
          ref={navRef}
          className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
          style={{
            top: '44px',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1),background 0.4s ease,border-color 0.4s ease,backdrop-filter 0.4s ease',
            background: 'linear-gradient(to bottom,rgba(0,0,0,0.75) 0%,transparent 100%)',
            backdropFilter: 'none',
            borderBottom: '1px solid transparent',
          }}
        >
          <a href="/" className="text-2xl font-bold tracking-tight">
            Teczz<span style={{ color: '#3b82f6' }}>.</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors font-semibold">
              ← Voltar ao site
            </a>
            <button onClick={() => openWA('site-gratis-nav')} className="pill-btn">
              Resgatar grátis
            </button>
          </div>
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute top-5 right-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <X size={26} />
              </button>
              <motion.button
                onClick={() => { openWA('site-gratis-mobile-menu'); setMobileOpen(false); }}
                className="cta-green"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.3, ease }}
              >
                Resgatar meu site grátis
              </motion.button>
              <motion.a
                href="/"
                className="text-white/35 hover:text-white/60 transition-colors text-sm uppercase tracking-wider"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07, duration: 0.3, ease }}
              >
                ← Voltar ao site
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO ── */}
        <section
          className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-10"
          style={{ overflow: 'visible', paddingTop: '44px' }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(37,99,235,0.10) 0%,rgba(59,130,246,0.04) 50%,transparent 75%)' }} />
            <div className="cta-ring cta-ring-1" style={{ opacity: 0.45 }} />
            <div className="cta-ring cta-ring-2" style={{ opacity: 0.28 }} />

            {/* Caixas de presente decorativas */}
            <div style={{ position: 'absolute', top: '18%', left: '6%', fontSize: 'clamp(2.5rem, 5vw, 4rem)', opacity: 0.18, transform: 'rotate(-14deg)', userSelect: 'none', lineHeight: 1 }}>🎁</div>
            <div style={{ position: 'absolute', top: '28%', right: '5%', fontSize: 'clamp(2rem, 4vw, 3.2rem)', opacity: 0.14, transform: 'rotate(10deg)', userSelect: 'none', lineHeight: 1 }}>🎁</div>
            <div style={{ position: 'absolute', bottom: '22%', left: '10%', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', opacity: 0.10, transform: 'rotate(-6deg)', userSelect: 'none', lineHeight: 1 }}>🎁</div>
            <div style={{ position: 'absolute', bottom: '28%', right: '9%', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', opacity: 0.13, transform: 'rotate(18deg)', userSelect: 'none', lineHeight: 1 }}>🎁</div>
          </div>

          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="relative z-10 text-center max-w-4xl mx-auto pt-16 pb-16"
          >
            <motion.span variants={itemVariants}
              className="inline-block text-[11px] tracking-[0.28em] text-blue-400 uppercase font-semibold mb-8 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5"
            >
              Vagas limitadas por mês
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-black uppercase tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', lineHeight: 1, paddingBottom: '0.12em' }}
            >
              <span style={{
                background: 'linear-gradient(180deg,#ffffff 0%,rgba(255,255,255,0.82) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block', paddingBottom: '0.05em',
              }}>
                Seu site profissional
              </span>
              <span style={{
                background: 'linear-gradient(180deg,#60a5fa 0%,#3b82f6 55%,#1d4ed8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block', paddingBottom: '0.08em',
              }}>
                pode sair de graça.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto">
              A criação do site, a Teczz faz sem cobrar nada.{' '}
              <strong className="text-white font-semibold">Chame no WhatsApp e saiba mais.</strong>
            </motion.p>

            {/* CTA VERDE GIGANTE */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-6">
              <button onClick={() => openWA('site-gratis-hero-cta')} className="cta-green">
                🎁 Resgatar meu site grátis
              </button>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sem compromisso · Resposta em minutos
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mt-12">
              {['Sem taxa de criação', 'Pronto em dias', 'Aparece no Google'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/30 font-semibold">
                  <CheckCircle2 size={12} className="text-blue-500/60" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── PRICE COMPARISON ── */}
        <div aria-hidden="true" className="section-sep" />
        <section className="px-6 md:px-10 py-20 md:py-28">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp} className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-[11px] tracking-[0.25em] text-blue-400 uppercase font-semibold">Comparação de preço</span>
              <h2 className="font-black uppercase leading-none tracking-tight mt-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                A conta é simples.
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.06] p-8 relative overflow-hidden" style={{ background: 'rgba(8,8,12,0.85)' }}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <div style={{ width: '140%', height: '2px', background: 'rgba(255,80,80,0.18)', transform: 'rotate(-5deg)' }} />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/22 font-semibold block mb-4">Agência tradicional</span>
                <p className="font-black uppercase leading-[1.05] text-white/22" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', textDecoration: 'line-through', textDecorationColor: 'rgba(255,80,80,0.3)' }}>
                  R$2.000<br />a R$5.000
                </p>
                <p className="text-white/18 text-sm mt-4">Só para criar o site, sem contar hospedagem ou manutenção.</p>
              </div>
              <div className="rounded-2xl border border-blue-500/40 p-8 relative overflow-hidden" style={{ background: 'rgba(6,14,35,0.97)', boxShadow: '0 0 50px rgba(37,99,235,0.13)' }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(96,165,250,0.55),transparent)' }} />
                <span className="text-[10px] tracking-[0.2em] uppercase text-blue-400 font-semibold block mb-4">Com a Teczz</span>
                <p className="font-black uppercase leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', background: 'linear-gradient(180deg,#60a5fa 0%,#3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  R$0
                </p>
                <p className="text-white/38 text-sm font-semibold uppercase tracking-wide mt-1">de criação</p>
                <p className="text-blue-400/75 text-sm mt-4">Saiba o custo total direto no WhatsApp — é bem menor do que você imagina.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <div aria-hidden="true" className="section-sep" />
        <section className="px-6 md:px-10 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(37,99,235,0.04) 0%,transparent 70%)' }} />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp} className="max-w-4xl mx-auto relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-[11px] tracking-[0.25em] text-blue-400 uppercase font-semibold">Processo</span>
              <h2 className="font-black uppercase leading-none tracking-tight mt-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Como funciona
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { num: '01', title: 'Você chama no WhatsApp', desc: 'Mande uma mensagem agora. Nossa equipe entra em contato para entender o que você precisa e combinamos tudo por lá.' },
                { num: '02', title: 'A gente cria o site', desc: 'Desenvolvemos seu site profissional sem nenhum custo de criação. Você acompanha e aprova cada etapa antes de publicar.' },
                { num: '03', title: 'Você ativa o plano', desc: 'Ativa a hospedagem e domínio — o valor vai direto para a plataforma, não para nós.' },
                { num: '04', title: 'Seu site vai ao ar', desc: 'Site publicado, domínio ativo, aparecendo no Google. Pronto para receber clientes.' },
              ].map((step, i) => (
                <motion.div key={i} variants={itemVariants} className="rounded-2xl border border-white/[0.07] p-7 flex gap-5" style={{ background: 'rgba(6,13,31,0.92)' }}>
                  <span className="font-mono font-black text-blue-500/45 text-xl shrink-0 leading-none mt-0.5">{step.num}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-2 uppercase tracking-[0.08em]">{step.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── BENEFÍCIOS ── */}
        <div aria-hidden="true" className="section-sep" />
        <section className="px-6 md:px-10 py-20 md:py-28">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp} className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-[11px] tracking-[0.25em] text-blue-400 uppercase font-semibold">O que você recebe</span>
              <h2 className="font-black uppercase leading-none tracking-tight mt-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Seu site já vem com tudo.
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Site profissional e responsivo', desc: 'Funciona perfeito no celular, tablet e computador.' },
                { title: 'Aparece no Google', desc: 'SEO básico configurado para sua empresa ser encontrada.' },
                { title: 'Pronto em poucos dias', desc: 'Nada de esperar meses. Entregamos rápido.' },
                { title: 'Sem letras miúdas', desc: 'Transparência total no que custa. Nada escondido.' },
                { title: 'Design personalizado', desc: 'Cada site reflete a identidade do seu negócio.' },
                { title: 'WhatsApp integrado', desc: 'Botão de contato direto para seus clientes te chamarem.' },
              ].map((b, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(6,13,31,0.7)' }}>
                  <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">{b.title}</p>
                    <p className="text-white/40 text-sm mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="text-center mt-14">
              <button onClick={() => openWA('site-gratis-benefits-cta')} className="cta-green">
                🎁 Resgatar meu site grátis
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <div aria-hidden="true" className="section-sep" />
        <section className="px-6 md:px-10 py-20 md:py-28">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp} className="max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-[11px] tracking-[0.25em] text-blue-400 uppercase font-semibold">FAQ</span>
              <h2 className="font-black uppercase leading-none tracking-tight mt-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Perguntas frequentes
              </h2>
            </motion.div>
            <div className="flex flex-col">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div key={i} variants={itemVariants}>
                    <button
                      className="w-full text-left py-7 flex items-start gap-6 group border-b section-divider"
                      style={{ borderLeft: isOpen ? '2px solid rgba(59,130,246,0.6)' : '2px solid transparent', paddingLeft: '1rem', transition: 'border-color 0.3s ease' }}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="text-sm font-mono font-semibold shrink-0 mt-0.5 transition-colors duration-300" style={{ color: isOpen ? '#60a5fa' : 'rgba(255,255,255,0.2)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-bold text-lg md:text-xl leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
                          {faq.q}
                        </span>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} style={{ overflow: 'hidden' }}>
                              <p className="text-white/70 text-sm leading-relaxed pt-4">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease }} className="shrink-0 mt-1.5">
                        <ChevronDown size={16} style={{ color: isOpen ? '#60a5fa' : 'rgba(255,255,255,0.25)' }} />
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
            <motion.div variants={itemVariants} className="text-center mt-14">
              <p className="text-white/38 text-sm mb-6">Ainda tem dúvidas? Chama a gente no WhatsApp.</p>
              <button onClick={() => openWA('site-gratis-faq-cta')} className="cta-green">
                🎁 Resgatar meu site grátis
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <div aria-hidden="true" className="section-sep" />
        <footer className="px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <a href="/" className="text-lg font-bold tracking-tight block mb-1">
                Teczz<span style={{ color: '#3b82f6' }}>.</span>
              </a>
              <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">IA Implementation Studio</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/teczz.ai/" target="_blank" rel="noopener noreferrer" className="social-instagram"><Instagram size={17} /></a>
              <a href="https://linkedin.com/company/teczz" target="_blank" rel="noopener noreferrer" className="social-linkedin"><Linkedin size={17} /></a>
              <a href="https://web.facebook.com/teczz.ia" target="_blank" rel="noopener noreferrer" className="social-facebook"><Facebook size={17} /></a>
            </div>
            <span className="text-[10px] tracking-[0.15em] text-white/20 uppercase">© 2025 Teczz</span>
          </div>
        </footer>

      </div>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Falar no WhatsApp"
        onClick={() => fireGA('lead_whatsapp_click', { event_category: 'lead', event_label: 'site-gratis-fab' })}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

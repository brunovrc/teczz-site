import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Layers, TrendingUp, Users, Mail, Instagram, Linkedin, Facebook, Search, Zap, Rocket } from 'lucide-react';
import DataGridHero from './components/DataGridHero';
import Preloader from './components/Preloader';
import { GooeyText } from './components/GooeyText';
import BentoGrid, { type BentoItem } from './components/BentoGrid';
import { BentoCard } from './components/BentoCard';
import { GlowMenu } from './components/GlowMenu';
import type { MenuItem } from './components/GlowMenu';
import { LampHeading } from './components/LampHeading';

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

const navItems: MenuItem[] = [
  {
    icon: Layers,
    label: 'Soluções',
    href: '#soluções',
    gradient: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.07) 50%, transparent 100%)',
    iconColor: 'text-blue-400',
  },
  {
    icon: TrendingUp,
    label: 'Cases',
    href: '#cases',
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(8,145,178,0.07) 50%, transparent 100%)',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Users,
    label: 'Sobre',
    href: '#sobre',
    gradient: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(79,70,229,0.07) 50%, transparent 100%)',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Mail,
    label: 'Contato',
    href: '#contato',
    gradient: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.07) 50%, transparent 100%)',
    iconColor: 'text-violet-400',
  },
];

const cases = [
  {
    url: 'https://site-beige-three-70.vercel.app',
    urlLabel: 'site-beige-three-70.vercel.app',
    tag: 'Web + Automação',
    title: 'Recanto Romeo',
    desc: 'Chácara de lazer com agendamento 100% automatizado, preenchimento e assinatura de contrato automáticos — zero fricção do primeiro contato ao check-in.',
    status: 'Em andamento',
  },
  {
    url: 'https://hipismomaringa.github.io/hipismomaringasite/',
    urlLabel: 'hipismomaringa.github.io',
    tag: 'Site Personalizado',
    title: 'Hipismo Maringá',
    desc: 'Site institucional para clube de hipismo com design personalizado, SEO otimizado e experiência mobile-first.',
    status: 'Em andamento',
  },
];

const gooeyTexts = ['Sites personalizados', 'Chatbots', 'Automações', 'Agentes de IA'];

const faqs = [
  { q: 'Quanto tempo leva uma implementação?', a: 'Projetos de chatbot e automação simples ficam prontos em 2–4 semanas. Agentes IA mais complexos, de 4 a 8 semanas.' },
  { q: 'Trabalham com quais modelos de IA?', a: 'GPT-4o, Claude 3.5, Gemini 1.5 e modelos open-source. Escolhemos o melhor custo-benefício para cada caso.' },
  { q: 'É possível integrar com nosso sistema atual?', a: 'Sim. Temos experiência com Salesforce, HubSpot, SAP, sistemas legados e APIs REST/GraphQL customizadas.' },
  { q: 'Como funciona a precificação?', a: 'Projetos de escopo fechado com valor fixo. Retainers mensais para manutenção e evolução contínua.' },
];

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<string>('Soluções');
  const [navHidden, setNavHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const rafRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (progressBarRef.current) {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          progressBarRef.current.style.transform = `scaleX(${maxScroll > 0 ? y / maxScroll : 0})`;
        }

        setNavScrolled(y > 40);
        setNavHidden(y > lastScrollY.current && y > 80);
        lastScrollY.current = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  // Sempre inicia no topo — entrada e refresh
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar — scaleX updated via ref */}
      <div
        ref={progressBarRef}
        className="scroll-progress fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)',
          boxShadow: '0 0 8px rgba(96,165,250,0.5)',
        }}
      />

      {showPreloader && <Preloader onComplete={handlePreloaderComplete} duration={3300} />}

      <div className="grain-overlay bg-black text-white font-grotesk">

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
          style={{
            transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
            background: navScrolled
              ? 'rgba(5,5,8,0.82)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
            backdropFilter: navScrolled ? 'blur(18px)' : 'none',
            WebkitBackdropFilter: navScrolled ? 'blur(18px)' : 'none',
            borderBottom: navScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          }}>
          <div className="flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-bold tracking-tight cursor-pointer">
              Teczz<span style={{ color: '#3b82f6' }}>.</span>
            </button>
          </div>
          <div className="hidden md:flex items-center">
            <GlowMenu items={navItems} activeItem={activeNav} onItemClick={setActiveNav} />
          </div>
          <div className="hidden md:block">
            <a href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20Teczz!" target="_blank" rel="noopener noreferrer" className="pill-btn">Falar com a Teczz</a>
          </div>
          <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute top-5 right-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <X size={26} />
              </button>
              {['Soluções', 'Cases', 'Sobre', 'Contato'].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-3xl font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease }}
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20Teczz!"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn mt-4"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 * 0.07, duration: 0.3, ease }}
              >
                Falar com a Teczz
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#000' }}>

          <DataGridHero rows={28} cols={50} spacing={3} duration={5} color="#3b82f6" animationType="pulse" pulseEffect mouseGlow opacityMin={0.03} opacityMax={0.28} />

          {/* Dark scrim behind text for contrast */}
          <div className="absolute inset-0 pointer-events-none z-[5]"
            style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)' }} />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />

          {/* Hero content */}
          <div
            className="relative z-20 flex-1 flex items-center justify-center"
            style={{ padding: 'calc(64px + 2rem) clamp(1.5rem, 6vw, 6rem) 2rem' }}
          >
            <div className="flex flex-col items-center text-center" style={{ maxWidth: '900px' }}>
              <div style={{ width: '100%' }}>

                <h1 className="animate-on-load animate-on-load-d2"
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(1.6rem, 7vw, 5.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    paddingTop: '0.1em',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '2rem',
                  }}>
                  <span style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'block',
                  }}>IA não é mais tendência.</span>
                  <span style={{
                    background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'block',
                  }}>É vantagem competitiva.</span>
                </h1>

                <div className="animate-on-load animate-on-load-d3"
                  style={{ marginBottom: '2.5rem', height: '2rem', position: 'relative', overflow: 'visible' }}>
                  <GooeyText
                    texts={gooeyTexts}
                    morphTime={1.2}
                    cooldownTime={2.2}
                    textStyle={{
                      fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(255,255,255,0.7)',
                      whiteSpace: 'nowrap',
                    }}
                  />
                </div>

                <div className="animate-on-load animate-on-load-d4 flex justify-center">
                  <a href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!" target="_blank" rel="noopener noreferrer" className="pill-btn-lg">
                    Quero implementar IA na minha empresa <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip + marquee */}
          <div className="relative z-[15] mt-auto">
            <div className="px-6 md:px-10 pt-6 pb-3 flex items-center justify-between">
              <p className="lets-build text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-medium">
                L&nbsp;&nbsp;E&nbsp;&nbsp;T&nbsp;&nbsp;'&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;U&nbsp;&nbsp;I&nbsp;&nbsp;L&nbsp;&nbsp;D
              </p>
              <a href="#soluções" className="scroll-indicator text-white/75 hover:text-white/70 transition-colors">
                <ChevronDown size={18} />
              </a>
            </div>
            <div className="border-y section-divider py-3 overflow-hidden" style={{ background: '#000' }}>
              <div className="marquee-track">
                {Array(2).fill(['CHATBOTS', '·', 'AUTOMAÇÃO', '·', 'AGENTES IA', '·', 'INTEGRAÇÕES', '·', 'SITES PERSONALIZADOS', '·', 'CLAUDE', '·', 'RESULTS FIRST', '·']).flat().map((word, i) => (
                  <span key={i} className={`text-[13px] tracking-[0.12em] uppercase font-semibold ${word === '·' ? 'text-blue-500' : 'marquee-word'}`}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section id="soluções" className="px-6 md:px-10 py-24 md:py-36">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp}>

            <LampHeading label="Soluções" className="mb-16">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                O que<br />construímos
              </h2>
            </LampHeading>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2 xl:max-h-[42rem]">

              <BentoCard
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                title="Sites Personalizados"
                description="Cada detalhe construído para o seu negócio: visual único, performance real e experiência que faz o visitante ficar. Sem template, sem genérico."
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="7" x2="22" y2="7"/>
                    <circle cx="5.5" cy="5" r="0.8" fill="rgba(255,255,255,0.7)" stroke="none"/>
                    <circle cx="8.5" cy="5" r="0.8" fill="rgba(255,255,255,0.7)" stroke="none"/>
                  </svg>
                }
              />

              <BentoCard
                area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]"
                title="Automação"
                description="Tarefas repetitivas eliminadas. Fluxos que correm sozinhos. Sua equipe focada no que só humano faz: pensar e criar."
                icon={<Zap width="16" height="16" stroke="rgba(255,255,255,0.7)" strokeWidth={1.4} />}
              />

              <BentoCard
                area="md:[grid-area:1/7/3/13] xl:[grid-area:1/5/3/8]"
                title="Chatbots"
                titleSize="text-2xl"
                description="Seu melhor colaborador nunca dorme, nunca esquece e aprende com cada conversa. Treinado no DNA da sua empresa."
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="13" height="9" rx="2"/><rect x="9" y="11" width="13" height="9" rx="2"/>
                  </svg>
                }
              />

              <BentoCard
                area="md:[grid-area:3/1/4/7] xl:[grid-area:1/8/2/13]"
                title="Agentes IA"
                description="Sistemas autônomos que tomam decisões, executam e se adaptam. IA que trabalha enquanto você lidera."
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round">
                    <line x1="12" y1="2" x2="12" y2="10"/><line x1="12" y1="10" x2="5" y2="21"/>
                    <line x1="12" y1="10" x2="19" y2="21"/>
                    <circle cx="12" cy="10" r="2.2" stroke="rgba(255,255,255,0.7)" fill="none"/>
                  </svg>
                }
              />

              <BentoCard
                area="md:[grid-area:3/7/4/13] xl:[grid-area:2/8/3/11]"
                title="Implementação IA"
                description="Integramos IA onde a dor é maior: vendas, operações, financeiro, RH. No coração, não nas bordas."
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
                  </svg>
                }
              />

              <BentoCard
                area="md:[grid-area:4/1/5/13] xl:[grid-area:2/11/3/13]"
                title="Voz com IA"
                description="Agentes que ligam, qualificam leads e agendam. Sem script travado, com naturalidade real."
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                  </svg>
                }
              />

            </ul>
          </motion.div>
        </section>

        {/* ─── CASES ─── */}
        <div aria-hidden="true" className="section-sep" />
        <section id="cases" className="px-6 md:px-10 py-24 md:py-36">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp}>

            <LampHeading label="Cases" className="mb-16">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
                Projetos<br />reais
              </h2>
            </LampHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cases.map((c, i) => (
                <motion.div key={i} variants={itemVariants}>

                  {/* Browser mockup */}
                  <div className="browser-frame mb-5">
                    <div className="browser-bar">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                        <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                        <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                      </div>
                      <div className="browser-url">{c.urlLabel}</div>
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        className="text-white/20 hover:text-white/60 transition-colors shrink-0">
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                    <div className="browser-viewport">
                      <iframe
                        src={c.url}
                        title={c.title}
                        className="browser-iframe"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[13px] tracking-[0.2em] text-blue-500 uppercase font-semibold">{c.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{c.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    Ver projeto <ArrowUpRight size={14} />
                  </a>

                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── PROCESS ─── */}
        <div aria-hidden="true" className="section-sep" />
        <section id="sobre" className="px-6 md:px-10 py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp} className="relative z-10">

            <LampHeading label="Processo" className="mb-16">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
                Como<br />trabalhamos
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto mt-4">
                Do primeiro diagnóstico ao go-live — um processo testado que entrega resultado real.
              </p>
            </LampHeading>

            <motion.div variants={itemVariants}>
              <BentoGrid items={[
                {
                  title: 'Entendemos seu negócio',
                  num: '01',
                  description: 'Antes de qualquer coisa, sentamos com você para entender como sua empresa funciona hoje, onde está perdendo tempo e dinheiro, e o que faz mais sentido automatizar primeiro.',
                  icon: <Search className="w-5 h-5" style={{ color: '#3b82f6' }} />,
                  tags: ['Conversa inicial', 'Mapeamento', 'Sem enrolação'],
                  colSpan: 2,
                  hasPersistentHover: true,
                  accent: '#3b82f6',
                },
                {
                  title: 'Criamos o plano',
                  num: '02',
                  description: 'Desenhamos exatamente o que vai ser feito, como vai funcionar e quanto vai custar. Sem surpresa no meio do caminho.',
                  icon: <Layers className="w-5 h-5" style={{ color: '#06b6d4' }} />,
                  tags: ['Clareza total', 'Prazo definido'],
                  colSpan: 1,
                  accent: '#06b6d4',
                },
                {
                  title: 'Colocamos a mão na massa',
                  num: '03',
                  description: 'Desenvolvemos a solução em etapas curtas para que você acompanhe o progresso e aprove cada parte antes de avançar.',
                  icon: <Zap className="w-5 h-5" style={{ color: '#a855f7' }} />,
                  tags: ['Etapas curtas', 'Você aprova'],
                  colSpan: 1,
                  accent: '#a855f7',
                },
                {
                  title: 'Entregamos e acompanhamos',
                  num: '04',
                  description: 'Colocamos tudo funcionando, treinamos sua equipe para usar sem depender de ninguém e ficamos de olho nos resultados para garantir que está entregando o que prometemos.',
                  icon: <Rocket className="w-5 h-5" style={{ color: '#10b981' }} />,
                  tags: ['Tudo funcionando', 'Equipe treinada', 'Suporte garantido'],
                  colSpan: 2,
                  hasPersistentHover: true,
                  accent: '#10b981',
                },
              ] satisfies BentoItem[]} />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── FAQ ─── */}
        <div aria-hidden="true" className="section-sep" />
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={vp}>

            <LampHeading label="FAQ" className="mb-14">
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">
                Dúvidas<br />frequentes
              </h2>
            </LampHeading>

            <div className="flex flex-col">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div key={i} variants={itemVariants}>
                    <button
                      className="w-full text-left py-7 flex items-start gap-6 group border-b section-divider"
                      style={{
                        borderLeft: isOpen ? '2px solid rgba(59,130,246,0.6)' : '2px solid transparent',
                        paddingLeft: '1rem',
                        transition: 'border-color 0.3s ease',
                      }}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="text-sm font-mono font-semibold shrink-0 mt-0.5 transition-colors duration-300"
                        style={{ color: isOpen ? '#60a5fa' : 'rgba(255,255,255,0.2)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-bold text-lg md:text-xl leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
                          {faq.q}
                        </span>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease }}
                              style={{ overflow: 'hidden' }}
                            >
                              <p className="text-white/75 text-sm leading-relaxed pt-4">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="shrink-0 mt-1.5"
                      >
                        <ChevronDown size={16} style={{ color: isOpen ? '#60a5fa' : 'rgba(255,255,255,0.25)' }} />
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <div aria-hidden="true" className="section-sep" />
        <section id="contato" className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 py-24">

          {/* Glow background */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.12) 0%, rgba(59,130,246,0.05) 40%, transparent 75%)',
            }} />
            <div className="cta-ring cta-ring-1" />
            <div className="cta-ring cta-ring-2" />
            <div className="cta-ring cta-ring-3" />
          </div>

          {/* Ghost TECZZ background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span style={{
              fontSize: 'clamp(120px, 28vw, 420px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
              letterSpacing: '-0.05em',
              userSelect: 'none',
              lineHeight: 1,
            }}>TECZZ</span>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="relative z-10 text-center max-w-5xl mx-auto"
          >
            <motion.span variants={itemVariants} className="text-[13px] tracking-[0.25em] text-blue-400 uppercase font-semibold mb-8 block">
              Pronto para começar?
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-black uppercase leading-none tracking-tight mb-8"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
              <span style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}>Vamos</span>
              <span style={{
                background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 55%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}>construir.</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/75 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Descreva seu desafio. Em até 24h você recebe uma análise técnica sem compromisso.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center">
              <a href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!" target="_blank" rel="noopener noreferrer" className="pill-btn-lg">
                Falar com a Teczz <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── FOOTER ─── */}
        <div aria-hidden="true" className="section-sep" />
        <footer className="px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-lg font-bold tracking-tight block mb-1">Teczz<span style={{ color: '#3b82f6' }}>.</span></span>
              <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">IA Implementation Studio</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/teczz.ai/" target="_blank" rel="noopener noreferrer" className="social-instagram">
                <Instagram size={17} />
              </a>
              <a href="https://linkedin.com/company/teczz" target="_blank" rel="noopener noreferrer" className="social-linkedin">
                <Linkedin size={17} />
              </a>
              <a href="https://facebook.com/teczz" target="_blank" rel="noopener noreferrer" className="social-facebook">
                <Facebook size={17} />
              </a>
            </div>
            <span className="text-[10px] tracking-[0.15em] text-white/20 uppercase">© 2025 Teczz</span>
          </div>
        </footer>

      </div>

      {/* ─── WHATSAPP FAB ─── */}
      <a
        href="https://wa.me/5511940411688"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Falar no WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}

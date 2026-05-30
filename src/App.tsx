import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import NeuralCanvas from './components/NeuralCanvas';
import Preloader from './components/Preloader';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const services = [
  { id: '01', name: 'Sites com IA', desc: 'Desenvolvemos sites e plataformas digitais com IA integrada desde o primeiro pixel.' },
  { id: '02', name: 'Chatbots', desc: 'Agentes conversacionais treinados no contexto da sua empresa, integrados a qualquer canal.' },
  { id: '03', name: 'Automação', desc: 'Fluxos automatizados que eliminam tarefas repetitivas e aceleram operações inteiras.' },
  { id: '04', name: 'Agentes IA', desc: 'Sistemas autônomos que tomam decisões, executam tarefas e se adaptam em tempo real.' },
  { id: '05', name: 'Implementação IA', desc: 'Integramos modelos de linguagem em qualquer processo do negócio — vendas, operações, financeiro, RH.' },
];

const cases = [
  {
    tag: 'E-commerce',
    title: 'Atendimento 24/7 com 90% de automação',
    desc: 'Chatbot que resolve chamados, processa trocas e responde dúvidas sem intervenção humana.',
    metric: '−72% Custos',
  },
  {
    tag: 'SaaS B2B',
    title: 'Onboarding inteligente via agente IA',
    desc: 'Agente que guia novos clientes, coleta dados e provisiona ambientes automaticamente.',
    metric: '+3x Velocidade',
  },
  {
    tag: 'Logística',
    title: 'Rastreamento e alertas em linguagem natural',
    desc: 'Sistema que interpreta pedidos de rastreio e envia proativamente atualizações personalizadas.',
    metric: '98% Satisfação',
  },
];

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

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const servicesSection = useInView();
  const casesSection = useInView();
  const processSection = useInView();
  const faqSection = useInView();
  const ctaSection = useInView();

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} duration={3300} />}

      <div className="grain-overlay bg-black text-white font-grotesk">

        {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight">Teczz.</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Soluções', 'Casos', 'Sobre', 'Contato'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
          ))}
        </div>
        <div className="hidden md:block">
          <a href="#contato" className="pill-btn">Falar com a Teczz</a>
        </div>
        <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 flex flex-col items-center justify-center gap-8">
          {['Soluções', 'Casos', 'Sobre', 'Contato'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-3xl font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}>
              {link}
            </a>
          ))}
          <a href="#contato" className="pill-btn mt-4" onClick={() => setMobileOpen(false)}>
            Falar com a Teczz
          </a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#000' }}>
        {/* Neural Network Canvas */}
        <NeuralCanvas />

        {/* Spotlight effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="spotlight" />
          <div className="spotlight-cone" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
        </div>

        {/* Top label */}
        <div className="relative z-10 pt-32 px-6 md:px-10 animate-on-load animate-on-load-d1">
          <span className="text-[10px] tracking-[0.3em] text-white/35 uppercase font-medium">IA ST '25</span>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pt-8 pb-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-0">

            {/* Left: new headline */}
            <div className="flex-1 max-w-3xl">
              <span className="text-[11px] md:text-xs tracking-[0.25em] text-blue-500 uppercase font-semibold mb-4 block animate-on-load animate-on-load-d1">
                Implementação de IA para negócios reais
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-6 animate-on-load animate-on-load-d2">
                IA que transforma negócios.
              </h1>
              <p className="text-white/45 text-sm md:text-base max-w-md leading-relaxed animate-on-load animate-on-load-d3 font-light">
                Implementamos inteligência artificial que gera resultado real — não demos, não experimentos.
              </p>
              <div className="mt-8 flex items-center gap-4 animate-on-load animate-on-load-d4">
                <a href="#soluções" className="pill-btn-blue flex items-center gap-2">
                  Ver Soluções <ArrowRight size={13} />
                </a>
                <a href="#casos" className="nav-link flex items-center gap-1 hover:text-white">
                  Casos reais <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Right: services list */}
            <div className="md:pt-8 md:pl-8 animate-on-load animate-on-load-d3">
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4 font-medium">/we do</p>
              <div className="flex flex-col gap-3">
                {['SITES', 'CHATBOTS', 'AUTOMAÇÃO', 'AGENTES IA', 'INTEGRAÇÕES'].map((s, i) => (
                  <span key={s} className="text-xl md:text-2xl font-bold tracking-tight"
                    style={{ color: i === 0 ? '#3b82f6' : 'rgba(255,255,255,0.75)', animationDelay: `${0.6 + i * 0.1}s` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="relative z-10 px-6 md:px-10 pb-10 mt-auto">
          <div className="border-t section-divider pt-6 flex items-end justify-between">
            <p className="text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] text-white/20 uppercase font-medium">
              L&nbsp;&nbsp;E&nbsp;&nbsp;T&nbsp;&nbsp;'&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;U&nbsp;&nbsp;I&nbsp;&nbsp;L&nbsp;&nbsp;D
            </p>
            <a href="#soluções" className="scroll-indicator text-white/25 hover:text-white/60 transition-colors">
              <ChevronDown size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="border-y section-divider py-4 overflow-hidden">
        <div className="marquee-track">
          {Array(2).fill(['CHATBOTS', '·', 'AUTOMAÇÃO', '·', 'AGENTES IA', '·', 'INTEGRAÇÕES', '·', 'GPT-4o', '·', 'CLAUDE', '·', 'RESULTS FIRST', '·']).flat().map((word, i) => (
            <span key={i} className={`text-[11px] tracking-[0.2em] uppercase font-medium ${word === '·' ? 'text-blue-500' : 'text-white/25'}`}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ─── SERVICES ─── */}
      <section id="soluções" className="px-6 md:px-10 py-24 md:py-36">
        <div ref={servicesSection.ref} className={`transition-all duration-1000 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-blue-500 uppercase font-medium mb-3 block">Soluções</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">O que<br />construímos</h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed md:text-right">
              Cada solução é desenhada para o contexto da sua empresa. Sem templates. Sem copy-paste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {services.map((s) => (
              <div key={s.id} className="card-dark p-8 md:p-10 group cursor-default">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 uppercase">{s.id}</span>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors duration-300">
                  {s.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASES ─── */}
      <section id="casos" className="px-6 md:px-10 py-24 md:py-36 border-t section-divider">
        <div ref={casesSection.ref} className={`transition-all duration-1000 ${casesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.3em] text-blue-500 uppercase font-medium mb-3 block">Casos</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
              Resultados<br />que importam
            </h2>
          </div>

          <div className="flex flex-col gap-px bg-white/[0.06]">
            {cases.map((c, i) => (
              <div key={i} className="card-dark p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-0 group">
                <div className="md:w-32 shrink-0">
                  <span className="text-[9px] tracking-[0.25em] text-white/30 uppercase">{c.tag}</span>
                </div>
                <div className="flex-1 md:px-8">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors">{c.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
                </div>
                <div className="md:ml-auto shrink-0">
                  <span className="text-2xl md:text-3xl font-black text-blue-500 blue-glow tracking-tight">{c.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="sobre" className="px-6 md:px-10 py-24 md:py-36 border-t section-divider relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

        <div ref={processSection.ref} className={`relative z-10 transition-all duration-1000 ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.3em] text-blue-500 uppercase font-medium mb-3 block">Processo</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
              Como<br />trabalhamos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/[0.06]">
            {[
              { step: '1', label: 'Discovery', desc: 'Mapeamos seus processos, dores e oportunidades de automação.' },
              { step: '2', label: 'Design', desc: 'Arquitetamos a solução ideal — modelo, integrações, fluxos.' },
              { step: '3', label: 'Build', desc: 'Desenvolvemos, testamos e iteramos em sprints curtos.' },
              { step: '4', label: 'Deploy', desc: 'Entregamos, treinamos sua equipe e monitoramos resultados.' },
            ].map((item) => (
              <div key={item.step} className="card-dark p-8 group">
                <span className="text-5xl font-black text-white/[0.06] block mb-6 group-hover:text-blue-500/20 transition-colors">{item.step}</span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{item.label}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
            {[
              { val: '40+', label: 'Projetos entregues' },
              { val: '2–4w', label: 'Tempo médio de deploy' },
              { val: '98%', label: 'Satisfação dos clientes' },
              { val: '3x', label: 'ROI médio no 1º ano' },
            ].map((stat) => (
              <div key={stat.label} className="card-dark p-8 text-center">
                <span className="text-4xl md:text-5xl font-black text-white block mb-2">{stat.val}</span>
                <span className="text-[10px] tracking-[0.2em] text-white/35 uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="contato" className="px-6 md:px-10 py-24 md:py-36 border-t section-divider">
        <div ref={faqSection.ref} className={`transition-all duration-1000 ${faqSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <span className="text-[10px] tracking-[0.3em] text-blue-500 uppercase font-medium mb-3 block">FAQ</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">Dúvidas<br />frequentes</h2>
            </div>

            <div className="flex flex-col gap-px bg-white/[0.06]">
              {faqs.map((faq, i) => (
                <div key={i} className="card-dark overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-base md:text-lg pr-4 group-hover:text-white transition-colors">{faq.q}</span>
                    <ChevronDown size={16} className={`text-white/40 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                    <p className="px-6 md:px-8 pb-6 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 md:px-10 py-24 md:py-40 border-t section-divider relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.055) 0%, transparent 70%)' }} />

        <div ref={ctaSection.ref} className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${ctaSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[10px] tracking-[0.3em] text-blue-500 uppercase font-medium mb-6 block">Pronto?</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tight mb-8">
            Vamos<br />construir.
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Descreva seu desafio. Em 24h você recebe uma análise técnica sem compromisso.
          </p>
          <a href="mailto:ola@teczz.ai" className="pill-btn-blue inline-flex items-center gap-2 text-base">
            Falar com a Teczz <ArrowRight size={14} />
          </a>
        </div>

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none">
          <span className="number-ghost" style={{ letterSpacing: '-0.05em', opacity: 0.7 }}>TECZZ</span>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 md:px-10 py-10 border-t section-divider">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-lg font-bold tracking-tight block mb-1">Teczz.</span>
            <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">IA Implementation Studio</span>
          </div>
          <div className="flex gap-8">
            {['Soluções', 'Casos', 'Sobre', 'Contato'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link text-[10px]">{link}</a>
            ))}
          </div>
          <span className="text-[10px] tracking-[0.15em] text-white/20 uppercase">© 2025 Teczz</span>
        </div>
      </footer>

      </div>
    </>
  );
}

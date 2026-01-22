import { useState, useEffect } from 'react';
import { VideoSection } from '@/app/components/video-section';
import svgPaths from '@/imports/svg-jfs3qpcatf';
import { imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares1 } from '@/imports/svg-ped65';
import imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares2 from '@/assets/f2e1eeaa8c93a06a2f2b3f0e2c0d6f41793d3da6.png';
import imgFrame6699 from '@/assets/447ed70ed22fd89c8e2e9265b4e1445f63e5729c.png';
import img from '@/assets/d1be3925e765bd4194563a27a519096847e11814.png';
import imgRectangle from '@/assets/94162b4e1419244e19357f21486e0bb2a912f741.png';
import img1 from '@/assets/d014e70c3527b983a2b7aa6d7a68968d0a555908.png';
import img2 from '@/assets/b976236317b9995c6509ad2b07d125bf9907fc1d.png';
import imgHeroBackground from '@/assets/765ab2ef2d0bd7dd361b7769ace2679c41b94a6e.png';
import imgMapaBrasil from '@/assets/b7f6b2408afa8a9acc40c5f35fa359b4883706db.png';
import imgVideoCover from '@/assets/69d9b3c8ec550ca645383d6edbde961cb7347d48.png';
import imgSlide1 from '@/assets/c0b30b03a20bd34b550b1688973e33e26488aed2.png';
import imgSlide2 from '@/assets/552918d57f1ac92186cecee083cd0cee4aabb3e9.png';
import imgSlide3 from '@/assets/ee52a0b8a079bbc481e46f2245db9dd3a0d65a2e.png';
import logoIgga from '@/assets/d7bf1e82907ca0467f7b4d32bb2f8f3e8bda596d.png';
import logoAlgar from '@/assets/568697430147bb2334f7995382b2363044ee5bfa.png';
import logoAbrasel from '@/assets/ce8f8c7051b68eb6080a95a4fcb18a30f8a1676d.png';
import logoVoltera from '@/assets/6e5c72b452d7cd9d6b98f038b6a1ba6e258f1471.png';
import logoCresol from '@/assets/40acfb62e43c84fd6b255f04dd83f314921c5832.png';
import logoBoticario from '@/assets/d83a591c6b98d450c02a98ea7b9db836e5e0eade.png';
import logoBtg from '@/assets/31485a40b42e6b14719c9ff550aba8c3fca025aa.png';
import logoParanaBanco from '@/assets/c44903aaae47aad1e55338fd8f536ec1b920acc0.png';
import imgWhitelabel from '@/assets/Contratação Digital White Label.png';
import imgApi from '@/assets/Integração via API.png';
import imgHibrida from '@/assets/Contratação Híbrida.png';
import imgPortal from '@/assets/Portal do Parceiro.png';
import logoGedisaNova from '@/assets/logo-gedisa-outline.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('api');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cargo: '',
    telefone: '',
    email: '',
    solucao: 'Minha Empresa'
  });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newsError, setNewsError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Máscara de telefone
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  // Validar email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar formulário
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.nome || formData.nome.trim().length < 2) {
      errors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.empresa || formData.empresa.trim().length < 2) {
      errors.empresa = 'Nome da empresa é obrigatório';
    }

    if (!formData.cargo || formData.cargo.trim().length < 2) {
      errors.cargo = 'Cargo é obrigatório';
    }

    const cleanedPhone = formData.telefone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Endereço de e-mail inválido';
    }

    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage('');

    // Validar
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL || 'http://localhost:3001/api/agendamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao enviar agendamento');
      }

      setSuccessMessage('✅ Agendamento enviado com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        empresa: '',
        cargo: '',
        telefone: '',
        email: '',
        solucao: 'Minha Empresa'
      });

      // Limpar mensagem após 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro ao processar agendamento';
      setFormErrors({ submit: errorMsg });
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');

    if (!validateEmail(emailNewsletter)) {
      setNewsError('Email inválido');
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL || 'http://localhost:3001/api/newsletter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailNewsletter }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao assinar newsletter');
      }

      setSuccessMessage('✅ Obrigado por assinar nossa newsletter!');
      setEmailNewsletter('');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro ao processar';
      setNewsError(errorMsg);
      console.error('Erro:', error);
    }
  };

  // Detectar scroll para mostrar botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const halfPage = (scrollHeight - window.innerHeight) / 2;
      setShowScrollToTop(scrollPosition > halfPage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para scroll suave ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with Navbar */}
      <section className="relative min-h-screen bg-[#080808] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            alt="Aerogeradores - Energia eólica"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgHeroBackground}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,92,0,0)] to-[rgba(0,0,0,0.06)]" style={{ mixBlendMode: 'color' }} />
          <div className="absolute inset-0 bg-[rgba(8,8,8,0.43)]" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 w-full">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 pt-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-6">
                <img 
                  src={logoGedisaNova} 
                  alt="Gedisa Logo" 
                  className="h-[37px] w-auto object-contain"
                />

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                  <div className="relative">
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                      className="flex items-center gap-1 text-white text-sm font-['Manrope'] hover:text-[#ff5c00] transition-colors"
                    >
                      <span>Soluções</span>
                      <svg className="w-3 h-2" fill="none" viewBox="0 0 11 7">
                        <path clipRule="evenodd" d={svgPaths.p19f49900} fill="white" fillRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg py-2 min-w-[280px] z-50">
                        <a 
                          href="#about"
                          className="block px-4 py-3 text-[#080808] hover:bg-[#f8f5f3] hover:text-[#ff5c00] transition-colors font-['Manrope'] text-sm"
                        >
                          Contratação digital White Label
                        </a>
                        <a 
                          href="#about"
                          className="block px-4 py-3 text-[#080808] hover:bg-[#f8f5f3] hover:text-[#ff5c00] transition-colors font-['Manrope'] text-sm"
                        >
                          Integração via API
                        </a>
                        <a 
                          href="#about"
                          className="block px-4 py-3 text-[#080808] hover:bg-[#f8f5f3] hover:text-[#ff5c00] transition-colors font-['Manrope'] text-sm"
                        >
                          Contratação híbrida
                        </a>
                        <a 
                          href="#about"
                          className="block px-4 py-3 text-[#080808] hover:bg-[#f8f5f3] hover:text-[#ff5c00] transition-colors font-['Manrope'] text-sm"
                        >
                          Portal do Parceiro
                        </a>
                      </div>
                    )}
                  </div>
                  <a href="#about" className="text-white text-sm font-['Manrope'] hover:text-[#ff5c00] transition-colors">
                    A Gedisa
                  </a>
                </div>
              </div>

              {/* Desktop CTA Button */}
              <a href="#" className="hidden lg:block bg-[#ff5c00] text-white px-6 py-2.5 rounded-lg font-['Roboto'] font-light text-base hover:bg-[#e55200] transition-colors">
                Agende uma apresentação
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Line under navbar */}
            <div className="h-px bg-[#FF5C00] mt-3" />

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-6 space-y-4 border-t border-white/10 mt-3">
                <button className="block w-full text-left text-white text-sm font-['Manrope'] hover:text-[#ff5c00] transition-colors">
                  Soluções
                </button>
                <a href="#about" className="block text-white text-sm font-['Manrope'] hover:text-[#ff5c00] transition-colors">
                  A Gedisa
                </a>
                <button className="w-full bg-[#ff5c00] text-white px-6 py-2.5 rounded-lg font-['Roboto'] text-base hover:bg-[#e55200] transition-colors">
                  Agende uma apresentação
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 py-12 lg:py-0">
            <div className="max-w-[1280px] space-y-16 lg:space-y-24">
              <h1 className="font-['Plus_Jakarta_Sans'] font-normal text-white text-5xl sm:text-6xl lg:text-[88px] leading-tight">
                Pensamos em soluções de energia para [seu futuro]
              </h1>

              <div className="max-w-[630px] space-y-9">
                <p className="font-['Manrope'] text-white text-lg lg:text-xl leading-relaxed">
                  Transformamos a sua relação com a energia, tornando-a mais simples, acessível e sustentável, 
                  com liberdade de escolha e impacto positivo no presente e no futuro.
                </p>

                <a href="#" className="backdrop-blur-sm bg-[rgba(0,0,0,0.2)] text-white px-6 py-3.5 rounded-lg font-['Roboto'] font-light text-base hover:bg-[rgba(0,0,0,0.3)] transition-colors inline-flex items-center gap-2">
                  <span>Explore a Geração Distribuída</span>
                  <div className="bg-[#ff5c00] rounded-full w-6 h-6 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                      <path clipRule="evenodd" d={svgPaths.pac71810} fillRule="evenodd" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros Section */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-3xl lg:text-4xl text-center mb-12 lg:mb-16">
            Empresas que utilizam a nossa tecnologia de gestão em GD
          </h2>
          
          {/* Partner Logos Carousel */}
          <div className="relative w-full flex justify-center">
            <div className="flex items-center gap-16 animate-scroll">
              <img
                alt="igga"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoIgga}
              />
              <img
                alt="Algar"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoAlgar}
              />
              <img
                alt="abrasel"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoAbrasel}
              />
              <img
                alt="voltera"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoVoltera}
              />
              <img
                alt="CRESOL"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoCresol}
              />
              <img
                alt="O Boticário"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoBoticario}
              />
              <img
                alt="BTG Pactual"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoBtg}
              />
              <img
                alt="Paraná Banco"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoParanaBanco}
              />
              {/* Duplicate logos for seamless loop */}
              <img
                alt="igga"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoIgga}
              />
              <img
                alt="Algar"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoAlgar}
              />
              <img
                alt="abrasel"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoAbrasel}
              />
              <img
                alt="voltera"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoVoltera}
              />
              <img
                alt="CRESOL"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoCresol}
              />
              <img
                alt="O Boticário"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoBoticario}
              />
              <img
                alt="BTG Pactual"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoBtg}
              />
              <img
                alt="Paraná Banco"
                className="h-10 w-auto object-contain flex-shrink-0 brightness-0 opacity-70"
                src={logoParanaBanco}
              />
            </div>
          </div>
          <div className="text-center mt-16">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-['Manrope'] font-medium text-[#ff5c00] text-lg hover:gap-3 transition-all"
            >
              Faça como elas, seja um parceiro Gedisa
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>


{/* Soluções Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-3xl lg:text-5xl text-center mb-12 lg:mb-24 leading-tight">
            Soluções sob medida para: empresas, comercializadoras e consumidores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Transforme energia em oportunidade */}
            <div className="relative rounded-xl overflow-hidden h-[536px] group">
              <img
                alt="Transforme energia em oportunidade"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares2}
              />
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                src={img1}
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)]" />
              
              {/* Conteúdo expandido - Parte inferior */}
              <div className="absolute bottom-5 left-5 right-20">
                <div className={`transition-all duration-500 ${
                  expandedCard === 1 ? 'mb-4' : 'mb-0'
                }`}>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-white text-3xl leading-tight mb-4">
                    Transforme energia em oportunidade
                  </h3>
                  
                  {/* Texto e botão - Aparecem quando expandido */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    expandedCard === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="font-['Manrope'] text-white text-base leading-relaxed mb-4">
                      Ofereça economia real para seus clientes e fortaleça sua marca ao lado da maior empresa independente de Geração Distribuída do país.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 font-['Manrope'] font-medium text-white text-base hover:gap-3 transition-all"
                    >
                      Explorar mais
                      <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Botão - Fixo no canto inferior direito */}
              <div className="absolute bottom-5 right-5">
                <button 
                  onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
                  className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors ${
                    expandedCard === 1 
                      ? 'bg-[#ff5c00] hover:bg-[#e55200]' 
                      : 'bg-white/40 backdrop-blur-sm hover:bg-white/60'
                  }`}
                >
                  {expandedCard === 1 ? (
                    <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="white" viewBox="2 2 30 30">
                      <path d={svgPaths.p21ae9480} />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2 - Amplie seu portfólio de energia */}
            <div className="relative rounded-xl overflow-hidden h-[536px] group">
              <img
                alt="Amplie seu portfólio de energia"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares2}
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)]" />
              
              {/* Conteúdo expandido - Parte inferior */}
              <div className="absolute bottom-5 left-5 right-20">
                <div className={`transition-all duration-500 ${
                  expandedCard === 2 ? 'mb-4' : 'mb-0'
                }`}>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-white text-3xl leading-tight mb-4">
                    Amplie seu portfólio de energia
                  </h3>
                  
                  {/* Texto e botão - Aparecem quando expandido */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    expandedCard === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="font-['Manrope'] text-white text-base leading-relaxed mb-4">
                      Posicione sua comercializadora em um dos mercados de energia que mais cresce no Brasil.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 font-['Manrope'] font-medium text-white text-base hover:gap-3 transition-all"
                    >
                      Explorar mais
                      <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Botão - Fixo no canto inferior direito */}
              <div className="absolute bottom-5 right-5">
                <button 
                  onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
                  className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors ${
                    expandedCard === 2 
                      ? 'bg-[#ff5c00] hover:bg-[#e55200]' 
                      : 'bg-white/40 backdrop-blur-sm hover:bg-white/60'
                  }`}
                >
                  {expandedCard === 2 ? (
                    <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="white" viewBox="2 2 30 30">
                      <path d={svgPaths.p21ae9480} />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Card 3 - Proteja sua tarifa de energia */}
            <div className="relative rounded-xl overflow-hidden h-[536px] group">
              <img
                alt="Proteja sua tarifa de energia"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={img2}
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)]" />
              
              {/* Conteúdo expandido - Parte inferior */}
              <div className="absolute bottom-5 left-5 right-20">
                <div className={`transition-all duration-500 ${
                  expandedCard === 3 ? 'mb-4' : 'mb-0'
                }`}>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-white text-3xl leading-tight mb-4">
                    Proteja sua tarifa de energia
                  </h3>
                  
                  {/* Texto e botão - Aparecem quando expandido */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    expandedCard === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="font-['Manrope'] text-white text-base leading-relaxed mb-4">
                      Fique livre das variações das bandeiras tarifárias. Economia garantida e sustentabilidade para sua residência ou seu negócio.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 font-['Manrope'] font-medium text-white text-base hover:gap-3 transition-all"
                    >
                      Explorar mais
                      <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Botão - Fixo no canto inferior direito */}
              <div className="absolute bottom-5 right-5">
                <button 
                  onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}
                  className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors ${
                    expandedCard === 3 
                      ? 'bg-[#ff5c00] hover:bg-[#e55200]' 
                      : 'bg-white/40 backdrop-blur-sm hover:bg-white/60'
                  }`}
                >
                  {expandedCard === 3 ? (
                    <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="white" viewBox="2 2 30 30">
                      <path d={svgPaths.p21ae9480} />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>n

      {/* Technology Section */}
      <section className="py-16 lg:py-24 bg-[#f8f5f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
            {/* Left - Text */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[#404040] text-3xl lg:text-4xl leading-tight">
                <span className="font-normal">Nós temos a </span>
                <span className="font-bold">melhor tecnologia em gestão de geração distribuída</span>
                <span className="font-normal"> do Brasil para o seu negócio</span>
              </h2>

              <div className="space-y-6 text-[#5b5b5b] text-lg lg:text-xl font-['Manrope']">
                <p className="tracking-tight">
                  Desde 2018, a Gedisa desenvolve tecnologia proprietária que assegura eficiência na gestão da geração distribuída, consolidando-se como referência nacional em GD.
                </p>
                <p className="font-bold tracking-tight">
                  Você gera a demanda e nossa plataforma garante toda a operação, com segurança e confiabilidade para o seu cliente.
                </p>
              </div>
              <a href="#" className="flex items-center gap-2 text-[#ff5c00] font-['Manrope'] text-base hover:gap-3 transition-all">
                <span>Explorar mais</span>
                <svg className="w-3 h-3" fill="#FF5C00" viewBox="0 0 10.624 10.624">
                  <path d={svgPaths.p39935600} stroke="#FF5C00" strokeWidth="0.2" />
                </svg>
              </a>
            </div>

            {/* Right - Stats Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* +20 mil clientes */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 38 38">
                    <g>
                      <path d={svgPaths.p6c42aa0} fill="#FF5C00" />
                      <path clipRule="evenodd" d={svgPaths.p248f6900} fill="#FF5C00" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +20 mil <span className="font-normal">clientes atendidos</span>
                  </p>
                </div>
              </div>

              {/* +140 usinas */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 38.0002 25.6551">
                    <g>
                      <path d={svgPaths.p19edb900} fill="#FF5C00" />
                      <path d={svgPaths.p16658c80} fill="#FF5C00" />
                      <path d={svgPaths.p1f251780} fill="#FF5C00" />
                      <path d={svgPaths.p16a82600} fill="#FF5C00" />
                      <path d={svgPaths.p26c61000} fill="#FF5C00" />
                      <path d={svgPaths.p93025d0} fill="#FF5C00" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +140 <span className="font-normal">usinas em operação</span>
                  </p>
                </div>
              </div>

              {/* +80 marcas parceiras */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 26.3286 38">
                    <g>
                      <path d={svgPaths.p3bdccd80} fill="#FF5C00" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +80 <span className="font-normal">marcas parceiras</span>
                  </p>
                </div>
              </div>

              {/* +96% de satisfação */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 38 38">
                    <g>
                      <path d={svgPaths.pa786480} fill="#FF5C00" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +96% <span className="font-normal">de satisfação dos clientes</span>
                  </p>
                </div>
              </div>

              {/* +100 GWh de energia gerada */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 38 38">
                    <g>
                      <path d={svgPaths.p2856c480} fill="#FF5C00" />
                      <path d={svgPaths.p5e0f100} fill="#FF5C00" />
                      <path d={svgPaths.p34c96a00} fill="#FF5C00" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +100 <span className="font-normal">GWh de energia gerada</span>
                  </p>
                </div>
              </div>

              {/* +1.500 MW de potência instalada */}
              <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 flex flex-col gap-8">
                <div className="w-10 h-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 38 38">
                    <g>
                      <circle cx="19" cy="19" r="19" fill="#FF5C00" opacity="0.2" />
                      <path d="M19 10 L19 28 M12 19 L26 19" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-2xl lg:text-3xl">
                    +1.500 <span className="font-normal">MW de potência instalada</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brasil Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left - Map */}
            <div className="w-full lg:w-[58%]">
              <div className="w-full relative">
                <img
                  alt="Mapa do Brasil - Presença da Gedisa"
                  className="w-full h-auto object-contain"
                  src={imgMapaBrasil}
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-[42%] space-y-8">
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-4xl lg:text-5xl leading-tight">
                Nossa energia conectando o país
              </h2>
              <p className="font-['Manrope'] text-[#080808] text-lg lg:text-xl leading-relaxed">
                Em mais de{' '}
                <span className="font-bold text-[#ff5c00]">20 estados e 5.000 cidades</span>, 
                a Gedisa impulsiona a expansão da geração distribuída, levando sustentabilidade e economia a todo o país.
              </p>
              
              {/* Legend */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5c00]" />
                  <span className="font-['Manrope'] text-[#080808] text-sm">Rede Gedisa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9e9e9e]" />
                  <span className="font-['Manrope'] text-[#080808] text-sm">Expansão</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integration Section */}
      <section className="py-16 lg:py-24 bg-white" id="about">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-start mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-[rgba(255,92,0,0.5)] rounded-full">
              <svg className="w-5 h-6" fill="none" viewBox="0 0 17.9396 24.0002">
                <g>
                  <path d={svgPaths.p2856c480} fill="black" />
                  <path d={svgPaths.p5e0f100} fill="black" />
                  <path d={svgPaths.p34c96a00} fill="black" />
                </g>
              </svg>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[#080808] text-base">
                Geração distribuída com a força da sua marca.
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[#080808] text-4xl lg:text-6xl mb-6 leading-tight max-w-4xl">
            A solução completa{' '}
            <span className="font-normal">para levar</span>{' '}
            energia renovável{' '}
            <span className="font-normal">com a</span>{' '}
            sua marca
          </h2>

          <p className="font-['Manrope'] text-[#080808] text-lg lg:text-xl mb-16 max-w-2xl leading-relaxed">
            Com a Gedisa, você l<span className="font-bold">eva geração distribuída aos seus clientes com a força da sua marca e zero investimento em tecnologia</span>. Uma plataforma white label que transforma energia renovável em crescimento e rentabilidade.
          </p>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left - Accordion */}
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-14">
              {/* Contratação digital White Label */}
              <div className="space-y-6">
                <h3 
                  onClick={() => setActiveAccordion('whitelabel')}
                  className={`font-['Plus_Jakarta_Sans'] font-medium text-2xl lg:text-3xl cursor-pointer transition-all duration-500 ${
                    activeAccordion === 'whitelabel' ? 'text-[#080808]' : 'text-[rgba(0,0,0,0.34)] hover:text-[#080808]'
                  }`}
                >
                  Contratação digital White Label
                </h3>
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeAccordion === 'whitelabel' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="font-['Manrope'] text-[#080808] text-base leading-relaxed">
                    Solução de energia com\ a identidade da sua marca. Ofereça uma jornada digital completa, segura e assistida por inteligência artificial, garantindo autonomia total ao cliente.

                  </p>
                </div>
                <div className="space-y-2 overflow-hidden">
                  <div className={`h-px transition-all duration-500 ${activeAccordion === 'whitelabel' ? 'bg-[#080808]' : 'bg-[#D0C5BF]'}`} />
                  <div className={`h-1 bg-[#FF5C00] rounded transition-all duration-700 ease-out ${
                    activeAccordion === 'whitelabel' ? 'w-[168px]' : 'w-0'
                  }`} />
                </div>
              </div>

              {/* Integração via API */}
              <div className="space-y-6">
                <h3 
                  onClick={() => setActiveAccordion('api')}
                  className={`font-['Plus_Jakarta_Sans'] font-medium text-2xl lg:text-3xl cursor-pointer transition-all duration-500 ${
                    activeAccordion === 'api' ? 'text-[#080808]' : 'text-[rgba(0,0,0,0.34)] hover:text-[#080808]'
                  }`}
                >
                  Integração via API
                </h3>
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeAccordion === 'api' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="font-['Manrope'] text-[#080808] text-base leading-relaxed">
                    Experiência fluida dentro do seu app. Solução embarcada por API que conecta a contratação de energia 
                    diretamente ao seu aplicativo, sem fricção e com integração total.
                  </p>
                </div>
                <div className="space-y-2 overflow-hidden">
                  <div className={`h-px transition-all duration-500 ${activeAccordion === 'api' ? 'bg-[#080808]' : 'bg-[#D0C5BF]'}`} />
                  <div className={`h-1 bg-[#FF5C00] rounded transition-all duration-700 ease-out ${
                    activeAccordion === 'api' ? 'w-[168px]' : 'w-0'
                  }`} />
                </div>
              </div>

              {/* Contratação híbrida */}
              <div className="space-y-6">
                <h3 
                  onClick={() => setActiveAccordion('hibrida')}
                  className={`font-['Plus_Jakarta_Sans'] font-medium text-2xl lg:text-3xl cursor-pointer transition-all duration-500 ${
                    activeAccordion === 'hibrida' ? 'text-[#080808]' : 'text-[rgba(0,0,0,0.34)] hover:text-[#080808]'
                  }`}
                >
                  Contratação híbrida
                </h3>
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeAccordion === 'hibrida' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="font-['Manrope'] text-[#080808] text-base leading-relaxed">
                    Segurança digital com suporte humano. Processo que une tecnologia e atendimento humano, com validação por OCR, rastreabilidade e assinatura digital em cada etapa.
                  </p>
                </div>
                <div className="space-y-2 overflow-hidden">
                  <div className={`h-px transition-all duration-500 ${activeAccordion === 'hibrida' ? 'bg-[#080808]' : 'bg-[#D0C5BF]'}`} />
                  <div className={`h-1 bg-[#FF5C00] rounded transition-all duration-700 ease-out ${
                    activeAccordion === 'hibrida' ? 'w-[168px]' : 'w-0'
                  }`} />
                </div>
              </div>

              {/* Portal do Parceiro */}
              <div className="space-y-6">
                <h3 
                  onClick={() => setActiveAccordion('portal')}
                  className={`font-['Plus_Jakarta_Sans'] font-medium text-2xl lg:text-3xl cursor-pointer transition-all duration-500 ${
                    activeAccordion === 'portal' ? 'text-[#080808]' : 'text-[rgba(0,0,0,0.34)] hover:text-[#080808]'
                  }`}
                >
                  Portal do Parceiro
                </h3>
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeAccordion === 'portal' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="font-['Manrope'] text-[#080808] text-base leading-relaxed">
                    Gestão completa em suas mãos. Acesse dados em tempo real, gerencie contratos, acompanhe performance e tenha controle total sobre sua operação através do nosso portal exclusivo para parceiros.
                  </p>
                </div>
                <div className="space-y-2 overflow-hidden">
                  <div className={`h-px transition-all duration-500 ${activeAccordion === 'portal' ? 'bg-[#080808]' : 'bg-[#D0C5BF]'}`} />
                  <div className={`h-1 bg-[#FF5C00] rounded transition-all duration-700 ease-out ${
                    activeAccordion === 'portal' ? 'w-[168px]' : 'w-0'
                  }`} />
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[611/693.5] overflow-hidden rounded-lg">
                <img
                  alt="Contratação digital White Label"
                  className={`absolute w-full h-full object-contain transition-opacity duration-700 ${
                    activeAccordion === 'whitelabel' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  src={imgWhitelabel}
                />
                <img
                  alt="Integração via API"
                  className={`absolute w-full h-full object-contain transition-opacity duration-700 ${
                    activeAccordion === 'api' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  src={imgApi}
                />
                <img
                  alt="Contratação híbrida"
                  className={`absolute w-full h-full object-contain transition-opacity duration-700 ${
                    activeAccordion === 'hibrida' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  src={imgHibrida}
                />
                <img
                  alt="Portal do Parceiro"
                  className={`absolute w-full h-full object-contain transition-opacity duration-700 ${
                    activeAccordion === 'portal' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  src={imgPortal}
                />
              </div>
            </div>
          </div>

<div className="mt-12 pt-8 border-t border-[#D0C5BF]">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-['Manrope'] font-semibold text-[#ff5c00] text-lg hover:gap-3 transition-all group"
                >
                  Conheça nossas soluções para parceiros
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <p className="font-['Manrope'] text-[#5a5a5a] text-sm mt-2">
                  Clique aqui e descubra como transformar energia em oportunidade de negócio.
                </p>
              </div>

        </div>
      </section>

      {/* Commercializadoras Section */}
      <section className="py-16 lg:py-24 bg-[#f8f5f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-start mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-[rgba(255,92,0,0.5)] rounded-full bg-white">
              <svg className="w-5 h-6" fill="none" viewBox="0 0 17.9396 24.0002">
                <g>
                  <path d={svgPaths.p2856c480} fill="black" />
                  <path d={svgPaths.p5e0f100} fill="black" />
                  <path d={svgPaths.p34c96a00} fill="black" />
                </g>
              </svg>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[#080808] text-sm">
                Geração distribuída como porta de entrada para Mercado Livre.
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-3xl lg:text-5xl mb-16 max-w-3xl leading-tight">
            Transforme a GD em crescimento para sua comercializadora
          </h2>

          {/* Carousel */}
          <div className="relative rounded-2xl overflow-hidden h-[450px] lg:h-[592px]">
            {/* Slides */}
            <div className="relative w-full h-full">
              {/* Slide 1 - Portfólio que abre portas */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img
                  alt="Portfólio que abre portas"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={imgSlide1}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.6)]" />
                
                <div className="absolute bottom-8 lg:bottom-16 left-4 lg:left-16 right-4 lg:right-16">
                  <div className="backdrop-blur-md bg-[rgba(8,8,8,0.7)] border border-[rgba(255,255,255,0.3)] rounded-2xl p-6 lg:p-10 max-w-[520px]">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xl lg:text-2xl mb-4 bg-gradient-to-r from-[#FF5C00] to-[#FFA800] bg-clip-text text-transparent">
                      Portfólio que abre portas
                    </h3>
                    <p className="font-['Manrope'] text-white text-sm lg:text-base leading-relaxed">
                      Amplie seu portfólio com clientes de baixa tensão (Grupo B), sem investimento inicial e com gestão simplificada.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 2 - Sua nova vertical de crescimento */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img
                  alt="Sua nova vertical de crescimento"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={imgSlide2}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.6)]" />
                
                <div className="absolute bottom-8 lg:bottom-16 left-4 lg:left-16 right-4 lg:right-16">
                  <div className="backdrop-blur-md bg-[rgba(8,8,8,0.7)] border border-[rgba(255,255,255,0.3)] rounded-2xl p-6 lg:p-10 max-w-[520px]">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xl lg:text-2xl mb-4 bg-gradient-to-r from-[#FF5C00] to-[#FFA800] bg-clip-text text-transparent">
                      Sua nova vertical de crescimento
                    </h3>
                    <p className="font-['Manrope'] text-white text-sm lg:text-base leading-relaxed">
                      Transforme sua comercializadora em protagonista em um mercado em expansão e fortaleça da marca.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 3 - Cross-sell que conecta oportunidades */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img
                  alt="Cross-sell que conecta oportunidades"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={imgSlide3}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.6)]" />
                
                <div className="absolute bottom-8 lg:bottom-16 left-4 lg:left-16 right-4 lg:right-16">
                  <div className="backdrop-blur-md bg-[rgba(8,8,8,0.7)] border border-[rgba(255,255,255,0.3)] rounded-2xl p-6 lg:p-10 max-w-[520px]">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xl lg:text-2xl mb-4 bg-gradient-to-r from-[#FF5C00] to-[#FFA800] bg-clip-text text-transparent">
                      Cross-sell que conecta oportunidades
                    </h3>
                    <p className="font-['Manrope'] text-white text-sm lg:text-base leading-relaxed">
                      Geração Distribuída como como porta de entrada, com olhar para a abertura do Mercado Livre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 4 - Entrada simplificada para GD (original) */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img
                  alt="Entrada simplificada para GD"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={imgFrame6699}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.6)]" />
                
                <div className="absolute bottom-8 lg:bottom-16 left-4 lg:left-16 right-4 lg:right-16">
                  <div className="backdrop-blur-md bg-[rgba(8,8,8,0.7)] border border-[rgba(255,255,255,0.3)] rounded-2xl p-6 lg:p-10 max-w-[520px]">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xl lg:text-2xl mb-4 bg-gradient-to-r from-[#FF5C00] to-[#FFA800] bg-clip-text text-transparent">
                      Entrada simplificada para GD
                    </h3>
                    <p className="font-['Manrope'] text-white text-sm lg:text-base leading-relaxed">
                      Modelo White Label sem CAPEX que permite sua comercializadora expandir no mercado de energia, com segurança e agilidade, apoiada pela operação já estruturada da Gedisa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 lg:bottom-16 right-4 lg:right-16 flex items-center gap-4">
              {/* Navigation Dots */}
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-white w-3 h-3' 
                        : 'bg-white/50 w-3 h-3 hover:bg-white/70'
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1)}
                  className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                  aria-label="Slide anterior"
                >
                  <svg className="w-5 h-5 rotate-180" fill="#080808" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1)}
                  className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                  aria-label="Próximo slide"
                >
                  <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
<div className="mt-16 text-center">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-['Manrope'] font-semibold text-[#ff5c00] text-lg hover:gap-3 transition-all group"
            >
              Saiba como sua comercializadora pode crescer com GD
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <p className="font-['Manrope'] text-[#5a5a5a] text-sm mt-2">
              Entre em contato e descubra as vantagens exclusivas para comercializadoras.
            </p>
          </div>
        </div>
        

      </section>

      {/* Features Section */}
      <section
        className="py-16 lg:py-24"
        style={{
          backgroundImage: 'linear-gradient(rgb(248, 244, 243) 0%, rgb(233, 228, 226) 100%)'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-start mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-[rgba(255,92,0,0.5)] rounded-full bg-white">
              <svg className="w-5 h-6" fill="none" viewBox="0 0 17.9396 24.0002">
                <g>
                  <path d={svgPaths.p2856c480} fill="black" />
                  <path d={svgPaths.p5e0f100} fill="black" />
                  <path d={svgPaths.p34c96a00} fill="black" />
                </g>
              </svg>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[#080808] text-sm">
                Geração distribuída para pequenos negócios e residências.
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#080808] text-3xl lg:text-5xl mb-12 lg:mb-16 leading-tight">
            <span className="bg-gradient-to-r from-[#FF5C00] to-[#FFA800] bg-clip-text text-transparent">Gedisa Energia</span> traz a liberdade para escolher a fonte de energia
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-16">
              <div className="bg-[#ff5c00] rounded-lg p-5 w-fit">
                <svg className="block w-8 h-8" fill="none" viewBox="0 0 34.0863 33.9127">
                  <g>
                    <path d={svgPaths.p21f74290} fill="#F8F8F3" />
                    <path d={svgPaths.p3e357200} fill="#F8F8F3" />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[#3b3b33] text-xl mb-3 leading-tight">
                  Tarifa protegida da variação de bandeira
                </h3>
                <p className="font-['Manrope'] text-[rgba(59,59,51,0.7)] text-base leading-relaxed">
                  Fique tranquilo: a sua conta de luz não sofre com bandeiras tarifárias e variações imprevisíveis.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-16">
              <div className="bg-[#ff5c00] rounded-lg p-5 w-fit">
                <svg className="block w-8 h-8" fill="none" viewBox="0 0 34.0864 34.086">
                  <g>
                    <path d={svgPaths.p36c0ea70} fill="#F8F8F3" />
                    <path d={svgPaths.p28e8b7f0} fill="#F8F8F3" />
                    <path d={svgPaths.p1cb385e0} fill="#F8F8F3" />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[#3b3b33] text-xl mb-3 leading-tight">
                  Não precisa de painel solar e obras
                </h3>
                <p className="font-['Manrope'] text-[rgba(59,59,51,0.7)] text-base leading-relaxed">
                  Aproveite energia limpa sem instalação de painéis ou reformas. Zero investimento inicial.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-16">
              <div className="bg-[#ff5c00] rounded-lg p-5 w-fit">
                <svg className="block w-8 h-8" fill="none" viewBox="0 0 34.0864 33.9126">
                  <g>
                    <path d={svgPaths.p2ba7be00} fill="#F8F8F3" />
                    <path d={svgPaths.p33804200} fill="#F8F8F3" />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[#3b3b33] text-xl mb-3 leading-tight">
                  Contrato sem fidelidade e multas
                </h3>
                <p className="font-['Manrope'] text-[rgba(59,59,51,0.7)] text-base leading-relaxed">
                  Liberdade total: cancele a qualquer momento, sem multas ou fidelidade, de forma simples e rápida.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-16">
              <div className="bg-[#ff5c00] rounded-lg p-5 w-fit">
                <svg className="block w-8 h-8" fill="none" viewBox="0 0 34.086 33.786">
                  <g>
                    <path d={svgPaths.p339fcc00} fill="#F8F8F3" />
                    <path d={svgPaths.p23259df0} fill="#F8F8F3" />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[#3b3b33] text-xl mb-3 leading-tight">
                  Energia limpa e renovável
                </h3>
                <p className="font-['Manrope'] text-[rgba(59,59,51,0.7)] text-base leading-relaxed">
                  Economize e ainda ajude a reduzir as emissões de gases do efeito estufa.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="font-['Plus_Jakarta_Sans'] font-light text-[#080808] text-base">
              <a href="#" className="font-medium underline cursor-pointer hover:text-[#ff5c00] transition-colors">
                Clique aqui
              </a>
              {' '}e veja sua economia com a Gedisa Energia em poucos segundos.
            </p>
          </div>
        </div>
      </section>

      {/* Hero with Form Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[45px] items-stretch">
            {/* Left - Image */}
            <div className="w-full lg:flex-1 lg:max-w-[733px]">
              <div className="relative rounded-xl overflow-hidden h-[500px] lg:h-[1120px]">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    WebkitMaskImage: `url('${imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares1}')`,
                    maskImage: `url('${imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares1}')`,
                    WebkitMaskSize: 'cover',
                    maskSize: 'cover',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center'
                  }}
                >
                  <img
                    alt="Engenheiros discutindo sobre painéis solares"
                    className="absolute inset-0 w-full h-full object-cover"
                    src={imgEngenheirosDeTiroMedioDiscutindoSobrePaineisSolares2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-transparent" />
                </div>
                
                {/* Text Overlay */}
                <div className="absolute top-8 lg:top-[54px] left-6 lg:left-[44px] right-6 lg:right-[44px]">
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl lg:text-6xl xl:text-[80px] leading-tight mb-0">
                    Energia que
                  </h2>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl lg:text-6xl xl:text-[80px] leading-tight mb-0">
                    faz bem
                  </h2>
                  <p className="font-['Plus_Jakarta_Sans'] font-medium text-white text-2xl lg:text-4xl xl:text-[80px] leading-tight mt-2 lg:mt-4">
                    para você, para os negócios e para o planeta
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full lg:flex-1 flex items-center justify-center">
              <div
                className="backdrop-blur-md bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(178,178,178,0.6)] rounded-xl px-9 py-12 shadow-2xl w-full h-full flex items-center"
              >
                <div className="flex flex-col gap-[27px] items-start w-full">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-white text-[32px] leading-[48px] w-full">
                    Agende uma apresentação
                  </h3>

                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-[36px] w-full">
                    {/* Success Message */}
                    {successMessage && (
                      <div className="w-full bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-100 text-sm">
                        {successMessage}
                      </div>
                    )}

                    {/* Error Messages */}
                    {formErrors.submit && (
                      <div className="w-full bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-100 text-sm">
                        ❌ {formErrors.submit}
                      </div>
                    )}

                    {/* Nome Completo */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        Nome completo
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg ${
                          formErrors.nome ? 'border-red-500' : 'border-[#616161]'
                        }`} />
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          placeholder="Ex: João Silva"
                          className="w-full bg-transparent px-5 py-3 text-white placeholder:text-[#bdbdbd] focus:outline-none font-['Manrope'] text-[16px] leading-[24px]"
                        />
                      </div>
                      {formErrors.nome && <span className="text-red-400 text-xs">{formErrors.nome}</span>}
                    </div>

                    {/* Nome da Empresa */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        Nome da empresa
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg ${
                          formErrors.empresa ? 'border-red-500' : 'border-[#616161]'
                        }`} />
                        <input
                          type="text"
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                          placeholder="Ex: Tech Solutions LTDA"
                          className="w-full bg-transparent px-5 py-3 text-white placeholder:text-[#bdbdbd] focus:outline-none font-['Manrope'] text-[16px] leading-[24px]"
                        />
                      </div>
                      {formErrors.empresa && <span className="text-red-400 text-xs">{formErrors.empresa}</span>}
                    </div>

                    {/* Cargo */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        Cargo
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg ${
                          formErrors.cargo ? 'border-red-500' : 'border-[#616161]'
                        }`} />
                        <input
                          type="text"
                          value={formData.cargo}
                          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                          placeholder="Ex: Diretor de Operações"
                          className="w-full bg-transparent px-5 py-3 text-white placeholder:text-[#bdbdbd] focus:outline-none font-['Manrope'] text-[16px] leading-[24px]"
                        />
                      </div>
                      {formErrors.cargo && <span className="text-red-400 text-xs">{formErrors.cargo}</span>}
                    </div>

                    {/* Telefone */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        Telefone
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg ${
                          formErrors.telefone ? 'border-red-500' : 'border-[#616161]'
                        }`} />
                        <input
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: formatPhoneNumber(e.target.value) })}
                          placeholder="Ex: (11) 98765-4321"
                          className="w-full bg-transparent px-5 py-3 text-white placeholder:text-[#bdbdbd] focus:outline-none font-['Manrope'] text-[16px] leading-[24px]"
                        />
                      </div>
                      {formErrors.telefone && <span className="text-red-400 text-xs">{formErrors.telefone}</span>}
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        E-mail
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg ${
                          formErrors.email ? 'border-red-500' : 'border-[#616161]'
                        }`} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com.br"
                          className="w-full bg-transparent px-5 py-3 text-white placeholder:text-[#bdbdbd] focus:outline-none font-['Manrope'] text-[16px] leading-[24px]"
                        />
                      </div>
                      {formErrors.email && <span className="text-red-400 text-xs">{formErrors.email}</span>}
                    </div>

                    {/* Dropdown */}
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="font-['Manrope'] text-white text-[16px] leading-[20px]">
                        A solução Gedisa é para...
                      </label>
                      <div className="relative bg-[rgba(0,0,0,0.2)] rounded-lg w-full">
                        <div className="absolute border-[#616161] border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg" />
                        <select
                          value={formData.solucao}
                          onChange={(e) => setFormData({ ...formData, solucao: e.target.value })}
                          className="w-full bg-transparent px-5 py-3 text-[#ced5d5] focus:outline-none appearance-none font-['Manrope'] text-[16px] leading-[24px]"
                        >
                          <option value="Minha Empresa" className="bg-[#080808]">Minha Empresa</option>
                          <option value="Minha Residência" className="bg-[#080808]">Minha Residência</option>
                          <option value="Comercializadora" className="bg-[#080808]">Comercializadora</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path d={svgPaths.p3cbdb180} fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="h-px w-full" />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#ff5c00] h-12 rounded-lg font-['Manrope'] font-medium text-white text-[16px] leading-[24px] hover:bg-[#e55200] transition-colors flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-3.5 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3" fill="white" viewBox="0 0 14 11.648">
                            <path d={svgPaths.p1d34fe80} />
                          </svg>
                          Agendar apresentação
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Footer */}
      <footer className="bg-[#080808] text-white pt-16 lg:pt-24 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Border */}
          <div className="h-px bg-white/36 mb-16" />

          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between mb-16">
            {/* Left - Logo and Newsletter */}
            <div className="space-y-24 lg:space-y-[103px]">
              {/* Logo */}
              <img 
                src={logoGedisaNova} 
                alt="Gedisa Logo" 
                className="h-24 w-auto object-contain"
              />

              {/* Newsletter */}
              <div className="max-w-[472px] space-y-6">
                <h3 className="font-['Manrope'] font-semibold text-base">
                  Assine a nossa newsletter
                </h3>
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="space-y-3">
                    <div
                      className="rounded-xl p-1 border border-[#616161]"
                      style={{
                        backgroundImage: 'linear-gradient(151.344deg, rgba(0, 0, 0, 0.6) 14.786%, rgba(178, 178, 178, 0.6) 114.71%)'
                      }}
                    >
                      <div className="flex items-center justify-between pr-1 pl-6 py-1">
                        <input
                          type="email"
                          value={emailNewsletter}
                          onChange={(e) => setEmailNewsletter(e.target.value)}
                          placeholder="Adicione o seu e-mail"
                          className="flex-1 bg-transparent border-0 text-white placeholder:text-[#868686] focus:outline-none font-['Manrope'] leading-[48px]"
                        />
                        <button
                          type="submit"
                          className="bg-[#ff5c00] text-white px-4 py-3 rounded-lg hover:bg-[#e55200] transition-colors font-['Manrope'] font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Assinar
                        </button>
                      </div>
                    </div>
                    {newsError && <span className="text-red-400 text-xs block">{newsError}</span>}
                    {successMessage && newsError === '' && (
                      <span className="text-green-400 text-xs block">{successMessage}</span>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right - Links */}
            <div className="flex flex-wrap gap-12 lg:gap-[86px]">


              {/* Contact */}
              <div className="space-y-6">
                <h4 className="text-[rgba(255,255,255,0.5)] text-sm font-['Manrope']">
                  Contato
                </h4>
                <nav className="flex flex-col gap-2 font-['Manrope'] text-base">
                  <a href="https://wa.me/554133430013" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5c00] transition-colors">
                    Atendimento WhatsApp
                  </a>
                  <a href="#parceiro" className="hover:text-[#ff5c00] transition-colors">
                    Quero ser parceiro
                  </a>
                  <a href="https://wa.me/554188141564?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Entrei%20no%20site%20da%20Gedisa%20e%20quero%20conectar%20minha%20usina%20da%20Gedisa.%20Gostaria%20de%20saber%20mais." target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5c00] transition-colors">
                    Quero ser gerador
                  </a>
                  <a href="https://ats.abler.com.br/jobs/grupoergon" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5c00] transition-colors">
                    Quero trabalhar na Gedisa
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/36 mb-6" />

          {/* Bottom Footer */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Copyright */}
            <div className="text-[#5a5a5a] text-sm font-['Roboto'] max-w-[828px] leading-4">
              <p className="mb-0">
                Copyright © 2025 Gedisa - Todos os direitos reservados. 
                A Gedisa é uma plataforma que conecta pequenos produtores de energia limpa à consumidores da 
                COBRAGEDI - Cooperativa Brasileira de Geração Distribuída, permitindo o acesso aos benefícios da 
                geração compartilhada. GEDISA SERVICOS LTDA – CNPJ 32.060.301/0001-05
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="YouTube"
              >
                <svg className="w-7 h-5" fill="#5a5a5a" viewBox="0 0 26.782 19.3425">
                  <path clipRule="evenodd" d={svgPaths.p11731200} fillRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg className="w-7 h-7" fill="#5a5a5a" viewBox="0 0 26.782 26.782">
                  <path d={svgPaths.p3ea35e80} />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-[#FF5C00] hover:bg-[#E64A00] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-40 ${
          showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * L'AURA ESTÉTICA AVANÇADA - JAVASCRIPT PRINCIPAL
 * Interatividade de alta conversão, personalização dinâmica e animações fluidas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hidratação dos dados a partir do config.js
  hydrateConfig();

  // 2. Menu Mobile e Navegação Fluida
  setupNavigation();

  // 3. Slider Interativo Antes & Depois (Touch & Mouse)
  setupComparisonSlider();

  // 4. Filtro de Categorias de Tratamentos
  setupTreatmentTabs();

  // 5. Quiz / Simulador de Protocolo Ideal
  setupTreatmentQuiz();

  // 6. Accordion do FAQ
  setupFaqAccordion();

  // 7. Modal de Agendamento VIP & Envio Direto para WhatsApp
  setupBookingModal();

  // 8. Banner LGPD de Cookies
  setupLgpdConsent();

  // 9. Animações de Entrada (IntersectionObserver)
  setupScrollReveal();
});

/**
 * Hidrata os elementos da página com o SITE_CONFIG
 */
function hydrateConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // Atualiza Nome da Clínica
  document.querySelectorAll('[data-config="clinicName"]').forEach(el => {
    el.textContent = SITE_CONFIG.clinicName;
  });

  // Atualiza ShortName
  document.querySelectorAll('[data-config="shortName"]').forEach(el => {
    el.textContent = SITE_CONFIG.shortName;
  });

  // Atualiza Telefone Visível
  document.querySelectorAll('[data-config="phoneDisplay"]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.phoneDisplay;
  });

  // Atualiza Promessa de Resposta
  document.querySelectorAll('[data-config="responsePromise"]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.responsePromise;
  });

  // Atualiza Endereço Completo
  document.querySelectorAll('[data-config="fullAddress"]').forEach(el => {
    const addr = SITE_CONFIG.contact.address;
    el.textContent = `${addr.street}, ${addr.neighborhood} - ${addr.city}/${addr.state}`;
  });

  // Atualiza Especialista
  document.querySelectorAll('[data-config="specialistName"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.name;
  });

  document.querySelectorAll('[data-config="specialistTitle"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.title;
  });

  document.querySelectorAll('[data-config="specialistReg"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.registration;
  });

  document.querySelectorAll('[data-config="specialistBio"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.bio;
  });

  // Atualiza Links do WhatsApp
  const defaultMsg = encodeURIComponent(SITE_CONFIG.contact.defaultWhatsappMessage);
  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${defaultMsg}`;
  
  document.querySelectorAll('[data-action="open-whatsapp"]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = waUrl;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.addEventListener('click', () => {
        window.open(waUrl, '_blank');
      });
    }
  });

  // Atualiza Redes Sociais
  if (SITE_CONFIG.contact && SITE_CONFIG.contact.social) {
    const s = SITE_CONFIG.contact.social;
    document.querySelectorAll('[data-social="instagram"]').forEach(el => {
      el.href = s.instagram || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="facebook"]').forEach(el => {
      el.href = s.facebook || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="youtube"]').forEach(el => {
      el.href = s.youtube || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="tiktok"]').forEach(el => {
      el.href = s.tiktok || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
  }

  // Atualiza Embed do Google Maps se fornecido
  const mapIframe = document.getElementById('clinicGoogleMap');
  if (mapIframe && SITE_CONFIG.contact.mapsEmbedUrl) {
    mapIframe.src = SITE_CONFIG.contact.mapsEmbedUrl;
  }
}

/**
 * Menu Hamburguer & Mobile Overlay
 */
function setupNavigation() {
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !overlay) return;

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('is-active');
    overlay.classList.toggle('is-open', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (overlay.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });
}

/**
 * Slider Interativo Antes & Depois
 */
function setupComparisonSlider() {
  const container = document.getElementById('comparisonContainer');
  const overlayClip = document.getElementById('comparisonOverlayClip');
  const dividerLine = document.getElementById('comparisonDividerLine');
  const handle = document.getElementById('comparisonHandle');

  if (!container || !overlayClip || !dividerLine || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let xPos = clientX - rect.left;
    let percentage = (xPos / rect.width) * 100;

    // Trava entre 5% e 95%
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;

    overlayClip.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    dividerLine.style.left = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Eventos de Mouse
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Eventos Touch (Mobile)
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/**
 * Abas de Tratamentos (Filtro Suave)
 */
function setupTreatmentTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card');

  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const category = button.getAttribute('data-category');

      treatmentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Quiz / Simulador de Protocolo Personalizado
 */
function setupTreatmentQuiz() {
  const optionButtons = document.querySelectorAll('.quiz-option-btn');
  const resultBox = document.getElementById('quizResultBox');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultDesc = document.getElementById('quizResultDesc');
  const resultCta = document.getElementById('quizResultCta');

  if (!optionButtons.length || !resultBox) return;

  const protocols = {
    flacidez: {
      title: "Protocolo Rejuvenesce & Lift",
      desc: "Combinação sinérgica de Bioestimulador de Colágeno (Radiesse/Sculptra) com tecnologia de Ultrassom Microfocado para restaurar o tônus facial e contorno da mandíbula.",
      message: "Olá! Fiz o simulador no site e gostaria de saber mais sobre o Protocolo Rejuvenesce & Lift para firmeza e contorno."
    },
    manchas: {
      title: "Protocolo Glow & Purity Skin",
      desc: "Terapia combinada com Peeling Químico Magistral, Laser Fracionado e infusão transdérmica de ativos clareadores para uniformização imediata do tom e textura.",
      message: "Olá! Fiz o simulador no site e meu objetivo é o Protocolo Glow & Purity Skin para clareamento e luminosidade."
    },
    rugas: {
      title: "Protocolo Expressão Serena (Toxina Full-Face)",
      desc: "Aplicação refinada de toxina botulínica de alta pureza para suavizar linhas dinâmicas de testa, glabela e 'pés de galinha' preservando a sua naturalidade.",
      message: "Olá! Fiz o teste no site e quero agendar uma avaliação para o Protocolo Expressão Serena de toxina botulínica."
    },
    corporal: {
      title: "Protocolo Silhueta High-Tech",
      desc: "Tratamento de alta precisão associando campo eletromagnético para definição muscular com radiofrequência multipolar para combate à gordura localizada e celulite.",
      message: "Olá! Fiz o simulador do site e me interessei pelo Protocolo Silhueta High-Tech corporal."
    }
  };

  optionButtons.forEach(button => {
    button.addEventListener('click', () => {
      optionButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');

      const targetKey = button.getAttribute('data-target');
      const protocol = protocols[targetKey];

      if (protocol) {
        resultTitle.textContent = protocol.title;
        resultDesc.textContent = protocol.desc;
        
        const phone = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.contact.whatsapp : "5511999998888";
        resultCta.href = `https://wa.me/${phone}?text=${encodeURIComponent(protocol.message)}`;
        
        resultBox.classList.add('is-active');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/**
 * FAQ Accordion
 */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');

    if (!button || !content) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Fecha os outros
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('is-open');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // Abre/fecha o atual
      if (!isOpen) {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Máscara e validação estrita de telefone celular (xx) xxxxx-xxxx
 */
function formatPhone(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function applyPhoneMask(input) {
  if (!input) return;

  input.addEventListener('input', () => {
    input.value = formatPhone(input.value);
  });

  input.addEventListener('keypress', (e) => {
    // Permite apenas dígitos e teclas de controle
    if (!/\d/.test(e.key) && e.key !== 'Enter') {
      e.preventDefault();
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    input.value = formatPhone(pasteData);
  });
}

/**
 * Modal de Agendamento VIP & Formulário Rápido do Hero
 */
function setupBookingModal() {
  const openButtons = document.querySelectorAll('[data-action="open-modal-booking"]');
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('bookingModalClose');
  const form = document.getElementById('bookingForm');
  const modalPhoneInput = document.getElementById('bookPhone');

  // Aplica máscara estrita de celular no input do modal
  applyPhoneMask(modalPhoneInput);

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value.trim();
      const phoneVal = modalPhoneInput ? modalPhoneInput.value.trim() : '';
      const procedure = document.getElementById('bookProcedure').value;
      const period = document.getElementById('bookPeriod').value;

      const rawDigits = phoneVal.replace(/\D/g, '');
      if (rawDigits.length < 10) {
        alert('Por favor, informe um número de celular válido com DDD.');
        if (modalPhoneInput) modalPhoneInput.focus();
        return;
      }

      const message = `Olá! Gostaria de agendar uma consulta de avaliação.\n\n*Nome:* ${name}\n*Telefone:* ${phoneVal}\n*Procedimento de Interesse:* ${procedure}\n*Melhor período:* ${period}`;
      
      const phone = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.contact.whatsapp : "5511999998888";
      const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(targetUrl, '_blank');
      closeModal();
      form.reset();
    });
  }
}

/**
 * Banner de Consentimento LGPD
 */
function setupLgpdConsent() {
  const banner = document.getElementById('lgpdBanner');
  const acceptBtn = document.getElementById('lgpdAccept');
  const declineBtn = document.getElementById('lgpdDecline');

  if (!banner) return;

  const hasConsent = localStorage.getItem('laura_lgpd_consent');
  if (!hasConsent) {
    banner.classList.remove('is-hidden');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('laura_lgpd_consent', 'accepted');
      banner.classList.add('is-hidden');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('laura_lgpd_consent', 'declined');
      banner.classList.add('is-hidden');
    });
  }
}

/**
 * Animação fluida de entrada (IntersectionObserver)
 */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * CONFIGURAÇÃO DO MODELO - CLÍNICA DE ESTÉTICA PREMIUM
 * 
 * 💡 DICA PARA O PROPRIETÁRIO / REVENDEDOR:
 * Altere apenas os dados deste arquivo para personalizar todo o site
 * com o nome, telefone, endereço e dados da clínica do seu cliente em menos de 2 minutos!
 */

const SITE_CONFIG = {
  // Identidade da Clínica
  clinicName: "L'AURA Estética Avançada",
  shortName: "L'AURA",
  tagline: "Harmonia sutil, ciência e elegância personalizada",
  description: "Clínica de estética avançada e rejuvenescimento de alto padrão. Tratamentos faciais, corporais e tecnologia de ponta com foco na sua beleza natural.",
  
  // Responsável Técnica / Especialista
  specialist: {
    name: "Dra. Camila Vasconcellos",
    title: "Biomédica Esteta & Especialista em Rejuvenescimento Natural",
    registration: "CRBM 34.890 / Especialista em Harmonização Facial e Corporal",
    bio: "Com mais de 10 anos de prática clínica e constante atualização internacional em Harvard e Milão, a Dra. Camila alia precisão biomédica ao olhar artístico refinado, garantindo resultados naturais e sofisticados sem exageros.",
    badge: "Responsável Técnica",
    photo: "assets/images/specialist.jpg"
  },

  // Contato e Atendimento
  contact: {
    whatsapp: "5571999998888", // Formato internacional: DDI + DDD + NÚMERO (somente números)
    phoneDisplay: "(71) 99999-8888",
    email: "",
    responsePromise: "Atendimento prioritário em até 15 minutos via WhatsApp",
    defaultWhatsappMessage: "Olá! Gostaria de agendar uma avaliação estética personalizada na L'AURA.",
    instagram: "laura.esteticaavancada",
    instagramUrl: "https://instagram.com",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      tiktok: "https://tiktok.com"
    },
    address: {
      street: "Alameda Salvador, 1057 - Torre América, Sala 1408",
      neighborhood: "Caminho das Árvores",
      city: "Salvador",
      state: "BA",
      cep: "41820-790",
      complement: ""
    },
    hours: {
      weekdays: "Segunda a Sexta: 08h00 às 20h00",
      saturday: "Sábado: 09h00 às 15h00",
      sunday: "Domingo e Feriados: Fechado"
    },
    // Link embed do Google Maps para a localização da clínica (Salvador Shopping)
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926019561085!2d-38.45524672401819!3d-12.978734987337424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161b17a104085f%3A0xe21f582772594a86!2sSalvador%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
  },

  // Métricas e Rastreamento (Opcional - deixe vazio ou insira os IDs de tráfego do cliente)
  tracking: {
    googleTagManagerId: "", // Ex: "GTM-XXXXXXX"
    googleAnalyticsId: "",  // Ex: "G-XXXXXXXXXX"
    metaPixelId: ""         // Ex: "1234567890123456"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}

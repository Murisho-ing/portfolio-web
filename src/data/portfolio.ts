import type { Project } from '../types/project'

export const portfolioData = {
  header: {
    logo: 'Murisho',
    nav: [
      { label: 'Inicio', href: '#hero', active: true },
      { label: 'Sobre mi', href: '#about', active: false },
      { label: 'Servicios', href: '#services', active: false },
      { label: 'Proyectos', href: '#projects', active: false }
    ],
    cta: 'Hablemos'
  },
  hero: {
    badge: '¡TRABAJEMOS JUNTOS!',
    title: {
      line1: '¡Hola! Soy',
      line2: 'Santiago Murillo'
    },
    description: 'Soy apasionado por crear experiencias digitales modernas e interactivas, combinando desarrollo web, diseño visual, modelado 3D y programación.',
    buttons: {
      primary: 'Hablemos',
      secondary: 'Descargar CV'
    }
  },
  whatIDo: {
    title: 'Lo que hago mejor',
    subtitle: 'Combinando lógica y creatividad para ofrecer soluciones integrales.'
  },
  about: {
    title: 'Sobre Mí',
    description: 'Soy apasionado por crear experiencias modernas e interactivas, combinando programación, diseño visual, modelado 3D y desarrollo multimedia. Disfruto transformar ideas en proyectos creativos y funcionales, donde la tecnología, la interacción y el diseño trabajan juntos para crear experiencias intuitivas y atractivas.',
    tags: ['INGENIERÍA', 'DISEÑO UI/UX', 'MODELADO 3D']
  },
  skills: [
    {
      title: 'Diseño Visual',
      description: 'Interfaces limpias y sistemas de diseño escalables y consistentes.',
      color: 'purple'
    },
    {
      title: 'Desarrollo Web',
      description: 'Desarrollo web moderno y eficiente.',
      color: 'peach'
    },
    {
      title: 'Experiencias Inmersivas',
      description: 'Creación de experiencias digitales mediante programación y gráficos 3D.',
      link: 'Ver proyectos →',
      color: 'cyan'
    }
  ],
  services: {
    title: 'Mis Servicios',
    subtitle: 'Soluciones creativas y técnicas diseñadas para elevar tu presencia digital.',
    list: [
      { title: 'Modelado 3D', text: 'Creacin de personajes, entornos y activos 3D optimizados para web y renderizado de alta calidad.' },
      { title: 'Desarrollo Web', text: 'Sitios web interactivos y aplicaciones robustas utilizando las ltimas tecnologas del mercado.' },
      { title: 'Diseño UI/UX', text: 'Interfaces centradas en el usuario con un enfoque en la usabilidad y la estética visual impactante.' },
      { title: 'Branding', text: 'Identidades visuales que cuentan historias y conectan emocionalmente con tu audiencia objetivo.' }
    ]
  },
  projects: {
    title: 'Proyectos Recientes',
    subtitle: 'Una selección de mi trabajo favorito por categorías.',
    viewAll: 'Ver todos los proyectos',
    list: [
      {
        title: 'Modelado 3D',
        tags: [
          { label: 'PERSONAJES Y ENTORNOS', color: 'orange' },
          { label: 'RENDERS DE PRODUCTO', color: 'cyan' }
        ],
        text: 'Creación de assets 3D detallados, desde personajes y entornos inmersivos hasta renders de producto fotorrealistas de alta calidad.',
        image: '',
        viewer: {
          viewerType: 'aframe' as const,
          src: '/viewer/model-viewer.html',
        }
      },
      {
        title: 'Desarrollo Web',
        tags: [
          { label: 'WEBSITES INTERACTIVOS', color: 'green' }
        ],
        text: 'Sitios web dinámicos con enfoque en rendimiento, animaciones fluidas y código limpio.',
        image: ''
      },
      {
        title: 'Diseño UI/UX',
        tags: [
          { label: 'APPS MÓVILES', color: 'purple' }
        ],
        text: 'Interfaces intuitivas y atractivas diseñadas centradas en el usuario.',
        image: ''
      },
      {
        title: 'Creación de Marca',
        tags: [
          { label: 'IDENTIDADES VISUALES', color: 'orange' }
        ],
        text: 'Sistemas de marca completos, desde logotipos hasta manuales de identidad efectivos.',
        image: ''
      }
    ] as Project[]
  },
  cta: {
    title: '¿Listo para crear algo\nincreíble juntos?',
    description: 'Si tienes un proyecto en mente, o simplemente\nquieres hablar de tecnología y diseño, no dudes en escribirme.',
    button: 'Enviar Mensaje →'
  },
  footer: {
    logo: 'Murisho',
    copyright: '© 2026 Santiago Murillo. Todos los derechos reservados.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-santiago-murillo-neme-bbab253a2/' },
      { label: 'GitHub', href: 'https://github.com/Murisho-ing' },
      { label: 'Correo', href: 'mailto:dmurilloneme@gmail.com' }
    ]
  }
}

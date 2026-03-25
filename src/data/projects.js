const makeContent = (overview, goal, concept, execution, motion, takeaway) => ({
  overview, goal,
  process: { concept, execution, motion },
  takeaway,
});

export const categories = [
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    projects: [
      {
        slug: 'lastpay',
        name: 'LastPay',
        vimeoId: '1175302458',
        vimeoRatio: 'ratio-16-9',
        year: '2024',
        tags: ['After Effects', 'Davinci Resolve'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Motion graphics para una plataforma de pagos digitales. Con presupuesto limitado, el enfoque fue tomar la UI existente del producto y elevarla mediante animación, ritmo y sonido.',
            'Velocidad, eficiencia y modernidad. Todo construido alrededor de música electrónica rápida, donde cada elemento visual responde directamente al beat.',
            'Moodboards en iPad y storyboard ligero antes de producción. Definir el ritmo desde el inicio hace la ejecución más intencional.',
            'After Effects para animación y composición. DaVinci Resolve para edición final, SFX y exportes. La UI del cliente se usó como base visual y se transformó completamente con motion.',
            'Transiciones rápidas y precisas sincronizadas con la música electrónica. Cortes dinámicos y textos en movimiento donde el timing guía completamente la experiencia.',
            'El ritmo y el pacing son tan importantes como la estética. Cuando ambos están bien ejecutados, una pieza pasa de ser buena a memorable.',
          ),
          en: makeContent(
            'Motion graphics for a digital payment platform. With a limited budget, the focus was on taking the existing product UI and elevating it through animation, rhythm, and sound.',
            'Speed, efficiency, and modernity. Everything built around fast electronic music, where each visual element responds directly to the beat.',
            'Moodboards on iPad and a light storyboard before production. Defining the rhythm from the start makes execution more intentional.',
            'After Effects for animation and composition. DaVinci Resolve for final editing, SFX, and exports. The client\'s UI was used as the visual base and completely transformed with motion.',
            'Fast, precise transitions synchronized with electronic music. Dynamic cuts and moving text where timing completely guides the experience.',
            'Rhythm and pacing are just as important as aesthetics. When both are well executed, a piece goes from good to memorable.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'hyperclaw-io',
        name: 'HyperClaw.Io',
        vimeoId: '1175302244',
        vimeoRatio: 'ratio-16-9',
        year: '2023',
        tags: ['After Effects', 'DaVinci Resolve'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Video de motion graphics para una campaña de AI en Twitter, diseñado para comunicar rápido en un entorno de alto scroll con una estética tecnológica y directa.',
            'Captar atención inmediata y comunicar el mensaje en segundos.',
            'Exploración visual con loopboards e iteraciones rápidas basadas en feedback del cliente.',
            'After Effects para animación completa de shapes, texto, morphing y cámara 3D. DaVinci Resolve para sonido y export.',
            'Ritmo rápido y preciso, optimizado para retención en redes.',
            'La claridad gana. En social media, comunicar rápido es más importante que mostrar complejidad.',
          ),
          en: makeContent(
            'Motion graphics video for an AI campaign on Twitter, designed to communicate quickly in a high-scroll environment with a technological and direct aesthetic.',
            'Capture immediate attention and communicate the message in seconds.',
            'Visual exploration with loopboards and rapid iterations based on client feedback.',
            'After Effects for complete animation of shapes, text, morphing, and 3D camera. DaVinci Resolve for sound and export.',
            'Fast and precise rhythm, optimized for social media retention.',
            'Clarity wins. On social media, communicating fast is more important than showing complexity.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'wagmi-markets',
        name: 'Wagmi Markets',
        vimeoId: '1175302343',
        vimeoRatio: 'ratio-16-9',
        year: '2024',
        tags: ['After Effects', 'DaVinci Resolve'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Video de motion graphics para una plataforma de trading, enfocado en transmitir una estética moderna, intensa y confiable, alineada con el lenguaje visual del mundo financiero.',
            'Comunicar dinamismo y confianza, captando atención en segundos dentro de un entorno competitivo como redes sociales.',
            'Estética cinematográfica combinada con lenguaje visual financiero. Colores y composición diseñados para reforzar el contexto de trading: energía, riesgo y control.',
            'After Effects para animación, composición y diseño visual. DaVinci Resolve para sonido, ajustes finales y export.',
            'Ritmo dinámico con influencia cinematográfica. Cortes marcados, transiciones con intención y sincronización con música para generar tensión y energía.',
            'El contexto visual lo es todo. Adaptar referencias externas como el cine puede elevar un proyecto simple a algo con identidad propia.',
          ),
          en: makeContent(
            'Motion graphics video for a trading platform, focused on conveying a modern, intense, and trustworthy aesthetic aligned with the financial world\'s visual language.',
            'Communicate dynamism and confidence, capturing attention in seconds in a competitive environment like social media.',
            'Cinematic aesthetic combined with financial visual language. Colors and composition designed to reinforce the trading context: energy, risk, and control.',
            'After Effects for animation, composition, and visual design. DaVinci Resolve for sound, final adjustments, and export.',
            'Dynamic rhythm with cinematic influence. Marked cuts, intentional transitions, and music synchronization to generate tension and energy.',
            'Visual context is everything. Adapting external references like cinema can elevate a simple project to something with its own identity.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'valleyhub',
        name: 'ValleyHub',
        vimeoId: '1175302610',
        vimeoRatio: 'ratio-16-9',
        year: '2023',
        tags: ['After Effects', 'Photoshop'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Video de motion graphics para Valley Hub, enfocado en comunicar la plataforma a través de una narrativa visual clara, alineada con la identidad de marca y tendencias actuales de animación.',
            'Construir una pieza con storytelling visual que conecte producto, marca y experiencia en un formato dinámico.',
            'Storytelling visual basado en UI con movimiento orgánico y estética alineada a tendencias actuales. La pieza busca sentirse fluida, moderna y coherente con la marca.',
            'After Effects para animación, composición y motion design. Photoshop para preparación y adaptación de UI. DaVinci Resolve para sonido y export final.',
            'Movimientos orgánicos con transiciones suaves pero dinámicas. Ritmo consistente con la identidad visual de la marca.',
            'El storytelling visual hace que el motion deje de ser decorativo y pase a ser funcional.',
          ),
          en: makeContent(
            'Motion graphics video for Valley Hub, focused on communicating the platform through a clear visual narrative aligned with brand identity and current animation trends.',
            'Build a piece with visual storytelling that connects product, brand, and experience in a dynamic format.',
            'Visual storytelling based on UI with organic movement and aesthetics aligned to current trends. The piece aims to feel fluid, modern, and coherent with the brand.',
            'After Effects for animation, composition, and motion design. Photoshop for UI preparation and adaptation. DaVinci Resolve for sound and final export.',
            'Organic movements with smooth but dynamic transitions. Consistent rhythm with the brand\'s visual identity.',
            'Visual storytelling makes motion go from decorative to functional.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'screw-valley-bot',
        name: 'Screw Valley Bot',
        vimeoId: '1175302582',
        vimeoRatio: 'ratio-16-9',
        year: '2024',
        tags: ['After Effects', 'DaVinci Resolve'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Video de motion graphics para un bot de Telegram, enfocado en simular la interacción dentro de la app con una estética moderna y dinámica.',
            'Mostrar el funcionamiento del bot de forma clara y atractiva, replicando la experiencia real de uso dentro de Telegram.',
            'Simulación de chat en tiempo real con estética digital, glitches y gradientes para dar energía visual. Interacción real presentada con estilo moderno.',
            'After Effects para animación de UI, capas 3D y efectos visuales. DaVinci Resolve para sonido y export final.',
            'Ritmo rápido y fluido con transiciones que incluyen glitches. Animación centrada en la interacción del chat.',
            'Simular experiencias reales (como un chat) hace que el producto se entienda al instante.',
          ),
          en: makeContent(
            'Motion graphics video for a Telegram bot, focused on simulating the in-app interaction with a modern and dynamic aesthetic.',
            'Show the bot\'s functionality clearly and attractively, replicating the real user experience inside Telegram.',
            'Real-time chat simulation with digital aesthetic, glitches, and gradients for visual energy. Real interaction presented with a modern style.',
            'After Effects for UI animation, 3D layers, and visual effects. DaVinci Resolve for sound and final export.',
            'Fast and fluid rhythm with glitch transitions. Animation centered on chat interaction.',
            'Simulating real experiences (like a chat) makes the product instantly understandable.',
          ),
          gallery: [],
        },
      },
    ],
  },
  {
    id: '3d-art',
    title: '3D Art',
    projects: [
      {
        slug: 'level-design-unity',
        name: 'Level Design — Unity',
        vimeoId: '1175307968',
        vimeoRatio: 'ratio-custom-47',
        year: '2024',
        tags: ['Unity HDRP', 'Maya', 'Substance Painter', 'Marmoset'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Diseño y desarrollo de un entorno 3D en Unity HDRP, enfocado en la construcción de atmósfera y en un pipeline completo de producción, desde blockout hasta integración final. El proyecto explora cómo la iluminación, el espacio y los materiales trabajan juntos para generar una experiencia inmersiva.',
            'Desarrollar un entorno coherente que mantenga consistencia visual y técnica, transmita una atmósfera de tensión y siga un pipeline completo de producción 3D optimizado para tiempo real.',
            'Construcción de atmósfera a través de iluminación como elemento narrativo principal, composición espacial que guía la exploración y contrastes de luz y sombra para generar tensión. El enfoque está en cómo todos los elementos trabajan en conjunto.',
            'Maya para modelado de assets. Marmoset Toolbag para baking y generación de mapas optimizados. Substance Painter para texturizado y materiales. Unity HDRP para ensamblado, iluminación y postprocesado final.',
            'Iluminación dramática como base de la escena. Uso de fog para generar profundidad y volumen. Composición visual orientada a dirigir la atención del jugador. La atmósfera se construye mediante la interacción de luz, materiales y espacio.',
            'Un buen entorno no se trata solo de assets, sino de cómo se integran dentro de un sistema coherente. Este proyecto refuerza la construcción de atmósferas en tiempo real, el pipeline completo de producción 3D y la toma de decisiones visuales orientadas a experiencia.',
          ),
          en: makeContent(
            '3D environment design and development in Unity HDRP, focused on atmosphere building and a complete production pipeline from blockout to final integration. The project explores how lighting, space, and materials work together to generate an immersive experience.',
            'Develop a coherent environment that maintains visual and technical consistency, conveys a tension-driven atmosphere, and follows a complete 3D production pipeline optimized for real-time.',
            'Atmosphere building through lighting as the main narrative element, spatial composition that guides exploration, and light-shadow contrasts to generate tension. The focus is on how all elements work together.',
            'Maya for asset modeling. Marmoset Toolbag for baking and optimized map generation. Substance Painter for texturing and materials. Unity HDRP for assembly, lighting, and final post-processing.',
            'Dramatic lighting as the base of the scene. Use of fog to generate depth and volume. Visual composition oriented to direct the player\'s attention. Atmosphere is built through the interaction of light, materials, and space.',
            'A good environment is not just about assets, but how they integrate within a coherent system. This project reinforces real-time atmosphere building, a complete 3D production pipeline, and experience-oriented visual decision-making.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'game-ready-prop-art',
        name: 'Game-Ready Prop Art',
        vimeoId: '1175307446',
        vimeoRatio: 'ratio-16-9',
        year: '2024',
        tags: ['ZBrush', 'Marmoset', 'Substance Painter', 'Blender'],
        image: '/assets/images/3d-02/RenderUno.webp',
        video: null,
        caseStudy: {
          es: makeContent(
            'Game-ready 3D prop (tombstone) desarrollado para tiempo real, enfocado en optimización, detalle y consistencia visual para entornos de videojuegos.',
            'Crear un asset optimizado que mantenga alto nivel de detalle visual, sea eficiente para tiempo real y siga un pipeline completo de producción AAA.',
            'Diseño basado en lenguaje visual de props de terror, envejecimiento y desgaste realista, con silueta clara y legible en escena.',
            'ZBrush para sculpt high poly y retopología. Marmoset Toolbag para baking. Substance Painter para texturas PBR. Unity para integración en escena. Blender Cycles para renders finales.',
            'Low poly optimizado para tiempo real con mapas baked (normal, AO, etc.) y materiales PBR consistentes. Asset listo para integración en engine.',
            'Un buen prop no solo se ve bien: funciona bien en engine. Este proyecto refuerza el pipeline completo de Game Ready Prop Art, la optimización con calidad visual y la producción enfocada a videojuegos.',
          ),
          en: makeContent(
            'Game-ready 3D prop (tombstone) developed for real-time, focused on optimization, detail, and visual consistency for video game environments.',
            'Create an optimized asset that maintains high visual detail, is efficient for real-time, and follows a complete AAA production pipeline.',
            'Design based on horror prop visual language, realistic aging and wear, with a clear and readable silhouette in scene.',
            'ZBrush for high poly sculpt and retopology. Marmoset Toolbag for baking. Substance Painter for PBR textures. Unity for scene integration. Blender Cycles for final renders.',
            'Optimized low poly for real-time with baked maps (normal, AO, etc.) and consistent PBR materials. Asset ready for engine integration.',
            'A good prop not only looks good — it works well in engine. This project reinforces the complete Game Ready Prop Art pipeline, optimization with visual quality, and game-focused production.',
          ),
          gallery: [
            '/assets/images/3d-02/RenderUno.webp',
            '/assets/images/3d-02/Rende.webp',
            '/assets/images/3d-02/Rende2.webp',
            '/assets/images/3d-02/Rende3.webp',
            '/assets/images/3d-02/Rende4.webp',
          ],
        },
      },
      {
        slug: 'aesthetic-house-render',
        name: 'Aesthetic House Render',
        year: '2024',
        tags: ['Blender', 'Cycles'],
        image: '/assets/images/3d-03/RoomRenderDay.webp',
        video: null,
        caseStudy: {
          es: makeContent(
            'Render 3D de interior desarrollado en Blender Cycles, enfocado en exploración de iluminación, materiales y atmósfera.',
            'Explorar cómo la luz, reflejos y composición pueden generar una sensación específica dentro de un entorno controlado.',
            'Atmósfera como objetivo principal: iluminación cinematográfica, uso de reflejos y rebotes de luz, y una composición íntima y contemplativa. La escena busca transmitir calma con un ligero tono cinematográfico.',
            'Blender Cycles para modelado, materiales, iluminación y render. Assets principales modelados desde cero.',
            'Iluminación suave con énfasis en rebotes de luz. Reflejos en superficies para profundidad visual. Elementos sutiles como la cortina para dar vida a la escena.',
            'La iluminación define la emoción de una escena más que los modelos en sí.',
          ),
          en: makeContent(
            '3D interior render developed in Blender Cycles, focused on lighting exploration, materials, and atmosphere.',
            'Explore how light, reflections, and composition can generate a specific feeling within a controlled environment.',
            'Atmosphere as the main objective: cinematic lighting, use of reflections and light bounces, and an intimate and contemplative composition. The scene aims to convey calm with a slight cinematic tone.',
            'Blender Cycles for modeling, materials, lighting, and render. Main assets modeled from scratch.',
            'Soft lighting with emphasis on light bounces. Reflections on surfaces for visual depth. Subtle elements like the curtain to bring life to the scene.',
            'Lighting defines the emotion of a scene more than the models themselves.',
          ),
          gallery: [
            '/assets/images/3d-03/RoomRenderDay.webp',
            '/assets/images/3d-03/2ChairDay.webp',
            '/assets/images/3d-03/Cuadrito.webp',
            '/assets/images/3d-03/MArble.webp',
          ],
        },
      },
    ],
  },
  {
    id: 'web',
    title: 'Web',
    projects: [
      {
        slug: 'folio-2025',
        name: 'Folio 2025',
        year: '2025',
        tags: ['React', 'GSAP'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent(
            'Este mismo portafolio — un proyecto de desarrollo creativo que fusiona principios de motion design con ingeniería web moderna.',
            'Construir una experiencia web que comunique la intersección entre diseño y código, no solo una lista de proyectos.',
            'Estudié Awwwards y portafolios de creative developers para identificar patrones que vale la pena conservar y otros que vale la pena romper.',
            'React + Vite para la arquitectura, GSAP para toda la orquestación de animaciones y lógica de scroll personalizada.',
            'Cada transición fue trazada en papel antes de escribir código. Las curvas de timing se iteraron de forma aislada antes de integrarlas.',
            'Un portafolio es un producto. Merece el mismo rigor que cualquier proyecto de cliente.',
          ),
          en: makeContent(
            'This portfolio itself — a creative development project that merges motion design principles with modern web engineering.',
            'Build a web experience that communicates the intersection of design and code, not just a list of projects.',
            'Studied Awwwards and creative developer portfolios to identify patterns worth keeping and others worth breaking.',
            'React + Vite for the architecture, GSAP for all animation orchestration and custom scroll logic.',
            'Every transition was sketched on paper before writing code. Timing curves were iterated in isolation before integrating them.',
            'A portfolio is a product. It deserves the same rigor as any client project.',
          ),
          gallery: [],
        },
      },
      {
        slug: 'web-02',
        name: 'Coming Soon',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent('', '', '', '', '', ''),
          en: makeContent('', '', '', '', '', ''),
          gallery: [],
        },
      },
      {
        slug: 'web-03',
        name: 'Coming Soon',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent('', '', '', '', '', ''),
          en: makeContent('', '', '', '', '', ''),
          gallery: [],
        },
      },
      {
        slug: 'web-04',
        name: 'Coming Soon',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent('', '', '', '', '', ''),
          en: makeContent('', '', '', '', '', ''),
          gallery: [],
        },
      },
      {
        slug: 'web-05',
        name: 'Coming Soon',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent('', '', '', '', '', ''),
          en: makeContent('', '', '', '', '', ''),
          gallery: [],
        },
      },
      {
        slug: 'web-06',
        name: 'Coming Soon',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          es: makeContent('', '', '', '', '', ''),
          en: makeContent('', '', '', '', '', ''),
          gallery: [],
        },
      },
    ],
  },
];

export function getAllProjects() {
  return categories.flatMap((cat) =>
    cat.projects.map((p) => ({
      ...p,
      category: cat.title,
      categoryId: cat.id,
    })),
  );
}

export function getProjectBySlug(slug) {
  for (const cat of categories) {
    const project = cat.projects.find((p) => p.slug === slug);
    if (project) return { ...project, category: cat.title, categoryId: cat.id };
  }
  return null;
}

export function getAdjacentProjects(slug) {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

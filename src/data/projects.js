const makeStudy = (overview, goal, concept, execution, motion, takeaway) => ({
  overview,
  goal,
  process: { concept, execution, motion },
  gallery: [],
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
        year: '2024',
        tags: ['After Effects', 'Davinci Resolve'], // ← ajusta tags
        image: null,
        video: '/assets/videos/motion-01.mp4',
        caseStudy: makeStudy(
          'A motion-driven visual built around kinetic typography and fluid transitions designed to hold attention from the first frame.',
          'Create a fast-paced, visually engaging animation that delivers maximum impact within the first three seconds.',
          'Focused on strong visual hooks — layered type, rhythm, and a single dominant color accent to anchor the eye.',
          'Built in After Effects with Cinema 4D integration, using Redshift for stylised rendering passes.',
          'Timing is everything: every beat and cut was mapped to the audio to create a sense of controlled chaos that still feels intentional.',
          'Pacing and rhythm are as important as aesthetics. Getting both right turns a piece from good to memorable.',
        ),
      },
      {
        slug: 'wagmi-markets',
        name: 'Wagmi Markets',
        year: '2024',
        tags: ['After Effects', 'Davinci Resolve'],
        image: null,
        video: '/assets/videos/motion-02.mp4',
        caseStudy: makeStudy(
          'An audio-reactive animation built around oscillating forms and frequency-driven motion.',
          'Translate raw audio energy into a visual language that feels physical and immersive.',
          'Studied waveform data to define movement arcs, so every pulse felt earned rather than random.',
          'After Effects composited the glow, grain, and type layers.',
          'Slow build-up to a sharp climax — tension and release mirrored the audio curve precisely.',
          'Audio-reactive design rewards patience: the more carefully you map sound to motion, the more visceral the result.',
        ),
      },
      {
        slug: 'sellhub',
        name: 'SellHub',
        year: '2023',
        tags: ['After Effects', 'Illustrator'],
        image: null,
        video: '/assets/videos/motion-03.mp4',
        caseStudy: makeStudy(
          'A neon-soaked loop built for social content with an urban, night-time aesthetic.',
          'Design a seamlessly looping animation optimised for mobile-first social feeds.',
          'Inspired by night photography and light trails — the goal was to make static illustrations feel alive.',
          'All artwork vectorised in Illustrator, then animated entirely in After Effects using shape layer expressions.',
          'The loop point was engineered from the start, ensuring no visible seam on any platform.',
          'Designing for the loop first forces more creative constraints — and constraints usually produce better work.',
        ),
      },
      {
        slug: 'screw-valley-bot',
        name: 'Screw Valley Bot',
        year: '2024',
        tags: ['Cinema 4D', 'Redshift'],
        image: null,
        video: '/assets/videos/motion-04.mp4',
        caseStudy: makeStudy(
          'A 3D looping motion piece exploring planetary motion, scale, and light.',
          'Create a mesmerising loop that could work as an ambient screen or a premium social asset.',
          'References from NASA footage and astrophotography shaped the lighting and material language.',
          'Full 3D scene in Cinema 4D with Redshift physically-based rendering and a custom camera rig.',
          'Speed ramping around the orbit peak adds drama while keeping the overall feel calm and meditative.',
          'Great loops are about inevitability — the viewer should feel the end arriving before it does.',
        ),
      },
      {
        slug: 'valleyhub',
        name: 'ValleyHub',
        year: '2023',
        tags: ['After Effects', 'Photoshop'],
        image: null,
        video: '/assets/videos/motion-05.mp4',
        caseStudy: makeStudy(
          'A typographic experiment exploring fluid, organic motion applied to letterforms.',
          'Push type beyond its static form — make each character feel like it has weight and surface tension.',
          'Tested dozens of displacement and mesh warp configurations before finding the right viscosity feel.',
          'Photoshop generated the displacement maps; After Effects handled animation, compositing, and colour grading.',
          'Slow, deliberate easing — nothing ever snaps; everything oozes into place.',
          'Typography is geometry. Treat it like a physical material and entirely new motion languages emerge.',
        ),
      },
      {
        slug: 'hyperclaw-io',
        name: 'HyperClaw.Io',
        year: '2023',
        tags: ['Blender', 'After Effects'],
        image: null,
        video: '/assets/videos/motion-06.mp4',
        caseStudy: makeStudy(
          'A generative, fractal-driven explosion sequence blending 3D simulation with 2D compositing.',
          'Build a high-energy reveal that feels chaotic but is fully controlled and reproducible.',
          'Studied fractal geometry to ensure the branching patterns felt mathematically authentic.',
          'Blender particle simulations exported as VDB caches, then composited with glow and chromatic aberration in After Effects.',
          'The "burst" moment is held for two frames longer than instinct suggests — that brief pause lets the eye register it.',
          'Simulations give you unpredictability; craft gives you control. The best work lives where both meet.',
        ),
      },
    ],
  },
  {
    id: '3d-art',
    title: '3D Art',
    projects: [
      // ─── Proyecto 1 — carpeta 3d-01 ───────────────────────────────────
      {
        slug: 'color-study',
        name: 'Color Study', // ← cambia al nombre real
        year: '2024',
        tags: ['Cinema 4D', 'Redshift'], // ← ajusta tags
        image: null,
        video: '/assets/videos/3d-01/3d-01.mp4',
        caseStudy: {
          overview:
            'Un estudio de materiales y luz que explora la relación entre color, textura y render fotorrealista.',
          goal: 'Dominar el pipeline de materiales PBR y explorar cómo el color define la percepción de la forma.',
          process: {
            concept:
              'Referencia en fotografía de producto y packaging de lujo para guiar la paleta y la composición.',
            execution:
              'Modelado y materiales en Cinema 4D con Redshift para el render físicamente correcto.',
            motion:
              'Iluminación de tres puntos con un área de luz principal para simular luz de estudio.',
          },
          gallery: [],
          takeaway:
            'El color no es decoración — define materiales, profundidad y emoción en la misma medida que la forma.',
        },
      },
      // ─── Proyecto 2 — carpeta 3d-02 ───────────────────────────────────
      {
        slug: 'render-series',
        name: 'Render Series', // ← cambia al nombre real
        year: '2024',
        tags: ['Blender', 'Cycles'], // ← ajusta tags
        image: '/assets/images/3d-02/RenderUno.webp',
        video: '/assets/videos/3d-02/Turn Lapida 2.mp4',
        caseStudy: {
          overview:
            'Serie de renders explorativos que documentan el proceso de refinamiento de una pieza 3D.',
          goal: 'Entender cómo pequeños cambios de cámara, luz y material transforman completamente la lectura de un objeto.',
          process: {
            concept:
              'Cada render responde a una pregunta específica sobre luz, ángulo o material.',
            execution:
              'Pipeline en Blender con Cycles; cada variante exportada como pase independiente.',
            motion:
              'Sin animación — el movimiento ocurre entre renders, como frames de una historia.',
          },
          gallery: [
            '/assets/images/3d-02/RenderUno.webp',
            '/assets/images/3d-02/Rende.webp',
            '/assets/images/3d-02/Rende2.webp',
            '/assets/images/3d-02/Rende3.webp',
            '/assets/images/3d-02/Rende4.webp',
          ],
          takeaway:
            'Iterar con propósito es más valioso que iterar por volumen. Cada variante debe responder una pregunta.',
        },
      },
      // ─── Proyecto 3 — carpeta 3d-03 ───────────────────────────────────
      {
        slug: 'room-render',
        name: 'Room Render', // ← cambia al nombre real
        year: '2024',
        tags: ['Blender', 'Cycles'], // ← ajusta tags
        image: '/assets/images/3d-03/RoomRenderDay.webp',
        video: null,
        caseStudy: {
          overview:
            'Visualización de un espacio interior que combina luz natural, materiales orgánicos y arquitectura minimalista.',
          goal: 'Crear un ambiente que transmita calma y calidez a través de la luz y los materiales, sin recurrir a decoración excesiva.',
          process: {
            concept:
              'Inspirado en fotografía de arquitectura escandinava — espacio limpio, luz suave, texturas naturales.',
            execution:
              'Escena en Blender con HDRI exterior para la iluminación global y materiales procedurales.',
            motion:
              'Cámara posicionada para maximizar las líneas de perspectiva y la entrada de luz.',
          },
          gallery: [
            '/assets/images/3d-03/RoomRenderDay.webp',
            '/assets/images/3d-03/2ChairDay.webp',
            '/assets/images/3d-03/Cuadrito.webp',
            '/assets/images/3d-03/MArble.webp',
          ],
          takeaway:
            'El espacio vacío es tan importante como los objetos. Saber cuándo no agregar es la decisión más difícil.',
        },
      },
      // ─── Proyecto 4 — carpeta 3d- ──────────────────────────────────────
      {
        slug: 'abstract-series',
        name: 'Abstract Series', // ← cambia al nombre real
        year: '2023',
        tags: ['Cinema 4D', 'Redshift'], // ← ajusta tags
        image: '/assets/images/3d-/image-1.webp',
        video: '/assets/videos/3d-/1.mp4',
        caseStudy: {
          overview:
            'Exploración abstracta de forma y espacio generada a través de múltiples ángulos y variaciones.',
          goal: 'Definir un lenguaje visual propio a través de la experimentación libre, sin restricciones de cliente o brief.',
          process: {
            concept:
              'Sin referencia externa — forma pura derivada de la manipulación directa de la geometría.',
            execution:
              'Cinema 4D para modelado paramétrico; Redshift para el tratamiento de luz y material.',
            motion:
              'Las variaciones se presentan como secuencia, creando una narrativa visual de evolución.',
          },
          gallery: [
            '/assets/images/3d-/image-1.webp',
            '/assets/images/3d-/2-1.webp',
            '/assets/images/3d-/3-1.webp',
            '/assets/images/3d-/4-1.webp',
            '/assets/images/3d-/5-1.webp',
          ],
          takeaway:
            'La exploración sin objetivo produce los descubrimientos más honestos.',
        },
      },
      // ─── Proyecto 5 — MonitoC4D ────────────────────────────────────────
      {
        slug: 'monitor-c4d',
        name: 'Monitor C4D', // ← cambia al nombre real
        year: '2023',
        tags: ['Cinema 4D'], // ← ajusta tags
        image: null,
        video: null,
        caseStudy: {
          overview:
            'Modelado y render de producto de alta fidelidad de un monitor en Cinema 4D.',
          goal: 'Practicar el pipeline completo de modelado hard-surface, UVs y render de producto.',
          process: {
            concept:
              'Referencia directa del objeto real para asegurar proporciones y detalles correctos.',
            execution:
              'Modelado poligonal en Cinema 4D con atención a los bordes y la geometría de soporte.',
            motion:
              'Iluminación de estudio con fondo degradado para resaltar la forma del producto.',
          },
          gallery: [],
          takeaway:
            'El modelado de producto enseña precisión — cada milímetro incorrecto destruye la credibilidad del render.',
        },
      },
      // ─── Proyecto 6 — placeholder (agrega tu propio) ──────────────────
      {
        slug: 'hollow-shell',
        name: 'Coming Soon', // ← reemplaza con tu próximo proyecto
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: 'Próximo proyecto en desarrollo.',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
        },
      },
    ],
  },
  // ── Sección Web — agrega tus proyectos cuando los tengas ──────────────
  {
    id: 'web',
    title: 'Web',
    projects: [
      {
        slug: 'folio-2025',
        name: 'Folio 2025', // ← este mismo portafolio
        year: '2025',
        tags: ['React', 'GSAP'],
        image: null,
        video: null,
        caseStudy: {
          overview:
            'Este mismo portafolio — un proyecto de desarrollo creativo que fusiona principios de motion design con ingeniería web moderna.',
          goal: 'Construir una experiencia web que comunique la intersección entre diseño y código, no solo una lista de proyectos.',
          process: {
            concept:
              'Estudié Awwwards y portafolios de creative developers para identificar patrones que vale la pena conservar y otros que vale la pena romper.',
            execution:
              'React + Vite para la arquitectura, GSAP para toda la orquestación de animaciones y lógica de scroll personalizada.',
            motion:
              'Cada transición fue trazada en papel antes de escribir código. Las curvas de timing se iteraron de forma aislada antes de integrarlas.',
          },
          gallery: [],
          takeaway:
            'Un portafolio es un producto. Merece el mismo rigor que cualquier proyecto de cliente.',
        },
      },
      {
        slug: 'web-02',
        name: 'Próximo Proyecto', // ← reemplaza con tu proyecto web
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: '',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
        },
      },
      {
        slug: 'web-03',
        name: 'Próximo Proyecto',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: '',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
        },
      },
      {
        slug: 'web-04',
        name: 'Próximo Proyecto',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: '',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
        },
      },
      {
        slug: 'web-05',
        name: 'Próximo Proyecto',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: '',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
        },
      },
      {
        slug: 'web-06',
        name: 'Próximo Proyecto',
        year: '2025',
        tags: ['TBD'],
        image: null,
        video: null,
        caseStudy: {
          overview: '',
          goal: '',
          process: { concept: '', execution: '', motion: '' },
          gallery: [],
          takeaway: '',
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

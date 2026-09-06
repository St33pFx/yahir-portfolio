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
        slug: 'keltec-ksg',
        name: 'KelTec KSG',
        featuredRank: 0,
        published: true,
        wip: true,
        year: '2026',
        tags: ['Hard Surface', 'Game Ready', 'Blender', 'Substance Painter', 'Marmoset Toolbag', 'WIP'],
        image: '/assets/images/ksg/ksg-wireframe.jpg',
        mobileImage: '/assets/images/ksg/ksg-wip-cover-mobile.svg',
        socialImage: '/assets/images/og-image.png',
        video: null,
        caseStudy: {
          es: {
            overview: 'Elegí la KSG porque de perfil parecía mucho más simple de lo que realmente es. Grandes paneles, rails, tubos y unas cuantas piezas mecánicas. En cuanto empecé a verla desde otros ángulos, esa idea duró poco. Muchas formas sólo tienen sentido por cómo se solapan entre sí, y pequeños errores de proporción terminan afectando piezas varios centímetros más adelante. Lo que empezó como un ejercicio de hard surface terminó convirtiéndose en mi intento más serio de llevar un asset mecánico complejo por un pipeline completo para tiempo real.',
            sections: [
              {
                title: 'El problema empezó en las referencias',
                body: 'Antes de pelearme con la topología tuve que pelearme con las referencias. Algunas vistas que parecían laterales tenían un ligero giro de cámara. Era suficiente para mostrar caras frontales y traseras que, en una vista ortográfica real, no deberían aparecer. Usarlas directamente me estaba dando información falsa sobre ciertas proporciones. Terminé trabajando con un set de referencias más controlado y usando la longitud real del arma como ancla de escala en Blender.',
              },
              {
                title: 'Blockout → high poly',
                body: 'El blockout fue rápido porque usé booleans y bevels para encontrar la forma sin preocuparme demasiado pronto por una topología bonita. La factura llegó después. Convertir ese blockout en un high poly que se comportara de forma predecible significó revisar pieza por pieza: limpiar donde el shading realmente lo necesitaba, añadir support loops sólo donde aportaban algo y dejar de tratar cada ngon como si automáticamente fuera un problema.',
              },
              {
                title: 'Una línea que no debía estar ahí',
                body: 'En una de las piezas apareció una línea de shading después de triangular una zona que, en teoría, seguía siendo completamente plana. Añadir más geometría a lo bruto no era la solución. El problema estaba en cómo se estaba resolviendo esa superficie. Cambié la distribución conectando un vértice adicional y el artefacto desapareció. Fue una de esas pequeñas broncas que terminan enseñando más que media hora modelando sin problemas.',
              },
              {
                title: 'Low poly',
                body: 'Para el low poly estoy tratando cada pieza según lo que realmente necesita conservar. Las superficies planas pueden ser brutalmente simples; las curvas, la silueta y las intersecciones mecánicas son donde vale la pena gastar geometría. El handle, por ejemplo, quedó en 2,918 tris sin tornillo ni base y 3,386 tris incluyéndolos. No estoy tratando esos números como una meta universal, sino como una consecuencia de lo que esa pieza necesita conservar visualmente.',
              },
              {
                title: 'Lo que sigue en el pipeline',
                body: 'El modelado y el low poly viven en Blender. Cuando cierre geometría vienen UVs, bake y pruebas de normals en Marmoset Toolbag; después texturas PBR en Substance Painter y una presentación final otra vez en Marmoset. Es el plan, pero no voy a fingir que ya llegué ahí: por ahora esta imagen sigue mostrando el estado real del modelo.',
              },
            ],
            takeawayLabel: 'WIP',
            takeaway: 'La KSG todavía está en proceso, así que esta página también. Voy a ir actualizándola conforme el asset avance por low poly, UVs, bake, texturas y presentación final.',
          },
          en: {
            overview: "I picked the KSG because, from the side, it looked much simpler than it actually is. Large panels, rails, tubes and a handful of mechanical pieces. Once I started looking at it from different angles, that idea didn't last long. A lot of its shapes only make sense through the way they overlap, and small proportion mistakes can affect parts much further down the model. What started as a hard-surface exercise eventually became my most serious attempt at taking a complex mechanical asset through a full real-time pipeline.",
            sections: [
              {
                title: 'The reference problem',
                body: "Before fighting the topology, I had to fight the references. Some images that looked like clean side views had a small amount of camera yaw. It was enough to expose front and rear faces that shouldn't exist in a true orthographic view, which made some proportions misleading. I rebuilt the reference setup around cleaner views and used the real overall length as the main scale anchor inside Blender.",
              },
              {
                title: 'Blockout → high poly',
                body: "The blockout came together quickly because I relied on booleans and bevels to find the shapes without worrying too early about beautiful topology. I paid for that speed later. Turning it into a predictable high poly meant going piece by piece: cleaning geometry where shading actually cared, adding support loops only where they earned their place, and learning that an ngon isn't automatically a problem just because it exists.",
              },
              {
                title: "The line that shouldn't be there",
                body: "One small topology change produced a visible shading line across an otherwise flat section. Throwing more geometry at it wasn't the answer. The problem was how the surface was being resolved. I changed the split by connecting an additional vertex and the artifact disappeared. Tiny problem, surprisingly useful lesson.",
              },
              {
                title: 'Low poly',
                body: "The low poly isn't a blind reduction of the high poly. Flat surfaces can be brutally simple. Curved silhouettes and mechanical intersections are where the geometry earns its budget. The handle, for example, currently sits at 2,918 triangles without its screw and base, or 3,386 with them included. I'm treating those as working numbers rather than arbitrary targets.",
              },
              {
                title: 'What comes next',
                body: "The modeling and low poly live in Blender. Once the geometry is locked, the next steps are UVs, baking and normal-map checks in Marmoset Toolbag, followed by PBR texturing in Substance Painter and a final presentation back in Marmoset. That's the plan, not a finished-stage checklist: the image on this page still shows the model exactly where it is today.",
              },
            ],
            takeawayLabel: 'WIP',
            takeaway: "The KSG is still moving, so this page will too. I'll keep updating it as the asset goes through low poly, UVs, baking, texturing and final presentation.",
          },
          gallery: [],
        },
      },
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
        slug: 'folio-2026',
        name: 'Folio 2026',
        year: '2026',
        tags: ['Figma', 'Astro', 'React', 'GSAP', 'Lenis'],
        image: '/assets/images/folio-2026-cover.svg',
        socialImage: '/assets/images/og-image.png',
        video: null,
        caseStudy: {
          es: {
            overview: 'Este sitio empezó como una maqueta bastante ordenada en Figma y terminó convertido en mi laboratorio personal. Aquí junto casi todo lo que hago: dirección visual, código, motion, 3D y esa costumbre de mover algo dos píxeles sólo para regresarlo una hora después. Folio 2026 no intenta parecer una agencia ni vender humo. La idea es más sencilla: que al entrar ya se sienta cómo trabajo antes de leer una sola descripción.',
            goal: 'Quería un portafolio con carácter, pero que siguiera siendo rápido, claro y fácil de recorrer. Si una animación se veía increíble aislada pero estorbaba al navegar, no servía. Si el sitio sólo funcionaba en mi monitor, tampoco.',
            sections: [
              {
                title: 'Del Figma bonito al navegador incómodo',
                body: 'La composición nació en Figma: tipografía enorme, mucho negro, verde ácido y rosa. En el navegador aparecieron las preguntas de verdad. ¿Qué pasa cuando el título cambia de idioma? ¿Dónde cae una tarjeta en una pantalla angosta? ¿Cuánto tarda una entrada antes de que se sienta como una intro que ya quieres saltar? Gran parte del trabajo fue ajustar ritmo y proporciones directamente con el sitio funcionando.',
              },
              {
                title: 'Motion, pero con motivo',
                body: 'GSAP controla la ola inicial, los revelados, los contadores y las pequeñas respuestas al puntero. Lenis suaviza el scroll y se mantiene sincronizado con ScrollTrigger. No quise llenar cada hueco con movimiento: las animaciones importantes son las que presentan una sección, explican un cambio o hacen que tocar algo se sienta bien. El resto sólo hace ruido.',
              },
              {
                title: 'Dos idiomas, la misma voz',
                body: 'La versión en español no es un botón que cambia textos por encima. Tiene rutas propias, metadata propia y cada case study se puede compartir en su idioma. El navegador sugiere la primera entrada, pero después manda la elección de la persona. También reescribí el copy para quitar frases de portafolio prefabricado y dejar una voz que sí usaría fuera de esta página.',
              },
              {
                title: 'Lo que nadie ve también cuenta',
                body: 'Astro genera páginas estáticas para que el contenido llegue rápido y sea legible desde el HTML inicial. React se queda sólo donde hace falta interacción. También hay canonical, hreflang, datos estructurados, sitemap, preview social, navegación por teclado y un modo de movimiento reducido que no deja contenido escondido. No es la parte más llamativa, pero sí la que evita que el sitio se caiga en cuanto sale de la demo.',
              },
              {
                title: 'Todavía se está moviendo',
                body: 'Lo llamo Folio 2026 porque ya no es aquella primera versión y porque tampoco quiero congelarlo como una pieza terminada. Van a cambiar proyectos, imágenes y seguramente alguna decisión que hoy me parece brillante. Esa es parte del punto: este sitio también documenta cómo voy afinando mi criterio.',
              },
            ],
            takeawayLabel: 'La idea',
            takeaway: 'Hacer mi propio portafolio me recordó algo bastante obvio: diseñar la página es fácil; decidir qué merece quedarse es el trabajo de verdad.',
          },
          en: {
            overview: "This site started as a very tidy Figma file and slowly turned into my personal lab. It brings together most of what I do: visual direction, code, motion, 3D, and the bad habit of moving something two pixels only to move it back an hour later. Folio 2026 isn't trying to look like an agency or sell a grand creative manifesto. The goal is simpler: the way I work should be obvious before anyone reads a project description.",
            goal: "I wanted a portfolio with a point of view that was still fast, clear and easy to move through. If an animation looked great on its own but made navigation annoying, it wasn't doing its job. If the layout only worked on my monitor, neither was the layout.",
            sections: [
              {
                title: 'From a tidy Figma file to a messy browser',
                body: 'The visual language started in Figma: oversized type, a lot of black, acid green and pink. The real questions showed up in the browser. What happens when a headline changes language? Where does a card land on a narrow screen? How long can an intro run before it becomes the thing you want to skip? Most of the useful decisions came from tuning rhythm and proportion while using the actual site.',
              },
              {
                title: 'Motion with a reason to be there',
                body: "GSAP runs the opening wave, reveals, counters and small pointer reactions. Lenis handles smooth scrolling and stays synchronized with ScrollTrigger. I didn't want every empty space to move. The animations that stayed either introduce a section, explain a change or make an interaction feel better. Everything else is just noise.",
              },
              {
                title: 'Two languages, one voice',
                body: "Spanish isn't a button that swaps text on top of the English site. It has its own routes, metadata and shareable case-study URLs. The browser suggests a language on the first visit; after that, the visitor's choice wins. I also rewrote the copy to get rid of portfolio filler and keep the kind of voice I would actually use outside this page.",
              },
              {
                title: 'The invisible work still counts',
                body: "Astro generates static pages so the content arrives quickly and is readable in the initial HTML. React only stays where interaction needs it. The site also has canonicals, hreflang, structured data, a sitemap, social previews, keyboard navigation and a reduced-motion mode that never hides the content. It isn't the flashy part, but it is what keeps the site from falling apart outside the demo.",
              },
              {
                title: 'Still moving',
                body: "It's called Folio 2026 because it is no longer that first version, and because I don't want to freeze it as a finished piece. Projects and images will change, and a few decisions that feel brilliant today probably will too. That's part of the point: the site also records how my judgment keeps changing.",
              },
            ],
            takeawayLabel: 'The point',
            takeaway: 'Building my own portfolio reminded me of something obvious: designing the page is easy; deciding what deserves to stay is the actual work.',
          },
          gallery: [
            '/assets/images/folio-2026-cover.svg',
            '/assets/images/folio-2026-system.svg',
            '/assets/images/folio-2026-responsive.svg',
          ],
        },
      },
      {
        slug: 'web-02',
        published: false,
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
        published: false,
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
        published: false,
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
        published: false,
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
        published: false,
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
  return categories
    .flatMap((cat) =>
      cat.projects.map((p) => ({
        ...p,
        category: cat.title,
        categoryId: cat.id,
      })),
    )
    .filter((project) => project.published !== false)
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999));
}

export function getProjectBySlug(slug) {
  for (const cat of categories) {
    const project = cat.projects.find((p) => p.slug === slug);
    if (project && project.published !== false) {
      return { ...project, category: cat.title, categoryId: cat.id };
    }
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

import { useState, useEffect, useRef, useMemo } from "react";

/* ---------------------------------------------------------------
   TOKENS
--------------------------------------------------------------- */
const COLOR = {
  ink: "#1B2430",
  inkDeep: "#141B24",
  inkLine: "#2B3644",
  parchment: "#F3E8D2",
  parchmentDim: "#E4D6B8",
  parchmentPanel: "#EFE2C8",
  ember: "#C1512F",
  emberDim: "#8C3A22",
  sage: "#7A9770",
  sageDim: "#4F6647",
  textLight: "#F5EFE0",
  textMuted: "#9AA3B2",
  textInk: "#2A2115",
  textInkMuted: "#6B5F4D",
};

const FONT_LINK_ID = "storytelling-course-fonts";

/* ---------------------------------------------------------------
   DATA
--------------------------------------------------------------- */
const PHASES = [
  {
    id: "fase-1",
    number: 1,
    title: "Los cimientos del relato",
    description:
      "Por qué contar historias funciona mejor que solo informar, y dónde está el límite entre relato y verdad.",
    modules: [
      {
        id: 1,
        title: "Storytelling en los procesos comunicativos",
        weeks: 1,
        hours: 2,
        description:
          "Qué es el storytelling, en qué se diferencia de la transmisión de información pura, y en qué contextos aporta más valor.",
        content: [
          {
            heading: "Qué es (y qué no es) storytelling",
            body: "Storytelling no es simplemente \"contar cosas de forma amena\": es organizar la información alrededor de un personaje, un deseo y un obstáculo, de modo que quien escucha pueda seguir una transformación en el tiempo. Un informe enumera hechos; una historia los conecta mediante causa y consecuencia. Esa diferencia estructural —causalidad frente a acumulación— es lo que separa datos de relato, y es la primera distinción que hay que interiorizar antes de aplicar cualquier técnica narrativa.",
          },
          {
            heading: "Tres niveles de storytelling",
            body: "Conviene distinguir tres capas que se suelen confundir. El nivel del mensaje es el hecho puntual que se quiere comunicar (\"lanzamos un producto\"). El nivel del relato es la secuencia con personaje, obstáculo y transformación que envuelve ese mensaje. El nivel del universo narrativo es el conjunto de personajes, valores y símbolos recurrentes que una persona, marca o institución construye a lo largo del tiempo (su \"mitología\" particular). Un mensaje aislado puede narrativizarse puntualmente, pero el storytelling más potente aparece cuando ese relato encaja además dentro de un universo narrativo coherente y reconocible.",
          },
          {
            heading: "La base cognitiva: transporte narrativo",
            body: "La investigación en psicología cognitiva describe un fenómeno llamado \"transporte narrativo\": cuando una historia está bien construida, quien la escucha reduce temporalmente su distancia crítica y se \"traslada\" mentalmente a la situación descrita, simulando emociones y perspectivas del personaje. Ese estado de inmersión es lo que explica por qué el contenido narrativo se retiene con más fuerza y durante más tiempo que una lista de datos: no se limita a almacenar información, genera una experiencia simulada de esa información.",
          },
          {
            heading: "Storytelling y argumentación no compiten, se complementan",
            body: "En términos clásicos de retórica, un argumento se apoya en logos (la lógica del dato), pero rara vez mueve a la acción si no incorpora también ethos (la credibilidad de quien habla) y pathos (la conexión emocional). El storytelling es, sobre todo, el vehículo natural de ethos y pathos: humaniza a quien comunica y genera implicación emocional, sin que eso obligue a renunciar al rigor de logos. La habilidad que se entrena en este módulo es decidir, mensaje a mensaje, qué proporción de cada uno necesita el objetivo comunicativo concreto.",
          },
          {
            heading: "Dónde aporta más valor: un mapa de usos",
            body: "El storytelling rinde de forma distinta según el contexto. En liderazgo de equipos, ancla la visión en ejemplos concretos en lugar de eslóganes abstractos. En comunicación de marca, construye reconocimiento y diferenciación a largo plazo. En docencia, mejora la retención de conceptos abstractos al vincularlos a situaciones narrables. En ventas consultivas y negociación, reduce la resistencia inicial del interlocutor al no presentarse como un argumento a rebatir. En procesos de cambio organizativo, ayuda a que las personas afectadas entiendan el \"por qué\" del cambio, no solo el \"qué\". Reconocer en qué contexto se está operando ayuda a calibrar cuánta narrativa conviene emplear.",
          },
          {
            heading: "Errores frecuentes al empezar",
            body: "Los errores más comunes al introducirse en el storytelling son: construir un relato sin ningún obstáculo real (una historia \"plana\" no genera tensión ni interés), convertir al propio emisor en protagonista cuando el protagonista debería ser la audiencia o su cliente, y moralizar de forma explícita al final (\"la moraleja es...\") en lugar de dejar que la transformación mostrada hable por sí sola. Evitar estos tres errores mejora de inmediato la eficacia de cualquier mensaje narrativo, incluso antes de dominar técnicas más avanzadas.",
          },
        ],
        tags: ["storytelling", "comunicación", "persuasión", "narrativa aplicada"],
        objectives: [
          "Definir qué es storytelling y diferenciarlo de la mera transmisión de información.",
          "Identificar los elementos que hacen del relato una herramienta comunicativa más eficaz que otros formatos.",
          "Reconocer contextos profesionales, educativos y comerciales donde el storytelling añade valor.",
        ],
        resources: [
          "Simmons, A. — The Story Factor (caps. 1-2)",
          "Gottschall, J. — The Storytelling Animal (introducción)",
          "TED Talk de Nancy Duarte, \"The secret structure of great talks\"",
          "Artículo de HBR de Paul Zak, \"Why Your Brain Loves Good Storytelling\"",
        ],
        activity:
          "Tomar un mensaje corporativo o informativo real y reescribirlo en formato narrativo, comparando el efecto de ambas versiones.",
        evaluation: {
          instrument:
            "Autoevaluación mediante checklist sobre el mensaje reescrito. Se considera superado si se responde \"sí\" a al menos cuatro de los cinco criterios.",
          criteria: [
            "¿Hay un personaje identificable, y no solo \"la empresa\" o \"los datos\" como sujeto?",
            "¿Aparece un obstáculo o tensión real, no solo información neutra?",
            "¿Se percibe una transformación clara entre el inicio y el final del mensaje?",
            "¿El dato o hecho original sigue siendo reconocible y verificable dentro del relato?",
            "¿Alguien que lo escuchara podría resumirlo de memoria 24 horas después?",
          ],
        },
      },
      {
        id: 2,
        title: "Verdad, falsedad y ficción: el pensamiento narrativo",
        weeks: 1,
        hours: 2,
        description:
          "Los límites entre verdad factual, verosimilitud y ficción, y las implicaciones éticas de usar la narrativa con fines persuasivos.",
        content: [
          {
            heading: "Dos modos de pensamiento",
            body: "El psicólogo Jerome Bruner distinguió el pensamiento paradigmático (lógico, basado en pruebas, categorías y relaciones causales generalizables) del pensamiento narrativo (basado en intenciones humanas, particularidad y secuencia temporal). No son rivales ni uno es \"superior\" al otro: son dos formas distintas de dar sentido a la realidad, útiles en contextos distintos. Un informe técnico pide predominantemente pensamiento paradigmático; una charla motivacional o un caso de estudio piden predominantemente pensamiento narrativo. La comunicación eficaz reconoce en qué modo está pensando su audiencia y se adapta.",
          },
          {
            heading: "Verosimilitud no es lo mismo que verdad",
            body: "Un relato puede ser verosímil —coherente, creíble, bien construido internamente— sin ser factualmente exacto, y puede ser factualmente exacto sin resultar verosímil si está mal narrado o carece de contexto. Esta distinción, procedente de la teoría literaria clásica, es la base para usar el storytelling con honestidad: la construcción narrativa debe estar siempre al servicio de representar mejor la veracidad de los hechos, nunca sustituirla ni maquillarla.",
          },
          {
            heading: "El sesgo narrativo: ver causas donde hay azar",
            body: "El ser humano tiende a imponer estructuras de causa-efecto incluso sobre sucesos que fueron, en gran medida, resultado del azar o de múltiples factores no relacionados. Este fenómeno, descrito en la literatura sobre sesgos cognitivos como \"falacia narrativa\", explica por qué resulta tan fácil —y tan tentador— construir relatos simples y convincentes sobre por qué algo ocurrió, aunque la explicación real sea más compleja o incierta. Ser consciente de este sesgo es una salvaguarda ética: ayuda a no presentar como \"la historia de por qué funcionó\" lo que en realidad fue una simplificación cómoda.",
          },
          {
            heading: "La función social del relato compartido",
            body: "Sociedades, organizaciones y equipos se cohesionan alrededor de relatos comunes: la historia fundacional de una empresa, el relato de \"cómo llegamos hasta aquí\" de un equipo, la narrativa de identidad de un colectivo. Ese relato compartido no es \"falso\": es una forma de dar sentido colectivo a hechos dispersos, seleccionando qué se recuerda y en qué orden. El riesgo aparece cuando ese relato se usa para ocultar información relevante o distorsionar responsabilidades, en vez de para dar sentido genuino a lo ocurrido.",
          },
          {
            heading: "No ficción narrativa: el terreno intermedio",
            body: "Entre el informe puramente factual y la ficción declarada existe un territorio amplio y legítimo: el periodismo narrativo, la biografía, el caso de estudio empresarial o el storytelling corporativo basado en hechos reales pero organizados narrativamente. En todos estos formatos la regla es la misma: se puede seleccionar, ordenar y dar ritmo a los hechos, pero no inventarlos ni omitir deliberadamente lo que cambiaría la interpretación de quien escucha.",
          },
          {
            heading: "Un test práctico para el límite ético",
            body: "Una forma sencilla de comprobar si un relato persuasivo se mantiene dentro de límites honestos es preguntarse: si la audiencia conociera toda la información que se ha omitido o simplificado, ¿tomaría una decisión distinta? Si la respuesta es sí, el relato está cruzando la línea entre dramatizar una realidad (legítimo) y falsear una realidad mediante la dramatización (no legítimo), y conviene revisar qué se está dejando fuera antes de comunicarlo.",
          },
        ],
        tags: ["pensamiento narrativo", "verdad", "ficción", "ética de la persuasión"],
        objectives: [
          "Diferenciar verdad factual, verosimilitud narrativa y ficción.",
          "Analizar el papel del pensamiento narrativo en la construcción de creencias y decisiones.",
          "Valorar las implicaciones éticas del uso de la ficción con fines persuasivos.",
        ],
        resources: [
          "Harari, Y. N. — Sapiens (capítulo sobre el \"mito cognitivo\")",
          "Bruner, J. — Actual Minds, Possible Worlds",
          "Artículo sobre psicología narrativa (narrative psychology)",
          "Documental o podcast sobre desinformación y storytelling político",
        ],
        activity:
          "Analizar un caso real identificando qué partes son datos verificables, cuáles son interpretación narrativa y si hay manipulación éticamente cuestionable.",
        evaluation: {
          instrument:
            "Cuestionario de autoevaluación sobre el caso analizado, más una reflexión escrita breve (300 palabras) que responda explícitamente a los cuatro criterios siguientes.",
          criteria: [
            "¿He identificado con precisión qué partes del caso eran datos verificables y cuáles interpretación narrativa?",
            "¿He señalado al menos una omisión o simplificación relevante en cómo se contaba el caso?",
            "¿Mi análisis se centra en el mecanismo narrativo usado, evitando juicios morales genéricos sin argumentar?",
            "¿He aplicado el test del módulo: si la audiencia conociera lo omitido, ¿tomaría una decisión distinta?",
          ],
        },
      },
    ],
  },
  {
    id: "fase-2",
    number: 2,
    title: "La arquitectura de la historia",
    description: "Las herramientas estructurales para construir un relato desde cero.",
    modules: [
      {
        id: 3,
        title: "Principios básicos de narrativa. La construcción del relato",
        weeks: 2,
        hours: 3,
        description:
          "Los elementos estructurales de todo relato (personaje, conflicto, tensión, resolución) y la estructura clásica en tres actos.",
        content: [
          {
            heading: "Los cuatro elementos mínimos de un relato",
            body: "Todo relato, por breve que sea, necesita cuatro piezas: un personaje con quien identificarse, un deseo o meta que persigue, un obstáculo que se lo impide, y una transformación que resulta de enfrentarlo. Si falta cualquiera de estas cuatro piezas, lo que queda es una descripción o una lista de sucesos, no una historia. Antes de escribir cualquier mensaje narrativo conviene identificar explícitamente estos cuatro elementos: si no se pueden nombrar con claridad, la historia todavía no está lista.",
          },
          {
            heading: "La estructura en tres actos, con proporciones orientativas",
            body: "Planteamiento, nudo y desenlace no son solo tres bloques: tienen un peso relativo. Como referencia orientativa, el planteamiento ocupa en torno a un cuarto del relato (se presenta al personaje, su mundo y el detonante que rompe el equilibrio inicial), el nudo ocupa aproximadamente la mitad (el personaje persigue su meta enfrentando obstáculos crecientes, con un punto medio donde algo cambia irreversiblemente su situación) y el desenlace ocupa el cuarto restante (se resuelve la tensión y se hace visible la transformación). Estas proporciones no son una regla rígida, pero sirven para detectar desequilibrios frecuentes, como nudos demasiado breves o desenlaces que se alargan sin necesidad.",
          },
          {
            heading: "Tipos de conflicto",
            body: "El conflicto no tiene que ser un enfrentamiento dramático. Puede ser interno (una duda, un miedo, una decisión difícil), interpersonal (un desacuerdo con otra persona o equipo) o contra el entorno o el sistema (una limitación de recursos, una normativa, una resistencia estructural al cambio). Identificar de qué tipo es el conflicto que se quiere narrar ayuda a elegir qué detalles incluir: un conflicto interno pide mostrar pensamiento y duda; un conflicto contra el sistema pide mostrar obstáculos concretos y decisiones bajo presión.",
          },
          {
            heading: "Punto de vista y voz narrativa",
            body: "Quién cuenta la historia condiciona cómo se recibe. Narrar en primera persona como protagonista genera mayor cercanía e implicación emocional directa; narrar en tercera persona, o como testigo de la historia de otra persona, permite mayor distancia y credibilidad percibida (útil, por ejemplo, al contar el caso de un cliente o un compañero). Ninguna opción es mejor en abstracto: la elección depende de si el objetivo es generar identificación inmediata o credibilidad observacional.",
          },
          {
            heading: "El gancho: capturar atención desde el primer instante",
            body: "La mayoría de la atención de una audiencia se decide en los primeros segundos. Un buen gancho plantea de inmediato una pregunta implícita que solo se resuelve siguiendo la historia: presentar al personaje en mitad de una tensión ya activa, formular una pregunta directa, o mostrar un contraste llamativo entre expectativa y realidad. Empezar por el contexto o los antecedentes, en cambio, es la forma más habitual de perder a la audiencia antes de que la historia arranque.",
          },
          {
            heading: "Ritmo y economía narrativa",
            body: "No todos los detalles de una historia real merecen contarse. La economía narrativa consiste en incluir solo los elementos que hacen avanzar el conflicto o profundizan en el personaje, y eliminar el resto, por interesante que parezca. Un relato con demasiado detalle irrelevante diluye la tensión; un relato bien editado mantiene el ritmo y hace que cada frase aporte algo a la meta, el obstáculo o la transformación.",
          },
        ],
        tags: ["estructura narrativa", "tres actos", "conflicto", "construcción del relato"],
        objectives: [
          "Identificar los elementos estructurales de un relato: personaje, conflicto, tensión, resolución.",
          "Aplicar la estructura clásica planteamiento-nudo-desenlace a un mensaje comunicativo.",
          "Distinguir estructura narrativa de estructura argumentativa.",
        ],
        resources: [
          "McKee, R. — Story: Substance, Structure, Style and the Principles of Screenwriting",
          "Truby, J. — The Anatomy of Story",
          "Recurso audiovisual sobre estructura narrativa aplicada a comunicación corporativa",
        ],
        activity:
          "Diseñar el esqueleto narrativo (personaje, conflicto, resolución) de un mensaje propio usando una plantilla de tres actos.",
        evaluation: {
          instrument:
            "Checklist de autoevaluación sobre el esqueleto narrativo diseñado, revisando presencia y calidad de cada elemento estructural.",
          criteria: [
            "¿Personaje, meta, obstáculo y transformación están los cuatro presentes y son identificables por separado?",
            "¿Las proporciones aproximadas de planteamiento, nudo y desenlace están razonablemente equilibradas (ni un nudo casi inexistente ni un desenlace interminable)?",
            "¿El tipo de conflicto (interno, interpersonal, contra el sistema) está claro y es coherente con el resto del relato?",
            "¿Las primeras frases funcionan como gancho, o el relato tarda demasiado en plantear la tensión?",
            "¿Se ha eliminado el detalle que no aporta al conflicto, la meta o la transformación?",
          ],
        },
      },
      {
        id: 4,
        title: "El viaje del héroe",
        weeks: 2,
        hours: 3,
        description:
          "El monomito de Campbell y su adaptación por Vogler, aplicados al diseño de mensajes y presentaciones.",
        content: [
          {
            heading: "El monomito de Campbell",
            body: "Joseph Campbell observó que mitos de culturas muy distintas y sin contacto entre sí comparten un mismo patrón narrativo profundo: un héroe recibe una llamada a la aventura, cruza un umbral hacia lo desconocido, atraviesa pruebas, obtiene una recompensa y regresa transformado para compartirla con su comunidad. A ese patrón universal lo llamó el monomito, o \"viaje del héroe\", y su persistencia across culturas sugiere que responde a una estructura psicológica profunda de cómo entendemos el crecimiento personal.",
          },
          {
            heading: "Las doce etapas de Vogler",
            body: "El guionista Christopher Vogler adaptó el esquema de Campbell en doce etapas prácticas: (1) mundo ordinario, (2) llamada a la aventura, (3) rechazo inicial de la llamada, (4) encuentro con un mentor, (5) cruce del primer umbral, (6) pruebas, aliados y enemigos, (7) acercamiento a la \"cueva más profunda\" (el mayor reto), (8) prueba suprema u ordalía, (9) recompensa, (10) camino de vuelta, (11) resurrección o transformación final, y (12) regreso con el elixir, el aprendizaje que se comparte con la comunidad de origen. No todas las historias necesitan las doce etapas explícitas, pero conocerlas permite detectar qué falta cuando un relato de cambio personal o profesional se siente incompleto.",
          },
          {
            heading: "Los arquetipos que acompañan al héroe",
            body: "Junto al héroe aparecen roles recurrentes: el mentor (aporta sabiduría o herramientas), el guardián del umbral (pone a prueba antes de permitir el avance), el heraldo (anuncia el cambio inminente), la figura cambiante (aliado cuya lealtad es ambigua), la sombra (el antagonista u obstáculo mayor) y el embaucador (introduce el humor o la disrupción). Identificar estos roles en una historia propia —quién es el mentor real de un proceso de aprendizaje, quién actúa como guardián del umbral en un proyecto— ayuda a estructurar mejor quién aporta qué función dentro del relato.",
          },
          {
            heading: "Aplicaciones fuera de la ficción",
            body: "El viaje del héroe describe, en esencia, cualquier proceso de cambio. En storytelling de marca, el cliente es el héroe y la marca ocupa el rol de mentor, no de protagonista. En un discurso de liderazgo, el propio orador puede narrar su trayectoria situándose como héroe que atravesó pruebas concretas. En la narración de una trayectoria profesional propia (por ejemplo, en una entrevista o una candidatura), la estructura ayuda a mostrar no solo logros sino el proceso de superación que los explica. En gestión del cambio organizativo, el esquema es útil para comunicar por qué un cambio incómodo (cruce del umbral) es necesario antes de llegar a la recompensa.",
          },
          {
            heading: "El riesgo de forzar la plantilla",
            body: "Aplicado de forma mecánica, el viaje del héroe puede sonar artificial o inflado, especialmente en contextos profesionales donde el \"héroe\" corre el riesgo de sonar autocomplaciente. Su valor no está en marcar las doce casillas de manera literal, sino en usarlo como lente diagnóstica: ¿hay una llamada a la aventura clara? ¿hay un momento de aprendizaje reconocible? ¿se muestra realmente la transformación, o solo el punto de partida y el de llegada, sin el proceso intermedio que le da credibilidad?",
          },
          {
            heading: "Variantes: el viaje no lineal y el viaje colectivo",
            body: "No todos los relatos de transformación son lineales ni individuales. Existen estructuras de \"viaje colectivo\", donde varios personajes atraviesan pruebas paralelas hacia una meta compartida (útil para narrar la transformación de un equipo entero), y estructuras no lineales, donde el relato empieza por el regreso o la recompensa y retrocede para explicar cómo se llegó hasta ahí, generando intriga desde el inicio. Ambas variantes son útiles cuando el viaje del héroe clásico, en su forma más literal, resulta demasiado rígido para el caso concreto que se quiere comunicar.",
          },
        ],
        tags: ["viaje del héroe", "monomito", "estructura narrativa", "storytelling de marca"],
        objectives: [
          "Describir las etapas del monomito de Campbell y su adaptación por Vogler.",
          "Aplicar la estructura del viaje del héroe al diseño de un mensaje o presentación.",
          "Analizar ejemplos reales que usan esta estructura.",
        ],
        resources: [
          "Campbell, J. — El héroe de las mil caras",
          "Vogler, C. — El viaje del escritor",
          "Análisis de campañas publicitarias construidas sobre el viaje del héroe",
        ],
        activity:
          "Mapear el viaje del héroe sobre una historia de marca, un caso profesional propio o una campaña institucional.",
        evaluation: {
          instrument:
            "Autoevaluación guiada recorriendo las etapas del viaje aplicadas al caso mapeado (o evaluación por pares si el curso es grupal).",
          criteria: [
            "¿El \"mundo ordinario\" de partida está descrito con suficiente contraste respecto a lo que viene después?",
            "¿La llamada a la aventura y, si existe, el rechazo inicial, quedan claros?",
            "¿Hay un mentor o una fuente de aprendizaje identificable, y no solo el héroe actuando en solitario?",
            "¿La prueba central (la ordalía) se muestra con el esfuerzo o el riesgo real que implicó, no solo se menciona de pasada?",
            "¿La transformación final y el \"elixir\" —lo que se comparte con la comunidad de origen— quedan explícitos al cierre?",
          ],
        },
      },
    ],
  },
  {
    id: "fase-3",
    number: 3,
    title: "Storytelling estratégico",
    description: "Convertir datos y objetivos comunicativos concretos en relatos eficaces.",
    modules: [
      {
        id: 5,
        title: "Conexión emocional y persuasión. Del dato al relato",
        weeks: 2,
        hours: 3,
        description:
          "Los mecanismos emocionales que activa una narración frente a un dato aislado, y cómo transformar información técnica en relato.",
        content: [
          {
            heading: "Por qué un dato aislado no mueve a la acción",
            body: "Una cifra, por impactante que sea, describe una realidad pero no la hace tangible: no da a quien escucha nada con lo que identificarse. La investigación sobre el llamado \"efecto de la víctima identificable\" muestra que las personas responden con más empatía y disposición a actuar ante el caso concreto de un único individuo reconocible que ante una estadística que representa a miles, incluso cuando la estadística implica una magnitud de sufrimiento mucho mayor. Esto no es un defecto a eliminar, sino un mecanismo psicológico a tener en cuenta al diseñar cualquier mensaje que busque movilizar, no solo informar.",
          },
          {
            heading: "Del dato al relato: la técnica en cuatro pasos",
            body: "El procedimiento tiene cuatro pasos. Primero, elegir un caso concreto y representativo dentro del agregado estadístico (no una excepción disfrazada de norma). Segundo, anclar ese caso en un momento y una situación específicos, con suficiente detalle para que resulte vívido. Tercero, mostrar un antes y un después reconocibles, de modo que la transformación quede clara. Cuarto, cerrar reconectando explícitamente ese caso concreto con el dato agregado que representa, para que la audiencia entienda que la historia ilustra una tendencia real y no es un caso aislado y anecdótico.",
          },
          {
            heading: "El equilibrio entre rigor y relato",
            body: "El objetivo no es sustituir la evidencia por anécdotas, sino usar el relato como puerta de entrada al dato. Un mensaje eficaz suele abrir con la historia para captar atención y conexión emocional, y sostener después el argumento con las cifras agregadas, de modo que ambos se refuercen: la historia da memorabilidad, el dato da solidez y escala. Omitir el dato agregado después de contar el caso concreto deja el mensaje vulnerable a la objeción de que \"un caso no demuestra nada\".",
          },
          {
            heading: "El arco emocional dentro del propio mensaje",
            body: "La conexión emocional no depende solo de contar una historia al principio: también se construye gestionando la tensión a lo largo de todo el mensaje, no solo en una anécdota inicial. Una presentación eficaz suele alternar momentos de mayor carga emocional (el caso concreto, un contraste llamativo) con momentos de mayor carga informativa (los datos que sostienen el argumento), en vez de concentrar toda la emoción al principio y dejar el resto en tono plano.",
          },
          {
            heading: "La especificidad como palanca de memorabilidad",
            body: "Los detalles concretos y ligeramente inesperados —un nombre, un lugar, una cifra exacta en lugar de redondeada, un objeto tangible— se recuerdan mucho mejor que las afirmaciones genéricas. No se trata de añadir detalles decorativos, sino de sustituir generalidades (\"muchas familias se vieron afectadas\") por especificidad verificable (una familia, un lugar, un momento concretos) que sigue siendo representativa del fenómeno agregado que se quiere comunicar.",
          },
          {
            heading: "El riesgo de la manipulación emocional",
            body: "Igual que en el módulo 2, aquí conviene vigilar la línea entre emocionar para conectar y emocionar para evitar el análisis crítico. Una señal de alerta es cuando el relato se diseña deliberadamente para que la audiencia decida antes de poder cuestionar el dato que lo sustenta, o cuando se elige un caso extremo y poco representativo precisamente porque genera más impacto emocional que uno típico. Un relato que impide a la audiencia hacerse preguntas legítimas ha dejado de ser una herramienta de comunicación honesta.",
          },
        ],
        tags: ["persuasión", "emoción", "storytelling de datos", "comunicación técnica"],
        objectives: [
          "Explicar los mecanismos emocionales que activa una narración frente a un dato aislado.",
          "Transformar datos o argumentos técnicos en relatos con carga emocional.",
          "Evaluar el equilibrio entre rigor informativo y atractivo narrativo.",
        ],
        resources: [
          "Heath, C. & Heath, D. — Made to Stick",
          "Duarte, N. — Resonate: Present Visual Stories that Transform Audiences",
          "Investigación de Paul Zak sobre oxitocina y narrativa",
        ],
        activity:
          "Convertir un informe de datos o presentación técnica propia en un relato breve (\"de dato a relato\"), sin perder precisión informativa.",
        evaluation: {
          instrument:
            "Autoevaluación con escala tipo Likert (1 = nada, 5 = totalmente) sobre el relato \"de dato a relato\" resultante, puntuando cada criterio por separado.",
          criteria: [
            "Claridad emocional: ¿el caso concreto elegido genera identificación real, más allá del dato que ilustra?",
            "Precisión: ¿el dato agregado original sigue siendo reconocible y no se ha distorsionado al narrativizarlo?",
            "Representatividad: ¿el caso elegido es típico del fenómeno, no una excepción escogida por su impacto?",
            "Cierre: ¿el relato reconecta explícitamente el caso concreto con el dato agregado al final?",
            "Especificidad: ¿hay al menos un detalle concreto y verificable (nombre, lugar, cifra exacta) en lugar de generalidades?",
          ],
        },
      },
      {
        id: 6,
        title: "Tipología de patrones narrativos según su finalidad",
        weeks: 1,
        hours: 2,
        description:
          "Clasificación de los principales patrones narrativos y cómo elegir el más adecuado según el objetivo comunicativo.",
        content: [
          {
            heading: "Por qué clasificar patrones narrativos",
            body: "No todas las historias persiguen lo mismo. Un relato pensado para vender no tiene la misma arquitectura que uno pensado para inspirar o para advertir de un riesgo. Conocer los patrones disponibles permite elegir el molde narrativo adecuado en vez de improvisar una estructura genérica para cualquier objetivo, y facilita también reconocer con rapidez qué patrón está usando otra persona cuando comunica.",
          },
          {
            heading: "Los siete argumentos básicos",
            body: "El crítico literario Christopher Booker propuso que la mayoría de relatos, más allá de su contenido superficial, se pueden agrupar en un número reducido de argumentos base: vencer al monstruo (superar una amenaza externa), de la pobreza a la riqueza (ascenso desde una carencia), la búsqueda (perseguir un objetivo a través de un viaje), viaje y regreso (adentrarse en lo desconocido y volver transformado), comedia (un enredo que se resuelve en armonía), tragedia (una caída provocada por un error o defecto propio) y renacimiento (una redención tras un periodo de estancamiento u oscuridad). Reconocer estos patrones amplía el repertorio disponible más allá de la superación y la transformación.",
          },
          {
            heading: "Cinco patrones frecuentes en comunicación profesional",
            body: "En contextos de comunicación aplicada, cinco patrones aparecen con especial frecuencia: superación (un personaje enfrenta y vence una limitación: útil para motivar), transformación (un cambio de perspectiva o identidad: útil para procesos de cambio), conexión o pertenencia (un grupo se reconoce en una experiencia común: útil para cultura y comunidad), descubrimiento (una idea nueva resuelve un problema: útil para innovación) y advertencia (las consecuencias de no actuar: útil para prevención y gestión de riesgos, si se calibra bien para no caer en el alarmismo).",
          },
          {
            heading: "Elegir el patrón según la finalidad",
            body: "La pregunta que guía la elección no es \"qué historia tengo\", sino \"qué quiero que la audiencia sienta y haga después de escucharla\". Vender pide con frecuencia superación o transformación (el cliente pasa de un problema a una solución); educar pide descubrimiento; cohesionar un equipo pide conexión; prevenir un error pide advertencia bien calibrada; justificar una decisión difícil puede apoyarse en la estructura de tragedia evitada (\"esto es lo que habría pasado si no hubiéramos actuado\").",
          },
          {
            heading: "Un mismo hecho, distintos patrones",
            body: "Un mismo hecho real puede narrarse con patrones distintos según el objetivo. El lanzamiento fallido de un producto puede contarse como superación (cómo el equipo lo remontó), como advertencia (qué se debe evitar la próxima vez), como transformación (qué aprendió la organización sobre sí misma) o incluso como comedia (los enredos que llevaron al fallo, contados con humor autocrítico en un contexto interno distendido). Elegir el patrón es, en el fondo, elegir qué versión de la historia es más útil para la audiencia concreta y el momento concreto.",
          },
          {
            heading: "Combinar patrones y errores frecuentes",
            body: "Los relatos más largos —una presentación completa, un discurso— rara vez usan un único patrón de principio a fin: pueden abrir con advertencia para justificar la urgencia y cerrar con superación para mostrar el camino de salida. El error más frecuente al trabajar con patrones es forzar un patrón inspirador (superación, transformación) sobre un hecho que en realidad pide honestidad más cruda (una advertencia, incluso una tragedia reconocida), lo que produce un relato que suena artificialmente optimista y pierde credibilidad.",
          },
        ],
        tags: ["patrones narrativos", "tipología", "finalidad comunicativa", "storytelling estratégico"],
        objectives: [
          "Clasificar los principales patrones narrativos (superación, transformación, conexión, creatividad...).",
          "Seleccionar el patrón más adecuado según el objetivo comunicativo: informar, vender, inspirar, educar.",
          "Diseñar un mensaje justificando el patrón narrativo elegido.",
        ],
        resources: [
          "Simmons, A. — tipología de historias en The Story Factor",
          "Guber, P. — Tell to Win",
          "Casos de estudio de ONG, marcas y discursos políticos por patrón narrativo",
        ],
        activity:
          "Elegir tres finalidades comunicativas distintas y redactar un microrrelato de 100 palabras aplicando el patrón más adecuado a cada una.",
        evaluation: {
          instrument:
            "Checklist de coherencia entre finalidad comunicativa y patrón narrativo elegido, aplicado a cada uno de los tres microrrelatos.",
          criteria: [
            "¿La finalidad comunicativa (informar, vender, inspirar, educar, advertir...) estaba definida antes de elegir el patrón, y no al revés?",
            "¿El patrón elegido para cada microrrelato está justificado por escrito, explicando por qué encaja mejor que otro?",
            "¿Se ha descartado explícitamente al menos un patrón alternativo, razonando por qué no era el más adecuado?",
            "¿El tono del microrrelato es coherente con el patrón elegido (por ejemplo, no mezclar un tono de comedia con una finalidad de advertencia seria)?",
          ],
        },
      },
    ],
  },
  {
    id: "fase-4",
    number: 4,
    title: "El relato como legado cultural",
    description: "El storytelling a gran escala: historias que han cambiado sociedades.",
    modules: [
      {
        id: 7,
        title: "Historias que han marcado una época",
        weeks: 1,
        hours: 2,
        description:
          "Análisis narrativo de discursos e historias de gran impacto social, y la responsabilidad ética de quien las cuenta.",
        content: [
          {
            heading: "El storytelling como fuerza histórica",
            body: "Muchos de los momentos que han cambiado el rumbo de sociedades enteras no se sostuvieron solo en argumentos o en datos, sino en relatos capaces de dar sentido colectivo a una experiencia compartida: discursos de líderes sociales, campañas de comunicación que cambiaron percepciones públicas, narraciones fundacionales de movimientos e instituciones. En todos estos casos, la narrativa no sustituyó a la causa que defendían: la hizo transmisible, memorable y capaz de movilizar a personas que no habían vivido directamente la situación que describían.",
          },
          {
            heading: "Recursos retóricos recurrentes",
            body: "Estos relatos de gran alcance suelen combinar recursos reconocibles: la anáfora (repetición de una misma estructura al inicio de frases sucesivas, que genera ritmo y machaca la idea central), el contraste (situar dos realidades opuestas una junto a otra para hacer visible la distancia entre ellas), la regla de tres o tricolon (agrupar ideas en series de tres elementos, que el oído humano procesa como especialmente completas y memorables), las imágenes concretas y sensoriales en lugar de conceptos abstractos, y la apelación explícita a valores que la audiencia ya comparte, en lugar de intentar imponer valores nuevos desde cero.",
          },
          {
            heading: "Un marco para analizar en vez de solo admirar",
            body: "El objetivo de este módulo no es imitar sin más estos relatos, sino aprender a descomponerlos con un marco de análisis sistemático: ¿qué estructura narrativa siguen (tres actos, viaje del héroe, otra)?, ¿qué patrón narrativo predomina (superación, advertencia, renacimiento)?, ¿a qué público se dirigían y qué valores compartidos activan?, ¿qué contexto histórico hace que ese relato concreto resuene en ese momento y no en otro?, ¿qué recursos retóricos concretos sostienen su fuerza?, y ¿qué legado o influencia posterior tuvo? Aplicar este marco de forma sistemática es lo que convierte la admiración en una técnica transferible.",
          },
          {
            heading: "Categorías de casos para analizar",
            body: "Existen varias familias de relatos históricos especialmente ricas para este análisis: discursos vinculados a movimientos por los derechos civiles y sociales, campañas de comunicación de salud o seguridad pública que cambiaron comportamientos a gran escala, relatos fundacionales de organizaciones o movimientos que siguen citándose años después de su origen, y piezas publicitarias que trascendieron su función comercial y pasaron a formar parte de la cultura compartida. Elegir un caso de una de estas familias, real y verificable, y aplicarle el marco de análisis del bloque anterior es la mejor forma de interiorizar estas herramientas.",
          },
          {
            heading: "La responsabilidad de quien narra a gran escala",
            body: "Cuanto mayor es el alcance de un relato, mayor es también su capacidad de influir en decisiones colectivas, y por tanto mayor la responsabilidad ética de quien lo construye. Los mismos recursos retóricos que sirven para movilizar hacia causas legítimas —anáfora, contraste, apelación a valores compartidos— son estructuralmente idénticos a los que se usan en propaganda y desinformación. Lo que distingue a unos de otros no es la técnica empleada, sino la veracidad de los hechos que sostienen y la honestidad de la intención detrás del relato.",
          },
          {
            heading: "Cierre del curso: del relato individual al relato colectivo",
            body: "Este módulo final conecta con el primero: si el módulo 1 mostraba que un mensaje profesional gana fuerza al narrativizarse, este último módulo muestra la versión a gran escala del mismo principio, con las mismas herramientas —estructura, conflicto, patrón, conexión emocional— y la misma exigencia ética de fondo trabajada en el módulo 2. Dominar el storytelling no consiste solo en contar mejores historias, sino en entender con precisión el poder que se está manejando cada vez que se cuenta una.",
          },
        ],
        tags: ["storytelling histórico", "discursos", "impacto cultural", "ética narrativa"],
        objectives: [
          "Analizar relatos históricos, políticos o culturales de gran influencia.",
          "Identificar recursos narrativos comunes en discursos e historias de alto impacto social.",
          "Reflexionar sobre la responsabilidad ética del storytelling con capacidad de influencia masiva.",
        ],
        resources: [
          "Análisis narrativo de discursos históricos de gran repercusión",
          "Documentales sobre campañas históricas de comunicación",
          "Gottschall, J. — The Storytelling Animal (capítulo sobre historias y sociedad)",
        ],
        activity:
          "Elegir una historia o discurso históricamente relevante y elaborar un análisis narrativo de 500-700 palabras.",
        evaluation: {
          instrument:
            "Rúbrica de autoevaluación sobre el análisis narrativo de 500-700 palabras, aplicando el marco de seis preguntas trabajado en el módulo.",
          criteria: [
            "¿Se identifica con claridad la estructura narrativa que sigue el caso analizado (tres actos, viaje del héroe u otra)?",
            "¿Se identifica el patrón narrativo predominante y se justifica por qué es ese y no otro?",
            "¿Se señalan al menos dos recursos retóricos concretos (anáfora, contraste, tricolon, imágenes concretas...) con un ejemplo de dónde aparecen?",
            "¿Se explica el contexto histórico que hace que ese relato resuene en ese momento concreto?",
            "¿Se incluye una reflexión sobre la responsabilidad ética de quien narra a esa escala, sin quedarse solo en la admiración técnica?",
          ],
        },
      },
    ],
  },
];

const ALL_MODULES = PHASES.flatMap((p) =>
  p.modules.map((m) => ({ ...m, phaseId: p.id, phaseNumber: p.number, phaseTitle: p.title }))
);
const TOTAL_MODULES = ALL_MODULES.length;
const TOTAL_WEEKS = ALL_MODULES.reduce((s, m) => s + m.weeks, 0);

/* ---------------------------------------------------------------
   NARRATIVE ARC (signature element)
   Tension curve across the four phases, used as the visual home
   of the "ruta principal" and as the progress indicator: it fills
   in ember as modules are completed.
--------------------------------------------------------------- */
const ARC_W = 700;
const ARC_H = 140;
const ARC_TOP = 18;
const ARC_BOTTOM = 122;

// x fraction, tension (0 = calm, 1 = peak) at each phase boundary
const ARC_KEYPOINTS = [
  { x: 0, t: 0.14 },
  { x: 2 / 7, t: 0.3 }, // end of fase 1
  { x: 4 / 7, t: 0.66 }, // end of fase 2
  { x: 6 / 7, t: 0.98 }, // end of fase 3 (climax)
  { x: 1, t: 0.52 }, // end of fase 4 (resolution)
];

function tensionToY(t) {
  return ARC_BOTTOM - t * (ARC_BOTTOM - ARC_TOP);
}

function yAtXFraction(xf) {
  for (let i = 0; i < ARC_KEYPOINTS.length - 1; i++) {
    const a = ARC_KEYPOINTS[i];
    const b = ARC_KEYPOINTS[i + 1];
    if (xf <= b.x || i === ARC_KEYPOINTS.length - 2) {
      const span = b.x - a.x || 1;
      const local = (xf - a.x) / span;
      const t = a.t + (b.t - a.t) * local;
      return tensionToY(t);
    }
  }
  return tensionToY(ARC_KEYPOINTS[ARC_KEYPOINTS.length - 1].t);
}

const ARC_PATH_D = ARC_KEYPOINTS.map((p, i) => {
  const x = p.x * ARC_W;
  const y = tensionToY(p.t);
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(" ");

function NarrativeArc({ completedCount, moduleDots, onDotClick, activeModuleId }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  const progressFraction = TOTAL_MODULES ? completedCount / TOTAL_MODULES : 0;

  return (
    <svg
      viewBox={`0 0 ${ARC_W} ${ARC_H}`}
      className="w-full h-auto"
      style={{ overflow: "visible" }}
      preserveAspectRatio="none"
    >
      <path
        d={ARC_PATH_D}
        fill="none"
        stroke={COLOR.inkLine}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        ref={pathRef}
        d={ARC_PATH_D}
        fill="none"
        stroke={COLOR.ember}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: len ? len * (1 - progressFraction) : 0,
          transition: "stroke-dashoffset 700ms ease",
        }}
      />
      {moduleDots.map((d) => {
        const isActive = d.id === activeModuleId;
        return (
          <g
            key={d.id}
            transform={`translate(${d.x},${d.y})`}
            onClick={() => onDotClick(d.id)}
            style={{ cursor: "pointer" }}
          >
            <circle
              r={isActive ? 9 : 7}
              fill={d.completed ? COLOR.ember : COLOR.ink}
              stroke={d.completed ? COLOR.parchment : COLOR.textMuted}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <text
              y={4}
              textAnchor="middle"
              fontSize="9"
              fontFamily="'IBM Plex Mono', monospace"
              fill={d.completed ? COLOR.ink : COLOR.textMuted}
              style={{ pointerEvents: "none" }}
            >
              {d.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------------------------------------------------------
   SMALL UI PIECES
--------------------------------------------------------------- */
function Tag({ children }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[11px] tracking-wide rounded-full mr-1.5 mb-1.5"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        backgroundColor: COLOR.parchmentDim,
        color: COLOR.textInkMuted,
      }}
    >
      {children}
    </span>
  );
}

function CompletionCheck({ completed, onClick, small }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full border transition-colors ${
        small ? "w-4 h-4" : "w-6 h-6"
      }`}
      style={{
        borderColor: completed ? COLOR.ember : COLOR.textMuted,
        backgroundColor: completed ? COLOR.ember : "transparent",
      }}
      aria-label={completed ? "Marcar como no completado" : "Marcar como completado"}
    >
      {completed && (
        <svg viewBox="0 0 12 12" className={small ? "w-2.5 h-2.5" : "w-3.5 h-3.5"}>
          <path
            d="M2 6.2 L4.8 9 L10 3"
            stroke={COLOR.ink}
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

/* ---------------------------------------------------------------
   MODULE CARD
--------------------------------------------------------------- */
function ModuleCard({
  module,
  completed,
  expanded,
  onToggleExpand,
  onToggleComplete,
  registerRef,
  evalChecks,
  onToggleCriterion,
}) {
  const criteriaCount = module.evaluation ? module.evaluation.criteria.length : 0;
  const checkedCount = evalChecks ? evalChecks.filter(Boolean).length : 0;
  const allChecked = criteriaCount > 0 && checkedCount === criteriaCount;
  const [showFeedback, setShowFeedback] = useState(false);

  function handleToggleCriterion(i) {
    setShowFeedback(false);
    onToggleCriterion(i);
  }

  function handleCheckAnswers() {
    setShowFeedback(true);
  }

  const unmetCriteria = module.evaluation
    ? module.evaluation.criteria.filter((_, i) => !(evalChecks && evalChecks[i]))
    : [];

  return (
    <div
      ref={registerRef}
      id={`module-${module.id}`}
      className="rounded-lg border overflow-hidden scroll-mt-28"
      style={{
        borderColor: COLOR.parchmentDim,
        backgroundColor: COLOR.parchment,
      }}
    >
      <button onClick={onToggleExpand} className="w-full text-left px-5 py-4 flex items-start gap-4">
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center rounded-md w-11 h-11 mt-0.5"
          style={{ backgroundColor: COLOR.ink }}
        >
          <span
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.parchment }}
            className="text-sm"
          >
            {String(module.id).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h4
              className="text-lg leading-snug"
              style={{ fontFamily: "'Fraunces', serif", color: COLOR.textInk, fontWeight: 600 }}
            >
              {module.title}
            </h4>
            <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 pt-1">
              <CompletionCheck completed={completed} onClick={onToggleComplete} />
            </div>
          </div>
          <p
            className="text-[13px] mt-1"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textInkMuted }}
          >
            {module.weeks} {module.weeks === 1 ? "semana" : "semanas"} · {module.hours}h/semana
          </p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: COLOR.textInkMuted }}>
            {module.description}
          </p>
          <div className="mt-3 flex flex-wrap">
            {module.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: COLOR.parchmentDim }}>
          {module.content && (
            <div className="pt-4 pb-2">
              <h5
                className="text-[11px] uppercase tracking-widest mb-3"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.emberDim }}
              >
                Contenido del módulo
              </h5>
              <div className="space-y-3.5">
                {module.content.map((block, i) => (
                  <div key={i}>
                    <p
                      className="text-sm mb-0.5"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontStyle: "italic",
                        color: COLOR.textInk,
                        fontWeight: 600,
                      }}
                    >
                      {block.heading}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: COLOR.textInkMuted }}>
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 mt-2">
          <div className="pt-4">
            <h5
              className="text-[11px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.emberDim }}
            >
              Objetivos específicos
            </h5>
            <ul className="space-y-1.5">
              {module.objectives.map((o, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: COLOR.textInk }}>
                  <span style={{ color: COLOR.ember }}>·</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <h5
              className="text-[11px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.emberDim }}
            >
              Recursos recomendados
            </h5>
            <ul className="space-y-1.5">
              {module.resources.map((r, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: COLOR.textInk }}>
                  <span style={{ color: COLOR.ember }}>·</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <h5
              className="text-[11px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.emberDim }}
            >
              Actividad práctica
            </h5>
            <p className="text-sm leading-relaxed" style={{ color: COLOR.textInk }}>
              {module.activity}
            </p>
          </div>
          </div>

          {module.evaluation && (
            <div className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <h5
                  className="text-[11px] uppercase tracking-widest"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.emberDim }}
                >
                  Evaluación
                </h5>
                <span
                  className="text-[11px]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textInkMuted }}
                >
                  {checkedCount}/{criteriaCount}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: COLOR.textInk }}>
                {module.evaluation.instrument}
              </p>
              <ul className="space-y-2">
                {module.evaluation.criteria.map((c, i) => {
                  const checked = !!(evalChecks && evalChecks[i]);
                  return (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5">
                        <CompletionCheck completed={checked} onClick={() => handleToggleCriterion(i)} small />
                      </span>
                      <button
                        onClick={() => handleToggleCriterion(i)}
                        className="text-sm text-left leading-relaxed"
                        style={{
                          color: checked ? COLOR.textInkMuted : COLOR.textInk,
                          textDecoration: checked ? "line-through" : "none",
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={handleCheckAnswers}
                className="mt-4 text-xs px-4 py-2 rounded-md border font-medium"
                style={{ borderColor: COLOR.ember, color: COLOR.emberDim }}
              >
                Comprobar respuestas
              </button>

              {showFeedback && (
                <div
                  className="mt-3 rounded-md px-3.5 py-3 text-sm"
                  style={{
                    backgroundColor: allChecked ? "rgba(122,151,112,0.15)" : "rgba(193,81,47,0.1)",
                    border: `1px solid ${allChecked ? COLOR.sage : COLOR.ember}`,
                    color: COLOR.textInk,
                  }}
                >
                  {allChecked ? (
                    <p>
                      <strong>Completo.</strong> Cumples los {criteriaCount} criterios de autoevaluación de
                      este módulo.
                    </p>
                  ) : (
                    <>
                      <p className="mb-1.5">
                        <strong>
                          Te faltan {unmetCriteria.length} de {criteriaCount} criterios por cumplir:
                        </strong>
                      </p>
                      <ul className="space-y-1 list-disc pl-4">
                        {unmetCriteria.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {allChecked && !completed && (
                <button
                  onClick={onToggleComplete}
                  className="mt-4 w-full text-xs px-3 py-2.5 rounded-md text-left flex items-center justify-between"
                  style={{ backgroundColor: COLOR.ink, color: COLOR.parchment }}
                >
                  <span>Has marcado todos los criterios. Dar el módulo por completado.</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------- */
export default function StorytellingCourse() {
  const [completed, setCompleted] = useState(() => new Set());
  const [evalChecks, setEvalChecks] = useState({});
  const [search, setSearch] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error

  const moduleRefs = useRef({});
  const PROGRESS_KEY = "storytelling-course-progress";

  // Load saved progress once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.completedIds)) setCompleted(new Set(data.completedIds));
        if (data.evalChecks && typeof data.evalChecks === "object") setEvalChecks(data.evalChecks);
      }
    } catch (err) {
      // No hay progreso guardado todavía, o error de lectura: se empieza de cero.
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  // Persist progress whenever it changes (after the initial load)
  useEffect(() => {
    if (!progressLoaded) return;
    setSaveState("saving");
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({ completedIds: [...completed], evalChecks }));
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
    }
  }, [completed, evalChecks, progressLoaded]);

  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const filteredModules = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ALL_MODULES.filter((m) => {
      if (phaseFilter !== "all" && m.phaseId !== phaseFilter) return false;
      if (!term) return true;
      const haystack = `${m.title} ${m.description} ${m.tags.join(" ")}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search, phaseFilter]);

  const visibleModuleIds = useMemo(() => new Set(filteredModules.map((m) => m.id)), [filteredModules]);

  const visiblePhases = useMemo(
    () => PHASES.filter((p) => p.modules.some((m) => visibleModuleIds.has(m.id))),
    [visibleModuleIds]
  );

  const moduleDots = useMemo(
    () =>
      ALL_MODULES.map((m, i) => ({
        id: m.id,
        completed: completed.has(m.id),
        x: (((i + 0.5) / TOTAL_MODULES) * ARC_W),
        y: yAtXFraction((i + 0.5) / TOTAL_MODULES),
      })),
    [completed]
  );

  function toggleComplete(id) {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCriterion(moduleId, index, criteriaLength) {
    setEvalChecks((prev) => {
      const current =
        prev[moduleId] && prev[moduleId].length === criteriaLength
          ? prev[moduleId]
          : Array(criteriaLength).fill(false);
      const next = [...current];
      next[index] = !next[index];
      return { ...prev, [moduleId]: next };
    });
  }

  function scrollToModule(id) {
    setActiveModuleId(id);
    setExpandedId(id);
    setMobileSidebarOpen(false);
    const el = moduleRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function scrollToPhase(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileSidebarOpen(false);
  }

  const percent = Math.round((completed.size / TOTAL_MODULES) * 100);

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row"
      style={{ backgroundColor: COLOR.ink, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-30"
        style={{ backgroundColor: COLOR.inkDeep, borderColor: COLOR.inkLine }}
      >
        <span style={{ fontFamily: "'Fraunces', serif", color: COLOR.textLight }} className="text-base">
          Storytelling
        </span>
        <button
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="text-sm px-3 py-1.5 rounded-md border"
          style={{ borderColor: COLOR.inkLine, color: COLOR.textLight }}
        >
          {mobileSidebarOpen ? "Cerrar" : "Índice"}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`${
          mobileSidebarOpen ? "block" : "hidden"
        } md:block md:w-80 flex-shrink-0 border-r md:h-screen md:sticky md:top-0 overflow-y-auto`}
        style={{ backgroundColor: COLOR.inkDeep, borderColor: COLOR.inkLine }}
      >
        <div className="p-5">
          <div className="hidden md:block mb-6">
            <p
              className="text-[11px] uppercase tracking-widest mb-1"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}
            >
              Plan autodidacta
            </p>
            <h1
              className="text-xl leading-tight"
              style={{ fontFamily: "'Fraunces', serif", color: COLOR.textLight, fontWeight: 600 }}
            >
              Storytelling
            </h1>
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, tema o etiqueta…"
            className="w-full px-3 py-2 rounded-md text-sm outline-none border"
            style={{
              backgroundColor: COLOR.ink,
              borderColor: COLOR.inkLine,
              color: COLOR.textLight,
            }}
          />

          {/* Phase filter chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <button
              onClick={() => setPhaseFilter("all")}
              className="text-[11px] px-2.5 py-1 rounded-full border"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                borderColor: phaseFilter === "all" ? COLOR.ember : COLOR.inkLine,
                color: phaseFilter === "all" ? COLOR.ember : COLOR.textMuted,
              }}
            >
              Todas
            </button>
            {PHASES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPhaseFilter(p.id)}
                className="text-[11px] px-2.5 py-1 rounded-full border"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  borderColor: phaseFilter === p.id ? COLOR.ember : COLOR.inkLine,
                  color: phaseFilter === p.id ? COLOR.ember : COLOR.textMuted,
                }}
              >
                Fase {p.number}
              </button>
            ))}
          </div>

          {/* Progress mini bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}>
                {completed.size} de {TOTAL_MODULES} módulos
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.ember }}>
                {percent}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: COLOR.inkLine }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: COLOR.ember,
                  transition: "width 500ms ease",
                }}
              />
            </div>
          </div>

          {/* Module list */}
          <nav className="mt-6 space-y-1">
            {filteredModules.length === 0 && (
              <p className="text-sm italic" style={{ color: COLOR.textMuted }}>
                Ningún módulo coincide con la búsqueda.
              </p>
            )}
            {filteredModules.map((m) => {
              const isCompleted = completed.has(m.id);
              const isActive = m.id === activeModuleId;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToModule(m.id)}
                  className="w-full flex items-start gap-3 px-2.5 py-2 rounded-md text-left transition-colors"
                  style={{
                    backgroundColor: isActive ? COLOR.inkLine : "transparent",
                  }}
                >
                  <span
                    className="mt-0.5"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted, fontSize: 12 }}
                  >
                    {String(m.id).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block text-sm leading-snug"
                      style={{ color: isCompleted ? COLOR.textMuted : COLOR.textLight }}
                    >
                      {m.title}
                    </span>
                    <span
                      className="block text-[11px] mt-0.5"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}
                    >
                      {m.weeks}
                      {m.weeks === 1 ? " sem" : " sem"} · {m.hours}h/sem
                    </span>
                  </span>
                  <span className="pt-0.5" onClick={(e) => { e.stopPropagation(); toggleComplete(m.id); }}>
                    <CompletionCheck completed={isCompleted} onClick={() => toggleComplete(m.id)} small />
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
          {/* Header */}
          <header className="mb-8">
            <p
              className="text-[11px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}
            >
              Plan autodidacta avanzado
            </p>
            <h1
              className="text-3xl md:text-4xl leading-tight mb-5"
              style={{ fontFamily: "'Fraunces', serif", color: COLOR.textLight, fontWeight: 700 }}
            >
              Storytelling: el poder del relato en la comunicación
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                ["Módulos", `${TOTAL_MODULES}`],
                ["Duración total", `~${(TOTAL_WEEKS / 4).toFixed(1)} meses`],
                ["Dedicación", "2–3 h/semana"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p
                    className="text-lg"
                    style={{ fontFamily: "'Fraunces', serif", color: COLOR.ember, fontWeight: 600 }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-wide"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </header>

          {/* Ruta principal — narrative arc */}
          <section className="mb-10 rounded-xl border p-5 md:p-6" style={{ borderColor: COLOR.inkLine }}>
            <h2
              className="text-[11px] uppercase tracking-widest mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }}
            >
              Ruta principal
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: COLOR.textLight, opacity: 0.9 }}>
              Un recorrido progresivo que va de entender por qué las historias comunican mejor que los datos
              aislados, a dominar las estructuras narrativas clásicas, aplicarlas estratégicamente según el
              objetivo comunicativo, y finalmente analizar cómo el storytelling ha moldeado momentos históricos
              y culturales.
            </p>

            <NarrativeArc
              completedCount={completed.size}
              moduleDots={moduleDots}
              onDotClick={scrollToModule}
              activeModuleId={activeModuleId}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollToPhase(p.id)}
                  className="text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: COLOR.inkLine,
                    color: COLOR.textLight,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  Fase {p.number} · {p.title}
                </button>
              ))}
            </div>
          </section>

          {/* Phases */}
          <div className="space-y-12">
            {visiblePhases.map((phase) => (
              <section key={phase.id} id={phase.id} className="scroll-mt-20">
                <div className="mb-4">
                  <p
                    className="text-[11px] uppercase tracking-widest mb-1"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.ember }}
                  >
                    Fase {phase.number}
                  </p>
                  <h3
                    className="text-2xl mb-1.5"
                    style={{ fontFamily: "'Fraunces', serif", color: COLOR.textLight, fontWeight: 600 }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-sm" style={{ color: COLOR.textMuted }}>
                    {phase.description}
                  </p>
                </div>
                <div className="grid gap-4">
                  {phase.modules
                    .filter((m) => visibleModuleIds.has(m.id))
                    .map((m) => (
                      <ModuleCard
                        key={m.id}
                        module={m}
                        completed={completed.has(m.id)}
                        expanded={expandedId === m.id}
                        onToggleExpand={() => {
                          setActiveModuleId(m.id);
                          setExpandedId((prev) => (prev === m.id ? null : m.id));
                        }}
                        onToggleComplete={() => toggleComplete(m.id)}
                        registerRef={(el) => (moduleRefs.current[m.id] = el)}
                        evalChecks={evalChecks[m.id]}
                        onToggleCriterion={(i) =>
                          toggleCriterion(m.id, i, m.evaluation ? m.evaluation.criteria.length : 0)
                        }
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>

          {/* Reset progress */}
          <footer className="mt-14 pt-6 border-t flex items-center justify-between" style={{ borderColor: COLOR.inkLine }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }} className="text-xs">
                {completed.size} de {TOTAL_MODULES} completados · {percent}%
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLOR.textMuted }} className="text-[10px] mt-0.5 opacity-70">
                {saveState === "saving" && "Guardando…"}
                {saveState === "saved" && "Progreso guardado en este dispositivo"}
                {saveState === "error" && "No se pudo guardar el progreso"}
                {saveState === "idle" && "\u00A0"}
              </p>
            </div>
            {!confirmingReset ? (
              <button
                onClick={() => setConfirmingReset(true)}
                className="text-xs px-3 py-1.5 rounded-md border"
                style={{ borderColor: COLOR.inkLine, color: COLOR.textMuted }}
              >
                Reiniciar progreso
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: COLOR.textMuted }}>
                  ¿Seguro?
                </span>
                <button
                  onClick={() => {
                    setCompleted(new Set());
                    setEvalChecks({});
                    setConfirmingReset(false);
                  }}
                  className="text-xs px-3 py-1.5 rounded-md"
                  style={{ backgroundColor: COLOR.ember, color: COLOR.ink }}
                >
                  Sí, reiniciar
                </button>
                <button
                  onClick={() => setConfirmingReset(false)}
                  className="text-xs px-3 py-1.5 rounded-md border"
                  style={{ borderColor: COLOR.inkLine, color: COLOR.textMuted }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </footer>
        </div>
      </main>
    </div>
  );
}

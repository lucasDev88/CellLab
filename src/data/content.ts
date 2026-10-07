export type CellType = "animal" | "plant" | "prokaryote";
export type Organelle = {
  id: string;
  name: string;
  description: string;
  curiosity: string;
  color: string;
  cellTypes: CellType[];
};
const all: CellType[] = ["animal", "plant", "prokaryote"];
const euk: CellType[] = ["animal", "plant"];
export const organelles: Organelle[] = [
  {
    id: "membrane",
    name: "Membrana plasmática",
    description:
      "Controla a passagem de substâncias entre a célula e o ambiente.",
    curiosity:
      "É formada principalmente por uma dupla camada de fosfolipídios e proteínas.",
    color: "#469eaa",
    cellTypes: all,
  },
  {
    id: "cytoplasm",
    name: "Citoplasma",
    description:
      "Região onde ficam as estruturas celulares e ocorrem muitas reações químicas.",
    curiosity: "O citosol, sua parte fluida, é rico em água.",
    color: "#85b9b3",
    cellTypes: all,
  },
  {
    id: "nucleus",
    name: "Núcleo",
    description:
      "Armazena grande parte do DNA e participa do controle das atividades da célula.",
    curiosity:
      "Seu envoltório possui poros que permitem trocas com o citoplasma.",
    color: "#9a82d2",
    cellTypes: euk,
  },
  {
    id: "nucleolus",
    name: "Nucléolo",
    description:
      "Produz RNA ribossômico e participa da montagem das subunidades dos ribossomos.",
    curiosity: "Fica dentro do núcleo e não é delimitado por membrana.",
    color: "#70519f",
    cellTypes: euk,
  },
  {
    id: "mitochondria",
    name: "Mitocôndria",
    description:
      "Participa da respiração celular e produz grande parte do ATP utilizado pela célula.",
    curiosity:
      "Possui seu próprio DNA. Células vegetais também têm mitocôndrias!",
    color: "#e39962",
    cellTypes: euk,
  },
  {
    id: "ribosomes",
    name: "Ribossomos",
    description: "Realizam a síntese de proteínas.",
    curiosity: "Estão presentes em células procariontes e eucariontes.",
    color: "#c99b57",
    cellTypes: all,
  },
  {
    id: "rough-er",
    name: "Retículo endoplasmático rugoso",
    description:
      "Participa da produção e do transporte de proteínas, com ribossomos associados.",
    curiosity: "Os ribossomos na superfície dão a ele o aspecto rugoso.",
    color: "#809dcb",
    cellTypes: euk,
  },
  {
    id: "smooth-er",
    name: "Retículo endoplasmático liso",
    description:
      "Participa da síntese de lipídios e de processos de desintoxicação.",
    curiosity:
      "Diferentemente do retículo rugoso, não possui ribossomos associados.",
    color: "#73b6c6",
    cellTypes: euk,
  },
  {
    id: "golgi",
    name: "Complexo golgiense",
    description:
      "Modifica, armazena e direciona substâncias, como proteínas, para seus destinos.",
    curiosity: "Suas bolsas achatadas são chamadas de cisternas.",
    color: "#d78f9c",
    cellTypes: euk,
  },
  {
    id: "lysosomes",
    name: "Lisossomos",
    description:
      "Participam da digestão intracelular e da reciclagem de componentes.",
    curiosity:
      "Nas plantas, o vacúolo pode exercer funções digestivas semelhantes.",
    color: "#bd89b9",
    cellTypes: ["animal"],
  },
  {
    id: "centrioles",
    name: "Centríolos",
    description:
      "Participam da organização dos microtúbulos e da formação de cílios e flagelos.",
    curiosity:
      "São representados na célula animal; a maioria das plantas terrestres não os possui.",
    color: "#c4a36b",
    cellTypes: ["animal"],
  },
  {
    id: "wall",
    name: "Parede celular",
    description:
      "Oferece sustentação e proteção à célula, externamente à membrana.",
    curiosity:
      "Nas plantas, é rica em celulose; na maioria das bactérias, em peptidoglicano.",
    color: "#71a17a",
    cellTypes: ["plant", "prokaryote"],
  },
  {
    id: "vacuole",
    name: "Vacúolo central",
    description:
      "Armazena substâncias e ajuda a manter a pressão interna e a sustentação da célula vegetal.",
    curiosity:
      "Pode ocupar grande parte do volume de uma célula vegetal madura.",
    color: "#79c4d3",
    cellTypes: ["plant"],
  },
  {
    id: "chloroplasts",
    name: "Cloroplastos",
    description:
      "Realizam fotossíntese, convertendo energia luminosa em energia química.",
    curiosity:
      "Contêm clorofila e seu próprio DNA; não estão em todas as células de uma planta.",
    color: "#7fa85d",
    cellTypes: ["plant"],
  },
  {
    id: "nucleoid",
    name: "Material genético / nucleoide",
    description:
      "Região onde se encontra o DNA principal da célula procarionte, sem envoltório nuclear.",
    curiosity: "Procariontes não possuem núcleo delimitado por membrana.",
    color: "#aa83cc",
    cellTypes: ["prokaryote"],
  },
  {
    id: "plasmids",
    name: "Plasmídeos",
    description:
      "Pequenas moléculas de DNA que podem carregar genes adicionais.",
    curiosity: "Podem estar presentes em bactérias, mas não são universais.",
    color: "#bf84ad",
    cellTypes: ["prokaryote"],
  },
  {
    id: "flagellum",
    name: "Flagelo",
    description: "Estrutura que permite a locomoção de muitas bactérias.",
    curiosity: "Nem todas as bactérias possuem flagelo.",
    color: "#609eaa",
    cellTypes: ["prokaryote"],
  },
];
export const cells: {
  id: CellType;
  name: string;
  subtitle: string;
  description: string;
  tag: string;
}[] = [
  {
    id: "animal",
    name: "Célula Animal",
    subtitle: "Um universo dentro de você",
    description: "Descubra como funciona uma célula eucariótica animal.",
    tag: "Eucarionte",
  },
  {
    id: "plant",
    name: "Célula Vegetal",
    subtitle: "A vida movida pela luz",
    description: "Conheça estruturas como cloroplastos e parede celular.",
    tag: "Eucarionte",
  },
  {
    id: "prokaryote",
    name: "Célula Procarionte",
    subtitle: "Pequena, mas extraordinária",
    description:
      "Explore uma célula simples, sem núcleo delimitado por membrana.",
    tag: "Procarionte",
  },
];
export const team = ["Edson Manoel", "Igor Rauê", "João Marinho", "Leonardo Gomes", "Lucas Felipe", "Marcony Laerte", "Marcos Alves"];
export const teacher = "Marlon Delgado";
export type Question = { prompt: string; answer: string; options: string[] };
export const challenges = [
  {
    answer: "mitochondria",
    prompt:
      "A demanda por ATP aumentou! Qual organela participa da respiração celular para produzir mais energia?",
  },
  {
    answer: "ribosomes",
    prompt:
      "A célula precisa fabricar proteínas para continuar funcionando. Quem assume essa missão?",
  },
  {
    answer: "golgi",
    prompt:
      "Proteínas precisam ser modificadas e empacotadas para transporte. Qual estrutura entra em ação?",
  },
  {
    answer: "membrane",
    prompt:
      "O ambiente mudou! Qual estrutura controla a entrada e a saída de substâncias?",
  },
  {
    answer: "chloroplasts",
    prompt:
      "A luz chegou! Qual organela utiliza essa energia para realizar fotossíntese?",
  },
  {
    answer: "nucleus",
    prompt:
      "Precisamos acessar o compartimento que guarda a maior parte do DNA desta célula. Qual é ele?",
  },
  {
    answer: "lysosomes",
    prompt:
      "Componentes desgastados precisam ser digeridos. Quem participa dessa reciclagem?",
  },
  {
    answer: "nucleoid",
    prompt:
      "Uma bactéria precisa duplicar seu DNA principal. Em qual região ele está?",
  },
  {
    answer: "flagellum",
    prompt:
      "Esta bactéria precisa se locomover. Qual estrutura pode impulsioná-la?",
  },
  {
    answer: "wall",
    prompt:
      "A célula precisa de sustentação externa à membrana. Qual estrutura oferece esse suporte?",
  },
];
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function getQuestions(
  type: CellType,
  mode: "challenge" | "quiz",
): Question[] {
  const available = organelles.filter((o) => o.cellTypes.includes(type));
  const selected =
    mode === "challenge"
      ? shuffle(
          challenges.filter((q) => available.some((o) => o.id === q.answer)),
        ).slice(0, 3)
      : [
          {
            answer: "ribosomes",
            prompt: "Qual estrutura realiza a síntese de proteínas?",
          },
          {
            answer: "membrane",
            prompt: "Qual estrutura controla a passagem de substâncias?",
          },
          {
            answer: type === "prokaryote" ? "nucleoid" : "nucleus",
            prompt:
              type === "prokaryote"
                ? "Onde fica o DNA principal de uma célula procarionte?"
                : "Qual estrutura armazena grande parte do DNA de uma célula eucariótica?",
          },
          {
            answer:
              type === "plant"
                ? "chloroplasts"
                : type === "animal"
                  ? "mitochondria"
                  : "plasmids",
            prompt:
              type === "plant"
                ? "Qual organela realiza a fotossíntese?"
                : type === "animal"
                  ? "Qual organela participa da respiração celular e da produção de grande parte do ATP?"
                  : "Como se chamam as pequenas moléculas de DNA adicionais de muitas bactérias?",
          },
          {
            answer:
              type === "plant"
                ? "vacuole"
                : type === "animal"
                  ? "rough-er"
                  : "wall",
            prompt:
              type === "plant"
                ? "Qual estrutura ajuda a manter a pressão interna da célula vegetal?"
                : type === "animal"
                  ? "Qual estrutura possui ribossomos associados à sua superfície?"
                  : "Qual estrutura oferece sustentação externa à membrana de muitas bactérias?",
          },
        ];
  return selected.map((q) => ({
    ...q,
    options: shuffle([
      q.answer,
      ...shuffle(available.filter((o) => o.id !== q.answer))
        .slice(0, 3)
        .map((o) => o.id),
    ]),
  }));
}

export interface Question {
  text: string;
  options: string | string[];
  conditionalQuestions?: { [answer: string]: Question[] };
}

export interface Section {
  name: string;
  questions: Question[];
}

const Section_1: Section = {
  name: "INFORMAÇÕES DO PRODUTO",
  questions: [
    { text: "Qual o modelo do produto com defeito?", options: "" },
    { text: "Qual o serial do produto com defeito?", options: "" },
    {
      text: "Foi inserida a nota fiscal no sistema?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foi coletada a etiqueta serial do produto com defeito?",
      options: ["Sim", "Não"],
    },
    {
      text: "A tubulação de cobre foi instalada pela construtora ou instalador?",
      options: ["Construtora", "Instalador"],
    },
    {
      text: "Qual nome da empresa que fez a instalação do tubo?",
      options: "",
    },
    {
      text: "Qual nome da empresa que fez a instalação do produto?",
      options: "",
    },
  ],
};
const Section_2: Section = {
  name: "INFORMAÇÕES BÁSICAS DE FUNCIONAMENTO",
  questions: [
    {
      text: "O produto chegou a funcionar corretamente?",
      options: ["Sim", "Não"],
    },
    { text: "Há quanto tempo ocorre o problema?", options: "" },
    {
      text: "Apresenta algum código de erro?",
      options: ["Sim", "Não"],
      conditionalQuestions: {
        Sim: [{ text: "SE SIM, qual código de erro?", options: "" }],
      },
    },
    // { text: "SE SIM, qual código de erro?", options: "" },

    {
      text: "Houve queda de energia antes de ocorrer o problema?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foi executado o autodiagnostico do hass caso o produto seja compativel?",
      options: ["Sim", "Não"],
    },
  ],
};
const Section_3: Section = {
  name: "VERIFICAÇÃO DA INSTALAÇÃO - EVAPORADORA",
  questions: [
    {
      text: "A evaporadora possui as distâncias de espaçamento requisitadas conforme o manual de instalação(1)?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foi utilizado isolamento esponjoso blindado de 10mm ou espuma elastomérica de 9 mm?",
      options: ["Sim", "Não"],
    },
    {
      text: "Os tubos de gás e líquido estão separados individualmentes por isolamento?",
      options: ["Sim", "Não"],
    },
    {
      text: "A evaporadora possui as distâncias de espaçamento requisitadas conforme o manual de instalação?",
      options: ["Sim", "Não"],
    },
    {
      text: "A tubulação de drenagem está com desnível suficiente para o escoamento da água condensada?",
      options: ["Sim", "Não"],
    },
    {
      text: "A tubulação de drenagem possui isolamento térmico com espessura mínima de 5mm?",
      options: ["Sim", "Não"],
    },
    {
      text: "A tubulação de drenagem foi conectada a caixa de esgoto?",
      options: ["Sim", "Não"],
    },
    {
      text: "A tubulação de drenagem foi conectada ao ralo, se sim, existe sifão no ralo?",
      options: ["Sim", "Não"],
    },
    {
      text: "O sistema está dimensionado corretamente para carga térmica exigida no ambiente?",
      options: ["Sim", "Não"],
    },
    {
      text: "O produto possui danos na estrutura causado pela instalação?",
      options: ["Sim", "Não"],
    },
    {
      text: "O fusivel térmico está aberto devido a conexão errada da alimentação ou problemas elétricos?",
      options: ["Sim", "Não"],
    },
    {
      text: "O filtro está saturado (sujo)?",
      options: ["Sim", "Não"],
    },
  ],
};
const Section_4: Section = {
  name: "VERIFICAÇÃO DA INSTALAÇÃO - CONDENSADORA",
  questions: [
    {
      text: "A Condensadora possui as distâncias de espaçamento requisitadas conforme o manual de instalação (COND)?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foi utilizado isolamento esponjoso blindado de 10mm ou espuma elastomérica de 9 mm (COND)?",
      options: ["Sim", "Não"],
    },
    {
      text: "Os tubos de gás e líquido estão separados individualmentes por isolamento (COND)?",
      options: ["Sim", "Não"],
    },
    {
      text: "Em caso de regiões litorâneas foi instalada barreira contra brisa do mar?",
      options: ["Sim", "Não"],
    },
    {
      text: "O produto possui danos na estrutura causado pela instalação (Cond)?",
      options: ["Sim", "Não"],
    },
  ],
};
const Section_5: Section = {
  name: "VERIFICAÇÃO DA INSTALAÇÃO - TUBULAÇÃO",
  questions: [
    {
      text: "Foram respeitados os limites de comprimento do tubo conforme especificação do manual de instalação?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foram respeitados os diâmetros de tubulação conforme especificação do manual de instalação?",
      options: ["Sim", "Não"],
    },
    {
      text: "Há índicios de soldas mal executadas?",
      options: ["Sim", "Não"],
    },
    {
      text: "Há índicios de flanges malfeitos /causando vazamento?",
      options: ["Sim", "Não"],
    },
  ],
};
const Section_6: Section = {
  name: "VERIFICAÇÃO DA INSTALAÇÃO - ALIMENTAÇÃO E COMUNICAÇÃO",
  questions: [
    {
      text: "Há terminais tipo olhal na alimentação da evaporadora e condensadora?",
      options: ["Sim", "Não"],
    },
    {
      text: "Há terminais tipo olhal ou U na comunicação entre evaporadora e condensadora?",
      options: ["Sim", "Não"],
    },
    {
      text: "Foi respeitada bitola dos fios, conforme manual de instalação?",
      options: ["Sim", "Não"],
    },
    {
      text: "A evaporadora e condensadora estão aterradas?",
      options: ["Sim", "Não"],
    },
    {
      text: "O sistema possui disjuntor de proteção adequado?",
      options: ["Sim", "Não"],
    },
  ],
};
const Section_7: Section = {
  name: "CAUSA DA FALHA DO PRODUTO",
  questions: [
    {
      text: "Em qual unidade está o defeito",
      options: ["Evaporadora", "Condensadora"],
    },
    {
      text: "Qual a(s) peça(s) com defeito?",
      options: "",
    },
  ],
};

export const FormDataSections: Section[] = [
  Section_1,
  Section_2,
  Section_3,
  Section_4,
  Section_5,
  Section_6,
  Section_7,
];

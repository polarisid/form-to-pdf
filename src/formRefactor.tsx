import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from "file-saver";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Question {
  text: string;
  options: string | string[];
}

interface Section {
  name: string;
  questions: Question[];
}

const sections: Section[] = [
  {
    name: "INFORMAÇÕES DO PRODUTO",
    questions: [
      { text: "Qual o modelo do produto com defeito?", options: "" },
      { text: "qual o serial do produto com defeito?", options: "" },
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
  },
  {
    name: "Informações básicas de funcionamento",
    questions: [
      {
        text: "O produto chegou a funcionar corretamente?",
        options: ["Sim", "Não"],
      },
      { text: "Há quanto tempo ocorre o problema?", options: "" },
      { text: "Apresenta algum código de erro?", options: ["Sim", "Não"] },
      {
        text: "Houve queda de energia antes de ocorrer o problema?",
        options: ["Sim", "Não"],
      },
      {
        text: "Foi executado o autodiagnostico do hass caso o produto seja compativel?",
        options: ["Sim", "Não"],
      },
    ],
  },
  {
    name: "Verificação de instalação - Evaporadora",
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
  },
  {
    name: "Verificação de instalação - Condensadora",
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
  },
  {
    name: "Verificação de instalação - Tubulação",
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
  },
  {
    name: "Verificação de instalação - Alimentação e comunicação",
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
  },
  {
    name: "Causa da falha do produto",
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
  },
];

const generatePDF = (responses: {
  [key: string]: {
    question: string;
    answer: string;
  }[];
}) => {
  const content = [];

  //   Iterar sobre as seções e adicionar perguntas e respostas ao PDF
  for (const sectionName in responses) {
    //     // Adicionar nome da seção
    content.push({ text: sectionName, style: "sectionHeader" });

    //   Criar uma tabela para armazenar as perguntas e respostas
    const table = {
      table: {
        widths: [400, "*"], // Largura das colunas
        body: [["PERGUNTA", "RESPOSTA"]] as string[][], // Corpo da tabela com tipo explícito
      },
      layout: "tableExample", // Layout da tabela
    };

    // // Iterar sobre as perguntas e respostas da seção
    responses[sectionName].forEach((response) => {
      // Adicionar linha na tabela com a pergunta e a resposta
      table.table.body.push([response.question, response.answer]);
    });

    //     // // Adicionar a tabela ao conteúdo do PDF
    content.push(table);
  }

  const docDefinition = {
    content: content, // Conteúdo do PDF
    styles: {
      // Definição de estilos
      sectionHeader: {
        bold: true,

        // margin,
      },
    },
  };
  console.log("respomde satas", responses);
  // Gerar o PDF
  const pdfDoc = pdfMake.createPdf(docDefinition);

  // Baixar o PDF
  pdfDoc.getBlob((blob: any) => {
    saveAs(blob, "relatorio_garantia.pdf");
  });
};

// Exemplo de uso com as respostas fornecidas

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange =
    (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = { ...formData };
      newFormData[questionText] = event.target.value;
      setFormData(newFormData);
    };
  //   const handleChange =
  //     (questionText: string) =>
  //     (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
  //       const newFormData = { ...formData };
  //       newFormData[questionText] = event.target.value;
  //       setFormData(newFormData);
  //     };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Criar um objeto para armazenar as respostas
    const responses: { [key: string]: { question: string; answer: string }[] } =
      {};

    // Iterar sobre as seções
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        // Verificar se a resposta para a pergunta existe
        const answer = formData[question.text] || "";

        // Verificar se a seção já existe no objeto de respostas
        if (!responses[section.name]) {
          // Se não existir, criar um array vazio para essa seção
          responses[section.name] = [];
        }

        // Adicionar a pergunta e resposta ao array da seção correspondente
        responses[section.name].push({ question: question.text, answer });
        // generatePDF(responses);
      });
    });
    generatePDF(responses);

    // Exibir o objeto de respostas no console
    console.log("Perguntas e respostas:", responses);
  };
  return (
    <FormContainer>
      <h1>RELATÓRIO DE GARANTIA RAC</h1>

      <form onSubmit={handleSubmit}>
        {sections.map((section, sectionIndex) => (
          <FormSection key={sectionIndex}>
            <h2>{section.name}</h2>
            {section.questions.map((question, questionIndex) => (
              <div className="questions-class" key={questionIndex}>
                <label>{question.text}</label>

                {Array.isArray(question.options) ? (
                  <RadioButtonsSection>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-form-control-label-placement"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            value={option}
                            control={
                              <Radio
                                required
                                name={question.text}
                                value={option}
                                checked={formData[question.text] === option}
                                onChange={handleChange(question.text)}
                              />
                            }
                            label={option}
                            labelPlacement="top"
                          />
                        </RadioGroup>
                      </div>
                    ))}
                  </RadioButtonsSection>
                ) : (
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "35ch" },
                    }}
                    noValidate
                    autoComplete="on"
                  >
                    <TextField
                      required
                      id="outlined-basic"
                      variant="outlined"
                      //   label={question.text}
                      value={formData[question.text] || ""}
                      onChange={handleChange(question.text)}
                    />
                  </Box>
                )}
              </div>
            ))}
          </FormSection>
        ))}
        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>
    </FormContainer>
  );
};
const RadioButtonsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: auto; */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  label {
    margin: 10px;
    font-weight: 500;
  }

  .questions-class {
    background-color: #c5c5c568;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 5px;
  }
`;

const SubmitButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`;
export default FormComponent;

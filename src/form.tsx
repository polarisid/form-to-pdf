import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Question {
  text: string;
  options: string | string[];
}

const questions: Question[] = [
  { text: "QUAL A ORDEM DE SERVIÇO?", options: "" },
  { text: "QUAL SERIAL DO PRODUTO COM DEFEITO?", options: "" },
  { text: "QUAL MODELO DO PRODUTO COM DEFEITO?", options: "" },
  {
    text: "A TUBULAÇÃO DE COBRE POR QUEM FOI INSTALADA?",
    options: ["Instalador", "Construtora"],
  },
  { text: "NOME DA EMPRESA QUE INSTALOU OS TUBOS DE COBRE:", options: "" },
  { text: "NOME DA EMPRESA QUE INSTALOU OS ARCONDICIONADO:", options: "" },
  {
    text: "O PRODUTO CHEGOU A FUNCIONAR EM ALGUM MOMENTO?",
    options: ["SIM", "NÃO"],
  },
  { text: "A QUANTO TEMPO OCORRE O PRODBLEMA:", options: "" },
];

const generatePDF = (responses: { [key: string]: string }) => {
  //   const docDefinition = {
  //     content: [
  //       { text: "Respostas do Formulário", style: "header" },
  //       { text: "\n" },
  //     ],
  //   };

  console.log(responses);
  const docDefinition = {
    content: [
      {
        text: "Relatorio RAC :" + responses["QUAL A ORDEM DE SERVIÇO?"],
        style: "header",
      },
      { text: "\n" },
      {
        table: {
          headerRows: 1,
          //   widths: ["*", "*"],
          body: [
            ["Pergunta", "Resposta"],
            ...questions.map((question) => [
              question.text,
              responses[question.text],
            ]),
          ],
        },
      },
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download("relatorio" + responses["QUAL A ORDEM DE SERVIÇO?"] + ".pdf");
};
const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange =
    (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = { ...formData };
      newFormData[questionText] = event.target.value;
      setFormData(newFormData);
    };

  const renderOptions = (questionText: string, options: string | string[]) => {
    if (Array.isArray(options)) {
      return (
        <div className="flex">
          {options.map((option, i) => (
            <label key={i}>
              <RadioGroupStyled
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
                      name={questionText}
                      value={option}
                      checked={formData[questionText] === option}
                      onChange={handleChange(questionText)}
                    />
                  }
                  label={option}
                  labelPlacement="top"
                />
              </RadioGroupStyled>
              {/* <input
                type="radio"
                name={questionText}
                value={option}
                checked={formData[questionText] === option}
                onChange={handleChange(questionText)}
              /> */}
              {/* {option} */}
            </label>
          ))}
        </div>
      );
    } else {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="on"
        >
          <TextField
            required
            id="outlined-basic"
            label={questionText}
            variant="outlined"
            value={formData[questionText] || ""}
            onChange={handleChange(questionText)}
            // placeholder={questionText}
          />
        </Box>

        // <input
        //   type="text"
        //   value={formData[questionText] || ""}
        //   onChange={handleChange(questionText)}
        //   placeholder={questionText}
        // />
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responses: { [key: string]: string } = {};
    questions.forEach((question) => {
      if (question.options && question.options !== "") {
        responses[question.text] = formData[question.text];
      } else {
        responses[question.text] = formData[question.text] || "";
      }
    });
    generatePDF(responses);
    console.log("Perguntas e respostas:", responses);
    // Aqui você pode enviar os dados do formulário para onde for necessário
  };

  return (
    <FormContainer>
      <h1>RELATÓRIO DE GARANTIA RAC</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="optionBox">
            <label className="labelText">{question.text}</label>
            {renderOptions(question.text, question.options)}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
`;

const FormContainer = styled.div`
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  background-color: #e6e6e6;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  align-items: flex-start;
  .labelText {
    width: 100%;
    font-size: 1rem;
  }
  input {
    font-size: 1rem;
    width: auto;
    height: 1.5rem;
    border-radius: 5px;
  }
  .optionBox {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
`;

export default FormComponent;

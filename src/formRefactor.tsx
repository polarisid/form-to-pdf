import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import MainContainer from "./Components/MainContainer";
import { FormDataSections } from "./FormData";
import Header from "./Components/Header";
import PictureSendBox from "./Components/PictureSendBox";
import Imprimir from "./imprimir";
import Footer from "./Components/Footer";
// import OpenAI from "openai";
import axios from "axios";

interface Question {
  text: string;
  options: string | string[];
  conditionalQuestions?: { [answer: string]: Question[] };
}

interface Section {
  name: string;
  questions: Question[];
}

const sections: Section[] = FormDataSections;

// main();

const FormComponent: React.FC = () => {
  const client = axios.create({
    headers: { Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}` },
  });

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [capturedImages, setCapturedImages] = useState<
    { session: string; image: string }[]
  >([]);
  const [selectedSession, setSelectedSession] = useState<string>("");

  const handleCapture = (imageSrc: string) => {
    if (selectedSession) {
      setCapturedImages([
        ...capturedImages,
        { session: selectedSession, image: imageSrc },
      ]);
    } else {
      alert("Por favor, selecione uma sessão para a foto.");
    }
  };

  const handleImageUpload = (files: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (selectedSession) {
        setCapturedImages([
          ...capturedImages,
          { session: selectedSession, image: reader.result as string },
        ]);
      } else {
        alert("Por favor, selecione uma sessão para a foto.");
      }
    };
  };

  const handleChange =
    (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = { ...formData };
      newFormData[questionText] = event.target.value;
      setFormData(newFormData);
    };

  const gatherConditionalResponses = (
    questions: Question[],
    parentResponse: {
      question: string;
      answer: string;
      conditionalQuestions?: any;
    }[]
  ) => {
    questions.forEach((question) => {
      const answer = formData[question.text] || "";
      const questionResponse: {
        question: string;
        answer: string;
        conditionalQuestions?: any;
      } = {
        question: question.text,
        answer,
      };

      if (
        question.conditionalQuestions &&
        question.conditionalQuestions[answer]
      ) {
        questionResponse.conditionalQuestions = [];
        gatherConditionalResponses(
          question.conditionalQuestions[answer],
          questionResponse.conditionalQuestions
        );
      }

      parentResponse.push(questionResponse);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const processQuestions = (questions: Question[], parentResponse: any) => {
      questions.forEach((question) => {
        const answer = formData[question.text] || "";
        parentResponse.push({ question: question.text, answer });

        if (
          question.conditionalQuestions &&
          question.conditionalQuestions[answer]
        ) {
          processQuestions(
            question.conditionalQuestions[answer],
            parentResponse
          );
        }
      });
    };

    const responses: { [key: string]: any[] } = {};

    sections.forEach((section) => {
      if (!responses[section.name]) {
        responses[section.name] = [];
      }
      processQuestions(section.questions, responses[section.name]);
    });

    console.log("Responses:", JSON.stringify(responses, null, 2));
    console.log("Captured Images:", capturedImages);

    Imprimir(responses, capturedImages);
    // main();
  };

  const renderConditionalQuestions = (
    conditionalQuestions: Question[] | undefined
  ) => {
    if (!conditionalQuestions) return null;
    return conditionalQuestions.map((question, index) => (
      <div className="questions-class" key={index}>
        <label>{question.text}</label>
        {Array.isArray(question.options) ? (
          <RadioButtonsSection>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  value={formData[question.text] || ""}
                  onChange={handleChange(question.text)}
                >
                  <FormControlLabel
                    value={option}
                    control={
                      <Radio
                        required
                        name={question.text}
                        value={option}
                        checked={formData[question.text] === option}
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
              value={formData[question.text] || ""}
              onChange={handleChange(question.text)}
            />
          </Box>
        )}
        {renderConditionalQuestions(
          question.conditionalQuestions?.[formData[question.text]]
        )}
      </div>
    ));
  };

  return (
    <>
      <MainContainer>
        <Header />
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
                            value={formData[question.text] || ""}
                            onChange={handleChange(question.text)}
                          >
                            <FormControlLabel
                              value={option}
                              control={
                                <Radio
                                  required
                                  name={question.text}
                                  value={option}
                                  checked={formData[question.text] === option}
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
                        value={formData[question.text] || ""}
                        onChange={handleChange(question.text)}
                        size="small"
                      />
                    </Box>
                  )}
                  {renderConditionalQuestions(
                    question.conditionalQuestions?.[formData[question.text]]
                  )}
                </div>
              ))}
            </FormSection>
          ))}
          <Button type="submit" variant="contained" color="success">
            GERAR PDF
          </Button>
          <PictureSendBox
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            handleCapture={handleCapture}
            capturedImages={capturedImages}
          />
        </form>
      </MainContainer>
      <Footer></Footer>
    </>
  );
};

const RadioButtonsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  label {
    margin: 10px;
    font-weight: 500;
  }

  .questions-class {
    background-color: #8a8a8a1d;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid #bdbdbd68;
  }
`;

export default FormComponent;

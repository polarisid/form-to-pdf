import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { FormDataSections } from "../utils/FormData";
import {
  Header,
  PictureSendBox,
  Footer,
  FormQuestion,
  MainContainer,
} from "../Components";
import Imprimir from "../utils/imprimir";
import { Section, Question } from "../Types/formTypes";
import useForm from "../Hooks/useForm";

const sections: Section[] = FormDataSections;

const FormComponent: React.FC = () => {
  const {
    formData,
    selectedSession,
    setFormData,
    capturedImages,
    setCapturedImages,
    setSelectedSession,
    handleChange,
  } = useForm();

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

  // const handleImageUpload = (files: File[]) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = () => {
  //     if (selectedSession) {
  //       setCapturedImages([
  //         ...capturedImages,
  //         { session: selectedSession, image: reader.result as string },
  //       ]);
  //     } else {
  //       alert("Por favor, selecione uma sessão para a foto.");
  //     }
  //   };
  // };

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
        {/* <LogoStyled><Logo /></LogoStyled */}
        <Header />
        <form onSubmit={handleSubmit}>
          {sections.map((section, sectionIndex) => (
            <FormQuestion
              key={sectionIndex}
              section={section}
              sectionIndex={sectionIndex}
              renderConditionalQuestions={renderConditionalQuestions}
            ></FormQuestion>
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
      <Footer />
    </>
  );
};
const LogoStyled = styled.div`
  align-items: center;
  text-align: center;
`;
const RadioButtonsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FormComponent;

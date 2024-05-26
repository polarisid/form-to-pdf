import React from "react";
import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { FormDataSections } from "../utils/FormData";
import RadioQuestion from "../Components/radioQuestion";
import TextFieldQuestion from "../Components/textQuestion";
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
    capturedImages,
    setCapturedImages,
    setSelectedSession,
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
          <RadioQuestion question={question} />
        ) : (
          <TextFieldQuestion question={question} />
        )}

        {renderConditionalQuestions(
          question.conditionalQuestions?.[formData[question.text]]
        )}
      </div>
    ));
  };

  return (
    <React.Fragment>
      <MainContainer>
        <Header version={"1.1.2"} />
        <StyledForm onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {sections.map((section, sectionIndex) => (
              <Grid item xs={12} key={sectionIndex}>
                <FormQuestion
                  section={section}
                  renderConditionalQuestions={renderConditionalQuestions}
                />
              </Grid>
            ))}
          </Grid>
          <StyledButton type="submit" variant="contained" color="primary">
            GERAR PDF
          </StyledButton>
          <PictureSendBox
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            handleCapture={handleCapture}
            capturedImages={capturedImages}
          />
        </StyledForm>
      </MainContainer>
      <Footer />
    </React.Fragment>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;
export default FormComponent;

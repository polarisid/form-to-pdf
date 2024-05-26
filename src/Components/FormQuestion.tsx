import styled from "styled-components";
import useForm from "../Hooks/useForm";
import { Section, Question } from "../Types/formTypes";
import RadioQuestion from "./radioQuestion";
import TextFieldQuestion from "./textQuestion";

interface FormQuestionProps {
  section: Section;
  renderConditionalQuestions: (questions: Question[]) => JSX.Element[] | null;
}

export default function FormQuestion({
  section,
  renderConditionalQuestions,
}: FormQuestionProps) {
  const { formData, handleChange } = useForm();
  return (
    <>
      <FormSection>
        <h2>{section.name}</h2>
        {section.questions.map((question, questionIndex) => (
          <div className="questions-class" key={questionIndex}>
            <label>{question.text}</label>

            {Array.isArray(question.options) ? (
              <RadioQuestion key={questionIndex} question={question} />
            ) : (
              <TextFieldQuestion key={questionIndex} question={question} />
            )}

            {renderConditionalQuestions(
              question.conditionalQuestions?.[formData[question.text]] || []
            )}
          </div>
        ))}
      </FormSection>
    </>
  );
}

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

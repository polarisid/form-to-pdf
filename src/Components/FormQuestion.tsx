import { TextField, Button, MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import styled from "styled-components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import useForm from "../Hooks/useForm";
import { Section, Question } from "../Types/formTypes";

interface FormQuestionProps {
  section: Section;
  sectionIndex: number;
  renderConditionalQuestions: (questions: Question[]) => JSX.Element[] | null;
}

export default function FormQuestion({
  section,
  sectionIndex,
  renderConditionalQuestions,
}: FormQuestionProps) {
  const {
    formData,
    selectedSession,
    setFormData,
    capturedImages,
    setCapturedImages,
    setSelectedSession,
    handleChange,
  } = useForm();
  return (
    <>
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
              question.conditionalQuestions?.[formData[question.text]] || []
            )}
          </div>
        ))}
      </FormSection>
    </>
  );
}

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

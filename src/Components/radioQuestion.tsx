import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";
import useForm from "../Hooks/useForm";
import { Question } from "../Types/formTypes";

interface RadioQuestionProps {
  question: Question;
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({ question }) => {
  const { formData, handleChange } = useForm();

  return (
    <RadioButtonsSection>
      {(Array.isArray(question.options)
        ? question.options
        : [question.options]
      ).map((option: string, optionIndex: number) => (
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
  );
};

const RadioButtonsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RadioQuestion;

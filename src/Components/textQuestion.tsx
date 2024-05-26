import React from "react";
import { TextField, Box } from "@mui/material";
import useForm from "../Hooks/useForm";
import { Question } from "../Types/formTypes";

interface TextFieldQuestionProps {
  question: Question;
}

const TextFieldQuestion: React.FC<TextFieldQuestionProps> = ({ question }) => {
  const { formData, handleChange } = useForm();

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
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
  );
};

export default TextFieldQuestion;

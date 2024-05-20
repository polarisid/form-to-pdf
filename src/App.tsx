import React, { useState } from "react";
import Imprimir from "./imprimir";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
// import FormComponent from "./form";
import FormComponent from "./formRefactor";
function App() {
  return (
    <div className="App">
      <FormComponent></FormComponent>
    </div>
  );
}

export default App;

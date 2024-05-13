import React, { useState } from "react";
import Imprimir from "./imprimir";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
// import FormComponent from "./form";
import FormComponent from "./formRefactor";
function App() {
  // type FormFields = {
  //   Q1: string;
  //   Q2: string;
  //   Q3: string;
  //   Q4: string;
  //   Q5: string;
  // };

  // const onSubmit: SubmitHandler<FormFields> = (data) => {
  //   Imprimir(data);
  // };
  // const { register, handleSubmit } = useForm<FormFields>();

  return (
    <div className="App">
      {/* <form className="form" onSubmit={handleSubmit(onSubmit)}> */}
      <FormComponent></FormComponent>
      {/* <input
          {...register("Q1")}
          type="text"
          name="Q1"
          id="Q1"
          placeholder="SERIAL"
        />
        <input
          {...register("Q2")}
          type="text"
          name="Q2"
          id="Q2"
          placeholder="MODELO"
        />
        <label htmlFor="Q3">QUEM INSTALOU A TUBULAÇÃO?</label>
        <input
          {...register("Q3")}
          type="radio"
          name="Q3"
          id="Q3"
          value={"INSTALADOR"}
        />{" "}
        INSTALADOR
        <input
          {...register("Q3")}
          type="radio"
          name="Q3"
          id="Q3"
          value={"CONSTRUTORA"}
        />
        CONSTRUTORA */}
      {/* <button type="submit"> Enviar</button>
      </form> */}
    </div>
  );
}

export default App;

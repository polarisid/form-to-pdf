import { useContext } from "react";
import { FormContext } from "../Contexts/formContext";

export default function useAuth() {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("useAuth must be used inside a AuthContext Provider");
  }

  return formContext;
}

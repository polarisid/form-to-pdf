import { createContext, useState, ReactNode } from "react";

export const FormContext = createContext<FormContextType | null>(null);

// const LOCAL_STORAGE_KEY = "produapp-token";
// const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

interface FormContextType {
  formData: { [key: string]: string };
  selectedSession: string;
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  capturedImages: { session: string; image: string }[];
  setCapturedImages: React.Dispatch<
    React.SetStateAction<{ session: string; image: string }[]>
  >;
  setSelectedSession: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    questionText: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormProviderProps {
  children: ReactNode;
}
export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [capturedImages, setCapturedImages] = useState<
    { session: string; image: string }[]
  >([]);
  const [selectedSession, setSelectedSession] = useState<string>("");

  const handleChange =
    (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = { ...formData };
      newFormData[questionText] = event.target.value;
      setFormData(newFormData);
    };

  //   function signIn(token) {
  //     setToken(token);
  //     localStorage.setItem(LOCAL_STORAGE_KEY, token);
  //   }

  //   function signOut() {
  //     setToken(null);
  //     localStorage.removeItem(LOCAL_STORAGE_KEY);
  //   }

  return (
    <FormContext.Provider
      value={{
        formData,
        selectedSession,
        setFormData,
        capturedImages,
        setCapturedImages,
        setSelectedSession,
        handleChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// import { createContext, useState, ReactNode } from "react";

// export const FormContext = createContext<FormContextType | null>(null);

// interface FormContextType {
//   formData: { [key: string]: string };
//   selectedSession: string;
//   setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
//   capturedImages: { session: string; image: string }[];
//   setCapturedImages: React.Dispatch<React.SetStateAction<{ session: string; image: string }[]>>;
//   setSelectedSession: React.Dispatch<React.SetStateAction<string>>;
//   handleChange: (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Remova o ponto e vírgula duplicado
// }

// interface FormProviderProps {
//   children: ReactNode;
// }

// export function FormProvider({ children }: FormProviderProps) {
//   const [formData, setFormData] = useState<{ [key: string]: string }>({});
//   const [capturedImages, setCapturedImages] = useState<{ session: string; image: string }[]>([]);
//   const [selectedSession, setSelectedSession] = useState<string>("");

//   const handleChange = (questionText: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newFormData = { ...formData };
//     newFormData[questionText] = event.target.value;
//     setFormData(newFormData);
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         formData,
//         selectedSession,
//         setFormData,
//         capturedImages,
//         setCapturedImages,
//         setSelectedSession,
//         handleChange,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// }

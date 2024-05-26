import "./App.css";
import React, { useState } from "react";
import { FormProvider } from "./Contexts/formContext";
import Logo from "./assets/logo";
import FormComponent from "./Pages/formPage";
function App() {
  const [showContent, setShowContent] = useState(false);

  const handleAnimationEnd = () => {
    setShowContent(true);
  };

  return (
    <FormProvider>
      {!showContent && <Logo onAnimationEnd={handleAnimationEnd} />}
      {showContent && (
        <div className="content">
          <div className="App">
            <FormComponent />
          </div>
        </div>
      )}
    </FormProvider>
  );
}

export default App;

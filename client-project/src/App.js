import { Button } from "@mui/material";
import React, { useState } from "react";
import { Users } from "./components/users/users";

const App = () => {
  const [saludo, setSaludo] = useState("");
  const handleSetSaludo = () => {
    setSaludo("Hola desde React App");
  };
  return (
    <>
      <Button onClick={handleSetSaludo}>
        Login
      </Button>
      <h1>Registro</h1>
      <Users />
    </>
  );
};

export default App;
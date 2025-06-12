import { Container } from "@mui/material";
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ( {label , onClick }) => {
  return (
    <Container className="div-button">
      <button  onClick={onClick} className="button">
        {label}
      </button>
    </Container>
  );
};

export default Button;

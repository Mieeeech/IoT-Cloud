import React from "react";
import { Container, TextField } from "@mui/material";
import { Theme } from "@mui/system";
import { textStyleColor } from "../style";

interface TextFieldProps {
  props: string;
}

const Textfield: React.FC<TextFieldProps> = (props) => {
  //const classes = useStyles();
  console.log(props.props);
  return (
    <>
      <TextField
        className="field-text"
        value={props.props}
        sx={textStyleColor}
      />
    </>
  );
};
export default Textfield;

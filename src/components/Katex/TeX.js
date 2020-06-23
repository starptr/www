import React from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

const Tex = props => <TeX {...props}>{props.children}</TeX>;

export default Tex;

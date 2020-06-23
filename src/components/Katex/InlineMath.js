import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const InlineMath = props => <InlineMath>{props.children}</InlineMath>;

export default InlineMath;

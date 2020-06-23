import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const BlockMath = props => <BlockMath>{props.children}</BlockMath>;

export default BlockMath;

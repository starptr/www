import React from "react";
import loadable from "@loadable/component";

const Index = loadable(() => import("./Calc"));

export default Index;

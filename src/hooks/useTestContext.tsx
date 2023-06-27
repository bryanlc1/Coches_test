import { useContext } from "react";
import testContext from "../context/testContext";
import { TestContext } from "../types";
export default () => {
  return useContext(testContext) as TestContext;
};

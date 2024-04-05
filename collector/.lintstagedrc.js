import baseConfig from "../.lintstagedrc.js";

const config = structuredClone(baseConfig);
config["*"].unshift("eslint --fix");

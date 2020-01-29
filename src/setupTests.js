import "@testing-library/jest-dom/extend-expect";

const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

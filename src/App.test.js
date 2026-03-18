// ❗ DO NOT import anything before mock

jest.mock("./services/DonorService", () => ({
  __esModule: true,
  default: {
    getAllDonors: () => Promise.resolve({ data: [] }),
  },
}));

import { render } from "@testing-library/react";
import App from "./App";

test("renders app safely", () => {
  render(<App />);
});
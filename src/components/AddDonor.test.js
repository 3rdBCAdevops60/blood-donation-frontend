jest.mock('../services/DonorService', () => ({
  addDonor: jest.fn(() => Promise.resolve({ data: {} }))
}));

import { render } from "@testing-library/react";
import AddDonor from "./AddDonor";

test("renders AddDonor component", () => {
  render(<AddDonor />);
});
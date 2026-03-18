import { render } from "@testing-library/react";
import DonorList from "./DonorList";

// Mock service
jest.mock("../services/DonorService", () => ({
  getAllDonors: () =>
    Promise.resolve({ data: [] })
}));

test("renders DonorList without crashing", () => {
  render(<DonorList />);
});
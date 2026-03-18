import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddDonor from "./AddDonor";
import DonorService from "../services/DonorService";

jest.mock("../services/DonorService", () => ({
  __esModule: true,
  default: {
    addDonor: jest.fn(),
  },
}));

describe("AddDonor", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  test("submits donor details", async () => {
    DonorService.addDonor.mockResolvedValue({ data: {} });

    render(<AddDonor />);

    await userEvent.type(screen.getByPlaceholderText("Name"), "Alice");
    await userEvent.type(screen.getByPlaceholderText("Blood Group"), "O+");
    await userEvent.type(screen.getByPlaceholderText("City"), "Dallas");

    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => expect(DonorService.addDonor).toHaveBeenCalledWith({
      name: "Alice",
      bloodGroup: "O+",
      city: "Dallas",
      available: true,
    }));
    expect(alertSpy).toHaveBeenCalledWith("Donor Added Successfully");
  });
});

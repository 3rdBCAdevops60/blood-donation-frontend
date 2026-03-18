import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import DonorList from "./DonorList";
import DonorService from "../services/DonorService";

jest.mock("../services/DonorService", () => ({
  __esModule: true,
  default: {
    getAllDonors: jest.fn(),
    addDonor: jest.fn(),
    deleteDonor: jest.fn(),
    updateDonor: jest.fn(),
  },
}));

const sampleDonors = [
  { id: 1, name: "John Doe", bloodGroup: "A+", city: "NYC", available: true },
  { id: 2, name: "Jane Smith", bloodGroup: "B-", city: "LA", available: false },
];

describe("DonorList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithData = (donors = sampleDonors) => {
    DonorService.getAllDonors.mockResolvedValue({ data: donors });
    return render(<DonorList />);
  };

  const rowFor = (name) => {
    const cell = screen.getByText(name);
    return cell.closest("tr");
  };

  test("loads donors on mount", async () => {
    renderWithData();

    await waitFor(() => expect(DonorService.getAllDonors).toHaveBeenCalled());
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
  });

  test("adds a donor and reloads list", async () => {
    const updated = [...sampleDonors, { id: 3, name: "Chris Pine", bloodGroup: "O+", city: "SF", available: true }];
    DonorService.getAllDonors
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: updated });
    DonorService.addDonor.mockResolvedValue({ data: {} });

    render(<DonorList />);

    await waitFor(() => expect(DonorService.getAllDonors).toHaveBeenCalledTimes(1));

    await userEvent.type(screen.getByPlaceholderText("Name"), "Chris Pine");
    await userEvent.type(screen.getByPlaceholderText("Blood Group"), "O+");
    await userEvent.type(screen.getByPlaceholderText("City"), "SF");
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /add/i }));
    });

    await waitFor(() => expect(DonorService.addDonor).toHaveBeenCalledWith({
      name: "Chris Pine",
      bloodGroup: "O+",
      city: "SF",
      available: true,
    }));

    await waitFor(() => expect(DonorService.getAllDonors).toHaveBeenCalledTimes(2));
    expect(await screen.findByText("Chris Pine")).toBeInTheDocument();
  });

  test("filters donors by blood group", async () => {
    renderWithData();

    await screen.findByText("Jane Smith");

    await userEvent.selectOptions(screen.getByRole("combobox"), "A+");

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  test("toggles availability", async () => {
    DonorService.updateDonor.mockResolvedValue({});
    renderWithData();

    await screen.findByText("John Doe");
    const row = rowFor("John Doe");
    const toggleBtn = within(row).getByRole("button", { name: /toggle/i });

    await act(async () => {
      await userEvent.click(toggleBtn);
    });

    await waitFor(() => expect(DonorService.updateDonor).toHaveBeenCalledWith(
      1,
      { ...sampleDonors[0], available: false }
    ));
  });

  test("deletes a donor", async () => {
    DonorService.deleteDonor.mockResolvedValue({});
    renderWithData();

    await screen.findByText("Jane Smith");
    const row = rowFor("Jane Smith");
    const deleteBtn = within(row).getByRole("button", { name: /delete/i });

    await act(async () => {
      await userEvent.click(deleteBtn);
    });

    await waitFor(() => expect(DonorService.deleteDonor).toHaveBeenCalledWith(2));
  });

  test("edits a donor", async () => {
    DonorService.updateDonor.mockResolvedValue({});
    renderWithData();

    await screen.findByText("Jane Smith");
    const row = rowFor("Jane Smith");
    const editBtn = within(row).getByRole("button", { name: /edit/i });

    await act(async () => {
      await userEvent.click(editBtn);
    });

    const nameInput = screen.getAllByDisplayValue("Jane Smith")[0];
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Jane Updated");

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /^save$/i }));
    });

    await waitFor(() => expect(DonorService.updateDonor).toHaveBeenCalledWith(
      2,
      { ...sampleDonors[1], name: "Jane Updated" }
    ));
  });
});

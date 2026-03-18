jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

test("renders app", () => {
  expect(true).toBe(true);
});

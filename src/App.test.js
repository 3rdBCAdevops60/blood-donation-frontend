jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

test("basic test", () => {
  expect(true).toBe(true);
});

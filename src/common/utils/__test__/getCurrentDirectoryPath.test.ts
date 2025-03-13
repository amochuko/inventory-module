import { getCurrentDirectoryPath } from "../getCurrentDirectoryPath";

describe("getCurrentDirectoryPath", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return absolute path", () => {
    const dirname = getCurrentDirectoryPath();

    expect(dirname).toBeDefined();
    expect(dirname).toContain(
      "/Users/Ogheneochuko/GitHub/express-yoga/src/common/utils"
    );
  });

  it("should relative path correctly", () => {
    const dirname = getCurrentDirectoryPath();
    const relativePath = "./test.txt";

    expect(dirname).not.toContain(relativePath);
  });

  test("should throw error for invalid path", () => {
    jest.spyOn(console, "error");
    const invalidPath = getCurrentDirectoryPath();

    expect(console.error).not.toHaveBeenCalled();
  });
});

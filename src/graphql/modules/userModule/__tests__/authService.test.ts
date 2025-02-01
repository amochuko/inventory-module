import { AuthService } from "../auth.service";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  it("has authenticate method return true", async () => {
    const res = authService.authenticate("admin", "12345");
    expect(res).toBeTruthy();
  });

  it("has authenticate method return false", async () => {
    const res = authService.authenticate("jondoe", "bwuay");
    expect(res).not.toBeTruthy();
  });
});

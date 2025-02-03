import { AuthService } from "../../../../common/services/auth.service";
import { UserService } from "../user.service";

describe("UserService", () => {
  let authService: AuthService;
  let userCtrl: UserService;

  beforeEach(() => {
    authService = new AuthService();
    userCtrl = new UserService(authService);
  });

  it('should return "Login successful" when authentication succeeds', () => {
    jest.spyOn(authService, "authenticate");
    const login = userCtrl.login("admin", "12345");

    expect(authService.authenticate).toHaveBeenCalledWith("admin", "12345");
    expect(login).toBe("Login successful.");
  });

  it('should return "Not authenticated!" when authentication fails', () => {
    jest.spyOn(authService, "authenticate");
    const login = userCtrl.login("jon", "z1009");

    expect(authService.authenticate).toHaveBeenCalledWith("jon", "z1009");
    expect(login).toBe("Not authenticated!");
  });
});

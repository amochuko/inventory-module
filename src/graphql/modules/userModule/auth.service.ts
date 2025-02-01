/**
 * This class contains authentication related methods
 */
export class AuthService {
  private isActive: boolean = false;

  authenticate(username: string, password: string) {
    // TODO: replace this simulated logic

    if (username === "admin" && password === "12345") {
      this.isActive = true;
      return true;
    }

    return false;
  }

  isLoggedIn() {
    return true;
  }
}

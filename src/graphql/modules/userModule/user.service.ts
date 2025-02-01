import { AuthService } from "./auth.service";

export class UserService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  login(username: string, password: string) {
    const res = this.authService.authenticate(username, password);

    return res ? "Login successful." : "Not authenticated!";
  }
}

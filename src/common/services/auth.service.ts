import { ExecutionContext, Injectable } from "graphql-modules";

/**
 * This class contains authentication related methods
 */

@Injectable()
export class AuthService {
  private isActive: boolean = false;

  constructor() {}

  @ExecutionContext()
  // Use to get access to the GraphQL execution context
  private ctx!: ExecutionContext;

  authenticate(username: string, password: string) {
    // TODO: replace this simulated logic

    if (username === "admin" && password === "12345") {
      this.isActive = true;
      return true;
    }

    return false;
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((res, rej) => res(true));
  }

  getCurrentUser() {
    return {
      id: "101",
      username: "adamsmither",
    };
  }
}

import { Injectable } from "graphql-modules";
import { AuthService } from "./auth.service";

@Injectable()
export class PostService {
  constructor(private auth: AuthService) {}

  allPosts() {
    // if (!this.auth.isLoggedIn()) {
    //   throw new Error("Auth required.");
    // }

    return [
      {
        id: "id_" + Date.now(),
        title: "Rain Drop",
        content:
          "Consuming InjectionToken is very similar to Service. The only difference is that you need to use @Inject decorator but only in some cases.",
        createdAt: Date.now(),
      },
    ];
  }
}

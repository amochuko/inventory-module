import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { feedModule } from "./feed/feed.module";
import { infoModule } from "./info/info.module";
import { userModule } from "./user/user.module";

export const appModules = createApplication({
  modules: [infoModule, userModule, feedModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});

//TODO: Reaserch the benefits of Dataloader

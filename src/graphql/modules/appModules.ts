import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { infoModule } from "./infoModule/infoModule";
import { userModule } from "./userModule";
import { feedModule } from "./feedModule/feedModule";

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

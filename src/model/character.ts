import { Episode } from "../common/utils/types";

export default class Character {
  public id: string;

  constructor(
    public name: string,
    public age: number,
    public episode: Episode
  ) {
    this.name = name;
    this.age = age;
    this.id = name + "-" + Math.ceil((Math.random() * 100) / 10);
    this.episode = episode;
  }
}

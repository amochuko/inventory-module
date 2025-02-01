import "reflect-metadata";
import { Injectable } from "graphql-modules";

@Injectable()
export class DataService {
  age() {
    return `23 years old`;
  }
}

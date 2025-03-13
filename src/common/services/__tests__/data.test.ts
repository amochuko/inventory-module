// import { DataService } from "../data.service";

import { DataService } from "../data.service.js";

describe("DataService", () => {
  let dataService: DataService;

  beforeEach(() => {
    dataService = new DataService();
  });

  it("should return age", () => {
    const age = dataService.age();
    expect(age).toBe("23 years old");
  });
});

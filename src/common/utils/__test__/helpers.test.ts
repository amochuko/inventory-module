import { getAbbrevationCodeFromName } from "../helpers";

describe("Helper testing", () => {
  it("should return combination of first 3 characters, a dash and number length of the name, if name is single word", () => {
    const name = "Electronics";
    const res = getAbbrevationCodeFromName(name);
    const expectation = `ELE-${name.length}`;

    expect(res).toBe(expectation);
  });

  it("should return combination of first characters from each word, a dash and number length of the name, if name is not a single word", () => {
    const name = "Electronics and Gadgets";
    const res = getAbbrevationCodeFromName(name);

    const expectation = `EAG-${name.length}`;

    expect(res).toBe(expectation);
  });
});

import * as pkg from "../src/index";

describe("e2e: package barrel (index)", () => {
  test("exports expected public surface", () => {
    expect(pkg.LightningAddress).toBeDefined();
    expect(pkg.Invoice).toBeDefined();
    expect(pkg.fetchWithL402).toBeDefined();
    expect(pkg.getFiatCurrencies).toBeDefined();
  });
});

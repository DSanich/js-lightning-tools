import { readFileSync } from "fs";
import { join } from "path";
import fetchMock from "jest-fetch-mock";
import { LightningAddress } from "../src/lnurl";
import { Invoice } from "../src/bolt11";

const fixtureDir = join(process.cwd(), "e2e", "fixtures");
const fixture = (name: string) =>
  readFileSync(join(fixtureDir, name), "utf-8");

describe("e2e: LNURL + bolt11 (package imports)", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("requestInvoice then decode same PR with Invoice", async () => {
    fetchMock.mockResponseOnce(fixture("lightning-address-details.json"));
    fetchMock.mockResponseOnce(fixture("generate-invoice.json"));

    const ln = new LightningAddress("hello@getalby.com");
    await ln.fetch();
    const invoice = await ln.requestInvoice({ satoshi: 1000 });

    expect(invoice.paymentRequest).toContain("lnbc");
    expect(invoice.successAction?.tag).toBe("message");

    const decoded = new Invoice({ pr: invoice.paymentRequest });
    expect(decoded.paymentHash).toBe(invoice.paymentHash);
    expect(decoded.satoshi).toBe(invoice.satoshi);
  });
});

const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  test("Returns the literal '0' when given null input", () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe('0');
  });

  test("Returns the literal '0' when given undefined input", () => {
    const result = deterministicPartitionKey(undefined);
    expect(result).toBe('0');
  });

  test("Returns partition key from event if present", () => {
    const result = deterministicPartitionKey({ partitionKey: 'my-key' });
    expect(result).toBe('my-key');
  });

  test("Returns deterministic partition key for non-trivial input", () => {
    const event = { key: 'cbh' };
    const hash = 'a4c11616f58ed78eb78504af9602a9c1631cf00b1f5026103df144e722bd5b5f0565408e2681afc1da4698c2d1873d83f5036025ba754b40a357ee85f0f9a383';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  test("Returns deterministic partition key even if already a string", () => {
    const event = 'my-event';
    const hash = 'b83b20ff3cefe2f04c81f5039e9b5c7f650a2d649ae8d15da5914add9cc1c684a3851151857228a2d53fdd453cf9d24009154d9bb2083bb06435bb9943f3dd4e';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  test("Returns shortened deterministic partition key for long input", () => {
    const event = { key: 'cbh'.repeat(9999) };
    const hash = '163114c1bb42f795c72082cbb387e5de66eca584adf069ffee8e7df4c81be0a040e302edc3f2d061dff295271594f7ad64891a28913c053e73099dab76e41b01';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
    expect(result.length).toBeLessThanOrEqual(256);
  });

});

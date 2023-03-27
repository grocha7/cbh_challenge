const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("Returns the literal '0' when given empty input", () => {
    const result = deterministicPartitionKey({});
    expect(result).toBe('0');
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
    const event = { foo: 'bar' };
    const hash = 'anyHash';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  test("Returns deterministic partition key even if already a string", () => {
    const event = 'my-event';
    const hash = 'anyHash';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  test("Returns shortened deterministic partition key for long input", () => {
    const event = { foo: 'bar'.repeat(1000) };
    const hash = 'anyHash';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
    expect(result.length).toBeLessThanOrEqual(256);
  });

});

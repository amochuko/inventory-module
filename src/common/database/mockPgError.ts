type MockPgErrorArgs = {
  code: string;
  message: string;
};

export function mockPgError({ code, message }: MockPgErrorArgs): any {
  return { code, message };
}

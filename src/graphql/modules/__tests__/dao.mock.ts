export const mockFindById = (dao: any, returnValue: any) => {
  return jest.spyOn(dao, "findById").mockResolvedValue(returnValue);
};

export const mockSql = (result: Partial<{ rowCount: number; rows: any[] }>) => {
  const sql = jest.fn().mockResolvedValue(result);

  return sql;
};

//TODO: You should also export mockSqlReject or mockFindByIdReject for error cases later.

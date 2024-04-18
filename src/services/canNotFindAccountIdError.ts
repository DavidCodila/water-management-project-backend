export function canNotFindAccountIdError(res: any, id: string): void {
  res.status(500);
  res.send({ error: "Could not find id: " + id });
}

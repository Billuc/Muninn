export function getOneParam(paramValue: string | string[]): string {
  return typeof paramValue === "string" ? paramValue : paramValue[0] ?? "";
}

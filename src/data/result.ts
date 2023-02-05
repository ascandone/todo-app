export type Result<T, E = string> =
  | { type: "ok"; value: T }
  | { type: "error"; error: E };

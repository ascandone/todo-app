import { Result } from "src/data/result";

export class ValidationPipe<From, To, Err = string> {
  constructor(public readonly validate: (from: From) => Result<To, Err>) {}

  // pipe() {}
}

const anyString = new ValidationPipe<string, string>((value) => ({
  type: "ok",
  value,
}));

export class ValidationError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export const validate = <T>(field: string, validator: () => T): Result<T> => {
  try {
    return { type: "ok", value: validator() };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { type: "error", error: error.message };
    }

    throw error;
  }
};

// utils

const requiredField = (field: string) => {
  if (field === "") {
    throw new ValidationError("Required field");
  }
};

export abstract class BaseEntity<T> {
  constructor() {}

  validateProps(
    options: T,
    requiredFields: (keyof T)[],
    customValidations?: (options: T) => void
  ) {
    for (const field of requiredFields) {
      if (!options[field]) {
        throw new Error(
          `'${String(field).toUpperCase()}' is required and must be valid.`
        );
      }
    }

    if (customValidations) {
      customValidations(options);
    }

    return options;
  }
}

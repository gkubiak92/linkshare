import z from "zod";

z.setErrorMap((issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === "string") {
        return { message: "validators.invalidString" };
      } else if (issue.expected === "number") {
        return { message: "validators.invalidNumber" };
      } else {
        return { message: "validators.invalidType" };
      }
    case z.ZodIssueCode.custom:
      return { message: issue.message || "validators.customError" };
    case z.ZodIssueCode.invalid_union:
      return { message: "validators.invalidUnion" };
    case z.ZodIssueCode.invalid_enum_value:
      return { message: "validators.invalidEnumValue" };
    case z.ZodIssueCode.unrecognized_keys:
      return { message: "validators.unrecognizedKeys" };
    case z.ZodIssueCode.invalid_arguments:
      return { message: "validators.invalidArguments" };
    case z.ZodIssueCode.invalid_return_type:
      return { message: "validators.invalidReturnType" };
    case z.ZodIssueCode.invalid_date:
      return { message: "validators.invalidDate" };
    case z.ZodIssueCode.invalid_string:
      return { message: "validators.invalidString" };
    case z.ZodIssueCode.too_small:
      return { message: "validators.tooSmall" };
    case z.ZodIssueCode.too_big:
      return { message: "validators.tooBig" };
    case z.ZodIssueCode.invalid_intersection_types:
      return { message: "validators.invalidIntersectionTypes" };
    case z.ZodIssueCode.not_multiple_of:
      return { message: "validators.notMultipleOf" };
    case z.ZodIssueCode.not_finite:
      return { message: "validators.notFinite" };
    default:
      return { message: ctx.defaultError };
  }
});

export { z };

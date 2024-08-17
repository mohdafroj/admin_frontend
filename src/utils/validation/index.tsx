function textFieldValidation(input: string) {
  const withoutSpecialChars = input.replace(/[^\w\s]/gi, "");
  const cleanedString = withoutSpecialChars.replace(/\s+/g, " ").trim();
  return cleanedString;
}

export { textFieldValidation };

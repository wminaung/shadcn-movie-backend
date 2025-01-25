module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "node", // Use 'node' for non-React tests
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.ts"], // Look for test files with .test.ts extension
};

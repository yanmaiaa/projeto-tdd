module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'], //qualquer arquivo de qualquer pasta que for do tipo typescript eu vou querer cobertura de testes
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node", // o padrão vindo foi esse ==> testEnvironment: "jest-environment-node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

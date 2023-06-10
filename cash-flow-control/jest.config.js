export default {
  roots: ['<rootDir>/cash-flow-control/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/cash-flow-control/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
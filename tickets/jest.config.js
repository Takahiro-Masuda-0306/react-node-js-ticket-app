module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
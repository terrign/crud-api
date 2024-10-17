export default {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  restoreMocks: false,
  resetMocks: false,
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: { '^.+\\.ts?$': '@swc/jest' },
};

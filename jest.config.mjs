import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/interface/(.*)$': '<rootDir>/src/interface/$1',
    '^@/validation/(.*)$': '<rootDir>/src/validation/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy' 
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }], 
    '^.+\\.(js|jsx|mjs)$': 'babel-jest', 
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default createJestConfig(customJestConfig);

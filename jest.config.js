const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/types/**',
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/not-found.tsx',
    '!src/middleware.ts',
  ],

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/public/',
    '/tests/',
  ],

  coverageProvider: 'v8',

  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
    'html',
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  testEnvironment: 'jest-environment-jsdom',

  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',

    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@/schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/providers/(.*)$': '<rootDir>/src/providers/$1',
  },

  moduleDirectories: ['node_modules', '<rootDir>/'],

  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/public/',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  verbose: true,

  watchPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
  ],

  maxWorkers: '50%',

  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
  ],

  testTimeout: 30000,

  bail: 0,

  slowTestThreshold: 5,

  errorOnDeprecated: true,

  snapshotResolver: undefined,

  notify: false,

}

module.exports = createJestConfig(config)
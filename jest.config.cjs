module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": '<rootDir>/__mocks__/styleMock.js',
        "\\.(png|jpg|jpeg|gif|svg)$": '<rootDir>/__mocks__/fileMock.js'
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
    }
};

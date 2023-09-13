module.exports = {
    rootDir: './',
    moduleFileExtensions: ['js', 'json', 'ts'],
    modulePaths: ['<rootDir>'],
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testMatch: ['**/*.spec.ts'],
    snapshotSerializers: ['jest-serializer-raw'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};

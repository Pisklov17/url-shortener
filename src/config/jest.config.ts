module.exports = {
    // The root directory that Jest should search for tests in.
    rootDir: './',
    // An array of file extensions your tests use.
    moduleFileExtensions: ['js', 'json', 'ts'],
    // A list of paths to directories that Jest should use to search for files in.
    modulePaths: ['<rootDir>'],
    // The test environment that will be used for testing.
    testEnvironment: 'node',
    // A list of paths to modules that run some code to configure or set up the testing environment.
    setupFiles: ['dotenv/config'], // If you need to load environment variables

    // A map from regular expressions to paths to transformers.
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },

    // The glob patterns Jest uses to detect test files.
    testMatch: ['**/*.spec.ts'], // Adjust the pattern to match your test file naming convention.

    // A map from regular expressions to paths to snapshot serializers.
    snapshotSerializers: ['jest-serializer-raw'],

    // A list of paths to directories that Jest should use to search for files in.

    // Coverage configuration
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],

    // Additional configuration options...
};

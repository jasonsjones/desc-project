module.exports = {
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/cypress/', '<rootDir>/node_modules/']
};

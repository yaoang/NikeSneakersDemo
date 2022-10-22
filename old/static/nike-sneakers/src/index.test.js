import React from 'react'
const createMockRender = function () {
    return {
        render: jest.fn()
    }
}

jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(createMockRender)
}))

const Index = require('./index').default

describe('Index should be created', function () {
    test('renders Index', async () => {
        expect(Index.render).not.toBeNull()
        expect(Index.render).not.toBeUndefined()
    });
});

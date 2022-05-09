import { render, fireEvent, store } from '../test/test-utils';
import {SneakersList} from './SneakersList';
import React from 'react'
import {STATUS, catelog, sneakers} from '../api/debugApi'
import nock from 'nock'
import App from "../App";

function mockApi() {
    const scope = nock('http://localhost')
        .get('/api/sneakers/getAll')
        .once()
        .reply(200, sneakers)

    return scope
}

describe('SneakersList', () => {
    test('renders list', async () => {
        mockApi()
        const component = render(<SneakersList/>);
        const cell = await component.findByText('Nike Renew Ride 3')
        expect(cell).toBeInTheDocument()
    });
})
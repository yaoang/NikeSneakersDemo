// import { render, screen } from '@testing-library/react';
import { render, fireEvent, store } from './test/test-utils';
import App from './App';
import React from 'react'
import nock from 'nock'
import {sneakers, STATUS} from './api/debugApi'

function mockApi() {
  const scope = nock('http://localhost')
    .get('/api/sneakers/getAll')
    .once()
    .reply(200, sneakers)

  return scope
}

// const createMockRender = function () {
//   return {
//     render: jest.fn(() => ({}))
//   }
// }
//
// jest.mock('react-dom/client', () => ({
//   createRoot: jest.fn(createMockRender)
// }))

// const Index = require('./index').default

describe('App', () => {
  test('renders list', async () => {
    mockApi()
    const component = render(<App />);
    const cell = await component.findByText('Nike Renew Ride 3')
    expect(cell).toBeInTheDocument()
  });

  test('should save buy sneaker when click button ', async () => {
    mockApi()
    const component = render(<App />)
    const button = await component.findAllByText('Buy')
    fireEvent.click(button[0])

    const {sneakers} = store.getState()
    const {buy} = sneakers
    const {id, name, price, currentStatus} = buy
    expect(id).toEqual(1)
    expect(name).toEqual('Nike Air Max 95 SE')
    expect(price > 0).toBeTruthy()
    expect(currentStatus).toEqual(STATUS.MODERATE_STATE)
  })
})

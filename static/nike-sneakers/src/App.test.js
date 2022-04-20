// import { render, screen } from '@testing-library/react';
import { render, fireEvent, store } from './test/test-utils';
import App from './App';
import React from 'react'
// import { Provider } from 'react-redux'
// import store from '../src/store/index'
// import API from './api/index'
import nock from 'nock'
import {sneakers} from './api/debugApi'

function mockApi() {
  const scope = nock('http://localhost')
    .get('/api/sneakers/getAll')
    .once()
    .reply(200, sneakers)

  return scope
}

test('renders list', async () => {
  mockApi()
  const component = render(<App />);
  // console.log(component)
  const cell = await component.findByText('Nike Renew Ride 3')
  // console.log(cell)
  expect(cell).toBeInTheDocument()
});

test('should save buy sneaker when click button ', async () => {
  mockApi()
  const component = render(<App />);
  // console.log(component)
  const button = await component.findAllByText('Buy')
  // console.log(button[0])
  // expect(cell).toBeInTheDocument()
  fireEvent.click(button[0])

  const {sneakers} = store.getState()
  const {buy} = sneakers
  const {id, name, price, currentStatus} = buy
  expect(id).toEqual(1)
  expect(name).toEqual('Nike Air Max 95 SE')
})
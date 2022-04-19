// import { render, screen } from '@testing-library/react';
import { render, fireEvent } from './test/test-utils';
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

test('click button', async () => {
  mockApi()
  const component = render(<App />);
  // console.log(component)
  const button = await component.findByText('Buy')
  // console.log(cell)
  // expect(cell).toBeInTheDocument()
  fireEvent.click(button)
})
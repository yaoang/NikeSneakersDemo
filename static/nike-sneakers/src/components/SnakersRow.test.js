import { render, fireEvent, store } from '../test/test-utils';
import {SneakersRow} from './SnakersRow';
import React from 'react'
import {STATUS, catelog} from '../api/debugApi'
import nock from 'nock'

describe('SneakersRow', () => {
    it('Should render sneakers row', async () => {
        const component = render(<SneakersRow
            id="1"
            name={catelog.MAX_95}
            price="121.00"
            image="max95.jpg"
            currentStatus={STATUS.MODERATE_STATE}
            onSetImg={img => {}}
        />);

        const li = await component.getByText(catelog.MAX_95)
        expect(li).toBeVisible()

        const button = await component.findAllByText('Buy')
        expect(button[0]).toBeVisible()
    })
})
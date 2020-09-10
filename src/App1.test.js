jest.mock('axios');
// __tests__/fetch.test.js
import axios from 'axios'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Fetch from './App'


test('loads and displays greeting', async () => {

    axios.get.mockResolvedValue({data: 'hello world'});
    render(<Fetch url="/greeting" />)

    fireEvent.click(screen.getByText('Load Greeting'))

    //   await waitFor(() => screen.getByRole('heading'))
  
  

    //   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    //   expect(screen.getByRole('button')).toHaveAttribute('disabled')
})

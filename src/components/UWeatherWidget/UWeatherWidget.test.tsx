import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import UWeatherWidget from './UWeatherWidget';
import Search from './Search';

import store from '../../store';

describe('Running Test for UnveelWeather Component', () => {
  const apiKey = 'some key';
  test('Check that widget is correctly rendered', () => {
    render(
      <UWeatherWidget
        openWeatherAPIKey={apiKey}
        theme="light"
        periodicallyRefreshDataInSeconds={30}
      />
    );
    expect(
      screen.findByPlaceholderText('Enter a city and press enter...')
    ).toBeTruthy();
  });

  test('renders the Search component', () => {
    render(
      <Provider store={store}>
        <Search title="city" apiKey={apiKey} />
      </Provider>
    );
    expect(screen.getByPlaceholderText('city')).toBeInTheDocument();
  });
});

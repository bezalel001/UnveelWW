import React from 'react';

import { Provider } from 'react-redux';
import store from '../../store';

import CurrentWeather from './CurrentWeather';

interface UWeatherWidgetProps {
  openWeatherAPIKey: string;
  theme?: string;
  periodicallyRefreshDataInSeconds?: number;
}

const UWeatherWidget: React.FC<UWeatherWidgetProps> = ({
  openWeatherAPIKey,
  theme = 'light',
  periodicallyRefreshDataInSeconds = 30,
}) => {
  return (
    <Provider store={store}>
      <CurrentWeather
        apiKey={openWeatherAPIKey}
        theme={theme}
        periodicallyRefreshDataInSeconds={periodicallyRefreshDataInSeconds}
      />
    </Provider>
  );
};

export default UWeatherWidget;

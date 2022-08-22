import React, { useEffect, useRef, useMemo, useState } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from '../../styles/themes';
import { RootState } from '../../store';
import Search from './Search';
import Alert from './Alert';
import Weather from './Weather';
import { setAlert } from '../../store/actions/alertActions';
import { setError, getWeather } from '../../store/actions/weatherActions';
import { WeatherData } from '../../store/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  max-width: 50%;
  min-height: 20rem;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
  gap: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Loader = styled.h2`
  color: ${(props) => props.color === 'light' && '#2E0509'};
`;

interface CurrentWeatherProps {
  apiKey: string;
  theme?: string;
  periodicallyRefreshDataInSeconds: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = React.memo(
  ({
    apiKey,
    periodicallyRefreshDataInSeconds,
    theme,
  }: CurrentWeatherProps) => {
    const dispatch = useDispatch();
    const weatherData: WeatherData | null = useSelector(
      (state: RootState) => state.weather.data
    );
    const loading = useSelector((state: RootState) => state.weather.loading);
    const error = useSelector((state: RootState) => state.weather.error);
    const alertMsg = useSelector((state: RootState) => state.alert.message);
    const city = useSelector((state: RootState) => state.weather.city);

    const timer = useRef<NodeJS.Timer>();

    const [lastRefreshTime, setLastRefreshTime] = useState(
      new Date().toTimeString()
    );

    useEffect(() => {
      if (city) {
        const refreshInterval = periodicallyRefreshDataInSeconds * 1000;
        timer.current = setInterval(() => {
          dispatch(getWeather(city, apiKey) as AnyAction);
          setLastRefreshTime(new Date().toTimeString());
        }, refreshInterval);
      }

      return () => clearInterval(timer.current);
    }, [city, apiKey, periodicallyRefreshDataInSeconds, dispatch]);

    const today = useMemo(() => {
      console.log('current');
      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const date = new Date();
      const dayOfWeek = dayNames[date.getDay()];
      const dateToday = date.getDate();
      const month = monthNames[date.getMonth()];
      const monthNumber = date.getMonth() + 1;
      const year = date.getFullYear();
      const refreshedAt = date.toTimeString();
      return {
        dayOfWeek,
        dateToday,
        month,
        year,
        monthNumber,
        date,
        refreshedAt,
      };
    }, [lastRefreshTime]);

    return (
      <ThemeProvider theme={{ theme }}>
        <Container>
          <Search title="Enter city name and press enter..." apiKey={apiKey} />

          {loading ? (
            <Loader color={theme}>Loading...</Loader>
          ) : (
            weatherData && (
              <Weather data={weatherData} theme={theme} today={today} />
            )
          )}

          {alertMsg && (
            <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />
          )}
          {error && (
            <Alert message={error} onClose={() => dispatch(setError())} />
          )}
        </Container>
      </ThemeProvider>
    );
  }
);

export default CurrentWeather;

import React, { useMemo, memo } from 'react';
import styled from 'styled-components';

import { WeatherData, Today } from '../../store/types';

const WeatherInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    width: 100%;
`;

const WeatherIcon = styled.img`
  width: 40rem:  
 
  background: ${(props) => props.color === 'light' && '#2E0509'};
  
`;

const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const HeaderCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const HeaderBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
`;
const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const DescriptionSummary = styled.div`
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 300;
`;
const CityTitleStyle = styled.div`
    font-size: 1.5rem;
`;
const DateStyle = styled.div`
    font-size: 1rem;
`;
const CelsiusTemperature = styled.div`
    display: flex;
`;
const Value = styled.div`
    font-size: 7rem;
`;
const Unit = styled.sup`
    font-size: 2rem;
`;

const WeatherInfo = styled.div`
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const DescriptionText = styled.div`
    font-size: 1.3rem;
    font-weight: 300;
    font-style: italic;
`;
const DescriptionValue = styled.div`
    font-weight: 100;
`;
const CurrentDate = styled.div`
    font-weight: 100;
    font-size: 1rem;
`;

const LastReloadTime = styled.div`
    font-weight: 100;
`;

interface WeatherProps {
    data: WeatherData;
    theme?: string;
    today: Today;
}

const Weather: React.FC<WeatherProps> = memo(({ data, theme, today }) => {
    const celsius = useMemo(() => (data.main.temp - 273.15).toFixed(2), [data]);

    return (
        <WeatherInfoContainer>
            <HeaderTop>
                <LocationContainer>
                    <CityTitleStyle>
                        {data.name} - {data.sys.country}
                    </CityTitleStyle>
                    <DateStyle>
                        {today.month} {today.dateToday}, {today.year}
                    </DateStyle>
                </LocationContainer>
                <DescriptionSummary>{data.weather[0].description}</DescriptionSummary>
            </HeaderTop>
            <HeaderCenter>
                <WeatherIcon src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" color={theme} width="10%" />
                <CelsiusTemperature>
                    <Value> {celsius}</Value>
                    <Unit>&#8451;</Unit>
                </CelsiusTemperature>
            </HeaderCenter>
            <HeaderBottom>
                <WeatherInfo>
                    <DescriptionText>type</DescriptionText>
                    <DescriptionValue>{data.weather[0].description}</DescriptionValue>
                </WeatherInfo>
                <WeatherInfo>
                    <DescriptionText>humidity</DescriptionText>
                    <DescriptionValue>{data.main.humidity}%</DescriptionValue>
                </WeatherInfo>
                <WeatherInfo>
                    <DescriptionText>pressure</DescriptionText>
                    <DescriptionValue>{data.main.pressure} Pa</DescriptionValue>
                </WeatherInfo>
                <WeatherInfo>
                    <DescriptionText>wind speed</DescriptionText>
                    <DescriptionValue>{data.wind.speed} km/h</DescriptionValue>
                </WeatherInfo>
            </HeaderBottom>
            <Footer>
                <div>Last reload: </div>
                <CurrentDate>
                    {today.dateToday}/{today.monthNumber}/{today.year},
                </CurrentDate>
                <LastReloadTime>{today.refreshedAt}</LastReloadTime>
            </Footer>
        </WeatherInfoContainer>
    );
});

export default Weather;

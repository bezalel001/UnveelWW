import React from 'react';
import { Story, Meta } from '@storybook/react';

import UWeatherWidget from './UWeatherWidget';
import { UWeatherWidgetProps } from './UWeatherWidget';

export default {
    title: 'Unveel/WeatherWidget',
    component: UWeatherWidget,
    argTypes: {}
} as Meta<typeof UWeatherWidget>;

const Template: Story<UWeatherWidgetProps> = (args) => <UWeatherWidget {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    theme: 'light'
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    theme: 'dark'
};

# PXL8-Stormy-Weather API

## Description

This is a simple API that provides a URL for an image based on the current weather conditions in a specified city. It uses the OpenWeatherMap API to get the weather data and returns an image URL from a pre-defined list of images based on the current weather condition.

## Requirements

Node.js v14.0 or higher
An OpenWeatherMap API key

## Installation

1. Clone the repository:

`git clone https://github.com/your-username/PXL8-Stormy-Weather.git`

2. Install dependencies

`npm install`

3. Create a .env file in the root directory of the project and add your OpenWeatherMap API key:

```
API_KEY=your-api-key
```

## Usage

1. Start the server: `npm run start`

2. Open a web browser and go to http://localhost:3000 to see the current weather image for the default city (Belo Horizonte).

3. If you want to use other images just go on enums and change the images url.

4. If you want to change the city just go on envs and set your city.

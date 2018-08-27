export default [
    {
        condition: (wid) => wid === 800,
        result: 'wi-day-sunny'
    },
    {
        condition: (wid) => wid === 801 || wid === 802,
        result: 'wi-day-cloudy'
    },
    {
        condition: (wid) => wid === 803 || wid === 804,
        result: 'wi-cloudy'
    },
    {
        condition: (wid) => wid >= 200 && wid <= 232,
        result: 'wi-storm-showers'
    },
    {
        condition: (wid) => wid >= 300 && wid <= 321,
        result: 'wi-showers'
    },
    {
        condition: (wid) => wid >= 500 && wid <= 504,
        result: 'wi-day-rain'
    },
    {
        condition: (wid) => wid >= 511 && wid <= 531,
        result: 'wi-rain'
    },
    {
        condition: (wid) => wid >= 600 && wid <= 622,
        result: 'wi-snow'
    },
    {
        condition: (wid) => wid >= 700 && wid <= 781,
        result: 'wi-dust'
    },
];
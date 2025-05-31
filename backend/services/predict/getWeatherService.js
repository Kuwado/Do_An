import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getWeatherService = async ({
    lat = 25.007858,
    lon = 65.845245,
}) => {
    const appid = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    lat,
                    lon,
                    appid,
                    lang: 'vi',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
};

/* @format */
"use client";

import { useQuery } from "react-query";
import Navbar from "../components/Navbar";
import axios from "axios";
import { parseISO, format } from "date-fns";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>("data", async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=berlin&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    return data;
    // fetch(
    //   "https://api.openweathermap.org/data/2.5/find?q=berlin&appid=5eeddddf864304680f8f59ff9274c203&cnt=2"
    // ).then((res) => res.json())
  });

  const firstData = data?.list[0];
  console.log("data", firstData);

  if (isLoading) return "Loading...";

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4'>
        {/* today data */}
        <section className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex gap-1 items-end text-2xl'>
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className='text-lg'>
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

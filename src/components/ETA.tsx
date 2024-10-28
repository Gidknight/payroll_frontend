"use client";

import React, { useEffect, useState } from "react";

const ETA = ({ initialSeconds }: { initialSeconds: number }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes} : ${
      remainingSeconds < 10 ? `0` : ""
    }${remainingSeconds}`;
  };
  return (
    <div>
      <h1>ETA IN:</h1>
      <p>{formatTime(secondsLeft)}</p>
    </div>
  );
};

export default ETA;

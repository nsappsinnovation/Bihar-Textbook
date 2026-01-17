import { useEffect, useState } from "react";

const DIGIT_HEIGHT = 36;
const LOOPS = 3; // 🔁 number of full 0–9 cycles

function RollingDigit({ digit, delay }) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // roll multiple loops then stop at digit
      const totalSteps = LOOPS * 10 + digit;
      setY(-totalSteps * DIGIT_HEIGHT);
    }, delay);

    return () => clearTimeout(timer);
  }, [digit, delay]);

  return (
    <div
      className="overflow-hidden w-5"
      style={{ height: DIGIT_HEIGHT }}
    >
      <div
        className="transition-transform ease-out"
        style={{
          transform: `translateY(${y}px)`,
          transitionDuration: "1600ms", // ⏱ longer animation
        }}
      >
        {Array.from({ length: LOOPS * 10 + 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{ height: DIGIT_HEIGHT }}
          >
            {i % 10}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatCounter({ value = 0 }) {
  const digits = String(value);

  return (
    <div className="flex text-3xl font-semibold text-gray-900">
      {digits.split("").map((d, i) => (
        <RollingDigit
          key={i}
          digit={Number(d)}
          delay={i * 150}
        />
      ))}
      <span className="ml-1">+</span>
    </div>
  );
}

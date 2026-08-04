import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  RefreshCw,
  Smartphone,
  Zap,
  ShieldCheck,
  Trophy,
  Gauge,
  Eye,
  AlertOctagon,
  Navigation,
  Flame,
  Heart,
  ShieldAlert,
  CheckCircle2,
  Maximize,
  Minimize,
} from "lucide-react";
import toast from "react-hot-toast";

// --- REALISTIC VEHICLE SVG: SEDAN / SPORTS CAR ---
const RealisticCar = ({
  color = "#14b8a6",
  isHeadlightsOn = true,
  scaleX = 1,
}) => {
  return (
    <div
      className={`relative inline-block ${scaleX === -1 ? "scale-x-[-1]" : ""}`}
    >
      {/* Headlight Beam Projection */}
      {isHeadlightsOn && (
        <div className="absolute top-1/2 -left-28 -translate-y-1/2 w-32 h-16 bg-gradient-to-l from-yellow-200/40 via-yellow-100/15 to-transparent blur-md pointer-events-none rounded-l-full -z-10" />
      )}

      <svg
        width="110"
        height="52"
        viewBox="0 0 110 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-2xl"
      >
        {/* Car Body Shadow */}
        <ellipse
          cx="55"
          cy="46"
          rx="50"
          ry="6"
          fill="#000000"
          fillOpacity="0.4"
        />

        {/* Chassis / Body Base */}
        <rect x="10" y="8" width="90" height="34" rx="10" fill={color} />

        {/* Hood Contours */}
        <path
          d="M10 14 C25 10, 35 10, 45 12 L45 38 C35 40, 25 40, 10 34 Z"
          fill="#ffffff"
          fillOpacity="0.15"
        />

        {/* Front Windshield */}
        <path
          d="M42 12 L60 14 L60 36 L42 38 Z"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1.5"
        />
        <path
          d="M44 14 L55 15 L55 35 L44 36 Z"
          fill="#38bdf8"
          fillOpacity="0.25"
        />

        {/* Roof */}
        <rect
          x="60"
          y="14"
          width="22"
          height="22"
          rx="3"
          fill={color}
          stroke="#ffffff"
          strokeOpacity="0.2"
        />

        {/* Rear Windshield */}
        <path
          d="M82 14 L94 16 L94 34 L82 36 Z"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Side Mirrors */}
        <rect x="44" y="3" width="6" height="5" rx="2" fill={color} />
        <rect x="44" y="42" width="6" height="5" rx="2" fill={color} />

        {/* Wheels */}
        <rect x="22" y="5" width="16" height="5" rx="2" fill="#0f172a" />
        <rect x="22" y="40" width="16" height="5" rx="2" fill="#0f172a" />
        <rect x="74" y="5" width="16" height="5" rx="2" fill="#0f172a" />
        <rect x="74" y="40" width="16" height="5" rx="2" fill="#0f172a" />

        {/* Headlights */}
        <rect
          x="8"
          y="10"
          width="4"
          height="7"
          rx="2"
          fill="#fef08a"
          className="animate-pulse"
        />
        <rect
          x="8"
          y="33"
          width="4"
          height="7"
          rx="2"
          fill="#fef08a"
          className="animate-pulse"
        />

        {/* Tail lights */}
        <rect x="98" y="10" width="3" height="6" rx="1" fill="#ef4444" />
        <rect x="98" y="34" width="3" height="6" rx="1" fill="#ef4444" />
      </svg>
    </div>
  );
};

// --- REALISTIC VEHICLE SVG: HEAVY TRUCK ---
const RealisticTruck = ({ scaleX = 1 }) => {
  return (
    <div
      className={`relative inline-block ${scaleX === -1 ? "scale-x-[-1]" : ""}`}
    >
      {/* Headlight Beams */}
      <div className="absolute top-1/2 -left-36 -translate-y-1/2 w-40 h-24 bg-gradient-to-l from-amber-100/50 via-amber-100/20 to-transparent blur-lg pointer-events-none rounded-l-full -z-10" />

      <svg
        width="140"
        height="60"
        viewBox="0 0 140 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-2xl"
      >
        {/* Shadow */}
        <rect
          x="5"
          y="52"
          width="130"
          height="6"
          rx="3"
          fill="#000000"
          fillOpacity="0.5"
        />

        {/* Cargo Container */}
        <rect
          x="42"
          y="6"
          width="92"
          height="46"
          rx="4"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <line
          x1="65"
          y1="6"
          x2="65"
          y2="52"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="90"
          y1="6"
          x2="90"
          y2="52"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="115"
          y1="6"
          x2="115"
          y2="52"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Truck Cabin */}
        <rect x="6" y="8" width="36" height="42" rx="6" fill="#dc2626" />

        {/* Windshield */}
        <rect
          x="10"
          y="12"
          width="14"
          height="34"
          rx="3"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <rect
          x="12"
          y="14"
          width="10"
          height="30"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.3"
        />

        {/* Chrome Grille */}
        <rect x="5" y="16" width="3" height="26" fill="#94a3b8" />

        {/* Mirrors */}
        <rect x="18" y="2" width="6" height="6" rx="1" fill="#475569" />
        <rect x="18" y="50" width="6" height="6" rx="1" fill="#475569" />

        {/* Heavy Wheels */}
        <rect x="16" y="4" width="14" height="5" rx="2" fill="#0f172a" />
        <rect x="16" y="49" width="14" height="5" rx="2" fill="#0f172a" />
        <rect x="60" y="4" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="60" y="49" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="105" y="4" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="105" y="49" width="18" height="5" rx="2" fill="#0f172a" />

        {/* Dual Headlights */}
        <circle cx="7" cy="12" r="3" fill="#fef08a" />
        <circle cx="7" cy="46" r="3" fill="#fef08a" />
      </svg>
    </div>
  );
};

// --- REALISTIC VEHICLE SVG: POLICE CRUISER ---
const RealisticPoliceCar = ({ scaleX = 1 }) => {
  return (
    <div
      className={`relative inline-block ${scaleX === -1 ? "scale-x-[-1]" : ""}`}
    >
      {/* Flashing Emergency Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-blue-500/25 rounded-full blur-xl pointer-events-none animate-pulse" />

      {/* Headlight Beam */}
      <div className="absolute top-1/2 -left-28 -translate-y-1/2 w-32 h-16 bg-gradient-to-l from-yellow-200/40 via-yellow-100/15 to-transparent blur-md pointer-events-none rounded-l-full -z-10" />

      <svg
        width="115"
        height="54"
        viewBox="0 0 115 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-2xl"
      >
        <ellipse
          cx="57"
          cy="48"
          rx="52"
          ry="5"
          fill="#000000"
          fillOpacity="0.4"
        />

        {/* Dark Blue Police Chassis */}
        <rect
          x="10"
          y="9"
          width="95"
          height="36"
          rx="10"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* White Doors & Hood Accent */}
        <rect x="38" y="9" width="38" height="36" fill="#f8fafc" />
        <text
          x="43"
          y="31"
          fill="#0f172a"
          fontSize="10"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          POLICE
        </text>

        {/* Windshield */}
        <path
          d="M36 13 L56 15 L56 39 L36 41 Z"
          fill="#0284c7"
          fillOpacity="0.4"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />

        {/* Roof Emergency Flashing LED Lightbar */}
        <rect
          x="54"
          y="2"
          width="12"
          height="6"
          rx="2"
          fill="#ef4444"
          className="animate-ping"
        />
        <rect
          x="66"
          y="2"
          width="12"
          height="6"
          rx="2"
          fill="#3b82f6"
          className="animate-pulse"
        />

        {/* Wheels */}
        <rect x="22" y="5" width="16" height="5" rx="2" fill="#000000" />
        <rect x="22" y="44" width="16" height="5" rx="2" fill="#000000" />
        <rect x="78" y="5" width="16" height="5" rx="2" fill="#000000" />
        <rect x="78" y="44" width="16" height="5" rx="2" fill="#000000" />

        {/* Headlights */}
        <rect x="8" y="11" width="4" height="7" rx="2" fill="#fef08a" />
        <rect x="8" y="36" width="4" height="7" rx="2" fill="#fef08a" />
      </svg>
    </div>
  );
};

// --- REALISTIC VEHICLE SVG: CITY BUS ---
const RealisticBus = ({ color = "#ea580c", scaleX = 1 }) => {
  return (
    <div
      className={`relative inline-block ${scaleX === -1 ? "scale-x-[-1]" : ""}`}
    >
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-36 h-20 bg-gradient-to-l from-yellow-200/40 via-yellow-100/15 to-transparent blur-md pointer-events-none rounded-l-full -z-10" />

      <svg
        width="150"
        height="58"
        viewBox="0 0 150 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-2xl"
      >
        <ellipse
          cx="75"
          cy="52"
          rx="68"
          ry="5"
          fill="#000000"
          fillOpacity="0.4"
        />

        {/* Bus Body */}
        <rect
          x="8"
          y="8"
          width="134"
          height="42"
          rx="8"
          fill={color}
          stroke="#f97316"
          strokeWidth="2"
        />

        {/* Front Windshield */}
        <rect
          x="12"
          y="12"
          width="18"
          height="34"
          rx="4"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="14"
          width="14"
          height="30"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.3"
        />

        {/* Passenger Windows */}
        <rect
          x="36"
          y="12"
          width="16"
          height="12"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
        <rect
          x="56"
          y="12"
          width="16"
          height="12"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
        <rect
          x="76"
          y="12"
          width="16"
          height="12"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
        <rect
          x="96"
          y="12"
          width="16"
          height="12"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
        <rect
          x="116"
          y="12"
          width="18"
          height="12"
          rx="2"
          fill="#38bdf8"
          fillOpacity="0.4"
        />

        {/* Bus Stripe */}
        <rect x="34" y="30" width="102" height="6" fill="#fde047" />

        {/* Bus Wheels */}
        <rect x="24" y="4" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="24" y="49" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="106" y="4" width="18" height="5" rx="2" fill="#0f172a" />
        <rect x="106" y="49" width="18" height="5" rx="2" fill="#0f172a" />

        {/* Headlights */}
        <circle cx="9" cy="14" r="3.5" fill="#fef08a" />
        <circle cx="9" cy="44" r="3.5" fill="#fef08a" />
      </svg>
    </div>
  );
};

// --- ULTRA-AESTHETIC MODERN URBAN PEDESTRIAN AVATAR ---
const RealisticPedestrian = ({ isCrashed = false, isCrossing = false }) => {
  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none">
      {/* High-Visibility Ground Target Glow Aura */}
      <div className={`absolute bottom-0 w-22 h-8 rounded-full blur-md animate-pulse ${isCrashed ? "bg-rose-500/50 shadow-[0_0_15px_#f43f5e]" : "bg-teal-400/40"}`} />

      {isCrashed && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <svg
            width="90"
            height="90"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_#f59e0b]"
          >
            <path
              d="M50 0 L58 33 L90 15 L73 45 L100 60 L68 68 L80 95 L50 78 L20 95 L32 68 L0 60 L27 45 L10 15 L42 33 Z"
              fill="#ef4444"
            />
            <path
              d="M50 12 L56 35 L83 20 L70 46 L92 59 L65 65 L74 86 L50 74 L26 86 L35 65 L8 59 L30 46 L17 20 L44 35 Z"
              fill="#f59e0b"
            />
            <path
              d="M50 22 L54 40 L70 30 L60 50 L78 60 L58 64 L66 80 L50 70 L34 80 L42 64 L22 60 L40 50 L30 30 L46 40 Z"
              fill="#facc15"
            />
            <circle cx="50" cy="50" r="10" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* Modern Aesthetic Urban Character Container */}
      <motion.div
        animate={isCrossing ? { y: [0, -3, 0, -3, 0] } : { y: 0 }}
        transition={
          isCrossing
            ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className="relative w-24 h-28 flex items-center justify-center"
      >
        <svg
          width="84"
          height="92"
          viewBox="0 0 84 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-2xl transition-all duration-300 ${isCrashed ? "brightness-75 saturate-150 hue-rotate-[330deg]" : ""}`}
        >
          {/* Soft Ground Contact Shadow */}
          <ellipse
            cx="42"
            cy="84"
            rx="32"
            ry="7"
            fill="#000000"
            fillOpacity="0.45"
          />

          {/* Techwear Backpack Accent */}
          <rect
            x="26"
            y="22"
            width="32"
            height="24"
            rx="8"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="2"
          />
          <rect
            x="30"
            y="26"
            width="24"
            height="4"
            rx="2"
            fill="#38bdf8"
            fillOpacity="0.6"
          />

          {/* Sleek Jogger Legs with Nokia Stride Motion ONLY When Crossing */}
          {/* Left Leg */}
          <motion.g
            animate={
              isCrossing
                ? { rotate: [-24, 24, -24], y: [0, -4, 0] }
                : { rotate: 0, y: 0 }
            }
            transition={
              isCrossing
                ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: "30px 46px" }}
          >
            <rect
              x="25"
              y="46"
              width="12"
              height="25"
              rx="5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <rect
              x="23"
              y="69"
              width="15"
              height="13"
              rx="4"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <rect x="23" y="78" width="15" height="4" rx="2" fill="#0d9488" />
          </motion.g>

          {/* Right Leg */}
          <motion.g
            animate={
              isCrossing
                ? { rotate: [24, -24, 24], y: [-4, 0, -4] }
                : { rotate: 0, y: 0 }
            }
            transition={
              isCrossing
                ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: "54px 46px" }}
          >
            <rect
              x="47"
              y="46"
              width="12"
              height="25"
              rx="5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <rect
              x="46"
              y="69"
              width="15"
              height="13"
              rx="4"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <rect x="46" y="78" width="15" height="4" rx="2" fill="#0d9488" />
          </motion.g>

          {/* Torso / Aesthetic Urban Safety Hoodie */}
          <rect
            x="18"
            y="18"
            width="48"
            height="32"
            rx="12"
            fill="#0d9488"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* High-Vis Reflective Safety Accent Lines */}
          <path
            d="M22 20 L42 38 L62 20"
            stroke="#fde047"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="22" y="42" width="40" height="4" rx="2" fill="#fde047" />

          {/* Static Arms & Hands */}
          <g>
            <rect
              x="10"
              y="20"
              width="10"
              height="24"
              rx="5"
              fill="#0f766e"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <circle
              cx="15"
              cy="46"
              r="4.5"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="1"
            />

            <rect
              x="64"
              y="20"
              width="10"
              height="24"
              rx="5"
              fill="#0f766e"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <circle
              cx="69"
              cy="46"
              r="4.5"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="1"
            />
          </g>

          {/* Head & Neck */}
          <circle
            cx="42"
            cy="14"
            r="14"
            fill="#fed7aa"
            stroke="#ea580c"
            strokeWidth="1.5"
          />
          {/* Aesthetic Hair & Hood Trim */}
          <path
            d="M28 13 C28 4, 56 4, 56 13 C56 10, 48 7, 42 7 C36 7, 28 10, 28 13 Z"
            fill="#0f172a"
          />
          {/* Over-Ear Headphones */}
          <rect x="25" y="10" width="4" height="10" rx="2" fill="#38bdf8" />
          <rect x="55" y="10" width="4" height="10" rx="2" fill="#38bdf8" />
          <path
            d="M27 10 C27 4, 57 4, 57 10"
            stroke="#38bdf8"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Eyes / Forward Sight */}
          <circle cx="37" cy="12" r="2" fill="#0f172a" />
          <circle cx="47" cy="12" r="2" fill="#0f172a" />
        </svg>
      </motion.div>
    </div>
  );
};

// --- REALISTIC ROAD & CROSSWALK ---
const AnimatedRoad = ({
  speed = 2,
  isMoving = false,
  showCrosswalk = false,
  showDivider = true,
  showBuildings = false,
}) => {
  return (
    <div className="absolute inset-0 bg-[#1e293b] flex flex-col justify-center overflow-hidden">
      {/* Top Curb & Grass */}
      <div className="absolute top-0 inset-x-0 h-[25%] bg-gradient-to-b from-teal-900 to-teal-800 border-b-4 border-slate-600 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]" />

      {/* Asphalt Texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Center Dashed Yellow Divider */}
      {showDivider && (
        <div className="absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 flex overflow-hidden opacity-90">
          <motion.div
            animate={isMoving ? { x: [0, -120] } : { x: 0 }}
            transition={{
              repeat: isMoving ? Infinity : 0,
              duration: speed,
              ease: "linear",
            }}
            className="flex w-[200%]"
          >
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="w-14 h-2 bg-amber-400 mx-8 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Realistic White Zebra Crosswalk */}
      {showCrosswalk && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[25%] bottom-[25%] w-32 flex flex-col justify-between py-2 z-10 shadow-lg">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-5 bg-slate-100 rounded-sm border-y border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            />
          ))}
        </div>
      )}



      {/* Bottom Curb & Grass */}
      <div className="absolute bottom-0 inset-x-0 h-[25%] bg-gradient-to-t from-teal-900 to-teal-800 border-t-4 border-slate-600 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.4)]" />
    </div>
  );
};

// --- SIMULATOR 1: Zebra Crossing ---
const CrossingSimulator = () => {
  const [trafficLight, setTrafficLight] = useState("green");
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingResult, setCrossingResult] = useState("");
  const [trafficTimer, setTrafficTimer] = useState(6);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [pedestrianSignal, setPedestrianSignal] = useState("STOP");

  // --- VEHICLE POSITIONS FOR SMOOTH SIMULATION ---
  const [topCar1Pos, setTopCar1Pos] = useState(60);
  const [topCar2Pos, setTopCar2Pos] = useState(82);
  const [bottomCar1Pos, setBottomCar1Pos] = useState(24);
  const [bottomCar2Pos, setBottomCar2Pos] = useState(2);

  const topCar1Ref = useRef(60);
  const topCar2Ref = useRef(82);
  const bottomCar1Ref = useRef(24);
  const bottomCar2Ref = useRef(2);

  // Freeze pedestrian position on crash
  const crashStepRef = useRef(null);

  // High-performance physics simulation loop
  useEffect(() => {
    let animationId;

    // Zebra crossing zone: roughly 42% to 58%
    // Top lane vehicles (R-to-L) must stop BEFORE entering the crossing => stop at 60%
    // Bottom lane vehicles (L-to-R) must stop BEFORE entering the crossing => stop at 28%
    const TOP_STOP_LINE = 60;
    const BOTTOM_STOP_LINE = 28;
    const LANE_GAP = 22;
    const SPEED = 0.55;

    const updatePhysics = () => {
      if (crossingResult !== "crash") {
        const isStopped = trafficLight === "red";
        // During red, cars past the crossing drive 2x faster to wrap around and queue up quickly
        const DRIVE_SPEED = isStopped ? SPEED * 2 : SPEED;

        // --- Top Car 1 (Yellow Sedan): Right to Left ---
        let p1 = topCar1Ref.current;
        if (isStopped && p1 >= TOP_STOP_LINE) {
          // Approaching the crossing — decelerate and stop at the line
          const dist = p1 - TOP_STOP_LINE;
          if (dist < 0.1) {
            p1 = TOP_STOP_LINE; // Snap to stop
          } else {
            const brake = Math.max(0.08, SPEED * Math.min(1, dist / 12));
            p1 = Math.max(TOP_STOP_LINE, p1 - brake);
          }
        } else {
          p1 -= DRIVE_SPEED;
        }
        if (p1 < -30) p1 = 145;
        topCar1Ref.current = p1;
        setTopCar1Pos(p1);

        // --- Top Car 2 (Truck): Right to Left ---
        let p2 = topCar2Ref.current;
        const topCar2StopLine = TOP_STOP_LINE + LANE_GAP;
        if (isStopped && p2 >= topCar2StopLine) {
          const dist = p2 - topCar2StopLine;
          if (dist < 0.1) {
            p2 = topCar2StopLine;
          } else {
            const brake = Math.max(0.08, SPEED * Math.min(1, dist / 12));
            p2 = Math.max(topCar2StopLine, p2 - brake);
          }
        } else {
          p2 -= DRIVE_SPEED;
        }
        if (p2 < -30) p2 = 145;
        // Prevent overlap: truck must stay behind sedan (only when both are nearby, not across wrap)
        if (p2 > p1 && p2 - p1 < LANE_GAP) {
          p2 = p1 + LANE_GAP;
        }
        topCar2Ref.current = p2;
        setTopCar2Pos(p2);

        // --- Bottom Car 1 (Red Sports Car): Left to Right ---
        let b1 = bottomCar1Ref.current;
        if (isStopped && b1 <= BOTTOM_STOP_LINE) {
          // Approaching the crossing — decelerate and stop at the line
          const dist = BOTTOM_STOP_LINE - b1;
          if (dist < 0.1) {
            b1 = BOTTOM_STOP_LINE; // Snap to stop
          } else {
            const brake = Math.max(0.08, SPEED * Math.min(1, dist / 12));
            b1 = Math.min(BOTTOM_STOP_LINE, b1 + brake);
          }
        } else {
          b1 += DRIVE_SPEED;
        }
        if (b1 > 120) b1 = -55;
        bottomCar1Ref.current = b1;
        setBottomCar1Pos(b1);

        // --- Bottom Car 2 (Police Car): Left to Right ---
        let b2 = bottomCar2Ref.current;
        const bottomCar2StopLine = BOTTOM_STOP_LINE - LANE_GAP;
        if (isStopped && b2 <= bottomCar2StopLine) {
          const dist = bottomCar2StopLine - b2;
          if (dist < 0.1) {
            b2 = bottomCar2StopLine;
          } else {
            const brake = Math.max(0.08, SPEED * Math.min(1, dist / 12));
            b2 = Math.min(bottomCar2StopLine, b2 + brake);
          }
        } else {
          b2 += DRIVE_SPEED;
        }
        if (b2 > 120) b2 = -55;
        // Prevent overlap: police must stay behind sports car (only when both are nearby, not across wrap)
        if (b2 < b1 && b1 - b2 < LANE_GAP) {
          b2 = b1 - LANE_GAP;
        }
        bottomCar2Ref.current = b2;
        setBottomCar2Pos(b2);
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [trafficLight, crossingResult]);

  // --- REF TO FREEZE TRAFFIC SIGNAL AT MOMENT OF CRASH ---
  const crashedSignalRef = useRef("green");

  // --- INTERACTIVE GAME STATE ---
  const [crossStep, setCrossStep] = useState(0);
  const [isButtonRequested, setIsButtonRequested] = useState(false);
  const [honking, setHonking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!isAutoMode) return;
    const interval = setInterval(() => {
      setTrafficTimer((prev) => {
        if (prev <= 1) {
          let nextLight = "green";
          let nextTime = 6;
          if (trafficLight === "green") {
            nextLight = "yellow";
            nextTime = 3;
          } else if (trafficLight === "yellow") {
            nextLight = "red";
            nextTime = 6;
          } else if (trafficLight === "red") {
            nextLight = "green";
            nextTime = 6;
            setIsButtonRequested(false);
          }
          setTrafficLight(nextLight);
          return nextTime;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isAutoMode, trafficLight]);

  useEffect(() => {
    setPedestrianSignal(trafficLight === "red" ? "WALK" : "STOP");
  }, [trafficLight]);

  const handleRequestPedestrianWalk = () => {
    if (isButtonRequested || trafficLight === "red" || trafficLight === "yellow") return;
    setIsButtonRequested(true);
    setTrafficTimer(2);
    setTrafficLight("yellow");
    toast.success("Pedestrian button pressed! Traffic light changing to RED.");
  };

  const handleCrossRoad = () => {
    if (crossingResult === "crash" || crossingResult === "safe" || isCrossing)
      return;

    setIsCrossing(true);

    if (trafficLight === "red") {
      setCrossStep(4);
      setTimeout(() => {
        setCrossingResult("safe");
        toast.success(`Safe passage! You crossed the road safely.`);
      }, 2250);
    } else {
      setHonking(true);
      setTimeout(() => setHonking(false), 1500);
      setCrossStep(2);
      crashedSignalRef.current = trafficLight;
      // Freeze pedestrian at crash position (step 2)
      crashStepRef.current = 2;
      setTimeout(() => {
        setCrossingResult("crash");
        toast.error(
          `Collision! Stepped onto moving traffic during ${trafficLight.toUpperCase()} light.`,
        );
      }, 1200);
    }
  };

  const reset = () => {
    setTrafficLight("green");
    setIsCrossing(false);
    setCrossingResult("");
    setTrafficTimer(6);
    setIsAutoMode(true);
    setCrossStep(0);
    setIsButtonRequested(false);
    setHonking(false);
    crashStepRef.current = null;
    setResetKey((k) => k + 1);
    topCar1Ref.current = 60;
    topCar2Ref.current = 82;
    bottomCar1Ref.current = 24;
    bottomCar2Ref.current = 2;
    setTopCar1Pos(60);
    setTopCar2Pos(82);
    setBottomCar1Pos(24);
    setBottomCar2Pos(2);
  };

  return (
    <div className="space-y-6">
      {/* Game Objective Banner */}
      <div className="bg-gradient-to-r from-teal-900/10 via-slate-900/10 to-teal-900/10 border border-teal-500/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-teal-600 text-white rounded-lg font-black text-[10px] uppercase tracking-wider shadow">
            MISSION
          </span>
          <span className="font-semibold text-slate-700 leading-snug">
            Request signal and cross only when the Pedestrian Light is{" "}
            <strong>WALK SAFE</strong>.
          </span>
        </div>
      </div>

      {/* Dashboard Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100/90 p-4 rounded-2xl border border-slate-200">
        {/* Signal Light Status Indicator (Read-Only) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Traffic Light State:
          </span>
          <div className="flex bg-slate-900 p-2 rounded-xl border border-slate-700 shadow-md gap-2">
            {["red", "yellow", "green"].map((c) => (
              <div
                key={c}
                className={`w-7 h-7 rounded-full transition-all border-2 ${
                  trafficLight === c
                    ? c === "red"
                      ? "bg-rose-500 border-rose-300 shadow-[0_0_12px_#f43f5e] scale-110"
                      : c === "yellow"
                        ? "bg-amber-400 border-amber-200 shadow-[0_0_12px_#fbbf24] scale-110"
                        : "bg-teal-400 border-teal-200 shadow-[0_0_12px_#2dd4bf] scale-110"
                    : "bg-slate-800 border-slate-700 opacity-20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto Timer & Reset */}
        <div className="flex items-center justify-end gap-3">
          <div className="text-xs font-mono font-bold tracking-widest text-teal-700 bg-teal-50 px-3.5 py-2.5 rounded-xl border border-teal-200">
            {trafficLight === "red"
              ? `WALK SAFE: 00:0${trafficTimer}s`
              : `AUTO TIMER: 00:0${trafficTimer}s`}
          </div>
          <button
            onClick={reset}
            className="p-2.5 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-sm"
            title="Reset Scenario"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Simulator Canvas */}
      <motion.div
        animate={
          crossingResult === "crash"
            ? { x: [0, -15, 15, -10, 10, 0], y: [0, 8, -8, 4, -4, 0] }
            : {}
        }
        transition={{ duration: 0.5 }}
        className={isFullScreen ? "fixed inset-0 z-50 bg-slate-900 border-none rounded-none overflow-hidden flex flex-col justify-between select-none" : "relative rounded-3xl h-[450px] w-full border-8 border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between select-none"}
      >
        {/* Full Screen Toggle Button */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-4 left-4 z-50 p-2.5 bg-slate-800/80 hover:bg-slate-700/90 text-white rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
          title={isFullScreen ? "Exit Full Screen" : "Play Full Screen"}
        >
          {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Full Screen Traffic Signal Bar (Top Center) */}
        {isFullScreen && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-4">
            <div className="flex gap-2.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 items-center">
              {/* Red Light */}
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  trafficLight === "red"
                    ? "bg-rose-500 shadow-[0_0_14px_#ef4444] animate-pulse"
                    : "bg-red-950 opacity-20"
                }`}
              />
              {/* Yellow Light */}
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  trafficLight === "yellow"
                    ? "bg-amber-400 shadow-[0_0_14px_#f59e0b] animate-pulse"
                    : "bg-amber-950 opacity-20"
                }`}
              />
              {/* Green Light */}
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  trafficLight === "green"
                    ? "bg-teal-500 shadow-[0_0_14px_#10b981] animate-pulse"
                    : "bg-teal-950 opacity-20"
                }`}
              />
            </div>
            <div className="text-white font-mono font-black text-sm tracking-widest uppercase">
              {trafficLight} ({trafficTimer}s)
            </div>
          </div>
        )}

        <AnimatedRoad speed={0} isMoving={false} showCrosswalk={true} />

        {/* Dynamic Pedestrian Signal & Pole Unit */}
        <div className="absolute top-4 right-4 z-30 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 flex flex-col items-center gap-2 shadow-2xl">
          {/* Dual Dynamic LED Lens Box */}
          <div className="flex gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 items-center">
            {/* Red LED: Glows when traffic is moving */}
            <div className="flex items-center gap-1">
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${trafficLight !== "red" ? "bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse" : "bg-slate-800 opacity-30"}`}
              />
              <span
                className={`text-[9px] font-black tracking-wider ${trafficLight !== "red" ? "text-rose-400" : "text-slate-600"}`}
              >
                STOP
              </span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            {/* Green LED: Glows when road is available to cross */}
            <div className="flex items-center gap-1">
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${trafficLight === "red" ? "bg-teal-400 shadow-[0_0_14px_#10b981] animate-pulse" : "bg-slate-800 opacity-30"}`}
              />
              <span
                className={`text-[9px] font-black tracking-wider ${trafficLight === "red" ? "text-teal-400" : "text-slate-600"}`}
              >
                WALK
              </span>
            </div>
          </div>

          {/* Action Request Button */}
          <button
            onClick={handleRequestPedestrianWalk}
            disabled={isButtonRequested || trafficLight === "red"}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              isButtonRequested
                ? "bg-amber-500 text-slate-950 animate-pulse shadow-md"
                : trafficLight === "red"
                  ? "bg-teal-500 border-2 border-teal-300 text-white shadow-[0_0_18px_rgba(16,185,129,0.8)] cursor-default animate-pulse"
                  : "bg-teal-600 hover:bg-teal-500 text-white shadow-md"
            }`}
          >
            {trafficLight === "red" ? (
              <ShieldCheck size={14} />
            ) : (
              <ShieldAlert size={14} />
            )}
            {isButtonRequested && trafficLight !== "red"
              ? "SIGNAL REQUESTED..."
              : trafficLight === "red"
                ? "WALK SAFE (GO NOW)"
                : "PRESS TO CROSS"}
          </button>
        </div>

        {/* Honk Warnings */}
        <AnimatePresence>
          {honking && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-rose-600 text-white font-black px-6 py-2 rounded-2xl shadow-2xl tracking-widest text-base border-2 border-white animate-bounce flex items-center gap-2"
            >
              <AlertTriangle size={20} /> HORN WARNING! CARS MOVING!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Lane Vehicle 1: Yellow Taxi/Sedan (Drives Right to Left) */}
        <div
          key="top-car1-stable"
          className="absolute top-[35%] z-20 pointer-events-none"
          style={{ left: `${topCar1Pos}%`, willChange: "left" }}
        >
          <RealisticCar
            color="#fbbf24"
            isHeadlightsOn={trafficLight !== "red"}
            scaleX={1}
          />
        </div>

        {/* Top Lane Vehicle 2: Heavy Cargo Truck (Follows behind Sedan) */}
        <div
          key="top-car2-stable"
          className="absolute top-[35%] z-20 pointer-events-none"
          style={{ left: `${topCar2Pos}%`, willChange: "left" }}
        >
          <RealisticTruck scaleX={1} />
        </div>

        {/* Bottom Lane Vehicle 1: Red Sports Car (Drives Left to Right) */}
        <div
          key="bottom-car1-stable"
          className="absolute bottom-[35%] z-20 pointer-events-none"
          style={{ left: `${bottomCar1Pos}%`, willChange: "left" }}
        >
          <RealisticCar
            color="#f43f5e"
            isHeadlightsOn={trafficLight !== "red"}
            scaleX={-1}
          />
        </div>

        {/* Bottom Lane Vehicle 2: Police Cruiser (Follows behind Sports Car) */}
        <div
          key="bottom-car2-stable"
          className="absolute bottom-[35%] z-20 pointer-events-none"
          style={{ left: `${bottomCar2Pos}%`, willChange: "left" }}
        >
          <RealisticPoliceCar scaleX={-1} />
        </div>

        {/* Pedestrian Character (Strict Vertical Movement - freezes at crash position, remounts on reset to avoid backtracking) */}
        <motion.div
          key={`pedestrian-${resetKey}`}
          initial={{
            bottom: `${20 + (crashStepRef.current !== null ? crashStepRef.current : crossStep) * 13.75}%`,
          }}
          animate={{
            bottom: `${20 + (crashStepRef.current !== null ? crashStepRef.current : crossStep) * 13.75}%`,
          }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <RealisticPedestrian
            isCrashed={crossingResult === "crash"}
            isCrossing={isCrossing}
          />
        </motion.div>

        {/* Overlays */}
        <AnimatePresence>
          {crossingResult === "crash" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-rose-950/90 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-rose-600 p-6"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500/50 flex items-center justify-center mb-4 animate-bounce">
                <AlertOctagon size={36} />
              </div>
              <span className="text-3xl md:text-5xl font-black uppercase tracking-widest text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]">
                CRASHED!
              </span>
              <p className="text-sm md:text-base font-semibold leading-relaxed mt-3 text-rose-100 bg-rose-900/60 px-6 py-3 rounded-2xl border border-rose-700/50 text-center max-w-md">
                Never cross on {crashedSignalRef.current.toUpperCase()} light! Vehicles cannot stop in time.
              </p>
              <button
                onClick={reset}
                className="mt-6 px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {crossingResult === "safe" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-teal-950/90 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-teal-500 p-6"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border-2 border-teal-500/50 flex items-center justify-center mb-4 animate-pulse">
                <ShieldCheck size={36} />
              </div>
              <span className="text-3xl md:text-5xl font-black uppercase tracking-widest text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]">
                SAFE PASSAGE
              </span>
              <p className="text-sm md:text-base font-semibold leading-relaxed mt-3 text-teal-100 bg-teal-900/60 px-6 py-3 rounded-2xl border border-teal-700/50 text-center max-w-md">
                Perfect! You crossed safely while cars were stopped on Red.
              </p>
              <button
                onClick={reset}
                className="mt-6 px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                DONE
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Controls Overlay */}
        {isFullScreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/85 backdrop-blur-md px-6 py-4 rounded-3xl border border-slate-700/50 shadow-2xl flex items-center justify-center gap-4">
            <button
              onClick={handleCrossRoad}
              disabled={isCrossing || crossingResult !== ""}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Navigation size={16} />
              CROSS THE ROAD
            </button>
            <button
              onClick={reset}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              title="Reset"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Interactive Action Control Panel */}
      {!isFullScreen && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Single Unified Cross The Road Button */}
          <button
            onClick={handleCrossRoad}
            disabled={isCrossing || crossingResult !== ""}
            className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-teal-500/30 shadow-xl active:scale-95 disabled:opacity-50"
          >
            <Navigation size={18} />
            CROSS THE ROAD
          </button>

          {/* Reset Scenario Button */}
          <button
            onClick={reset}
            className="p-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl border border-slate-300 transition-all cursor-pointer shadow-sm"
            title="Reset"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- SIMULATOR 2: Over Speeding ---
// --- SPEED LIMIT SIGN COMPONENT ---
const SpeedLimitSign = ({ limit }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 45 }}
      className="w-16 h-16 rounded-full bg-white border-[6px] border-rose-600 flex flex-col items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] select-none border-solid"
    >
      <span className="text-lg font-black text-slate-900 leading-none">SPEED</span>
      <span className="text-xl font-black text-slate-950 font-sans tracking-tight leading-none">{limit}</span>
    </motion.div>
  );
};

// --- SEMI-CIRCULAR SPEEDOMETER COMPONENT ---
const Speedometer = ({ value }) => {
  const angle = (Math.min(value, 120) / 120) * 180 - 90;
  const isSpeeding = value > 60;
  const speedTicks = [0, 20, 40, 60, 80, 100, 120];

  return (
    <div className="relative w-44 h-24 overflow-hidden flex flex-col items-center justify-end select-none">
      {/* Background track */}
      <div className="absolute top-4 w-36 h-36 rounded-full border-8 border-slate-200 border-solid" />
      
      {/* Dial Ticks & Labels */}
      {speedTicks.map((tick) => {
        const tickAngle = (tick / 120) * 180 - 90; // -90 to +90
        const radius = 58; // radius of labels
        // Convert polar angle to cartesian coordinates
        const rad = ((90 - tickAngle) * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = -Math.sin(rad) * radius; // negative y goes up

        return (
          <div
            key={tick}
            className="absolute text-[8px] font-black text-slate-400 font-mono"
            style={{
              bottom: "4px",
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {tick}
          </div>
        );
      })}

      {/* Needle */}
      <div
        className="absolute bottom-0 w-1.5 h-16 bg-slate-700 origin-bottom rounded-full transition-transform duration-100 ease-out z-10"
        style={{ transform: `rotate(${angle}deg)` }}
      />
      
      {/* Digital Readout */}
      <div className="absolute bottom-1 text-center z-10 bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-md border border-slate-100 border-solid">
        <span className={`text-xl font-black font-mono tracking-tight ${isSpeeding ? "text-rose-600 animate-pulse" : "text-teal-600"}`}>
          {value}
        </span>
        <span className="text-[7px] font-black text-slate-400 block uppercase tracking-widest leading-none">km/h</span>
      </div>
    </div>
  );
};

// --- SIMULATOR 2: Over Speeding ---
const SpeedingSimulator = () => {
  const [stage, setStage] = useState("idle"); // idle | accel | decel | success | fail
  const [currentSpeed, setCurrentSpeed] = useState(40);
  const [signBoard, setSignBoard] = useState(null); // null | 80 | 40
  const [timeLeft, setTimeLeft] = useState(4.3); // 4.3 seconds countdown
  const [status, setStatus] = useState("idle"); // idle | driving | braking | safe | crash
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [failReason, setFailReason] = useState(""); // "overspeeding" | "braking"

  const gameLoopRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const startScenario = () => {
    setStage("accel");
    setStatus("driving");
    setCurrentSpeed(40);
    setSignBoard(80);
    setTimeLeft(4.3);
    setFailReason("");
  };

  const handleAccelerate = () => {
    if (stage !== "accel" && stage !== "decel") return;
    setStatus("driving");
    setCurrentSpeed((prev) => {
      const nextSpeed = Math.min(prev + 10, 110);
      
      // Crash immediately if they exceed 80 km/h during the accel stage
      if (stage === "accel" && nextSpeed > 80) {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        setStatus("crash");
        setStage("fail");
        setFailReason("overspeeding");
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        return nextSpeed;
      }

      // Crash immediately if they accelerate back above 80 km/h during the decel stage
      if (stage === "decel" && nextSpeed > 80) {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        setStatus("crash");
        setStage("fail");
        setFailReason("overspeeding");
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        return nextSpeed;
      }

      // Auto transition to decel stage if they reach 80
      if (stage === "accel" && nextSpeed === 80) {
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setStage("decel");
          setStatus("braking");
          setSignBoard(40);
          setTimeLeft(4.3);
        }, 1200);
      }
      return nextSpeed;
    });
  };

  const handleBrake = () => {
    if (stage !== "accel" && stage !== "decel") return;
    setStatus("braking");
    setCurrentSpeed((prev) => Math.max(prev - 10, 0));
  };

  // Timer-based countdown tick during the decel stage
  useEffect(() => {
    if (stage === "decel") {
      gameLoopRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const nextTime = Math.max(prev - 0.1, 0);

          if (nextTime <= 0) {
            clearInterval(gameLoopRef.current);
            // Check outcome when timer expires
            if (currentSpeed <= 40) {
              setStatus("safe");
              setStage("success");
            } else {
              setStatus("crash");
              setStage("fail");
              setFailReason("braking");
            }
            return 0;
          }
          return nextTime;
        });
      }, 100);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [stage, currentSpeed]);

  const handleReset = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    setStage("idle");
    setStatus("idle");
    setCurrentSpeed(40);
    setSignBoard(null);
    setTimeLeft(4.3);
    setFailReason("");
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Simulator Viewport */}
      <motion.div
        animate={status === "crash" ? { x: [0, -15, 15, -10, 10, 0] } : {}}
        className={isFullScreen ? "fixed inset-0 z-50 bg-slate-900 border-none rounded-none overflow-hidden flex items-center select-none" : "relative rounded-3xl h-[450px] w-full border-8 border-slate-800 overflow-hidden shadow-xl flex items-center select-none"}
      >
        {/* Full Screen Toggle Button */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-4 right-4 z-50 p-2.5 bg-slate-800/80 hover:bg-slate-700/90 text-white rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
          title={isFullScreen ? "Exit Full Screen" : "Play Full Screen"}
        >
          {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Dynamic HUD Current Target Overlay (Top Left) */}
        <div className="absolute top-4 left-4 z-40 bg-slate-950/85 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700/40 shadow-2xl flex flex-col min-w-[140px] pointer-events-none select-none text-white">
          <span className="text-[9px] uppercase font-black text-teal-400 tracking-wider mb-1">
            Current Target
          </span>
          {signBoard ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-300">Limit:</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-black ${signBoard === 80 ? "bg-amber-500/20 text-amber-300" : "bg-teal-500/20 text-teal-300"}`}>
                {signBoard} km/h
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-bold text-slate-400 italic">No Active Sign</span>
          )}
          {stage === "decel" && (
            <span className="text-[8px] font-black text-rose-400 animate-pulse uppercase mt-1">
              ⚠️ SLOW DOWN! ({timeLeft.toFixed(1)}s)
            </span>
          )}
        </div>

        {/* Dynamic HUD Speedometer Overlay (Central Bottom) */}
        {stage !== "idle" && (
          <div className={`absolute ${isFullScreen ? "bottom-28" : "bottom-4"} left-1/2 -translate-x-1/2 z-40 bg-slate-950/85 backdrop-blur-md px-5 py-2.5 rounded-3xl border border-slate-700/40 shadow-2xl flex flex-col items-center select-none`}>
            <Speedometer value={currentSpeed} />
          </div>
        )}

        <AnimatedRoad
          isMoving={stage === "accel" || stage === "decel"}
          speed={currentSpeed > 0 ? (48 / currentSpeed) : 1.2}
          showBuildings={stage === "decel"}
        />

        {/* Speed Limit Signboard (Visual Object alongside Road) */}
        {/* 80 km/h Speed Limit Signboard (Acceleration phase) */}
        <AnimatePresence>
          {stage === "accel" && (
            <motion.div
              initial={{ right: "-25%" }}
              animate={{ right: "30%" }}
              exit={{ right: "120%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-[22%] z-25 flex flex-col items-center gap-1"
            >
              <SpeedLimitSign limit={80} />
              <div className="w-2.5 h-16 bg-slate-600 rounded-full shadow" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 40 km/h Speed Limit Signboard (Deceleration phase) */}
        <AnimatePresence>
          {stage === "decel" && (
            <motion.div
              initial={{ right: "-25%" }}
              animate={{ right: "30%" }}
              exit={{ right: "120%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-[22%] z-25 flex flex-col items-center gap-1"
            >
              <SpeedLimitSign limit={40} />
              <div className="w-2.5 h-16 bg-slate-600 rounded-full shadow" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player Car Realistic SVG */}
        <motion.div
          animate={
            status === "idle"
              ? { left: "6%", rotate: 0, y: 0 }
              : status === "driving"
                ? {
                    left: `${15 + (currentSpeed - 40) * 0.2}%`,
                    rotate: -1.5,
                    y: currentSpeed > 70 ? [0, -1, 1, 0] : 0
                  }
                : status === "braking"
                  ? {
                      left: `${15 + (currentSpeed - 40) * 0.2}%`,
                      rotate: 3.5,
                      y: currentSpeed > 70 ? [0, -1, 1, 0] : 0
                    }
                  : status === "safe"
                    ? { left: "30%", rotate: 0, y: 0 }
                    : { left: "60%", rotate: -15, y: -10 }
          }
          transition={
            status === "driving" || status === "braking"
              ? {
                  left: { type: "spring", stiffness: 80, damping: 15 },
                  rotate: { type: "spring", stiffness: 120, damping: 10 },
                  y: { repeat: Infinity, duration: 0.12, ease: "linear" }
                }
              : {
                  duration: status === "safe" ? 0.5 : status === "crash" ? 0.4 : 0.8,
                  ease: "easeOut",
                }
          }
          className="absolute top-[62%] -translate-y-1/2 z-30"
        >
          {status === "crash" ? (
            <AlertOctagon size={48} className="text-rose-500 animate-ping" />
          ) : (
            <div className="relative">
              {/* Floating "YOU" Tag */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-teal-500 text-[8px] font-black tracking-wider text-white px-2 py-0.5 rounded-full border border-teal-300 shadow-[0_2px_6px_rgba(20,184,166,0.6)] uppercase animate-bounce whitespace-nowrap">
                YOU
              </div>
              <RealisticCar color="#0d9488" scaleX={-1} />
            </div>
          )}
        </motion.div>

        {/* Outcome Overlays */}
        <AnimatePresence>
          {stage === "fail" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-rose-950/90 z-45 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-rose-600 p-6 overflow-y-auto"
            >
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500/50 flex items-center justify-center mb-2 animate-bounce">
                <AlertOctagon size={30} />
              </div>
              <span className="text-xl md:text-3xl font-black uppercase tracking-wider text-center text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                {failReason === "overspeeding" ? "SPEED LIMIT EXCEEDED!" : "SPEEDING CRASH & VIOLATION!"}
              </span>
              <p className="text-xs md:text-sm font-semibold leading-relaxed mt-3 text-center bg-rose-900/60 p-4 rounded-2xl border border-rose-700/50 text-rose-100 max-w-md">
                {failReason === "overspeeding"
                  ? "You exceeded the road speed limit of 80 km/h! driving above designated limits severely reduces steering control, shortens reaction windows, and increases fatal crash risks."
                  : "You failed to brake to 40 km/h in time! At high speeds (like 80 km/h), the vehicle's kinetic energy increases four-fold, expanding stopping distances exponentially and making safe control impossible."}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-teal-950/90 z-45 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-teal-500 p-6"
            >
              <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 border-2 border-teal-500/50 flex items-center justify-center mb-2 animate-pulse">
                <ShieldCheck size={30} />
              </div>
              <span className="text-xl md:text-3xl font-black uppercase tracking-wider text-center text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]">
                SAFE SPEED COMPLIANCE
              </span>
              <p className="text-xs md:text-sm font-semibold leading-relaxed mt-3 text-center bg-teal-900/60 p-4 rounded-2xl border border-teal-700/50 text-teal-100 max-w-md">
                Excellent! By decelerating to 40 km/h before the checkpoint, you demonstrated standard speed adaptation, ensuring maximum braking margin and pedestrian safety.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Restart Lab
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Controls Overlay */}
        {isFullScreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/85 backdrop-blur-md px-6 py-4 rounded-3xl border border-slate-700/50 shadow-2xl flex items-center justify-center gap-4">
            {stage === "idle" ? (
              <button
                onClick={startScenario}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Navigation size={16} />
                Start Simulation
              </button>
            ) : (
              <>
                <button
                  onClick={handleAccelerate}
                  disabled={stage !== "accel" && stage !== "decel"}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <Zap size={16} />
                  Accelerate
                </button>
                <button
                  onClick={handleBrake}
                  disabled={stage !== "accel" && stage !== "decel"}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <ShieldAlert size={16} />
                  Brake
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm flex items-center justify-center"
                  title="Reset"
                >
                  <RefreshCw size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </motion.div>

      {/* Controller Buttons: Accelerate & Brake */}
      {!isFullScreen && (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {stage === "idle" ? (
            <button
              onClick={startScenario}
              className="px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-teal-500/30 shadow-xl active:scale-95"
            >
              <Navigation size={18} />
              Start Simulation
            </button>
          ) : (
            <>
              {/* Accelerate Button */}
              <button
                onClick={handleAccelerate}
                disabled={stage !== "accel" && stage !== "decel"}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95"
              >
                <Zap size={18} />
                Accelerate
              </button>

              {/* Brake Button */}
              <button
                onClick={handleBrake}
                disabled={stage !== "accel" && stage !== "decel"}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95"
              >
                <ShieldAlert size={18} />
                Brake
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="p-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl border border-slate-300 transition-all cursor-pointer shadow-sm"
                title="Reset"
              >
                <RefreshCw size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// --- SIMULATOR 3: Wrong Side Driving ---
const WrongSideSimulator = () => {
  const [side, setSide] = useState(null); // null | "correct" | "wrong"
  const [status, setStatus] = useState("idle"); // idle | running | safe | jam
  const [showHonk, setShowHonk] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);

  // Tracks collision state during active physics simulation to keep the RAF loop alive
  const [hasCollided, setHasCollided] = useState(false);
  const hasCollidedRef = useRef(false);

  // Real-time coordinates for collision physics
  const [playerCarPos, setPlayerCarPos] = useState(10);
  const [truckPos, setTruckPos] = useState(75);
  const [busPos, setBusPos] = useState(93);
  const [taxiPos, setTaxiPos] = useState(111);
  const [policePos, setPolicePos] = useState(129);
  const [sportsPos, setSportsPos] = useState(147);

  const playerCarRef = useRef(10);
  const truckRef = useRef(75);
  const busRef = useRef(93);
  const taxiRef = useRef(111);
  const policeRef = useRef(129);
  const sportsRef = useRef(147);

  // Audio ref for honk sound
  const honkAudioRef = useRef(new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2b28e7e5a6.mp3?filename=car-horn-12345.mp3'));

  // Play honk sound when showHonk becomes true
  useEffect(() => {
    if (showHonk) {
      honkAudioRef.current.currentTime = 0;
      honkAudioRef.current.play().catch((err) => {
        console.warn("Audio play blocked or failed:", err);
      });
    }
  }, [showHonk]);

  // Force showHonk to false if status changes to anything other than "running"
  useEffect(() => {
    if (status !== "running") {
      setShowHonk(false);
    }
  }, [status]);

  // Outcome timeout reference
  const outcomeTimeoutRef = useRef(null);

  const handleSelectSide = (selectedSide) => {
    if (outcomeTimeoutRef.current) clearTimeout(outcomeTimeoutRef.current);

    setSide(selectedSide);
    setStatus("running");
    setShowHonk(false);
    setShowOutcome(false);
    setHasCollided(false);
    hasCollidedRef.current = false;

    // Initialize coordinate values for both directions
    playerCarRef.current = 10;
    truckRef.current = 75;
    busRef.current = 93;
    taxiRef.current = 111;
    policeRef.current = 129;
    sportsRef.current = 147;
    setPlayerCarPos(10);
    setTruckPos(75);
    setBusPos(93);
    setTaxiPos(111);
    setPolicePos(129);
    setSportsPos(147);

    localStorage.setItem("traffic_wrong_side_choice", selectedSide);
    localStorage.setItem("traffic_wrong_side_status", "running");
    localStorage.setItem("traffic_wrong_side_show_outcome", "false");
  };

  const handleReset = () => {
    if (outcomeTimeoutRef.current) clearTimeout(outcomeTimeoutRef.current);
    setSide(null);
    setStatus("idle");
    setShowHonk(false);
    setShowOutcome(false);
    setHasCollided(false);
    hasCollidedRef.current = false;

    playerCarRef.current = 10;
    truckRef.current = 75;
    busRef.current = 93;
    taxiRef.current = 111;
    policeRef.current = 129;
    sportsRef.current = 147;
    setPlayerCarPos(10);
    setTruckPos(75);
    setBusPos(93);
    setTaxiPos(111);
    setPolicePos(129);
    setSportsPos(147);

    localStorage.removeItem("traffic_wrong_side_choice");
    localStorage.setItem("traffic_wrong_side_status", "idle");
    localStorage.setItem("traffic_wrong_side_show_outcome", "false");
  };

  // Physics animation and contact detection loop
  useEffect(() => {
    if (status !== "running") return;

    let animationId;
    let lastTime = performance.now();

    const updatePhysics = (time) => {
      const delta = (time - lastTime) / 16.666;
      lastTime = time;

      const isCrashed = hasCollidedRef.current;

      // Move player car (if not crashed)
      let p = playerCarRef.current;
      if (!isCrashed) {
        const pSpeed = (side === "correct" ? 0.36 : 0.16) * delta;
        p += pSpeed;
        playerCarRef.current = p;
        setPlayerCarPos(p);
      }

      // Move oncoming truck (if not crashed)
      let t = truckRef.current;
      if (!isCrashed) {
        const tSpeed = 0.48 * delta;
        t -= tSpeed;
        truckRef.current = t;
        setTruckPos(t);
      }

      // Move oncoming bus (roll up and stop 18% behind truck)
      let b = busRef.current;
      const bTarget = t + 18;
      if (b > bTarget) {
        const bSpeed = 0.48 * delta;
        b -= bSpeed;
        if (b < bTarget) b = bTarget;
        busRef.current = b;
        setBusPos(b);
      }

      // Move oncoming taxi (roll up and stop 18% behind bus)
      let tx = taxiRef.current;
      const txTarget = b + 18;
      if (tx > txTarget) {
        const txSpeed = 0.48 * delta;
        tx -= txSpeed;
        if (tx < txTarget) tx = txTarget;
        taxiRef.current = tx;
        setTaxiPos(tx);
      }

      // Move oncoming police car (roll up and stop 18% behind taxi)
      let pc = policeRef.current;
      const pcTarget = tx + 18;
      if (pc > pcTarget) {
        const pcSpeed = 0.48 * delta;
        pc -= pcSpeed;
        if (pc < pcTarget) pc = pcTarget;
        policeRef.current = pc;
        setPolicePos(pc);
      }

      // Move oncoming sports car (roll up and stop 18% behind police)
      let sp = sportsRef.current;
      const spTarget = pc + 18;
      if (sp > spTarget) {
        const spSpeed = 0.48 * delta;
        sp -= spSpeed;
        if (sp < spTarget) sp = spTarget;
        sportsRef.current = sp;
        setSportsPos(sp);
      }

      if (!isCrashed) {
        if (side === "wrong") {
          // Honk warning significantly before contact
          if (t - (p + 11.75) < 32 && t - (p + 11.75) > 0) {
            setShowHonk(true);
          }

          // Contact collision detection
          if (p + 11.75 >= t) {
            hasCollidedRef.current = true;
            setHasCollided(true);
            setShowHonk(false);

            // Visual crash overlap correction
            const collisionPoint = (p + t) / 2;
            playerCarRef.current = collisionPoint - 5.875;
            setPlayerCarPos(collisionPoint - 5.875);
            truckRef.current = collisionPoint + 5.875;
            setTruckPos(collisionPoint + 5.875);

            outcomeTimeoutRef.current = setTimeout(() => {
              setStatus("jam");
              localStorage.setItem("traffic_wrong_side_status", "jam");
              setShowOutcome(true);
              localStorage.setItem("traffic_wrong_side_show_outcome", "true");
            }, 250);
          }
        } else if (side === "correct") {
          // Success when player safely exits screen
          if (p >= 115) {
            setStatus("safe");
            localStorage.setItem("traffic_wrong_side_status", "safe");
            outcomeTimeoutRef.current = setTimeout(() => {
              setShowOutcome(true);
              localStorage.setItem("traffic_wrong_side_show_outcome", "true");
            }, 250);
          }
        }
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [status, side]);

  // Safely restore state from localStorage on mount
  useEffect(() => {
    const savedSide = localStorage.getItem("traffic_wrong_side_choice");
    const savedStatus = localStorage.getItem("traffic_wrong_side_status") || "idle";
    const savedShowOutcome = localStorage.getItem("traffic_wrong_side_show_outcome") === "true";

    if (savedSide && (savedStatus === "running" || savedStatus === "safe" || savedStatus === "jam")) {
      if (savedStatus === "running") {
        handleSelectSide(savedSide);
      } else {
        setSide(savedSide);
        setStatus(savedStatus);
        setShowOutcome(savedShowOutcome);

        // Restore visual state positions
        if (savedStatus === "safe") {
          setPlayerCarPos(115);
        } else if (savedStatus === "jam") {
          setHasCollided(true);
          hasCollidedRef.current = true;
          // Set to a completed pile-up layout with zero overlap
          setPlayerCarPos(31);
          setTruckPos(43);
          setBusPos(61);
          setTaxiPos(79);
          setPolicePos(97);
          setSportsPos(115);
        }
      }
    } else {
      handleReset();
    }
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (outcomeTimeoutRef.current) clearTimeout(outcomeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Simulator Viewport */}
      <motion.div
        animate={(hasCollided || status === "jam") ? { x: [0, -22, 22, -16, 16, -10, 10, -4, 4, 0], y: [0, 10, -10, 6, -6, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={isFullScreen ? "fixed inset-0 z-50 bg-slate-900 border-none rounded-none overflow-hidden flex flex-col justify-center select-none" : "relative rounded-3xl h-[450px] w-full border-8 border-slate-800 overflow-hidden shadow-xl flex flex-col justify-center select-none"}
      >
        {/* Full Screen Toggle Button */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-4 right-4 z-50 p-2.5 bg-slate-800/80 hover:bg-slate-700/90 text-white rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
          title={isFullScreen ? "Exit Full Screen" : "Play Full Screen"}
        >
          {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        <AnimatedRoad
          isMoving={status === "running" || status === "safe"}
          speed={side === "wrong" ? 0.4 : 0.3}
        />

        {/* Choice Overlay Screen when Idle */}
        {status === "idle" && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-white animate-fade-in">
            <span className="text-xl md:text-2xl font-black tracking-wider text-teal-400 mb-2 uppercase text-center animate-pulse">
              Choose Your Driving Side
            </span>
            <p className="text-xs md:text-sm text-slate-350 text-center max-w-md mb-6 leading-relaxed font-medium">
              Select which side of the road you want to drive on to begin your
              journey. Choose wisely to avoid accidents and keep traffic
              flowing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
              <button
                onClick={() => handleSelectSide("correct")}
                className="flex-1 px-5 py-4 bg-teal-650 hover:bg-teal-600 active:scale-95 transition-all text-white font-black text-xs md:text-sm tracking-wider uppercase rounded-2xl cursor-pointer border border-teal-500/30 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} />
                Drive Left
              </button>
              <button
                onClick={() => handleSelectSide("wrong")}
                className="flex-1 px-5 py-4 bg-rose-650 hover:bg-rose-600 active:scale-95 transition-all text-white font-black text-xs md:text-sm tracking-wider uppercase rounded-2xl cursor-pointer border border-rose-500/30 shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                <AlertTriangle size={18} />
                Drive Right
              </button>
            </div>
          </div>
        )}

        {/* Oncoming & Lead Traffic flow for Correct Drive */}
        {side === "correct" && (status === "running" || status === "safe") && (
          <>
            {/* Truck passing continuously in the bottom lane (oncoming direction) */}
            <motion.div
              key="correct-truck"
              animate={{ left: ["110%", "-30%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0.0 }}
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticTruck />
            </motion.div>

            {/* Police Cruiser following the truck in bottom lane, staggered */}
            <motion.div
              key="correct-police"
              animate={{ left: ["110%", "-30%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.1 }}
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticPoliceCar />
            </motion.div>

            {/* Oncoming City Bus in bottom lane */}
            <motion.div
              key="correct-bus"
              animate={{ left: ["110%", "-30%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2.2 }}
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticBus />
            </motion.div>

            {/* Oncoming Yellow Taxi in bottom lane */}
            <motion.div
              key="correct-oncoming-taxi"
              animate={{ left: ["110%", "-30%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 3.3 }}
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#fbbf24" scaleX={1} />
            </motion.div>

            {/* Oncoming Red Sports Car in bottom lane */}
            <motion.div
              key="correct-oncoming-sports"
              animate={{ left: ["110%", "-30%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 4.4 }}
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#f43f5e" scaleX={1} />
            </motion.div>

            {/* Lead Taxi driving ahead of the player in top lane */}
            <motion.div
              key="correct-lead-taxi"
              animate={{ left: ["45%", "145%"] }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#fbbf24" scaleX={-1} />
            </motion.div>

            {/* Lead Blue Sedan driving further ahead in top lane */}
            <motion.div
              key="correct-lead-blue"
              animate={{ left: ["75%", "175%"] }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#3b82f6" scaleX={-1} />
            </motion.div>

            {/* Following Green Sedan trailing safely behind the player in top lane */}
            <motion.div
              key="correct-follow-green"
              animate={{ left: ["-15%", "115%"] }}
              transition={{ duration: 5.85, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#10b981" scaleX={-1} />
            </motion.div>

            {/* Following Red Sports Car trailing further behind the player in top lane */}
            <motion.div
              key="correct-follow-red"
              animate={{ left: ["-45%", "115%"] }}
              transition={{ duration: 7.2, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#ef4444" scaleX={-1} />
            </motion.div>
          </>
        )}

        {/* Oncoming Traffic Jam for Wrong Drive (They block the player in the bottom lane) */}
        {side === "wrong" && (status === "running" || status === "jam") && (
          <>
            {/* Truck approaching head-on in bottom lane — comes from right, stops on jam */}
            <div
              key="wrong-truck"
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none transition-transform"
              style={{
                left: `${truckPos}%`,
                willChange: "left",
                transform: `translateY(-50%) ${(status === "jam" || hasCollided) ? "rotate(4deg) scale(0.98)" : ""}`,
              }}
            >
              <RealisticTruck />
              {showHonk && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shadow-lg uppercase whitespace-nowrap flex items-center gap-1.5 z-30 pointer-events-none"
                >
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                  HONK! HONK! 🔊
                </motion.div>
              )}
            </div>

            {/* Bus following behind the truck — staggered start, stops behind truck on jam */}
            <div
              key="wrong-bus"
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
              style={{ left: `${busPos}%`, willChange: "left" }}
            >
              <RealisticBus />
            </div>

            {/* Taxi — staggered further back, stops behind bus on jam */}
            <div
              key="wrong-taxi"
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
              style={{ left: `${taxiPos}%`, willChange: "left" }}
            >
              <RealisticCar color="#fbbf24" scaleX={1} />
            </div>

            {/* Police Cruiser — stops behind taxi on jam */}
            <div
              key="wrong-police"
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
              style={{ left: `${policePos}%`, willChange: "left" }}
            >
              <RealisticPoliceCar />
            </div>

            {/* Sports Car — stops behind police car on jam */}
            <div
              key="wrong-sports"
              className="absolute top-[64%] -translate-y-1/2 z-20 pointer-events-none"
              style={{ left: `${sportsPos}%`, willChange: "left" }}
            >
              <RealisticCar color="#f43f5e" scaleX={1} />
            </div>

            {/* Top lane (left side) — vehicles driving smoothly in the correct direction, looping */}
            <motion.div
              key="wrong-top-bus"
              animate={{ left: ["50%", "120%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticBus scaleX={-1} />
            </motion.div>

            <motion.div
              key="wrong-top-police"
              animate={{ left: ["15%", "120%"] }}
              transition={{ duration: 3.3, repeat: Infinity, ease: "linear" }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticPoliceCar scaleX={-1} />
            </motion.div>

            <motion.div
              key="wrong-top-taxi"
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#fbbf24" scaleX={-1} />
            </motion.div>

            <motion.div
              key="wrong-top-sports"
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#f43f5e" scaleX={-1} />
            </motion.div>

            <motion.div
              key="wrong-top-blue"
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 1.0 }}
              className="absolute top-[36%] -translate-y-1/2 z-20 pointer-events-none"
            >
              <RealisticCar color="#3b82f6" scaleX={-1} />
            </motion.div>
          </>
        )}

        {/* Player Car */}
        {side && (
          <div
            className="absolute z-20 pointer-events-none transition-transform"
            style={{
              left: `${playerCarPos}%`,
              top: side === "correct" ? "36%" : "64%",
              willChange: "left",
              transform: `translateY(-50%) ${(status === "jam" || hasCollided) ? "rotate(-7deg) scale(0.97)" : ""}`,
            }}
          >
            {/* Aesthetic Floating "YOU" Label */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-teal-500 text-[8px] font-black tracking-wider text-white px-2 py-0.5 rounded-full border border-teal-300 shadow-[0_2px_6px_rgba(20,184,166,0.6)] uppercase select-none animate-bounce">
              YOU
            </div>
            <RealisticCar color="#0d9488" scaleX={-1} />
          </div>
        )}

        {/* Collision Impact Effect */}
        <AnimatePresence>
          {(status === "jam" || hasCollided) && side === "wrong" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[64%] -translate-y-1/2 z-40 pointer-events-none"
              style={{ left: `${playerCarPos + 7}%` }}
            >
              {/* White Radial Shockwave Flash Ring */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 3.2], opacity: [1, 0] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-4 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,1)] pointer-events-none"
              />

              {/* Central impact fire core */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2.0, 1.2], opacity: [0, 1, 0.8] }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-24 h-24 -ml-12 -mt-12"
              >
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-90 animate-pulse" />
                <div className="absolute inset-1 bg-gradient-to-br from-amber-400 via-orange-600 to-red-700 rounded-full blur-lg opacity-90" />
                <div className="absolute inset-4 bg-yellow-200 rounded-full blur-md opacity-90" />
              </motion.div>

              {/* High-speed Exploding Spark Fragments */}
              {[...Array(14)].map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                const distance = 40 + (i % 3) * 18;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ x, y, scale: [1, 0], opacity: [1, 0] }}
                    transition={{ duration: 0.5 + (i % 3) * 0.1, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-2.5 h-2.5 bg-amber-300 rounded-full shadow-[0_0_12px_#fde047]"
                  />
                );
              })}

              {/* Smoke clouds expanding outward */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ scale: [0, 2.5], opacity: [0.7, 0], y: -25 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
                className="absolute -top-12 -left-12 w-24 h-24 bg-slate-700 rounded-full blur-2xl"
              />
              {/* Debris particles flying out */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dist = 40 + Math.random() * 30;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: 0,
                      scale: 0.3,
                    }}
                    transition={{ duration: 0.6 + Math.random() * 0.3, ease: "easeOut", delay: 0.05 }}
                    className="absolute top-0 left-0 w-2 h-2 bg-slate-400 rounded-sm"
                  />
                );
              })}

              {/* Animated Floating COLLISION Label */}
              <motion.div
                initial={{ y: 10, opacity: 0, scale: 0.8 }}
                animate={{ y: -35, opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-lg border-2 border-rose-400 uppercase whitespace-nowrap tracking-wider z-50 pointer-events-none"
              >
                💥 COLLISION!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlays for Outcomes */}
        <AnimatePresence>
          {/* Failed / Bad Component (Traffic Jam) */}
          {showOutcome && status === "jam" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-rose-950/90 z-45 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-rose-600 p-6 overflow-y-auto"
            >
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500/50 flex items-center justify-center mb-2 animate-bounce">
                <AlertTriangle size={30} className="text-rose-500 animate-pulse" />
              </div>
              <span className="text-xl md:text-3xl font-black uppercase tracking-wider text-center text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                💥 HEAD-ON COLLISION DETECTED!
              </span>

              {/* Advisory Message Container */}
              <div className="mt-3 text-xs md:text-sm font-semibold leading-relaxed bg-rose-900/60 p-4 rounded-2xl border border-rose-700/50 text-rose-100 max-w-lg space-y-2">
                <p className="text-center font-bold text-yellow-300">
                  WRONG LANE COLLISION WARNING & ADVISORY:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-left">
                  <li>
                    Driving on the wrong side has caused a direct head-on collision and hindered all vehicle movement.
                  </li>
                  <li>
                    In left-hand drive countries (like India), always stick to
                    the left lane of the road.
                  </li>
                  <li>
                    Driving on the right lane (wrong side) blocks oncoming
                    vehicles, creates congested traffic jams, and leads to severe accidents.
                  </li>
                  <li>
                    Driving on the wrong side is a strict traffic offense
                    punishable by heavy penalties and licenses cancellation.
                  </li>
                </ul>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Success / Good Component */}
          {showOutcome && status === "safe" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-teal-950/90 z-45 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-teal-500 p-6"
            >
              <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 border-2 border-teal-500/50 flex items-center justify-center mb-2 animate-pulse">
                <ShieldCheck size={30} />
              </div>
              <span className="text-xl md:text-3xl font-black uppercase tracking-wider text-center text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]">
                SAFE & SMOOTH JOURNEY
              </span>
              <div className="mt-3 text-xs md:text-sm font-semibold leading-relaxed bg-teal-900/60 p-4 rounded-2xl border border-teal-700/50 text-teal-100 max-w-md space-y-1.5 text-center">
                <p className="font-bold text-teal-350">
                  EXCELLENT ROAD DISCIPLINE:
                </p>
                <p>
                  Sticking to the left lane ensures optimal traffic flow, avoids
                  conflict with oncoming vehicles, and reduces travel stress for
                  everyone!
                </p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Restart Lab
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Reset Control */}
        {isFullScreen && status !== "idle" && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/85 backdrop-blur-md px-6 py-4 rounded-3xl border border-slate-700/50 shadow-2xl flex items-center justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Reset Simulator
            </button>
          </div>
        )}
      </motion.div>

      {/* Helper Reset Button visible when active */}
      {!isFullScreen && status !== "idle" && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow"
          >
            Reset Simulator
          </button>
        </div>
      )}
    </div>
  );
};

// --- SIMULATOR 4: Distracted Driving ---
const DistractedSimulator = () => {
  // phase: idle | driving | notification | responded | ignored | crash | success
  const [phase, setPhase] = useState("idle");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const notifTimerRef = useRef(null);

  // Reset everything
  const resetSim = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    setPhase("idle");
  };

  // Start the drive — after 2.5s the notification appears
  const startDrive = () => {
    setPhase("driving");
    notifTimerRef.current = setTimeout(() => {
      setPhase("notification");
    }, 2500);
  };

  // User taps the notification → crash
  const handleRespondToNotification = () => {
    setPhase("responded");
    setTimeout(() => setPhase("crash"), 1200);
  };

  // User ignores the notification → success
  const handleIgnoreNotification = () => {
    setPhase("ignored");
    setTimeout(() => {
      setPhase("success");
    }, 1000);
  };

  const isMoving =
    phase === "driving" || phase === "notification" || phase === "ignored";
  const isCrash = phase === "crash";
  const isSuccess = phase === "success";

  return (
    <div className="space-y-6">
      {/* Instruction Banner */}
      <div className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-2xl px-5 py-3 border border-teal-100 flex items-center gap-3">
        <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
          <Smartphone size={18} className="text-teal-600" />
        </div>
        <p className="text-xs md:text-sm text-slate-600 font-semibold leading-snug">
          Start driving. A notification will appear — will you ignore it or get distracted? Your choice decides the outcome!
        </p>
      </div>

      {/* Simulator Viewport */}
      <motion.div
        animate={isCrash ? { x: [0, -18, 18, -10, 10, -6, 6, 0] } : {}}
        transition={{ duration: 0.5 }}
        className={isFullScreen ? "fixed inset-0 z-50 bg-slate-900 border-none rounded-none overflow-hidden flex items-center justify-center select-none" : "relative rounded-3xl h-[450px] w-full border-8 border-slate-800 overflow-hidden shadow-xl flex items-center justify-center select-none"}
      >
        {/* Full Screen Toggle Button */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-4 right-4 z-50 p-2.5 bg-slate-800/80 hover:bg-slate-700/90 text-white rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
          title={isFullScreen ? "Exit Full Screen" : "Play Full Screen"}
        >
          {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Road */}
        <AnimatedRoad isMoving={isMoving} speed={0.4} />



        {/* Car */}
        <motion.div
          animate={
            phase === "idle"
              ? { left: "20%", top: "35%", rotate: 0 }
              : phase === "driving" ||
                  phase === "notification" ||
                  phase === "ignored" ||
                  phase === "success"
                ? {
                    left: "20%",
                    top: ["35%", "33%", "37%", "35%"],
                    rotate: 0,
                  }
                : phase === "responded"
                  ? {
                      left: ["20%", "38%"],
                      top: ["35%", "23%"],
                      rotate: [0, -12],
                    }
                  : phase === "crash"
                    ? { left: "40%", top: "23%", rotate: -18 }
                    : { left: "20%", top: "35%", rotate: 0 }
          }
          transition={{
            duration:
              phase === "idle"
                ? 0.5
                : phase === "driving" ||
                    phase === "notification" ||
                    phase === "ignored"
                  ? 2
                  : 1,
            ease: "easeInOut",
            repeat:
              phase === "driving" ||
              phase === "notification" ||
              phase === "ignored"
                ? Infinity
                : 0,
          }}
          className="absolute z-30"
        >
          {isCrash ? (
            <AlertOctagon size={52} className="text-rose-500 animate-ping" />
          ) : (
            <RealisticCar color={isCrash ? "#ef4444" : "#0d9488"} scaleX={-1} />
          )}
        </motion.div>

        {/* ── NOTIFICATION POPUP (appears mid-drive) ── */}
        <AnimatePresence>
          {phase === "notification" && (
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs"
            >
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden">
                {/* Notification header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Smartphone size={15} className="text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-slate-800 truncate">
                      Messages • now
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Rahul: "Hey! Are you there? 😄"
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {/* IGNORE button */}
                    <button
                      onClick={handleIgnoreNotification}
                      className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer"
                    >
                      Ignore
                    </button>
                    {/* REPLY button */}
                    <button
                      onClick={handleRespondToNotification}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-rose-100 active:scale-95 text-slate-700 hover:text-rose-700 text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer border border-slate-300"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              {/* Pulse ring to draw attention */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center animate-bounce">
                <span className="text-white text-[9px] font-black">!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CRASH OVERLAY ── */}
        <AnimatePresence>
          {isCrash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-rose-950/90 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-rose-600 p-6"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500/50 flex items-center justify-center mb-3 animate-bounce">
                <AlertOctagon size={36} />
              </div>
              <span className="text-2xl md:text-4xl font-black uppercase tracking-widest text-center text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]">
                💥 CRASH!
              </span>
              <p className="text-sm font-semibold leading-relaxed mt-3 text-center bg-rose-900/60 px-5 py-3 rounded-2xl border border-rose-700/50 text-rose-100 max-w-xs">
                You replied to the notification while driving. Just 2 seconds of distraction was enough to cause an accident.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SUCCESS OVERLAY ── */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-teal-950/88 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-8 border-teal-500 p-6"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border-2 border-teal-500/50 flex items-center justify-center mb-3 animate-pulse">
                <ShieldCheck size={36} />
              </div>
              <span className="text-2xl md:text-4xl font-black uppercase tracking-widest text-center text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]">
                ✅ FOCUSED DRIVE!
              </span>
              <p className="text-sm font-semibold leading-relaxed mt-3 text-center bg-teal-900/60 px-5 py-3 rounded-2xl border border-teal-700/50 text-teal-100 max-w-xs">
                Great call! You ignored the notification and kept everyone safe. That message can wait — your life cannot.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Controls Overlay */}
        {isFullScreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-45 bg-slate-950/85 backdrop-blur-md px-6 py-4 rounded-3xl border border-slate-700/50 shadow-2xl flex items-center justify-center gap-4">
            {phase === "idle" ? (
              <button
                onClick={startDrive}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Navigation size={16} />
                Start Driving
              </button>
            ) : (
              <button
                onClick={resetSim}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Reset Scenario
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Advisory Card — shown after crash */}
      <AnimatePresence>
        {isCrash && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0">
                <ShieldAlert size={20} className="text-rose-600" />
              </div>
              <h4 className="text-sm font-black text-rose-800 uppercase tracking-wide">
                ⚠️ Safety Advisory
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-rose-700 font-semibold leading-relaxed pl-2">
              <li className="flex gap-2 items-start">
                <span className="text-rose-400 mt-0.5">▸</span>{" "}
                Using a phone while driving increases crash risk by 4–23x.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-rose-400 mt-0.5">▸</span>{" "}
                At 60 km/h, reading a text for 5 seconds = driving blindfolded for 83 meters.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-rose-400 mt-0.5">▸</span>{" "}
                Always put your phone on silent or 'Do Not Disturb' mode before driving.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-rose-400 mt-0.5">▸</span>{" "}
                Pull over safely if you must make a call or send a message.
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {!isFullScreen && (
        <div className="flex justify-center">
          {phase === "idle" ? (
            <button
              onClick={startDrive}
              className="px-10 py-4 font-black text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-3 shadow-lg active:scale-95 bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/30 shadow-xl"
            >
              <Navigation size={18} />
              Start Driving
            </button>
          ) : (
            <button
              onClick={resetSim}
              className="px-10 py-4 font-black text-sm tracking-widest uppercase rounded-2xl transition-all cursor-pointer flex items-center gap-3 shadow-lg active:scale-95 bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300"
            >
              <RefreshCw size={18} />
              Reset Scenario
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// --- MAIN TRAFFIC LAB COMPONENT ---
const TrafficLab = () => {
  const [activeScenario, setActiveScenario] = useState("crossing");

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-4 md:p-6 w-full max-w-none">
      <div className="w-full text-left space-y-6">
        {/* Tab Navigation - Distinct Teal Safety Green Theme */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap gap-2.5">
            {[
              {
                id: "crossing",
                label: "Zebra Crossing",
                icon: <Activity size={16} />,
              },
              {
                id: "speeding",
                label: "Over Speeding",
                icon: <Zap size={16} />,
              },
              {
                id: "wrongSide",
                label: "Lane Discipline",
                icon: <AlertTriangle size={16} />,
              },
              {
                id: "distracted",
                label: "Distracted Driving",
                icon: <Smartphone size={16} />,
              },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc.id)}
                className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeScenario === sc.id
                    ? "bg-teal-600 text-white shadow-teal-500/20 shadow-lg scale-105 font-black"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {sc.icon} {sc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Simulator Section Container - Clean Slate Background */}
        <div className="bg-slate-50 p-4 md:p-6 rounded-[28px] border border-slate-200 w-full">
          <AnimatePresence mode="wait">
            {activeScenario === "crossing" && (
              <motion.div
                key="crossing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <CrossingSimulator />
              </motion.div>
            )}
            {activeScenario === "speeding" && (
              <motion.div
                key="speeding"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <SpeedingSimulator />
              </motion.div>
            )}
            {activeScenario === "wrongSide" && (
              <motion.div
                key="wrongSide"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <WrongSideSimulator />
              </motion.div>
            )}
            {activeScenario === "distracted" && (
              <motion.div
                key="distracted"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <DistractedSimulator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TrafficLab;

import StatCounter from "./StatCounter";
import { FileText, CalendarDays, Flag, Users } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        <Stat
          icon={<FileText size={22} />}
          value={1240}
          label="Proposals for Pre-Summit events"
        />

        <Stat
          icon={<CalendarDays size={22} />}
          value={340}
          label="Pre-Summit Events held so far"
        />

        <Stat
          icon={<Flag size={22} />}
          value={'07'}
          label="Flagship Events"
        />

        <Stat
          icon={<Users size={22} />}
          value={225000}
          label="Participants Engaged"
        />

      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex flex-col gap-2">
      
      {/* ICON + NUMBER */}
      <div className="flex items-center gap-2">
        <div className="text-indigo-600 shrink-0 w-6">
          {icon}
        </div>
        <StatCounter value={value} />
      </div>

      {/* LABEL — aligned properly */}
      <p className="text-sm font-semibold text-gray-800 pl-8">
        {label}
      </p>

    </div>
  );
}

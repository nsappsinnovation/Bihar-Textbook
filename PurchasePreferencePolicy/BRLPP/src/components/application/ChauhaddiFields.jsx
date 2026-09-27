import { FiArrowUp, FiArrowDown, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Input } from "../ui/Field";
import { useT } from "../../i18n/LanguageContext";

const SIDES = [
  ["north", FiArrowUp],
  ["south", FiArrowDown],
  ["east", FiArrowRight],
  ["west", FiArrowLeft],
];

export default function ChauhaddiFields({ value, onChange, errors = {} }) {
  const { t } = useT();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {SIDES.map(([side, Icon]) => (
        <Input
          key={side}
          name={`chauhaddi.${side}`}
          label={t(side)}
          icon={Icon}
          maxLength={120}
          value={value?.[side] || ""}
          onChange={(e) => onChange({ ...value, [side]: e.target.value })}
          error={errors[`chauhaddi.${side}`]}
        />
      ))}
    </div>
  );
}

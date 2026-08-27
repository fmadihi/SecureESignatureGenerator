// interface Props {
//   label: string
//   value: number
//   min: number
//   max: number
//   unit?: string
// }

// export function ThermalBadge({ label, value, min, max, unit }: Props) {
//   const inRange = value >= min && value <= max
//   return (
//     <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 border border-slate-600">
//       <span className="text-sm text-slate-300">{label}</span>
//       <span
//         className={`text-sm font-semibold ${
//           inRange ? 'text-emerald-400' : 'text-red-400'
//         }`}
//       >
//         {value}
//         {unit}
//         {!inRange && ' ⚠'}
//       </span>
//     </div>
//   )
// }
import React from 'react';

interface Props {
  warnings: string[];
}

export const ThermalBadge: React.FC<Props> = ({ warnings }) => {
  if (warnings.length === 0) {
    return (
      <div className="flex items-center gap-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 shadow-sm">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-60" />
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="flex-1 text-xs">
          <span className="text-emerald-300 font-semibold">Thermal Status: Optimal</span>
          <p className="text-emerald-400/70 text-[11px]">Material temperatures are within manufacturer safe tolerance bounds.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 space-y-2 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-60" />
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
        </div>
        <span className="text-xs text-amber-300 font-semibold uppercase tracking-wide">⚠ Thermal Parameters Warning</span>
      </div>
      <ul className="text-xs text-amber-200/90 pl-5 space-y-1">
        {warnings.map((warn, idx) => (
          <li key={idx} className="list-disc marker:text-amber-400">{warn}</li>
        ))}
      </ul>
    </div>
  );
};
// import type { PrinterState } from "../types/printer";

// interface Props {
//   state: PrinterState;
// }

// // Simple CSS-based pseudo-3D isometric visualization (no external 3D library needed)
// export function PrintBed3D({ state }: Props) {
//   const { bed, material } = state;
//   const scale = 0.6;
//   const w = bed.width * scale;
//   const d = bed.depth * scale;
//   const h = Math.min(bed.height * scale, 200);

//   return (
//     <div className="flex items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 min-h-[320px]">
//       <div
//         className="relative"
//         style={{
//           width: w,
//           height: h,
//           transformStyle: "preserve-3d",
//           transform: "rotateX(55deg) rotateZ(-45deg)",
//         }}
//       >
//         {/* Bed base */}
//         <div
//           className="absolute inset-0 border-2 rounded-sm"
//           style={{
//             width: w,
//             height: d,
//             backgroundColor: `${material.color}22`,
//             borderColor: material.color,
//             transform: `translateZ(0px)`,
//           }}
//         />
//         {/* Vertical frame edges to suggest height */}
//         <div
//           className="absolute border-l-2 border-dashed"
//           style={{
//             height: h,
//             left: 0,
//             top: 0,
//             borderColor: "#64748b",
//             transform: "rotateX(-90deg)",
//             transformOrigin: "top left",
//           }}
//         />
//       </div>
//       <div className="absolute bottom-4 text-xs text-slate-500">
//         {bed.width} × {bed.depth} × {bed.height} mm — isometric preview
//       </div>
//     </div>
//   );
// }
import React from 'react';
import type { PrinterState } from '../types/printer';


interface Props {
  state: PrinterState;
}

export const PrintBed3D: React.FC<Props> = ({ state }) => {
  const { bedWidth, bedDepth, filamentColor } = state;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-dark-900 to-dark-950 border border-slate-800/80 p-6 flex flex-col items-center justify-center min-h-[360px] shadow-panel">
      {/* Header overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-950/80 px-3 py-1 rounded-lg border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D Isometric Preview</span>
      </div>

      <div className="absolute top-4 right-4 text-xs font-mono text-slate-400 bg-dark-950/80 px-3 py-1 rounded-lg border border-slate-800">
        {bedWidth} × {bedDepth} mm
      </div>

      <div className="flex items-center justify-center w-full py-12 perspective-800">
        <div 
          className="preserve-3d transition-transform duration-300"
          style={{
            transform: 'rotateX(60deg) rotateZ(-45deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Print Bed */}
          <div
            className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-slate-600/80 shadow-2xl rounded-sm transition-all duration-300"
            style={{
              width: `${bedWidth}px`,
              height: `${bedDepth}px`,
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(56, 189, 248, 0.08) 19px, rgba(56, 189, 248, 0.08) 20px),
                repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(56, 189, 248, 0.08) 19px, rgba(56, 189, 248, 0.08) 20px)
              `,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(56, 189, 248, 0.05)'
            }}
          >
            {/* Origin indicator */}
            <div className="absolute bottom-1 left-1 text-[9px] text-cyan-400/70 font-mono font-bold">
              (0,0)
            </div>

            {/* Bed Center Grid Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyan-400/30 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-1 h-1 bg-cyan-400/60 rounded-full" />
            </div>

            {/* Sample Print Object (Cube) */}
            <div
              className="absolute preserve-3d"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) translateZ(30px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="preserve-3d transition-colors duration-300"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: filamentColor,
                  boxShadow: `0 0 25px ${filamentColor}60`,
                  transform: 'rotateX(-90deg)',
                  transformStyle: 'preserve-3d',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                {/* Cube Sides for 3D effect */}
                <div
                  style={{
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    backgroundColor: filamentColor,
                    transform: 'rotateX(90deg) translateZ(60px)',
                    opacity: 0.92,
                    filter: 'brightness(1.1)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    backgroundColor: filamentColor,
                    transform: 'rotateY(90deg) translateZ(60px)',
                    opacity: 0.75,
                    filter: 'brightness(0.85)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Build Volume Shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translateZ(-15px)',
              background: 'radial-gradient(circle, rgba(0,0,0,0.7) 0%, transparent 70%)',
              filter: 'blur(25px)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
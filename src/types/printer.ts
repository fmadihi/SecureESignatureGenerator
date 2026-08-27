export type MaterialType = 'PLA' | 'ABS' | 'PETG';
export const MATERIAL_PRESETS: Record<string, MaterialPreset> = {
  PLA: {
    name: 'PLA',
    nozzleTemp: 210,
    bedTemp: 60,
    nozzleTempRange: [190, 230],
    bedTempRange: [50, 70],
    color: '#3b82f6'
  },
  ABS: {
    name: 'ABS',
    nozzleTemp: 240,
    bedTemp: 100,
    nozzleTempRange: [220, 260],
    bedTempRange: [90, 110],
    color: '#ef4444'
  },
  PETG: {
    name: 'PETG',
    nozzleTemp: 230,
    bedTemp: 80,
    nozzleTempRange: [220, 250],
    bedTempRange: [70, 90],
    color: '#10b981'
  }
};
export interface MaterialPreset {
  name: MaterialType;
  nozzleTemp: number;
  bedTemp: number;
  nozzleTempRange: [number, number];
  bedTempRange: [number, number];
  color: string;
}

export interface PrinterState {
  bedWidth: number;
  bedDepth: number;
  bedHeight: number;
  nozzleTemp: number;
  bedTemp: number;
  material: MaterialType;
  filamentColor: string;
}
export const FILAMENT_COLORS = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Yellow', hex: '#fbbf24' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'White', hex: '#f8fafc' },
  { name: 'Black', hex: '#1e293b' }
];

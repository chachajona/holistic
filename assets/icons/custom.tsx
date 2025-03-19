import Cupping from "./Cupping";
import DryNeedle from "./DryNeedle";
import Exercise from "./Exercise";
import IcePlunge from "./IcePlunge";
import HeatLight from "./HeatLight";

// Custom icon registry - maps string names to components
export const customIcons = {
    IcePlunge,
    DryNeedle,
    Exercise,
    Cupping,
    HeatLight,
};

// Type for the keys of custom icons (useful for TypeScript)
export type CustomIconName = keyof typeof customIcons;

// Helper to check if a name is a custom icon
export const isCustomIcon = (name: string): name is CustomIconName => {
    return name in customIcons;
};

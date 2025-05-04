import BackPain from "./BackPain";
import Cupping from "./Cupping";
import DryNeedle from "./DryNeedle";
import Exercise from "./Exercise";
import HeatLight from "./HeatLight";
import IcePlunge from "./IcePlunge";
import JointPain from "./JointPain";
import PostSurgery from "./PostSurgery";
import SportInjuries from "./SportInjuries";

export const customIcons = {
    IcePlunge,
    DryNeedle,
    Exercise,
    Cupping,
    HeatLight,
    BackPain,
    JointPain,
    SportInjuries,
    PostSurgery,
};

export type CustomIconName = keyof typeof customIcons;

export const isCustomIcon = (name: string): name is CustomIconName => {
    return name in customIcons;
};

/// <reference types="nativewind/types" />

declare module "lucide-react-native" {
    import { FC } from "react";

    interface IconProps {
        size?: number;
        color?: string;
        fill?: string;
        strokeWidth?: number;
        className?: string;
    }

    type Icon = FC<IconProps>;

    // Navigation & UI
    export const Home: Icon;
    export const Mic2: Icon;
    export const Trophy: Icon;
    export const BookOpen: Icon;
    export const User: Icon;
    export const Target: Icon;
    export const ChevronRight: Icon;
    export const ChevronLeft: Icon;
    export const Check: Icon;
    export const Search: Icon;
    export const Settings: Icon;
    export const X: Icon;

    // Stats & Indicators
    export const Flame: Icon;
    export const Star: Icon;
    export const Headset: Icon;
    export const PenLine: Icon;
    export const BookText: Icon;

    // Media Controls
    export const Square: Icon;
    export const Play: Icon;
    export const Pause: Icon;
    export const Volume2: Icon;
    export const VolumeX: Icon;

    // Time & Clock
    export const Clock: Icon;
    export const Timer: Icon;

    // Awards
    export const Medal: Icon;
    export const Crown: Icon;
    export const Award: Icon;

    // Settings & Profile
    export const Bell: Icon;
    export const BellOff: Icon;
    export const Moon: Icon;
    export const Sun: Icon;
    export const Vibrate: Icon;
    export const LogOut: Icon;
    export const Shield: Icon;
    export const Globe: Icon;
    export const Languages: Icon;

    // Actions
    export const Plus: Icon;
    export const Minus: Icon;
    export const Edit: Icon;
    export const Trash: Icon;
    export const RefreshCw: Icon;
    export const Share: Icon;
    export const Heart: Icon;
    export const Bookmark: Icon;

    // Misc
    export const Info: Icon;
    export const AlertCircle: Icon;
    export const CheckCircle: Icon;
    export const XCircle: Icon;
    export const Loader2: Icon;
    export const ArrowRight: Icon;
    export const ArrowLeft: Icon;
}

declare module "nativewind" {
    export function styled<P>(component: any, baseClassName?: string): any;
}

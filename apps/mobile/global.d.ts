declare var __DEV__: boolean;

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

// Explicitly declare modules that are causing resolution issues in monorepo
declare module "lucide-react-native" {
    import { LucideProps } from "lucide-react";
    import { ReactNode } from "react";
    export type Icon = (props: LucideProps) => ReactNode;
    export const Home: Icon;
    export const Mic2: Icon;
    export const Trophy: Icon;
    export const BookOpen: Icon;
    export const User: Icon;
    export const Target: Icon;
    export const Flame: Icon;
    export const Star: Icon;
    export const Headset: Icon;
    export const PenLine: Icon;
    export const BookText: Icon;
    export const ChevronRight: Icon;
    export const ChevronLeft: Icon;
    export const Check: Icon;
    export const Search: Icon;
    export const Settings: Icon;
}

declare module "nativewind" {
    import { StyledComponent } from "nativewind";
    export function styled<P>(component: React.ComponentType<P>, baseClassName?: string): React.ComponentType<P & { className?: string }>;
}

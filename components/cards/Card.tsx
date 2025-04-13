import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

export type CardSize = "sm" | "md" | "lg" | "xl";
export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

interface CardProps {
  children: ReactNode;
  className?: string;
  size?: CardSize;
  variant?: CardVariant;
  color?: CardColor;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  hoverEffect?: boolean;
}

const sizeClasses: Record<CardSize, string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white dark:bg-slate-800",
  outlined: "border border-slate-200 dark:border-slate-700",
  elevated: "bg-white dark:bg-slate-800 shadow-md",
  filled: "bg-slate-50 dark:bg-slate-700",
};

const colorClasses: Record<CardColor, string> = {
  slate: "text-slate-900 dark:text-slate-100",
  gray: "text-gray-900 dark:text-gray-100",
  zinc: "text-zinc-900 dark:text-zinc-100",
  neutral: "text-neutral-900 dark:text-neutral-100",
  stone: "text-stone-900 dark:text-stone-100",
  red: "text-red-500 dark:text-red-400",
  orange: "text-orange-400 dark:text-orange-300",
  amber: "text-amber-400 dark:text-amber-300",
  yellow: "text-yellow-400 dark:text-yellow-300",
  lime: "text-lime-400 dark:text-lime-300",
  green: "text-green-400 dark:text-green-300",
  emerald: "text-emerald-400 dark:text-emerald-300",
  teal: "text-teal-400 dark:text-teal-300",
  cyan: "text-cyan-400 dark:text-cyan-300",
  sky: "text-sky-400 dark:text-sky-300",
  blue: "text-blue-600 dark:text-blue-500",
  indigo: "text-indigo-400 dark:text-indigo-300",
  violet: "text-violet-400 dark:text-violet-300",
  purple: "text-purple-400 dark:text-purple-300",
  fuchsia: "text-fuchsia-400 dark:text-fuchsia-300",
  pink: "text-pink-400 dark:text-pink-300",
  rose: "text-rose-400 dark:text-rose-300",
};

const roundedClasses: Record<NonNullable<CardProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const shadowClasses: Record<NonNullable<CardProps["shadow"]>, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const Card = ({
  children,
  className,
  size = "md",
  variant = "default",
  color = "slate",
  rounded = "lg",
  shadow = "none",
  hoverEffect = false,
}: CardProps) => {
  const baseClasses = clsx(
    "transition-all duration-300 ease-in-out",
    sizeClasses[size],
    variantClasses[variant],
    colorClasses[color],
    roundedClasses[rounded],
    shadowClasses[shadow],
    hoverEffect &&
      "hover:scale-[1.02] hover:shadow-lg hover:translate-y-[-2px]",
    className
  );

  return <div className={baseClasses}>{children}</div>;
};

// Card Header Component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={clsx("mb-4", className)}>{children}</div>;
};

// Card Content Component
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={clsx("", className)}>{children}</div>;
};

// Card Footer Component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div
      className={clsx(
        "mt-4 pt-4 border-t border-slate-200 dark:border-slate-700",
        className
      )}
    >
      {children}
    </div>
  );
};

// Card Action Button Component
interface CardActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  color?: CardColor;
  fullWidth?: boolean;
}

const getActionStyles = (variant: string, color: string) => {
  const baseStyles = {
    primary: {
      blue: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-1px]",
      indigo:
        "bg-indigo-400 text-white hover:bg-indigo-500 hover:shadow-lg hover:translate-y-[-1px]",
      violet:
        "bg-violet-400 text-white hover:bg-violet-500 hover:shadow-lg hover:translate-y-[-1px]",
      emerald:
        "bg-emerald-400 text-white hover:bg-emerald-500 hover:shadow-lg hover:translate-y-[-1px]",
      rose: "bg-rose-400 text-white hover:bg-rose-500 hover:shadow-lg hover:translate-y-[-1px]",
      red: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:translate-y-[-1px]",
      orange:
        "bg-orange-400 text-white hover:bg-orange-500 hover:shadow-lg hover:translate-y-[-1px]",
      yellow:
        "bg-yellow-400 text-white hover:bg-yellow-500 hover:shadow-lg hover:translate-y-[-1px]",
      lime: "bg-lime-400 text-white hover:bg-lime-500 hover:shadow-lg hover:translate-y-[-1px]",
      green:
        "bg-green-400 text-white hover:bg-green-500 hover:shadow-lg hover:translate-y-[-1px]",
      teal: "bg-teal-400 text-white hover:bg-teal-500 hover:shadow-lg hover:translate-y-[-1px]",
      cyan: "bg-cyan-400 text-white hover:bg-cyan-500 hover:shadow-lg hover:translate-y-[-1px]",
      sky: "bg-sky-400 text-white hover:bg-sky-500 hover:shadow-lg hover:translate-y-[-1px]",
      purple:
        "bg-purple-400 text-white hover:bg-purple-500 hover:shadow-lg hover:translate-y-[-1px]",
      fuchsia:
        "bg-fuchsia-400 text-white hover:bg-fuchsia-500 hover:shadow-lg hover:translate-y-[-1px]",
      pink: "bg-pink-400 text-white hover:bg-pink-500 hover:shadow-lg hover:translate-y-[-1px]",
    },
    outline: {
      blue: "border border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md hover:translate-y-[-1px]",
      indigo:
        "border border-indigo-400 text-indigo-400 hover:bg-indigo-50 hover:shadow-md hover:translate-y-[-1px]",
      violet:
        "border border-violet-400 text-violet-400 hover:bg-violet-50 hover:shadow-md hover:translate-y-[-1px]",
      emerald:
        "border border-emerald-400 text-emerald-400 hover:bg-emerald-50 hover:shadow-md hover:translate-y-[-1px]",
      rose: "border border-rose-400 text-rose-400 hover:bg-rose-50 hover:shadow-md hover:translate-y-[-1px]",
      red: "border border-red-500 text-red-500 hover:bg-red-50 hover:shadow-md hover:translate-y-[-1px]",
      orange:
        "border border-orange-400 text-orange-400 hover:bg-orange-50 hover:shadow-md hover:translate-y-[-1px]",
      yellow:
        "border border-yellow-400 text-yellow-400 hover:bg-yellow-50 hover:shadow-md hover:translate-y-[-1px]",
      lime: "border border-lime-400 text-lime-400 hover:bg-lime-50 hover:shadow-md hover:translate-y-[-1px]",
      green:
        "border border-green-400 text-green-400 hover:bg-green-50 hover:shadow-md hover:translate-y-[-1px]",
      teal: "border border-teal-400 text-teal-400 hover:bg-teal-50 hover:shadow-md hover:translate-y-[-1px]",
      cyan: "border border-cyan-400 text-cyan-400 hover:bg-cyan-50 hover:shadow-md hover:translate-y-[-1px]",
      sky: "border border-sky-400 text-sky-400 hover:bg-sky-50 hover:shadow-md hover:translate-y-[-1px]",
      purple:
        "border border-purple-400 text-purple-400 hover:bg-purple-50 hover:shadow-md hover:translate-y-[-1px]",
      fuchsia:
        "border border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-50 hover:shadow-md hover:translate-y-[-1px]",
      pink: "border border-pink-400 text-pink-400 hover:bg-pink-50 hover:shadow-md hover:translate-y-[-1px]",
    },
    ghost: {
      blue: "text-blue-600 hover:bg-blue-50 hover:shadow-sm hover:translate-y-[-1px]",
      indigo:
        "text-indigo-400 hover:bg-indigo-50 hover:shadow-sm hover:translate-y-[-1px]",
      violet:
        "text-violet-400 hover:bg-violet-50 hover:shadow-sm hover:translate-y-[-1px]",
      emerald:
        "text-emerald-400 hover:bg-emerald-50 hover:shadow-sm hover:translate-y-[-1px]",
      rose: "text-rose-400 hover:bg-rose-50 hover:shadow-sm hover:translate-y-[-1px]",
      red: "text-red-500 hover:bg-red-50 hover:shadow-sm hover:translate-y-[-1px]",
      orange:
        "text-orange-400 hover:bg-orange-50 hover:shadow-sm hover:translate-y-[-1px]",
      yellow:
        "text-yellow-400 hover:bg-yellow-50 hover:shadow-sm hover:translate-y-[-1px]",
      lime: "text-lime-400 hover:bg-lime-50 hover:shadow-sm hover:translate-y-[-1px]",
      green:
        "text-green-400 hover:bg-green-50 hover:shadow-sm hover:translate-y-[-1px]",
      teal: "text-teal-400 hover:bg-teal-50 hover:shadow-sm hover:translate-y-[-1px]",
      cyan: "text-cyan-400 hover:bg-cyan-50 hover:shadow-sm hover:translate-y-[-1px]",
      sky: "text-sky-400 hover:bg-sky-50 hover:shadow-sm hover:translate-y-[-1px]",
      purple:
        "text-purple-400 hover:bg-purple-50 hover:shadow-sm hover:translate-y-[-1px]",
      fuchsia:
        "text-fuchsia-400 hover:bg-fuchsia-50 hover:shadow-sm hover:translate-y-[-1px]",
      pink: "text-pink-400 hover:bg-pink-50 hover:shadow-sm hover:translate-y-[-1px]",
    },
  };

  return (
    baseStyles[variant as keyof typeof baseStyles]?.[
      color as keyof typeof baseStyles.primary
    ] || ""
  );
};

export const CardActionButton = ({
  children,
  onClick,
  className,
  variant = "primary",
  color = "blue",
  fullWidth = false,
}: CardActionButtonProps) => {
  const baseButtonClasses = clsx(
    "px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out",
    fullWidth && "w-full",
    getActionStyles(variant, color),
    className
  );

  return (
    <button onClick={onClick} className={baseButtonClasses}>
      {children}
    </button>
  );
};

// Card Action Link Component
interface CardActionLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  color?: CardColor;
  fullWidth?: boolean;
}

export const CardActionLink = ({
  children,
  href,
  className,
  variant = "primary",
  color = "blue",
  fullWidth = false,
}: CardActionLinkProps) => {
  const baseLinkClasses = clsx(
    "inline-block px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out",
    fullWidth && "w-full text-center",
    getActionStyles(variant, color),
    className
  );

  return (
    <Link href={href} className={baseLinkClasses}>
      {children}
    </Link>
  );
};

// Card Actions Component
interface CardActionsProps {
  children: ReactNode;
  className?: string;
  justify?: "start" | "end" | "center" | "between" | "around";
}

export const CardActions = ({
  children,
  className,
  justify = "start",
}: CardActionsProps) => {
  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
  };

  return (
    <div
      className={clsx("flex gap-2 mt-4", justifyClasses[justify], className)}
    >
      {children}
    </div>
  );
};

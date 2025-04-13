import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

export type CardSize = "sm" | "md" | "lg" | "xl";
export type CardVariant = "default" | "glass" | "neon" | "gradient" | "dark";

interface CardProps {
  children: ReactNode;
  className?: string;
  size?: CardSize;
  variant?: CardVariant;
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
  default: "bg-midnight text-ice border border-white/10",
  glass: "bg-white/10 backdrop-blur-lg border border-white/20 text-ice",
  neon: "bg-deep/50 backdrop-blur-md border border-neon-cyan/30 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]",
  gradient:
    "bg-gradient-to-br from-midnight via-deep to-midnight border border-electric/20 text-ice",
  dark: "bg-deep border border-slate/20 text-ice",
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
  rounded = "lg",
  shadow = "none",
  hoverEffect = false,
}: CardProps) => {
  const baseClasses = clsx(
    "transition-all duration-300 ease-in-out",
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    shadowClasses[shadow],
    hoverEffect &&
      "hover:scale-[1.02] hover:shadow-lg hover:translate-y-[-2px] hover:shadow-neon-cyan/20",
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
    <div className={clsx("mt-4 pt-4 border-t border-white/10", className)}>
      {children}
    </div>
  );
};

// Card Action Button Component
interface CardActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  fullWidth?: boolean;
}

const actionVariants = {
  primary:
    "bg-neon-cyan text-midnight hover:bg-neon-cyan/90 hover:shadow-neon-cyan/20",
  outline: "border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10",
  ghost: "text-neon-cyan hover:bg-neon-cyan/10",
};

export const CardActionButton = ({
  children,
  onClick,
  className,
  variant = "primary",
  fullWidth = false,
}: CardActionButtonProps) => {
  const baseButtonClasses = clsx(
    "px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out",
    actionVariants[variant],
    fullWidth && "w-full",
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
  variant?: "primary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export const CardActionLink = ({
  children,
  href,
  className,
  variant = "primary",
  fullWidth = false,
}: CardActionLinkProps) => {
  const baseLinkClasses = clsx(
    "inline-block px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out",
    actionVariants[variant],
    fullWidth && "w-full text-center",
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

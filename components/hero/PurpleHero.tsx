import { ReactNode } from "react";
import clsx from "clsx";

interface PurpleHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  variant?:
    | "purple"
    | "blue"
    | "cyan"
    | "emerald"
    | "rose"
    | "amber"
    | "indigo"
    | "slate";
  dotSize?: "small" | "medium" | "large";
  dotOpacity?: "light" | "medium" | "dark";
  centerContent?: boolean;
  showLogo?: boolean;
  glowIntensity?: "none" | "subtle" | "medium" | "high";
}

const variantStyles = {
  purple:
    "bg-[radial-gradient(100%_500px_at_top,#1a1150_0%,transparent_100%),radial-gradient(100%_100%_at_left,#1a1150_0%,transparent_50%),radial-gradient(100%_100%_at_right,#1a1150_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  blue: "bg-[radial-gradient(100%_500px_at_top,#101835_0%,transparent_100%),radial-gradient(100%_100%_at_left,#101835_0%,transparent_50%),radial-gradient(100%_100%_at_right,#101835_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  cyan: "bg-[radial-gradient(100%_500px_at_top,#123244_0%,transparent_100%),radial-gradient(100%_100%_at_left,#123244_0%,transparent_50%),radial-gradient(100%_100%_at_right,#123244_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  emerald:
    "bg-[radial-gradient(100%_500px_at_top,#123828_0%,transparent_100%),radial-gradient(100%_100%_at_left,#123828_0%,transparent_50%),radial-gradient(100%_100%_at_right,#123828_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  rose: "bg-[radial-gradient(100%_500px_at_top,#2d1218_0%,transparent_100%),radial-gradient(100%_100%_at_left,#2d1218_0%,transparent_50%),radial-gradient(100%_100%_at_right,#2d1218_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  amber:
    "bg-[radial-gradient(100%_500px_at_top,#2d1f10_0%,transparent_100%),radial-gradient(100%_100%_at_left,#2d1f10_0%,transparent_50%),radial-gradient(100%_100%_at_right,#2d1f10_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  indigo:
    "bg-[radial-gradient(100%_500px_at_top,#1a1339_0%,transparent_100%),radial-gradient(100%_100%_at_left,#1a1339_0%,transparent_50%),radial-gradient(100%_100%_at_right,#1a1339_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
  slate:
    "bg-[radial-gradient(100%_500px_at_top,#1a1f2d_0%,transparent_100%),radial-gradient(100%_100%_at_left,#1a1f2d_0%,transparent_50%),radial-gradient(100%_100%_at_right,#1a1f2d_0%,transparent_50%)] bg-midnight relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:via-black/0 before:to-midnight before:translate-y-[700px]",
};

const glowColors = {
  purple: "bg-purple-500/5",
  blue: "bg-blue-500/5",
  cyan: "bg-cyan-500/5",
  emerald: "bg-emerald-500/5",
  rose: "bg-rose-500/5",
  amber: "bg-amber-500/5",
  indigo: "bg-indigo-500/5",
  slate: "bg-slate-500/5",
};

const titleGradients = {
  purple: "from-white via-purple-100 to-purple-200",
  blue: "from-white via-blue-100 to-blue-200",
  cyan: "from-white via-cyan-100 to-cyan-200",
  emerald: "from-white via-emerald-100 to-emerald-200",
  rose: "from-white via-rose-100 to-rose-200",
  amber: "from-white via-amber-100 to-amber-200",
  indigo: "from-white via-indigo-100 to-indigo-200",
  slate: "from-white via-slate-100 to-slate-200",
};

const dotSizeStyles = {
  small: "before:bg-[size:12px_12px]",
  medium: "before:bg-[size:16px_16px]",
  large: "before:bg-[size:20px_20px]",
};

const dotOpacityStyles = {
  light: "before:opacity-[0.15]",
  medium: "before:opacity-[0.2]",
  dark: "before:opacity-[0.25]",
};

const glowIntensityStyles = {
  none: "opacity-0",
  subtle: "opacity-[0.07]",
  medium: "opacity-[0.12]",
  high: "opacity-[0.17]",
};

export const PurpleHero = ({
  title,
  subtitle,
  description,
  className,
  children,
  variant = "purple",
  dotSize = "medium",
  dotOpacity = "medium",
  centerContent = true,
  showLogo = false,
  glowIntensity = "subtle",
}: PurpleHeroProps) => {
  return (
    <section
      className={clsx(
        "relative min-h-[50vh] flex items-center overflow-hidden py-16 md:py-24",
        variantStyles[variant],
        className
      )}
    >
      {/* Dot Pattern Background */}
      <div
        className={clsx(
          "absolute inset-0 overflow-hidden",
          "before:absolute before:inset-0",
          "before:bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1.5px,_transparent_1.5px)]",
          "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-midnight after:translate-y-[700px]",
          dotSizeStyles[dotSize],
          dotOpacityStyles[dotOpacity]
        )}
      />

      {/* Glow Effects */}
      <div
        className={clsx("absolute inset-0", glowIntensityStyles[glowIntensity])}
      >
        <div
          className={clsx(
            "absolute top-0 left-1/3 w-1/3 h-1/3 rounded-full blur-2xl",
            glowColors[variant]
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 right-1/3 w-1/3 h-1/3 rounded-full blur-2xl",
            glowColors[variant]
          )}
        />
      </div>

      {/* Content Container */}
      <div
        className={clsx(
          "relative container mx-auto px-4",
          centerContent && "text-center"
        )}
      >
        {/* Optional Logo */}
        {showLogo && (
          <div className="flex justify-center mb-8">
            <div
              className={clsx(
                "w-16 h-16 rounded-lg backdrop-blur-sm flex items-center justify-center",
                glowColors[variant]
              )}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded",
                  `bg-gradient-to-br ${titleGradients[variant]}`
                )}
              />
            </div>
          </div>
        )}

        {/* Title */}
        <h1
          className={clsx(
            "text-4xl text-electric md:text-5xl lg:text-6xl font-bold mb-6",
            "bg-clip-text text-transparent",
            `bg-gradient-to-r ${titleGradients[variant]}`,
            centerContent && "mx-auto",
            "max-w-4xl"
          )}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <h2
            className={clsx(
              "text-2xl md:text-3xl font-medium mb-6",
              "text-white/90",
              centerContent && "mx-auto",
              "max-w-3xl"
            )}
          >
            {subtitle}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p
            className={clsx(
              "text-lg md:text-xl",
              "text-white/70",
              "leading-relaxed",
              centerContent && "mx-auto",
              "max-w-3xl"
            )}
          >
            {description}
          </p>
        )}

        {/* Children (buttons, additional content) */}
        {children && (
          <div
            className={clsx(
              "mt-8",
              centerContent ? "flex justify-center gap-4" : "space-y-4"
            )}
          >
            {children}
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div
        className={clsx(
          "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent",
          `via-${variant}-500/20`
        )}
      />
      <div
        className={clsx(
          "absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent",
          `via-${variant}-500/20`
        )}
      />
    </section>
  );
};

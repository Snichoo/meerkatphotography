type Shape = "centerDip" | "centerRise" | "wave";

type CurveProps = {
  /** colour shown above the curve (wrapper background). Omit for transparent (e.g. over an image). */
  top?: string;
  /** colour of the filled curved shape below */
  bottom: string;
  shape: Shape;
  height?: number;
  className?: string;
};

const PATHS: Record<Shape, string> = {
  // bottom colour fills the sides and recedes in the centre → the `top` colour bulges DOWN
  centerDip: "M0,0 C440,82 1000,82 1440,0 L1440,100 L0,100 Z",
  // bottom colour bulges UP in the centre into the `top` colour
  centerRise: "M0,100 L0,50 C440,-14 1000,-14 1440,50 L1440,100 Z",
  // multi-hump wave: the `top` colour undulates down into the `bottom` colour
  wave: "M0,38 C160,82 300,8 480,40 C660,72 800,4 980,40 C1160,76 1300,14 1440,46 L1440,100 L0,100 Z",
};

export function Curve({ top, bottom, shape, height = 70, className = "" }: CurveProps) {
  return (
    <div className={className} style={{ background: top ?? "transparent", lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", width: "100%", height }}
      >
        <path d={PATHS[shape]} fill={bottom} />
      </svg>
    </div>
  );
}

export const NAVY = "#382f27";
export const CREAM = "#efe4d8";

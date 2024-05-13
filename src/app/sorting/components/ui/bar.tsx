import clsx from "clsx";
import { barType } from "../../utils/types";

type BarProps = {
  h: number;
  color: barType;
};

export default function Bar({ h, color }: BarProps) {
  const newHeight = 100 + h;
  // console.log(newHeight);
  const c =
    color === "idle"
      ? "muted"
      : color === "comparing"
      ? "popover"
      : "card-foreground";
  //   const c = "green-200";
  return (
    <div className={`flex w-10 bg-${c}`} style={{ height: newHeight }}>
      {h}
    </div>
  );
}

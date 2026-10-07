import { useId } from "react";
import { organelles, type CellType } from "../data/content";
export function OrganelleShape({
  id,
  color = "#91a5c8",
}: {
  id: string;
  color?: string;
}) {
  if (id === "mitochondria" || id === "chloroplasts")
    return (
      <g>
        <ellipse rx="29" ry="16" fill={color} stroke={color} strokeWidth="5" />
        <path
          d={
            id === "mitochondria"
              ? "M-21 2 Q-14 -15 -8 0 T5 0 T19 -2"
              : "M-17 -8v16m10-16v16m10-16v16m10-16v16"
          }
          fill="none"
          stroke="#fff"
          strokeOpacity=".65"
          strokeWidth="3"
        />
      </g>
    );
  if (id === "nucleus" || id === "nucleolus")
    return (
      <g>
        <circle
          r={id === "nucleus" ? 39 : 15}
          fill={color}
          stroke="#dcd1ee"
          strokeWidth="5"
        />
        <circle cx="-9" cy="-11" r="8" fill="white" opacity=".15" />
      </g>
    );
  if (id === "rough-er" || id === "smooth-er" || id === "golgi")
    return (
      <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${-26 + i * 3} ${-20 + i * 12} Q0 ${-34 + i * 12} ${27 - i * 2} ${-17 + i * 12}`}
          />
        ))}
        {id === "rough-er" &&
          [-20, 0, 20].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="-27"
              r="2"
              stroke="#e1be75"
              strokeWidth="4"
            />
          ))}
      </g>
    );
  if (id === "ribosomes")
    return (
      <g fill={color}>
        {[
          [-20, -12],
          [0, 0],
          [18, -16],
          [-13, 15],
          [23, 13],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" />
        ))}
      </g>
    );
  if (id === "nucleoid")
    return (
      <path
        d="M-30 0C-40-38 30-30 20 0S-30 40-10 0S40-25 35 10S-25 25-30 0"
        fill="none"
        stroke={color}
        strokeWidth="5"
      />
    );
  if (id === "flagellum")
    return (
      <path
        d="M-35 12Q-20-24 0 0T40-5"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    );
  if (id === "centrioles")
    return (
      <g stroke={color} strokeWidth="7">
        {[-10, 0, 10].map((x) => (
          <path key={x} d={`M${x - 12} -23v28M5 ${x + 10}h28`} />
        ))}
      </g>
    );
  if (id === "plasmids")
    return (
      <g fill="none" stroke={color} strokeWidth="4">
        <ellipse rx="22" ry="13" transform="rotate(-25)" />
      </g>
    );
  return (
    <g>
      <rect
        x="-29"
        y="-22"
        width="58"
        height="44"
        rx={id === "wall" ? 10 : 22}
        fill={id === "membrane" || id === "wall" ? "none" : color}
        fillOpacity=".55"
        stroke={color}
        strokeWidth="5"
      />
      {id === "lysosomes" && (
        <path d="M-9-4l8 9 10-12" fill="none" stroke="white" strokeWidth="3" />
      )}
    </g>
  );
}
export function OrganelleIcon({ id }: { id: string }) {
  const o = organelles.find((o) => o.id === id);
  return (
    <svg viewBox="-45 -45 90 90" aria-hidden="true">
      <OrganelleShape id={id} color={o?.color} />
    </svg>
  );
}
const positions: Record<string, [number, number]> = {
  nucleus: [242, 196],
  nucleolus: [246, 200],
  mitochondria: [357, 285],
  ribosomes: [159, 311],
  "rough-er": [173, 209],
  "smooth-er": [315, 137],
  golgi: [318, 220],
  lysosomes: [127, 146],
  centrioles: [239, 325],
  vacuole: [207, 292],
  chloroplasts: [363, 160],
  nucleoid: [244, 211],
  plasmids: [336, 249],
  flagellum: [402, 235],
  membrane: [363, 345],
  wall: [111, 344],
  cytoplasm: [128, 260],
};
export default function CellVisual({
  type = "animal",
  added,
  onSelect,
  decorative = false,
}: {
  type?: CellType;
  added?: string[];
  onSelect?: (id: string) => void;
  decorative?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const visible = organelles.filter(
    (o) => o.cellTypes.includes(type) && (!added || added.includes(o.id)),
  );
  return (
    <svg
      className={`cell-visual ${decorative ? "floating" : ""}`}
      viewBox="0 0 500 440"
      role={onSelect ? "group" : "img"}
      aria-label={`Representação estilizada da célula ${type === "animal" ? "animal" : type === "plant" ? "vegetal" : "procarionte"}`}
    >
      <defs>
        <radialGradient id={uid}>
          <stop stopColor={type === "plant" ? "#eef5d5" : "#e1f1f0"} />
          <stop
            offset="1"
            stopColor={type === "plant" ? "#bdd9b5" : "#a6d1d0"}
          />
        </radialGradient>
        <filter id={`${uid}s`}>
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="12"
            floodColor="#29656a"
            floodOpacity=".12"
          />
        </filter>
      </defs>
      <g filter={`url(#${uid}s)`}>
        {type === "plant" ? (
          <rect
            x="72"
            y="65"
            width="352"
            height="321"
            rx="57"
            fill={`url(#${uid})`}
            stroke="#77a78c"
            strokeWidth="13"
          />
        ) : type === "prokaryote" ? (
          <rect
            x="60"
            y="113"
            width="368"
            height="220"
            rx="110"
            fill={`url(#${uid})`}
            stroke="#79b1b4"
            strokeWidth="9"
          />
        ) : (
          <path
            d="M79 157C114 70 237 39 333 76C414 107 446 198 421 282C394 376 286 407 190 380C87 350 34 254 79 157Z"
            fill={`url(#${uid})`}
            stroke="#80b6b5"
            strokeWidth="8"
          />
        )}
        {type === "animal" && (
          <path
            d="M90 160C135 77 249 59 332 89"
            fill="none"
            stroke="white"
            strokeOpacity=".6"
            strokeWidth="4"
          />
        )}
        {visible.map((o) => {
          const [x, y] = positions[o.id];
          return (
            <g
              key={o.id}
              transform={`translate(${x} ${y})`}
              className={onSelect ? "svg-organelle" : ""}
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-label={onSelect ? `Conhecer ${o.name}` : undefined}
              onClick={() => onSelect?.(o.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(o.id);
                }
              }}
            >
              <title>{o.name}</title>
              <circle r="34" fill="transparent" />
              <OrganelleShape id={o.id} color={o.color} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}


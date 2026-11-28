"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { BlockMath, InlineMath } from "react-katex";

import "katex/dist/katex.min.css";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-md border border-border bg-muted/20 text-xs text-muted-foreground">
      Loading plot…
    </div>
  ),
});

/** Jurin's law: capillary-rise height as a function of radius and contact angle. */
const SURFACE_TENSION_WATER = 0.0728; // N/m at 20 °C
const DENSITY_WATER = 1000; // kg/m^3
const G = 9.81; // m/s^2

const RADIUS_RANGE_M = Array.from({ length: 200 }, (_, i) => {
  // log-spaced from 10 µm to 5 mm so the curve stays readable
  const minLog = Math.log10(10e-6);
  const maxLog = Math.log10(5e-3);
  const t = i / 199;
  return 10 ** (minLog + t * (maxLog - minLog));
});

function jurinHeightMeters(radiusM: number, contactAngleRad: number): number {
  return (2 * SURFACE_TENSION_WATER * Math.cos(contactAngleRad)) / (DENSITY_WATER * G * radiusM);
}

export function JurinDemo() {
  const [radiusUm, setRadiusUm] = useState<number>(500); // 0.5 mm default
  const [angleDeg, setAngleDeg] = useState<number>(20);

  const angleRad = (angleDeg * Math.PI) / 180;
  const radiusM = radiusUm * 1e-6;
  const heightM = jurinHeightMeters(radiusM, angleRad);
  const heightMm = heightM * 1000;

  const plotData = useMemo(() => {
    const anglesToDraw = [0, 20, 45, 70].filter((a) => a !== angleDeg).concat(angleDeg);
    const colors: Record<number, string> = {
      0: "#94a3b8",
      20: "#64748b",
      45: "#475569",
      70: "#334155",
    };
    const activeColor = "#5eead4";

    return anglesToDraw.map((a) => {
      const aRad = (a * Math.PI) / 180;
      const ys = RADIUS_RANGE_M.map((r) => jurinHeightMeters(r, aRad) * 1000);
      const isActive = a === angleDeg;
      return {
        x: RADIUS_RANGE_M.map((r) => r * 1e6), // µm on x-axis
        y: ys,
        type: "scatter" as const,
        mode: "lines" as const,
        name: `θ = ${a}°${isActive ? " (current)" : ""}`,
        line: {
          color: isActive ? activeColor : colors[a] ?? "#94a3b8",
          width: isActive ? 2.5 : 1.25,
          dash: isActive ? ("solid" as const) : ("dot" as const),
        },
        hovertemplate: "r = %{x:.1f} µm<br>h = %{y:.2f} mm<extra>θ = " + a + "°</extra>",
      };
    });
  }, [angleDeg]);

  const markerTrace = useMemo(
    () => ({
      x: [radiusUm],
      y: [heightMm],
      type: "scatter" as const,
      mode: "markers" as const,
      name: "current point",
      marker: { color: "#fbbf24", size: 10, line: { color: "#0d1117", width: 1.5 } },
      showlegend: false,
      hovertemplate: `r = ${radiusUm.toFixed(0)} µm<br>h = ${heightMm.toFixed(2)} mm<extra></extra>`,
    }),
    [radiusUm, heightMm],
  );

  return (
    <div className="surface space-y-6 p-5">
      <div className="space-y-2">
        <p className="eyebrow">Interactive demo</p>
        <h3 className="text-lg font-semibold tracking-tight">
          Jurin&rsquo;s law — capillary rise in a thin tube
        </h3>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          Water in a glass capillary climbs against gravity because the solid–liquid interface
          pulls harder than the liquid&rsquo;s weight resists it. Jurin&rsquo;s law gives the
          equilibrium height.
        </p>
      </div>

      <div className="rounded-md border border-border bg-muted/20 p-4">
        <BlockMath math={String.raw`h \;=\; \dfrac{2\,\gamma\,\cos\theta}{\rho\,g\,r}`} />
        <p className="mt-3 text-[12.5px] text-muted-foreground">
          <InlineMath math={String.raw`\gamma`} /> = 0.0728 N/m (water, 20 °C),{" "}
          <InlineMath math={String.raw`\rho`} /> = 1000 kg/m³,{" "}
          <InlineMath math={String.raw`g`} /> = 9.81 m/s².
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Tube radius</span>
            <span className="font-mono text-xs text-muted-foreground">
              r = {radiusUm.toFixed(0)} µm
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={5000}
            step={10}
            value={radiusUm}
            onChange={(e) => setRadiusUm(Number(e.target.value))}
            className="w-full accent-teal-300"
            aria-label="Tube radius in micrometers"
          />
        </label>
        <label className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Contact angle</span>
            <span className="font-mono text-xs text-muted-foreground">θ = {angleDeg}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={89}
            step={1}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
            className="w-full accent-teal-300"
            aria-label="Contact angle in degrees"
          />
        </label>
      </div>

      <div className="grid gap-4 rounded-md border border-border bg-muted/10 p-4 sm:grid-cols-3">
        <div>
          <p className="eyebrow">Capillary rise</p>
          <p className="font-mono text-2xl text-foreground">
            {heightMm >= 1
              ? `${heightMm.toFixed(2)} mm`
              : `${(heightMm * 1000).toFixed(0)} µm`}
          </p>
        </div>
        <div>
          <p className="eyebrow">Tube radius</p>
          <p className="font-mono text-2xl text-foreground">
            {radiusUm >= 1000 ? `${(radiusUm / 1000).toFixed(2)} mm` : `${radiusUm} µm`}
          </p>
        </div>
        <div>
          <p className="eyebrow">Contact angle</p>
          <p className="font-mono text-2xl text-foreground">{angleDeg}°</p>
        </div>
      </div>

      <div className="rounded-md border border-border bg-[#0d1117] p-2">
        <Plot
          data={[...plotData, markerTrace]}
          layout={{
            autosize: true,
            height: 420,
            margin: { l: 56, r: 24, t: 16, b: 52 },
            paper_bgcolor: "#0d1117",
            plot_bgcolor: "#0d1117",
            font: { family: "Inter, sans-serif", color: "#8b949e", size: 11 },
            xaxis: {
              title: { text: "tube radius r  (µm)", font: { color: "#8b949e" } },
              type: "log",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              color: "#8b949e",
            },
            yaxis: {
              title: { text: "capillary rise h  (mm)", font: { color: "#8b949e" } },
              type: "log",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              color: "#8b949e",
            },
            legend: {
              bgcolor: "rgba(0,0,0,0)",
              font: { color: "#8b949e", size: 11 },
            },
          }}
          config={{ displaylogo: false, responsive: true }}
          style={{ width: "100%", height: "420px" }}
          useResizeHandler
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Log–log axes make the inverse relationship (<InlineMath math={String.raw`h \propto 1/r`} />)
        a straight line. Dropping the radius by 10× raises the column by the same factor — the
        reason water wicks measurably into a paper fibre and not into a drinking straw.
      </p>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type PlotMode = "both" | "time" | "sse";

const families = [
  "All",
  "CVT iterative",
  "Non-CVT",
  "Approximate NN",
  "Scalable",
] as const;

type Family = (typeof families)[number];

const familyLabels: Record<Family, string> = {
  All: "All methods",
  "CVT iterative": "CVT",
  "Non-CVT": "Non-CVT",
  "Approximate NN": "ANN",
  Scalable: "Scalable",
};

const modeLabels: Record<PlotMode, string> = {
  both: "Both",
  time: "Time",
  sse: "SSE",
};

const algorithmPlots = [
  { id: "LX", family: "CVT iterative", color: "#378ADD", slug: "lx", note: "Baseline Lloyd CVT." },
  { id: "LE", family: "CVT iterative", color: "#1D9E75", slug: "le", note: "Elkan-pruned CVT." },
  { id: "LK", family: "CVT iterative", color: "#BA7517", slug: "lk", note: "KN initialization plus Lloyd refinement." },
  { id: "KN", family: "Non-CVT", color: "#D85A30", slug: "kn", note: "Very fast one-pass baseline." },
  { id: "HT", family: "Non-CVT", color: "#7F77DD", slug: "ht", note: "Ward clustering without CVT refinement." },
  { id: "HK", family: "Non-CVT", color: "#D4537E", slug: "hk", note: "Hierarchical initialization plus Lloyd refinement." },
  { id: "MB", family: "Non-CVT", color: "#639922", slug: "mb", note: "Mini-batch compromise." },
  { id: "ANN-FQ", family: "Approximate NN", color: "#185FA5", slug: "ann_fq", note: "Approximate assignment baseline." },
  { id: "RP-ANN-FQ", family: "Approximate NN", color: "#993C1D", slug: "rp_ann_fq", note: "Random-projection ANN variant." },
  { id: "KD-ANN-FQ", family: "Approximate NN", color: "#0F6E56", slug: "kd_ann_fq", note: "KD-tree assignment variant." },
  { id: "MR-FQ", family: "Scalable", color: "#888780", slug: "mr_fq", note: "Multi-resolution quantization." },
  { id: "CE-LE", family: "Scalable", color: "#534AB7", slug: "ce_le", note: "Coarse embedding with Elkan." },
  { id: "CE-MB", family: "Scalable", color: "#993556", slug: "ce_mb", note: "Coarse embedding with mini-batch." },
  { id: "SVD-CE-LE", family: "Scalable", color: "#7F77DD", slug: "svd_ce_le", note: "SVD embedding before Elkan." },
  { id: "RP-CE-LE", family: "Scalable", color: "#185FA5", slug: "rp_ce_le", note: "Code-facing Ultra-Fast CVT family member." },
];

export function AlgorithmPlotExplorer() {
  const [mode, setMode] = useState<PlotMode>("both");
  const [family, setFamily] = useState<Family>("All");

  const visible = useMemo(() => {
    if (family === "All") return algorithmPlots;
    return algorithmPlots.filter((algorithm) => algorithm.family === family);
  }, [family]);

  const familyCounts = useMemo(() => {
    const counts = new Map<Family, number>();
    families.forEach((item) => counts.set(item, item === "All" ? algorithmPlots.length : 0));
    algorithmPlots.forEach((algorithm) => {
      const key = algorithm.family as Family;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }, []);

  return (
    <section className="mt-14">
      <div className="flex flex-col gap-6 border-y border-[var(--line)] py-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-sm text-[#378ADD]">Per-method plots</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Algorithm explorer</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            These are the individual notebook plots behind the combined
            benchmark. Use the controls to compare runtime, SSE, or both for all
            15 released-code methods in one sweep.
          </p>
        </div>

        <div className="w-full max-w-xl space-y-4">
          <div className="grid grid-cols-3 gap-1 rounded-full border border-[var(--line)] bg-[var(--soft)] p-1 shadow-sm">
            {(["both", "time", "sse"] as PlotMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                aria-pressed={mode === item}
                className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${
                  mode === item
                    ? "bg-[var(--panel)] text-[#185FA5] shadow-sm ring-1 ring-black/5"
                    : "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                }`}
              >
                {modeLabels[item]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {families.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFamily(item)}
                aria-pressed={family === item}
                className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-sm transition ${
                  family === item
                    ? "border-[#378ADD] bg-[#E8F0FE] text-[#185FA5] dark:bg-blue-950/40"
                    : "border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:border-[#378ADD] hover:text-[var(--foreground)]"
                }`}
              >
                <span>{familyLabels[item]}</span>
                <span className="rounded-full bg-black/5 px-2 py-0.5 font-mono text-[11px] dark:bg-white/10">
                  {familyCounts.get(item) ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
          Showing {visible.length} of {algorithmPlots.length} algorithms
        </p>
        <p className="text-sm text-[var(--muted)]">
          View: <span className="font-medium text-[var(--foreground)]">{modeLabels[mode]}</span>
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {visible.map((algorithm) => (
          <article
            key={algorithm.id}
            className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm transition hover:border-[#c7d7ee] hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-lg font-semibold">{algorithm.id}</h3>
                  <span className="rounded-full bg-[var(--soft)] px-2 py-1 text-xs text-[var(--muted)]">
                    {algorithm.family}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{algorithm.note}</p>
              </div>
              <span
                className="h-6 w-6 shrink-0 rounded-full border border-black/10 shadow-inner"
                style={{ backgroundColor: algorithm.color }}
                aria-hidden="true"
              />
            </div>

            <div className={`mt-4 grid gap-4 ${mode === "both" ? "lg:grid-cols-2" : ""}`}>
              {(mode === "both" || mode === "time") && (
                <PlotImage
                  title="Time"
                  src={`/figures/${algorithm.slug}_boxplot_time.png`}
                  alt={`${algorithm.id} runtime boxplot across generated R values.`}
                />
              )}
              {(mode === "both" || mode === "sse") && (
                <PlotImage
                  title="SSE"
                  src={`/figures/${algorithm.slug}_boxplot_sse.png`}
                  alt={`${algorithm.id} SSE boxplot across generated R values.`}
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlotImage({ title, src, alt }: { title: string; src: string; alt: string }) {
  return (
    <figure className="rounded-md bg-[var(--soft)] p-2">
      <figcaption className="mb-2 px-1 font-mono text-xs uppercase tracking-wide text-[var(--muted)]">{title}</figcaption>
      <Image
        src={src}
        alt={alt}
        width={900}
        height={450}
        className="aspect-[2/1] h-auto w-full rounded border border-[var(--line)] bg-white object-contain"
        unoptimized
      />
    </figure>
  );
}

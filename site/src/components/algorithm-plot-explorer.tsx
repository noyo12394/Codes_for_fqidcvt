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
  const [family, setFamily] = useState<(typeof families)[number]>("All");

  const visible = useMemo(() => {
    if (family === "All") return algorithmPlots;
    return algorithmPlots.filter((algorithm) => algorithm.family === family);
  }, [family]);

  return (
    <section className="mt-14 rounded-md border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-sm text-[#378ADD]">Per-method plots</p>
          <h2 className="mt-2 text-2xl font-semibold">Toggle Through Every Algorithm</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            These are the individual notebook plots behind the combined
            benchmark. Use the controls to compare runtime, SSE, or both for all
            15 released-code methods in one sweep.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 rounded-md border border-[var(--line)] bg-[var(--soft)] p-1">
            {(["both", "time", "sse"] as PlotMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`min-h-9 rounded px-3 font-mono text-xs uppercase ${
                  mode === item ? "bg-[#378ADD] text-white" : "text-[var(--muted)]"
                }`}
              >
                {item === "sse" ? "SSE" : item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {families.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFamily(item)}
                className={`min-h-9 rounded-md border px-3 text-xs ${
                  family === item
                    ? "border-[#378ADD] bg-[#378ADD] text-white"
                    : "border-[var(--line)] text-[var(--muted)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {visible.map((algorithm) => (
          <article key={algorithm.id} className="rounded-md border border-[var(--line)] bg-[var(--background)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-mono text-lg font-semibold">{algorithm.id}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{algorithm.note}</p>
              </div>
              <span
                className="h-5 w-5 shrink-0 rounded-sm border border-black/10"
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
    <figure>
      <figcaption className="mb-2 font-mono text-xs text-[var(--muted)]">{title}</figcaption>
      <Image
        src={src}
        alt={alt}
        width={900}
        height={450}
        className="h-auto w-full rounded border border-[var(--line)] bg-white"
        unoptimized
      />
    </figure>
  );
}

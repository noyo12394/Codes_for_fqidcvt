import { CsvTable, Figure } from "@/components/ui";
import { AlgorithmPlotExplorer } from "@/components/algorithm-plot-explorer";

export default function BenchmarkPage() {
  return (
    <div className="fade-in mx-auto max-w-6xl px-5 py-14">
      <p className="font-mono text-sm text-[#378ADD]">secapp_updated.ipynb</p>
      <h1 className="mt-3 text-4xl font-semibold">The Numbers</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
        This page renders notebook-generated figures and CSVs only. Missing
        assets are shown as pending states so the site never invents a result.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["What to look for", "The benchmark is not a beauty contest for one algorithm. It asks which methods stay fast, accurate, and stable as map resolution rises."],
          ["The real tension", "Exact CVT methods are interpretable but pay for repeated nearest-center assignments. The scalable family attacks that bottleneck directly."],
          ["The site rule", "If a number appears below, it came from the notebook CSVs. If the CSV is absent, the page says pending instead of filling the silence with decoration."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-5">
            <h2 className="font-mono text-sm text-[#378ADD]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="text-2xl font-semibold">Time per resolution</h2>
        <Figure filename="secapp_all_methods_boxplot_time.png" alt="Boxplot of time per resolution for LX, LE, LK, KN, HT, HK, MB, ANN-FQ, RP-ANN-FQ, KD-ANN-FQ, MR-FQ, CE-LE, CE-MB, SVD-CE-LE, and RP-CE-LE." caption="The notebook plots per-seed runtime distributions across the generated R values." />
        <CsvTable filename="secapp_table1_time.csv" mode="time" />
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold">Accuracy per resolution</h2>
        <Figure filename="secapp_all_methods_boxplot_sse.png" alt="Boxplot of SSE per resolution for all 15 benchmark algorithms." caption="SSE distributions are rendered at the same generated resolutions as the runtime sweep." />
        <CsvTable filename="secapp_table2_rd.csv" mode="rd" />
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold">Stability</h2>
        <CsvTable filename="secapp_table4_cv.csv" />
      </section>

      <AlgorithmPlotExplorer />

      <section className="mt-14 rounded-md border border-[var(--line)] bg-[var(--panel)] p-6">
        <h2 className="text-2xl font-semibold">Benchmark Conclusion</h2>
        <div className="mt-4 grid gap-5 text-sm leading-7 text-[var(--muted)] md:grid-cols-2">
          <p>
            In the generated quick run, one-pass methods such as KN and ANN-FQ
            are often the fastest, but that speed comes with a large relative
            distortion penalty. They are useful baselines, not the methods you
            would trust blindly for a regulatory scenario set.
          </p>
          <p>
            The most interesting region is the middle: MR-FQ, CE-LE, CE-MB,
            SVD-CE-LE, and RP-CE-LE try to keep distortion close to LX while
            cutting the expensive assignment loop. That is the paper’s real
            engineering contribution.
          </p>
          <p>
            MB is a practical compromise in this run: slower than the raw
            one-pass methods, but much closer to LX in relative distortion. It
            behaves like the “good enough, fast enough” option a reviewer would
            want on the comparison table.
          </p>
          <p>
            The released code expands the manuscript taxonomy into 15 concrete
            implementations. RP-CE-LE is the code-facing bridge to the
            manuscript phrase “Ultra-Fast CVT,” and the site makes that naming
            discrepancy explicit instead of sanding it away.
          </p>
        </div>
      </section>

      <p className="mt-10 max-w-3xl border-t border-[var(--line)] pt-5 text-sm leading-6 text-[var(--muted)]">
        Algorithm count and naming follow the released code; the manuscript uses
        earlier labels for part of the scalable family.
      </p>
    </div>
  );
}

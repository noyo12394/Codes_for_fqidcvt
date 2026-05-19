import { algorithms } from "@/lib/content";

export default function AlgorithmsPage() {
  const families = [...new Set(algorithms.map((a) => a.family))];
  return (
    <div className="fade-in mx-auto max-w-6xl px-5 py-14">
      <p className="font-mono text-sm text-[#378ADD]">Released-code legend</p>
      <h1 className="mt-3 text-4xl font-semibold">The 15 Algorithms</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
        Algorithm count and naming follow the released notebooks. The manuscript
        uses earlier labels for part of the scalable family; in code, that family
        appears as CE-LE, CE-MB, SVD-CE-LE, and RP-CE-LE.
      </p>

      <div className="mt-10 space-y-10">
        {families.map((family) => (
          <section key={family}>
            <h2 className="font-mono text-sm uppercase tracking-wide text-[var(--muted)]">{family}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {algorithms.filter((a) => a.family === family).map((algo) => (
                <article key={algo.id} className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{algo.id}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{algo.name}</p>
                    </div>
                    <span className="h-5 w-5 rounded-sm border border-black/10" style={{ backgroundColor: algo.color }} aria-label={`${algo.id} color swatch`} />
                  </div>
                  <p className="mt-4 min-h-12 text-sm leading-6 text-[var(--muted)]">{algo.description}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4 text-sm">
                    <div>
                      <dt className="font-mono text-xs text-[var(--muted)]">Complexity</dt>
                      <dd className="mt-1 font-mono">{algo.complexity}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs text-[var(--muted)]">Achieves CVT?</dt>
                      <dd className="mt-1 font-mono">{algo.cvt}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

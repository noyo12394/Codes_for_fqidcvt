function MiniFlow() {
  return (
    <svg viewBox="0 0 720 150" role="img" aria-label="Clean flowchart showing simulated maps assigned to tassels and summarized as weighted quanta." className="my-7 w-full rounded-md border border-[var(--line)] bg-[var(--panel)]">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#5f625d" />
        </marker>
      </defs>
      {[
        [32, "Input maps", "Nsim simulations"],
        [212, "Assign", "nearest quantum"],
        [392, "Update", "centroids"],
        [572, "Output", "fi, pi"],
      ].map(([x, title, body]) => (
        <g key={String(title)}>
          <rect x={Number(x)} y="38" width="116" height="74" rx="7" fill="#fff" stroke="#e8e6df" />
          <text x={Number(x) + 58} y="67" textAnchor="middle" fontSize="15" fontWeight="600" fill="#111">{title}</text>
          <text x={Number(x) + 58} y="91" textAnchor="middle" fontSize="12" fill="#5f625d">{body}</text>
        </g>
      ))}
      {[160, 340, 520].map((x) => <line key={x} x1={x} y1="75" x2={x + 38} y2="75" stroke="#5f625d" strokeWidth="1.4" markerEnd="url(#arrow)" />)}
      <path d="M450 118 C395 142 258 142 240 118" fill="none" stroke="#378ADD" strokeWidth="1.4" markerEnd="url(#arrow)" />
      <text x="342" y="140" textAnchor="middle" fontSize="12" fill="#378ADD">repeat until stable or MAX_ITER</text>
    </svg>
  );
}

export default function MethodPage() {
  return (
    <div className="fade-in mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-sm text-[#378ADD]">Hazard Quantization</p>
      <h1 className="mt-3 text-4xl font-semibold">Scenario Reduction, Without the Fog</h1>
      <MiniFlow />
      <article className="prose-research">
        <section>
          <h2 className="mt-10 text-2xl font-semibold text-[var(--foreground)]">Why scenario reduction</h2>
          <p>
            Regional hazard models can simulate thousands of spatially correlated
            intensity maps. Downstream engineering studies often need a much
            smaller set that still preserves the distributional behavior of the
            full ensemble. Hazard Quantization keeps representative maps and
            attaches a probability mass to each one, so later risk calculations
            can run on quanta instead of every Monte Carlo realization.
          </p>
        </section>
        <section>
          <h2 className="mt-10 text-2xl font-semibold text-[var(--foreground)]">Functional Quantization in one paragraph</h2>
          <p>
            Functional Quantization treats each simulated map as one point in a
            high-dimensional function space. The algorithm partitions the maps
            into tassels, replaces each tassel with its centroid, and records the
            tassel frequency as the quantum weight. The result is a discrete
            approximation to the original stochastic process.
          </p>
        </section>
        <section>
          <h2 className="mt-10 text-2xl font-semibold text-[var(--foreground)]">The Lloyd loop is the bottleneck</h2>
          <p>
            The standard CVT loop alternates between assigning every realization
            to the nearest quantum and recomputing each quantum as the tassel
            centroid. That repeated nearest-center assignment is expensive when
            the number of simulations, quanta, and grid points all grow together.
            The benchmark notebook caps this loop at 20 iterations with a
            tolerance of 1e-4.
          </p>
        </section>
        <section>
          <h2 className="mt-10 text-2xl font-semibold text-[var(--foreground)]">What we swap in instead</h2>
          <p>
            The released code compares exact CVT baselines with non-iterative,
            approximate nearest-neighbor, and coarse-embedding variants. The
            scalable family keeps the same scenario-selection purpose but reduces
            the dimensional burden before assignment. In the manuscript this
            family is described as Ultra-Fast CVT; the site uses the notebook
            names CE-LE, CE-MB, SVD-CE-LE, and RP-CE-LE.
          </p>
        </section>
      </article>
    </div>
  );
}

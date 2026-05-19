import { ButtonLink } from "@/components/ui";
import { protocol } from "@/lib/content";

export default function Home() {
  return (
    <div className="fade-in mx-auto max-w-6xl px-5 py-16">
      <section className="max-w-4xl py-10">
        <p className="font-mono text-sm text-[#378ADD]">Mursel et al., 2026</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-normal sm:text-6xl">
          Computational Techniques for Disaster Scenario Selection
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)]">
          Picking representative seismic intensity maps from thousands of simulated
          scenarios, fast enough to benchmark and precise enough to audit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/application">Read the findings</ButtonLink>
          <ButtonLink href="/benchmark" variant="secondary">View the benchmark</ButtonLink>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["15 algorithms compared", "Notebook names win over earlier manuscript labels.", "/algorithms"],
          ["8 resolutions x 100 seeds", "The displayed protocol follows secapp_updated.ipynb.", "/benchmark"],
          ["Two test beds", "A benchmark sweep plus the seismic HQ application.", "/application"],
        ].map(([title, body, href]) => (
          <a key={title} href={href} className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[#378ADD]">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
          </a>
        ))}
      </section>

      <section className="mt-16 grid gap-8 border-y border-[var(--line)] py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-sm text-[#378ADD]">The punchline</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            The hard part is not simulating disasters. It is choosing the few
            scenarios that still behave like the many.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
          <p>
            This site makes the paper inspectable: algorithm names come from the
            updated notebooks, plots come from the executed code, and result
            tables are read from CSVs rather than typed into prose.
          </p>
          <p>
            The design goal is a research page that feels calm enough for peer
            review and clear enough for a risk team deciding whether the
            scenario set can be trusted.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-md border border-[var(--line)] bg-[var(--panel)] p-6">
        <h2 className="text-xl font-semibold">Benchmark Protocol</h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {protocol.map(([term, value]) => (
            <div key={term}>
              <dt className="font-mono text-xs text-[var(--muted)]">{term}</dt>
              <dd className="mt-1 font-mono text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold">Citation</h2>
        <pre className="mt-4 overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--soft)] p-4 font-mono text-xs leading-6 text-[var(--muted)]">{`@article{mursel2026computational,
  title={Computational Techniques for Disaster Scenario Selection},
  author={Mursel and collaborators},
  year={2026}
}`}</pre>
      </section>
    </div>
  );
}

import { assetPath } from "@/lib/content";

const steps = [
  "git clone https://github.com/noyo12394/Codes_for_fqidcvt.git",
  "cd Codes_for_fqidcvt",
  "python -m pip install -r notebooks/requirements.txt",
  "jupyter nbconvert --execute --to notebook --inplace notebooks/secapp_updated.ipynb --ExecutePreprocessor.timeout=7200",
  "jupyter nbconvert --execute --to notebook --inplace notebooks/Application_2.ipynb --ExecutePreprocessor.timeout=7200",
  "cd site && npm install && npm run build",
];

export default function ReproducePage() {
  return (
    <div className="fade-in mx-auto max-w-4xl px-5 py-14">
      <p className="font-mono text-sm text-[#378ADD]">Run it yourself</p>
      <h1 className="mt-3 text-4xl font-semibold">Reproduce the Figures</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
        The quick CI mode patches benchmark settings before execution. The full
        mode keeps the notebook protocol at 100 seeds and all eight resolutions.
      </p>
      <div className="mt-8 space-y-4">
        {steps.map((step) => (
          <pre key={step} className="overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--soft)] p-4 font-mono text-sm text-[var(--muted)]">{step}</pre>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="rounded-md border border-[var(--line)] px-4 py-3 text-sm" href="https://github.com/noyo12394/Codes_for_fqidcvt/actions/workflows/run-notebooks.yml">Nightly workflow badge</a>
        <a className="rounded-md border border-[#378ADD] bg-[#378ADD] px-4 py-3 text-sm text-white" href={assetPath("/figures-and-tables.zip")}>Download all figures</a>
      </div>
    </div>
  );
}

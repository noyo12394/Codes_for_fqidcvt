import Link from "next/link";
import Image from "next/image";
import { assetPath, fqGithubUrl, hasPublicFile, readCsv } from "@/lib/content";

export function Header() {
  const items = [
    ["/method", "Method"],
    ["/algorithms", "Algorithms"],
    ["/benchmark", "Benchmark"],
    ["/application", "Application"],
    ["/reproduce", "Reproduce"],
  ];
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono text-sm tracking-wide text-[var(--muted)]">
          FQ-IDCVT
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-4 text-sm">
          {items.map(([href, label]) => (
            <Link key={href} href={href} className="text-[var(--muted)] hover:text-[var(--foreground)]">
              {label}
            </Link>
          ))}
          <a
            href={fqGithubUrl}
            className="inline-flex min-h-9 items-center rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 font-medium text-[var(--foreground)] shadow-sm transition hover:border-[#378ADD] hover:text-[#185FA5]"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] px-5 py-10 text-sm text-[var(--muted)]">
      <div className="mx-auto max-w-6xl">
        <p>Companion site for Mursel et al. (2026), Computational Techniques for Disaster Scenario Selection.</p>
      </div>
    </footer>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link className={`inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-medium ${variant === "primary" ? "border-[#378ADD] bg-[#378ADD] text-white" : "border-[var(--line)] text-[var(--foreground)]"}`} href={href}>
      {children}
    </Link>
  );
}

export function Figure({ filename, alt, caption }: { filename: string; alt: string; caption: string }) {
  if (!hasPublicFile("figures", filename)) {
    return <Pending title={filename} detail="Pending — run the notebook pipeline to generate this figure." />;
  }
  return (
    <figure className="space-y-3">
      <Image src={assetPath(`/figures/${filename}`)} alt={alt} width={1400} height={850} className="h-auto w-full rounded-md border border-[var(--line)] bg-white" unoptimized />
      <figcaption className="text-sm leading-6 text-[var(--muted)]">{caption}</figcaption>
    </figure>
  );
}

export function Pending({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-md border border-dashed border-[var(--line)] bg-[var(--panel)] p-5">
      <p className="font-mono text-sm text-[var(--foreground)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}

export function CsvTable({ filename, mode = "plain" }: { filename: string; mode?: "plain" | "time" | "rd" }) {
  const rows = readCsv(filename);
  if (!rows) return <Pending title={filename} detail="Pending — this CSV is produced by the notebooks and copied by CI." />;
  const [header, ...body] = rows;
  const fastest = mode === "time" ? fastestByColumn(body) : new Set<string>();
  return (
    <div className="overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--panel)]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {header.map((cell, i) => <th key={i} scope="col" className="border-b border-[var(--line)] px-3 py-3 font-mono text-xs text-[var(--muted)]">{cell || "Method"}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className="border-b border-[var(--line)] last:border-0">
              {row.map((cell, c) => <td key={c} className={`px-3 py-3 ${c === 0 ? "font-medium" : "font-mono"} ${classForCell(cell, mode, fastest.has(`${r}:${c}`))}`}>{labelForCell(cell, mode, fastest.has(`${r}:${c}`), c === 0)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fastestByColumn(rows: string[][]) {
  const out = new Set<string>();
  if (!rows.length) return out;
  for (let c = 1; c < rows[0].length; c++) {
    let best = Infinity;
    let bestRow = -1;
    rows.forEach((row, r) => {
      const value = Number(row[c]);
      if (Number.isFinite(value) && value < best) {
        best = value;
        bestRow = r;
      }
    });
    if (bestRow >= 0) out.add(`${bestRow}:${c}`);
  }
  return out;
}

function classForCell(cell: string, mode: string, fastest: boolean) {
  if (fastest) return "bg-blue-50 text-[#185FA5] dark:bg-blue-950/30";
  if (mode !== "rd") return "";
  const value = Number(cell);
  if (!Number.isFinite(value)) return "";
  if (value < -0.001) return "text-[#185FA5]";
  if (value > 0.001) return "text-[#BA7517]";
  return "text-[var(--muted)]";
}

function labelForCell(cell: string, mode: string, fastest: boolean, isLabel = false) {
  const display = isLabel ? cell : formatCell(cell);
  if (fastest) return `▼ ${display}`;
  if (mode !== "rd") return display;
  const value = Number(cell);
  if (!Number.isFinite(value)) return display;
  if (value < -0.001) return `▼ ${display}`;
  if (value > 0.001) return `▲ ${display}`;
  return `● ${display}`;
}

function formatCell(cell: string) {
  const value = Number(cell);
  if (!Number.isFinite(value)) return cell;
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 0.01 || abs >= 1000)) return value.toExponential(2);
  return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

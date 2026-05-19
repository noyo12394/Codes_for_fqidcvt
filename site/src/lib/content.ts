import fs from "node:fs";
import path from "node:path";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(src: string) {
  if (!src.startsWith("/")) return src;
  return `${basePath}${src}`;
}

export type Algorithm = {
  id: string;
  name: string;
  family: string;
  complexity: string;
  cvt: "Yes" | "No" | "Approx";
  description: string;
  color: string;
};

export const algorithms: Algorithm[] = [
  { id: "LX", name: "Lloyd CVT", family: "CVT iterative", complexity: "O(I Nsim N R)", cvt: "Yes", color: "#378ADD", description: "Random initialization followed by capped Lloyd updates." },
  { id: "LE", name: "Elkan CVT", family: "CVT iterative", complexity: "O(I Nsim N R)", cvt: "Yes", color: "#1D9E75", description: "K-means++ initialization with Elkan distance pruning." },
  { id: "LK", name: "KN-initialized Lloyd", family: "CVT iterative", complexity: "O(I Nsim N R)", cvt: "Yes", color: "#BA7517", description: "One-pass random subset initialization followed by Lloyd refinement." },
  { id: "KN", name: "K random neighbors", family: "Non-CVT", complexity: "O(Nsim N R)", cvt: "No", color: "#D85A30", description: "Selects candidate quanta without an iterative centroid update." },
  { id: "HT", name: "Hierarchical tassels", family: "Non-CVT", complexity: "O(Nsim^2 R)", cvt: "No", color: "#7F77DD", description: "Ward clustering used directly as a scenario reduction baseline." },
  { id: "HK", name: "Hierarchical plus k-means", family: "Non-CVT", complexity: "O(Nsim^2 R + I Nsim N R)", cvt: "Yes", color: "#D4537E", description: "Hierarchical clustering initializes a Lloyd refinement." },
  { id: "MB", name: "Mini-batch k-means", family: "Non-CVT", complexity: "O(I b N R)", cvt: "Approx", color: "#639922", description: "Mini-batch updates trade exact assignments for stable runtime." },
  { id: "ANN-FQ", name: "Approximate NN FQ", family: "Approximate NN", complexity: "O(I Nsim log N R)", cvt: "Approx", color: "#185FA5", description: "Uses approximate nearest-neighbor assignment inside the FQ loop." },
  { id: "RP-ANN-FQ", name: "Random-projection ANN FQ", family: "Approximate NN", complexity: "O(I Nsim log N r)", cvt: "Approx", color: "#993C1D", description: "Projects maps before approximate assignment to reduce dimensional cost." },
  { id: "KD-ANN-FQ", name: "KD-tree ANN FQ", family: "Approximate NN", complexity: "O(I Nsim log N R)", cvt: "Approx", color: "#0F6E56", description: "Indexes candidate quanta with a KD-tree for assignment." },
  { id: "MR-FQ", name: "Multi-resolution FQ", family: "Scalable / multi-resolution", complexity: "O(I Nsim N r)", cvt: "Approx", color: "#888780", description: "Solves at coarse resolution and transfers structure upward." },
  { id: "CE-LE", name: "Coarse-embed Elkan", family: "Scalable / multi-resolution", complexity: "O(I Nsim N r)", cvt: "Approx", color: "#534AB7", description: "Runs the Elkan loop on a compact embedded representation." },
  { id: "CE-MB", name: "Coarse-embed mini-batch", family: "Scalable / multi-resolution", complexity: "O(I b N r)", cvt: "Approx", color: "#993556", description: "Combines coarse embeddings with mini-batch updates." },
  { id: "SVD-CE-LE", name: "SVD coarse-embed Elkan", family: "Scalable / multi-resolution", complexity: "O(Nsim R r + I Nsim N r)", cvt: "Approx", color: "#7F77DD", description: "Uses an SVD basis before Elkan-style quantization." },
  { id: "RP-CE-LE", name: "Random-projection coarse-embed Elkan", family: "Scalable / multi-resolution", complexity: "O(Nsim R r + I Nsim N r)", cvt: "Approx", color: "#185FA5", description: "The released-code name for the family described as Ultra-Fast CVT in the manuscript." },
];

export const protocol = [
  ["Nsim", "3000"],
  ["N_QUANTA", "50"],
  ["N_EXP", "100 seeds"],
  ["R_LIST", "128, 256, 512, 1024, 2048, 4096, 8192, 16384"],
  ["MAX_ITER", "20"],
  ["TOL", "1e-4"],
];

export function publicFile(kind: "data" | "figures", filename: string) {
  return path.join(process.cwd(), "public", kind, filename);
}

export function hasPublicFile(kind: "data" | "figures", filename: string) {
  return fs.existsSync(publicFile(kind, filename));
}

export function readCsv(filename: string): string[][] | null {
  const file = publicFile("data", filename);
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8").trim();
  if (!text) return null;
  return text.split(/\r?\n/).map((line) => parseCsvLine(line));
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells;
}

export const applicationFigures = [
  ["fig2_8_sa_surfaces.png", "Figure 2.8 compares a random Monte Carlo map with high-weight quanta for N=50 and N=500. The figure shows the Sa surface, not a disaster scene."],
  ["fig2_9_exceedance.png", "Exceedance contours for thresholds 0.1g, 0.2g, and 0.3g. Thick contours are the Monte Carlo reference and thin black contours are HQ with N=500."],
  ["fig2_10_exceedance.png", "Exceedance contours for thresholds 0.4g, 0.5g, and 0.6g. The notebook overlays HQ contours on the exact Monte Carlo maps."],
  ["fig2_11_exceedance.png", "Exceedance contours for thresholds 0.7g, 0.8g, and 0.9g. The comparison tests whether rare-intensity regions remain spatially aligned."],
  ["fig2_12_autocorr.png", "Autocorrelation surfaces along the selected stripe. The notebook places the N=500 quantizer beside the exact Monte Carlo estimate."],
  ["fig2_13_autocorr_error.png", "Absolute autocorrelation error for the N=500 quantizer. This is a diagnostic surface, not a re-styled figure."],
  ["fig2_14_N50_exceedance.png", "A lower-budget N=50 quantizer compared against Monte Carlo at 0.30g. It shows the degradation expected when fewer representative maps are retained."],
  ["fig_convergence.png", "Lloyd convergence curves for N=50 and N=500. The plotted distortion comes from the Application_2 notebook diagnostics."],
  ["fig_weights.png", "Probability masses ranked by quantum weight. The dashed line marks the uniform 1/N baseline."],
] as const;

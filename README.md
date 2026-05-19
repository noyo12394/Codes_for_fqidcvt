# Computational Techniques for Disaster Scenario Selection

A static companion site and reproducibility harness for the FQ-IDCVT benchmark notebooks.

## What's in this repo

```text
paper/
  Computational_techniques_for_disaster_scenario_selection-7.pdf
notebooks/
  secapp_updated.ipynb
  Application_2.ipynb
  requirements.txt
site/
  Next.js static companion site
```

## Reproduce in 5 minutes (quick mode)

Quick mode is the default GitHub Actions path for pushes. It patches
`secapp_updated.ipynb` to use `N_EXP=5` and drops `R=8192,16384` before
execution, leaving the committed notebook source unchanged.

```bash
python -m pip install -r notebooks/requirements.txt
sed -i 's/R_LIST   = \[128, 256, 512, 1024, 2048, 4096, 8192, 16384\]/R_LIST   = [128, 256, 512, 1024, 2048, 4096]/' notebooks/secapp_updated.ipynb
sed -i 's/N_EXP    = 100/N_EXP    = 5/' notebooks/secapp_updated.ipynb
jupyter nbconvert --execute --to notebook --inplace notebooks/secapp_updated.ipynb --ExecutePreprocessor.timeout=7200
jupyter nbconvert --execute --to notebook --inplace notebooks/Application_2.ipynb --ExecutePreprocessor.timeout=7200
```

## Reproduce exactly (full mode, about 6 hours)

```bash
python -m pip install -r notebooks/requirements.txt
jupyter nbconvert --execute --to notebook --inplace notebooks/secapp_updated.ipynb --ExecutePreprocessor.timeout=7200
jupyter nbconvert --execute --to notebook --inplace notebooks/Application_2.ipynb --ExecutePreprocessor.timeout=7200
```

## Site

```bash
cd site
npm install
npm run build
```

The GitHub Pages workflow publishes from `site/out/` and copies notebook PNGs
and CSVs into `site/public/figures/` and `site/public/data/`.

Pages URL: `https://noyo12394.github.io/Codes_for_fqidcvt/`

## Citation

```bibtex
@article{mursel2026computational,
  title={Computational Techniques for Disaster Scenario Selection},
  author={Mursel and collaborators},
  year={2026}
}
```

# CYCReport

This is a simple reporting tool for [cyclomatic-complexity](https://github.com/pilotpirxie/cyclomatic-complexity).

**cyclomatic-complexity** is a package that calculates the complexity of code using the [Cyclometric Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) metric and produces a JSON output.


## To install

In a command prompt, from the repository root, run

```bash
$ npm install
```

The `dot.env` file needs to be renamed to `.env`.  Then edit the `.env` file and change the value of `CYC_DIR` to the path of the codebase you wish to report on.  This must be the FULL path and not a relative path.

e.g. `CYC_DIR="/Users/foo/bar/codebase"` not `CYC_DIR="./codebase"`.

## To generate a report

In a command prompt, from the repository root, run

```bash
$ npm run ccreport
```

The report will then generate `data.json` and `data-<date_time>.json` in the `./public` folder.

`data-<date_time>.json` is there as a backup and to allow comparison.

## To view a report

In a command prompt, from the repository root, run

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

const esbuild = require("esbuild");


esbuild.build({
    entryPoints: ["src/entry.js"],
    bundle: true,
    format: "iife",
    platform: "node",
    outfile: "dist/happy-dom.bundle.js",
    minify: false,
    sourcemap: false,
    logLevel: "info"
}).catch(() => process.exit(1));

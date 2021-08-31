export function resolveDependencies(_, files) {
  console.log("resolve stub, resolving: ", _, files);
  return { resolvedFiles: files, diagnostics: [] };
}
export async function runPlaygroundQuery(query?: string) {
  // todo: apply userID here for RBAC purposes

  // fixme: munge the query ready for the server (. => ____, drop trailing ;, etc)

  const q = `${query} FORMAT JSON`; // e.g. query = "select * from tenant_default.github____orgs limit 1"
  let res = await fetch(`http://127.0.0.1:8123/v1/?query=${encodeURIComponent(q)}`);
  return res.json();
}

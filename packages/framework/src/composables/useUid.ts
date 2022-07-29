const ids: Record<string, boolean> = {};

function createUid(): string {
  // prettier-ignore
  let uid: string = String(Date.now().toString(32) +
    Math.random().toString(16)).replace(/\./g, '');

  if (ids[uid]) uid = createUid();

  ids[uid] = true;
  return uid;
}

export function useUid() {
  return { createUid };
}

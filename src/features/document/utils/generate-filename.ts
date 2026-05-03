export function generateFileName(originalName: string) {
  const fileExt = originalName.split(".").pop();
  const unique = `${Date.now()}-${crypto.randomUUID()}`;
  return `${unique}.${fileExt}`;
}

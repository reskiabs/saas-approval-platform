function getInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0][0]?.toUpperCase() ?? "";
  }

  return ((words[0][0] ?? "") + (words[1][0] ?? "")).toUpperCase();
}

export default getInitials;

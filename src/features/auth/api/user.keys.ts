export const userKeys = {
  all: ["auth"] as const,

  user: () => [...userKeys.all, "user"] as const,
};

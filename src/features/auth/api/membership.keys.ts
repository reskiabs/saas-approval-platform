export const membershipKeys = {
  all: ["memberships"] as const,

  lists: () => [...membershipKeys.all, "list"] as const,

  list: (userId?: string) => [...membershipKeys.lists(), userId] as const,
};

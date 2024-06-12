export const queryKeys = {
  users: {
    "user-profile": ["user-profile"],
  },
};

export type IQueryKeys = (typeof queryKeys)[keyof typeof queryKeys];

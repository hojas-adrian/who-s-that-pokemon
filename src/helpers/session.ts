export type SessionData =
  | {
      pkmId: number;
      pkmName: string;
    }
  | undefined;

export const initial = (): SessionData => {
  return undefined;
};

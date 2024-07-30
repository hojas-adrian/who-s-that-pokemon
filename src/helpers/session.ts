export type SessionData =
  | {
      pkmId: number;
      pkmName: string;
      messageId: number;
      hint?: string;
    }
  | undefined;

export const initial = (): SessionData => {
  return undefined;
};

export interface OptionsFastifyRoutes {
  prefix: "/v1" | "/v2";
}

export type DoneFastify = (err?: Error | undefined) => void;

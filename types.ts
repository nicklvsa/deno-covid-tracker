export type Nullable<T> = T | null;

export interface TrackerData {
    country: Nullable<string>;
    limiter: Nullable<number>;
}
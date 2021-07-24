export type Predicate<T = any> = (item: T) => boolean;
export type Consumer<T = any> = (item: T) => void;
export type Supplier<T = any> = () => T;

import { Predicate } from "../types";

export function splitArray<T>(array: T[], splitPredicate: Predicate<T>) {
  const splitArray = [];

  let currentArray = [];
  array.forEach((element) => {
    if (splitPredicate(element)) {
      splitArray.push(currentArray);
      currentArray = [];
    } else {
      currentArray.push(element);
    }
  });

  return splitArray;
}
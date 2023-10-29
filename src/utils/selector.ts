import _ from 'lodash'

export const updateArrayInObjectByCriteria = <
  T extends Record<string, unknown>
>(
  array: T[],
  criteria: Partial<T>,
  newValues: Partial<T>
): T[] => {
  const index = _.findIndex(array, (item) => _.isMatch(item, criteria))
  if (index !== -1) {
    const updatedArray = [...array]
    updatedArray[index] = { ...array[index], ...newValues } as T
    return updatedArray
  }
  return array
}

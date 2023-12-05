import { useEffect, useState } from 'react'

export function useHiddenOptionsData({
  isMultiline,
  ref,
  selectedOptionsCount,
  tagClassName,
  tagWrapperClassName,
}) {
  const [overflowIndex, setOverflowIndex] = useState(-1)
  useEffect(() => {
    let finalOverflowingIndex = -1

    if (ref?.children && !isMultiline) {
      const { bottom: parentBottom } = ref.getBoundingClientRect()
      let optionIndex = 0
      let childIndex = 0

      while (childIndex < ref.children.length && optionIndex < selectedOptionsCount) {
        const child = ref.children[childIndex]
        const isOption =
          child.classList.contains(tagClassName) || child.classList.contains(tagWrapperClassName)

        if (isOption) {
          const { bottom: childBottom } = child.getBoundingClientRect()
          if (childBottom > parentBottom) {
            finalOverflowingIndex = optionIndex
            break
          }
          optionIndex += 1
        }

        childIndex += 1
      }
    }

    setOverflowIndex(finalOverflowingIndex)
  }, [ref, isMultiline, selectedOptionsCount, tagClassName, setOverflowIndex, tagWrapperClassName])

  const hiddenOptionsCount = overflowIndex > -1 ? selectedOptionsCount - overflowIndex : 0
  return { overflowIndex, hiddenOptionsCount }
}

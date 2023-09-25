import { useState } from 'react'

import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'
import tw from '@/utils/twMergeObjects'

// Type
interface Props {
  onCheckedHandler: (renderType: string) => void
}

// Constants
const ButtonSt: ButtonStyle = {
  button:
    'rounded flex justify-center w-137pxr py-12pxr items-center border-box transparent leading-5  border-2 border-gray-900',
  title: 'text-white text-base leading-5',
}
const ButtonList = ['Today', 'Completed'] as const
const activeSt = { button: 'bg-primary border-0' }
const INITIAL_SELECTED_INDEX = 0

export default function TaskControlPanel({ onCheckedHandler }: Props) {
  const [isCheckedButton, setIsCheckedButton] = useState<number>(
    INITIAL_SELECTED_INDEX
  )

  const ToggleButton = ButtonList.map((title, index) => ({
    style: tw<ButtonStyle>(ButtonSt, isCheckedButton === index ? activeSt : {}),
    title,
    handler: () => {
      setIsCheckedButton(index)
      onCheckedHandler(ButtonList[index] ?? '')
    },
  }))

  return (
    <div className="box-border flex w-full justify-between rounded bg-gray-400 px-10pxr py-14pxr">
      {ToggleButton.map(({ style, title, handler }, i) => (
        <Button style={style} key={i} title={title} handler={handler} />
      ))}
    </div>
  )
}

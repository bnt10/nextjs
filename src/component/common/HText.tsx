import React from 'react'

interface Props {
  level: number
  text: string
  st?: string
}

const HText = ({ level, text }: Props) => {
  const Tag = `h${level}`

  return (
    <div className="relative text-white">
      {React.createElement(
        Tag,
        {
          className: 'mt-50pxr text-center text-white',
        },
        text
      )}
    </div>
  )
}

export default HText

import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

interface FocusedModeProps {
  totalTime: number
}

const FocusedMode: FC<FocusedModeProps> = ({ totalTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(totalTime)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
        setProgress(((totalTime - timeLeft + 1) / totalTime) * 100)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  return (
    <div>
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845a 15.9156 15.9156 0 0 1 0 31.831"
          stroke="#ccc"
          strokeWidth="2"
          fillOpacity="0"
        />
        <path
          d="M18 2.0845a 15.9156 15.9156 0 0 1 0 31.831"
          stroke="#4caf50"
          strokeWidth="2"
          strokeDasharray={`${progress}, 100`}
          fillOpacity="0"
        />
      </svg>
      <div>{`${timeLeft} seconds left`}</div>
    </div>
  )
}

export default FocusedMode

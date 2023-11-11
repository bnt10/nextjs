import {
  a,
  config,
  easings,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/web'

interface Props {
  clicked: boolean
  pressed?: boolean
  isReadOnly?: boolean
}
const CircleButton = ({ clicked, pressed, isReadOnly = false }: Props) => {
  const scaleSpringRef = useSpringRef()
  const circleSpringRef = useSpringRef()

  const scaleSpring = useSpring({
    ref: scaleSpringRef,
    from: { scale: 1 },
    to: { scale: pressed && isReadOnly ? 0.9 : 1 },
    config: { ...config.wobbly, easing: easings.steps(5), duration: 100 },
  })

  const circleSpring = useSpring({
    ref: circleSpringRef,
    from: { r: 0, borderWidth: 2 },
    to: { r: clicked ? 100 : 0, borderWidth: clicked ? 0 : 2 },
    config: { ...config.wobbly, easing: easings.steps(5), duration: 100 },
  })
  useChain([scaleSpringRef, circleSpringRef])

  return (
    <div>
      <a.div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: circleSpring.borderWidth.to((bw) => `${bw}px solid white`),
          background: circleSpring.r.to(
            (rate) =>
              `radial-gradient(circle, #8687E7 ${rate}%, transparent ${rate}%)`
          ),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: scaleSpring.scale.to((s) => `scale(${s})`),
        }}
      >
        {clicked && (
          <a.span
            style={{ transform: scaleSpring.scale.to((s) => `scale(${s})`) }}
            className="text-white"
          >
            ✓
          </a.span>
        )}
      </a.div>
    </div>
  )
}
export default CircleButton

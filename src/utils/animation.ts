export const mouseDown = (event: { target: { scale: any } }, config: any) => {
  const defaultValue = 0.9
  const merageConfig = { ...config, value: defaultValue }
  return {
    scale: event.target.scale * merageConfig.value,
  }
}

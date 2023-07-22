type ComponentProps = {
  props?: any
  handler: () => void
}
export type Component = {
  id: string
  component: (props: ComponentProps) => JSX.Element
} & ComponentProps

type ComponentProps = {
  st?: string
  title?: string
  handler: () => void
}
export type ProviderConfig = {
  id: string
  props?: ComponentProps
  component: (props: ComponentProps) => JSX.Element
}

type ComponentProps = {
  st?: string
  handler: () => void
}
export type ProviderConfig = {
  id: string
  component: (props: ComponentProps) => JSX.Element
} & ComponentProps

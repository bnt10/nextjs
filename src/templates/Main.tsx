import type { ReactNode } from 'react'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full px-1pxr text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto">
      <header className="border-b border-gray-300"></header>

      <main className=" py-5pxr text-xl">{props.children}</main>

      <footer className="border-t border-gray-300 py-8pxr text-center text-sm"></footer>
    </div>
  </div>
)

export { Main }

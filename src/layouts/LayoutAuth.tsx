import { Outlet } from 'react-router-dom'

const LayoutAuth = () => {
  return (
    <main className="w-full bg-(--accent-color)">
      <article className="flex min-h-screen flex-col-reverse md:flex-row h-full relative">
        <section className="p-8 w-full   m-auto">
          <div className="max-w-3xl mx-auto">
            <Outlet /> {/* Equivalente a router-view */}
          </div>
        </section>
        <section className="border md:flex md:w-1/2 bg-(--primary-color)">

        </section>
      </article>
    </main>
  )
}
export { LayoutAuth }
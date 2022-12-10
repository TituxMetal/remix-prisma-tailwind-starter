import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '@remix-run/react'

import tailwind from './tailwind.css'

export const links = () => [{ rel: 'stylesheet', href: tailwind }]

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

const Document = ({ children, title }) => (
  <html lang='en'>
    <head>
      <title>{title}</title>
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV !== 'production' && <LiveReload />}
    </body>
  </html>
)

const App = () => (
  <Document>
    <Outlet />
  </Document>
)

const Error = ({ children, title }) => (
  <div className='flex h-screen flex-col items-center justify-center bg-zinc-800'>
    <h2 className='w-screen pb-4 text-center text-5xl text-red-400'>{title}</h2>
    {children}
  </div>
)

export const CatchBoundary = () => {
  const caughtResponse = useCatch()

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p className='pb-6 text-2xl text-red-200'>
            {caughtResponse.data?.message || 'Something went wrong. Please try again later.'}
          </p>
          <p className='cursor-pointer rounded-lg bg-green-700 p-2 text-xl font-bold text-zinc-50'>
            <Link to='/'>Back to safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  )
}

export const ErrorBoundary = ({ error }) => (
  <Document title='An error occured'>
    <main>
      <Error title='An error occured'>
        <p className='pb-6 text-2xl text-red-200'>
          {error.message || 'Something went wrong. Please try again later.'}
        </p>
        <p className='cursor-pointer rounded-lg bg-green-700 p-2 text-xl font-bold text-zinc-50'>
          <Link to='/'>Back to safety</Link>
        </p>
      </Error>
    </main>
  </Document>
)

export default App

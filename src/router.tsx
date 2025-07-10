import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
} from 'react'

interface RouterState {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterState>({
  path: '/',
  navigate: () => {},
})

interface Params {
  [key: string]: string
}

const ParamsContext = createContext<Params>({})

function matchPath(pattern: string, path: string): Params | null {
  const pSeg = pattern.split('/').filter(Boolean)
  const sSeg = path.split('/').filter(Boolean)
  if (pSeg.length !== sSeg.length) return null
  const params: Params = {}
  for (let i = 0; i < pSeg.length; i++) {
    const p = pSeg[i]
    const s = sSeg[i]
    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(s)
    } else if (p !== s) {
      return null
    }
  }
  return params
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/')
  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  const navigate = (to: string) => {
    if (to === path) return
    window.location.hash = to
  }
  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function Routes({ children }: { children: ReactElement[] }) {
  const { path } = useContext(RouterContext)
  let element: ReactElement | null = null
  let params: Params = {}
  children.forEach((child) => {
    if (!child) return
    const match = matchPath(child.props.path, path)
    if (match && !element) {
      element = child.props.element
      params = match
    }
  })
  return element ? (
    <ParamsContext.Provider value={params}>{element}</ParamsContext.Provider>
  ) : null
}

export function Route({}: { path: string; element: ReactElement }) {
  return null
}

export function Link({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a href={`#${to}`} className="text-blue-600 underline">
      {children}
    </a>
  )
}

export function useNavigate() {
  return useContext(RouterContext).navigate
}

export function useParams<T extends Params>() {
  return useContext(ParamsContext) as T
}

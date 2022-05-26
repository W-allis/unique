type VNode = any
type ReactNode = any

interface ToastInstance {
  close(): void
}

interface ToastOption {
  content?: string
  useDangerHTML?: Boolean
  className?: string
  duration?: number
  manual?: boolean
  transition?: string
}

type Toast = (options?: ToastOption) => ToastInstance

interface LoadingInstance {
  close(): void
}

interface LoadingOption {
  fullscreen?: boolean
  className?: string
  manual?: boolean
  transition?: string
  target?: HTMLElement | string | VNode | ReactNode
}

type Loading = (options?: LoadingOption) => LoadingInstance

interface RequestOption {
  retry: number | ((data: any) => number)
  loading: boolean | ((data?: any) => boolean) 
  toast: boolean | ((data?: any) => boolean)
}

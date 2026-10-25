export const HELLOASSO_URLS = {
  dons: null as string | null,
  coursArabe: null as string | null,
  stages: null as string | null,
}

export function getHelloAssoUrl(key: keyof typeof HELLOASSO_URLS): string {
  return HELLOASSO_URLS[key] || '/contact'
}

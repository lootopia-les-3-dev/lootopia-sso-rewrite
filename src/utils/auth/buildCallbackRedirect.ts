export const buildCallbackRedirect = (callbackUrl: string, token: string): string => {
  if (!callbackUrl) return callbackUrl

  try {
    const url = new URL(callbackUrl)
    if (url.protocol === "http:" || url.protocol === "https:") {
      return callbackUrl
    }
    url.searchParams.set("token", token)
    return url.toString()
  } catch {
    return callbackUrl
  }
}

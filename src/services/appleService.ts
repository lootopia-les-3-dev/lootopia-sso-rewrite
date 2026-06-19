import appleSignin from "apple-signin-auth"

const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID! // sso.lootopia.io
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID! // RBWV86VD8X
const APPLE_KEY_ID = process.env.APPLE_KEY_ID! // YP6768CH75
const APPLE_PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY!
const APPLE_REDIRECT_URI = process.env.APPLE_REDIRECT_URI!

export const getAppleAuthUrl = (callbackUrl?: string) => {
  const state = callbackUrl
    ? `${crypto.randomUUID()}|${callbackUrl}`
    : crypto.randomUUID()
  return appleSignin.getAuthorizationUrl({
    clientID: APPLE_CLIENT_ID,
    redirectUri: APPLE_REDIRECT_URI,
    scope: "name email",
    state,
    responseMode: "form_post",
  })
}

export const verifyAppleWebToken = async (code: string) => {
  const clientSecret = appleSignin.getClientSecret({
    clientID: APPLE_CLIENT_ID,
    teamID: APPLE_TEAM_ID,
    keyIdentifier: APPLE_KEY_ID,
    privateKey: APPLE_PRIVATE_KEY,
  })

  const tokens = await appleSignin.getAuthorizationToken(code, {
    clientID: APPLE_CLIENT_ID,
    redirectUri: APPLE_REDIRECT_URI,
    clientSecret,
  })

  const payload = await appleSignin.verifyIdToken(tokens.id_token, {
    audience: APPLE_CLIENT_ID,
    ignoreExpiration: false,
  })

  return payload
}

// Used by mobile: the native SDK gives us the identityToken directly
export const verifyAppleMobileToken = async (identityToken: string) => {
  const payload = await appleSignin.verifyIdToken(identityToken, {
    audience: process.env.APPLE_APP_BUNDLE_ID!, // io.les3dev.lootopia
    ignoreExpiration: false,
  })

  return payload
}

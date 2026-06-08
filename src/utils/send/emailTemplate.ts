// Mauve palette (hex equivalents of the oklch values used in globals.css)
const C = {
  mauve50:  "#f9f8f9",
  mauve100: "#f0eef1",
  mauve200: "#e3e0e4",
  mauve400: "#b3a8b5",
  mauve500: "#79697b",
  mauve600: "#5c4d5e",
  mauve800: "#2a212c",
  mauve900: "#201820",
  white:    "#ffffff",
  red500:   "#e8304a",
}

type ButtonVariant = "primary" | "danger"

interface EmailTemplateOptions {
  title: string
  body: string
  buttonLabel?: string
  buttonUrl?: string
  buttonVariant?: ButtonVariant
  footerNote?: string
}

export const buildEmailHtml = ({
  title,
  body,
  buttonLabel,
  buttonUrl,
  buttonVariant = "primary",
  footerNote,
}: EmailTemplateOptions): string => {
  const btnBg    = buttonVariant === "danger" ? C.red500 : C.mauve600
  const btnHover = buttonVariant === "danger" ? "#c4243c" : C.mauve800

  const buttonHtml = buttonLabel && buttonUrl
    ? `
      <tr>
        <td align="center" style="padding-top:28px;">
          <a href="${buttonUrl}"
             target="_blank"
             style="display:inline-block;background-color:${btnBg};color:${C.white};font-family:'Lato',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.04em;text-decoration:none;padding:13px 32px;border-radius:12px;mso-padding-alt:0;text-align:center;">
            <!--[if mso]><i style="letter-spacing:32px;mso-font-width:-100%;mso-text-raise:30pt">&nbsp;</i><![endif]-->
            ${buttonLabel}
            <!--[if mso]><i style="letter-spacing:32px;mso-font-width:-100%">&nbsp;</i><![endif]-->
          </a>
        </td>
      </tr>`
    : ""

  const footerHtml = footerNote
    ? `
      <tr>
        <td style="padding-top:20px;">
          <p style="margin:0;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:12px;color:${C.mauve400};line-height:1.6;text-align:center;">
            ${footerNote}
          </p>
        </td>
      </tr>`
    : ""

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.mauve100};font-family:'Lato',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.mauve100};">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:${C.white};border-radius:16px;border:1px solid ${C.mauve200};box-shadow:0 10px 24px rgba(32,24,32,0.07);">
          <tr>
            <td style="padding:40px 40px 32px;">

              <!-- Logo / wordmark -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <span style="font-family:'Lato',Helvetica,Arial,sans-serif;font-size:22px;font-weight:900;letter-spacing:-0.025em;color:${C.mauve900};">Lootopia</span>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <div style="height:1px;background-color:${C.mauve200};"></div>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td>
                    <h1 style="margin:0 0 16px;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:${C.mauve900};letter-spacing:-0.025em;line-height:1.3;">
                      ${title}
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:14px;color:${C.mauve500};line-height:1.65;">
                      ${body}
                    </p>
                  </td>
                </tr>

                ${buttonHtml}
                ${footerHtml}
              </table>

            </td>
          </tr>

          <!-- Card footer -->
          <tr>
            <td style="padding:16px 40px 28px;">
              <div style="height:1px;background-color:${C.mauve200};margin-bottom:20px;"></div>
              <p style="margin:0;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:11px;color:${C.mauve400};text-align:center;line-height:1.6;">
                Vous recevez cet email car vous avez un compte Lootopia.<br/>
                © ${new Date().getFullYear()} Lootopia — Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`
}

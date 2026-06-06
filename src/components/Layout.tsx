import React from "react"

type LayoutProps = {
  title: string
  children: React.ReactNode
}

const Layout = ({ title, children }: LayoutProps) => (
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="stylesheet" href={`/styles/globals.css?v=${Date.now()}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){const d=document.documentElement;if(window.matchMedia('(prefers-color-scheme: dark)').matches)d.classList.add('dark');})()`,
        }}
      />
    </head>
    <body className="min-h-screen bg-mauve-50 dark:bg-mauve-950 flex items-center justify-center p-5 font-sans antialiased">
      {children}
    </body>
  </html>
)

export default Layout

import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'M V Karthikeyan | Portfolio',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="32" y="46" font-size="46" text-anchor="middle">✌️</text></svg>',
        )}`,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('theme');var dark=saved?saved!=='light':true;document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
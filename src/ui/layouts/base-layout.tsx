interface LayoutProps {
  children: any;
  title?: string;
}

export const BaseLayout = ({ children, title = 'HTMX + Alpine.js Demo' }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>{title}</title>
      <link href="/styles/main.css" rel="stylesheet" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <script defer src="https://unpkg.com/alpinejs@3.13.3/dist/cdn.min.js"></script>
    </head>
    <body>
      <div class="container">
        {children}
      </div>
    </body>
  </html>
)
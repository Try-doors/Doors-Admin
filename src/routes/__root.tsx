import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { BookingsProvider } from '#/lib/bookings-store'
import { NotificationsProvider } from '#/lib/notifications-store'
import { OwnersProvider } from '#/lib/owners-store'
import { ProfileProvider } from '#/lib/profile-store'
import { PropertiesProvider } from '#/lib/properties-store'
import { TeamProvider } from '#/lib/team-store'
import { UsersProvider } from '#/lib/users-store'
import appCss from '../styles.css?url'

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
        title: 'Horizon Properties · Sign In',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
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
      </head>
      <body>
        <OwnersProvider>
          <PropertiesProvider>
            <BookingsProvider>
              <UsersProvider>
                <ProfileProvider>
                  <TeamProvider>
                    <NotificationsProvider>{children}</NotificationsProvider>
                  </TeamProvider>
                </ProfileProvider>
              </UsersProvider>
            </BookingsProvider>
          </PropertiesProvider>
        </OwnersProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

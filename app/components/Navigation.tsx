/**
 * Navigation Component
 * Header navigation with links to main sections including contact
 */

'use client';

import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.25rem',
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '1rem';
          e.currentTarget.style.top = '1rem';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
          e.currentTarget.style.top = 'auto';
        }}
      >
        Skip to content
      </a>

      <nav
        style={{
          borderBottom: '1px solid #eaeaea',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo/Brand */}
          <a
            href="/"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0070f3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#111';
            }}
          >
            Brian Griffey
          </a>

          {/* Navigation Links */}
          <ul
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a
                href="/"
                style={{
                  color: pathname === '/' ? '#0070f3' : '#333',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: pathname === '/' ? 600 : 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0070f3';
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/') {
                    e.currentTarget.style.color = '#333';
                  }
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={{
                  color: pathname === '/contact' ? '#0070f3' : '#333',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: pathname === '/contact' ? 600 : 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0070f3';
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/contact') {
                    e.currentTarget.style.color = '#333';
                  }
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

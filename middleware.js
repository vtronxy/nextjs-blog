// import type { NextRequest } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/posts')) {
    // This logic is only applied to /about
    console.log('I am running middleware match /posts')
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard
  }
}
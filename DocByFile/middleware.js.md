<!-- directory: C:\cplusplusfiles\ebayclone\DocByFile\middleware.js.md -->

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
<!-- createMiddlewareClient is a function that creates a Supabase client instance with the necessary configuration for server-side authentication. It takes an object with req and res properties as input and returns a Supabase client instance. -->
import { NextResponse } from 'next/server'

<!-- nextResponse is a module that provides utilities for working with Next.js responses. It exports an object named NextResponse with various methods for creating and manipulating responses. -->


<!-- It exports an asynchronous function named middleware that takes a request object (req) as a parameter. -->

export async function middleware(req) {
  const res = NextResponse.next()

  <!-- Inside the function, it creates a new NextResponse object (res) that represents the response to be sent to the client. -->
  const supabase = createMiddlewareClient({ req, res })

  <!-- it calls supabase.auth.getSession() to get the current session data. This is an asynchronous operation, so it uses await to wait for the operation to complete. -->
  const { data } = await supabase.auth.getSession()



  if (data?.session && req.nextUrl.pathname.startsWith('/auth')) {
    <!-- If there is a session (i.e., the user is logged in) and the requested path starts with /auth, it redirects the user to the home page. This could be to prevent logged-in users from accessing the login or registration pages. -->
    return NextResponse.redirect(new URL('/', req.url))

    <!-- If there is no session (i.e., the user is not logged in) and the requested path starts with /checkout, /success, /orders, /address, or /wallet, it redirects the user to the /auth page. This could be to protect these routes and ensure that only logged-in users can access them. -->
  }

  // Must be a session to see these routes
  if (
    !data?.session && (
    req.nextUrl.pathname.startsWith('/checkout') ||
    req.nextUrl.pathname.startsWith('/success') ||
    req.nextUrl.pathname.startsWith('/orders') ||
    req.nextUrl.pathname.startsWith('/address') || 
    req.nextUrl.pathname.startsWith('/wallet')
  )) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

<!-- This JavaScript code is a conditional statement that checks if a user is not in a session and is trying to access certain pages. If both conditions are met, the user is redirected to an authentication page. -->

<!-- The if statement begins by checking if data?.session is falsy. The ?. is an optional chaining operator, which allows you to read the session property of data without having to explicitly check if data is null or undefined. If data is null or undefined, data?.session will immediately return undefined and not throw an error. -->

<!-- The second part of the condition checks if the pathname of the requested URL (req.nextUrl.pathname) starts with certain strings. These strings represent different pages or routes in the application. The startsWith method is used to determine whether the pathname starts with '/checkout', '/success', '/orders', '/address', or '/wallet'. -->

<!-- If both conditions are met (i.e., the user is not in a session and is trying to access one of the specified pages), the code will execute the statement inside the if block. This statement uses the NextResponse.redirect method to redirect the user to an authentication page. -->

<!-- The new URL('/auth', req.url) creates a new URL object with '/auth' as the pathname and the original request URL (req.url) as the base. This new URL represents the authentication page. The NextResponse.redirect method then sends a response to the client, instructing it to redirect to this URL. -->

  return res
}
<!-- directory: C:\cplusplusfiles\ebayclone\app\auth\callback\route.js -->

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
<!-- imports createRouteHandlerClient, which is a function that creates a Supabase client for route handlers -->

import { cookies } from 'next/headers'
<!-- imports cookies from next/headers, which is an object that contains the cookies from the request -->

import { NextResponse } from 'next/server'
<!-- imports NextResponse from next/server, which is a class that allows you to create responses for route handlers  -->

<!-- function that handles GET requests to the /auth/callback route -->
export async function GET(request) {
  const requestUrl = new URL(request.url)
  this creates a new URL object from the request URL

  const code = requestUrl.searchParams.get('code')
  <!-- this gets the value of the 'code' query parameter from the request URL -->

  if (code) {
    <!-- if the 'code' query parameter is present in the request URL -->
    const supabase = createRouteHandlerClient({ cookies })
    <!-- this creates a Supabase client for route handlers using the cookies from the request -->
    await supabase.auth.exchangeCodeForSession(code)
    <!--this exchanges the 'code' for a session with Supabase. The keyword await is used to wait for the promise to resolve before continuing, supabase.auth.exchangeCodeForSession(code) returns a promise. supabase is the Supabase client created in the previous step. supabase.auth is the authentication module of the Supabase client, and exchangeCodeForSession is a method that exchanges the 'code' for a session with Supabase. -->
  }

  <!-- URL to redirect to after sign in process completes. NextResponse.redirect is used to create a redirect response to the specified URL. requestUrl is the URL object created from the request URL, and requestUrl.origin is the origin of the request URL. -->
  return NextResponse.redirect(requestUrl.origin)
}
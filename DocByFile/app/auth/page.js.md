<!-- directory: C:\cplusplusfiles\ebayclone\app\auth\page.js -->

"use client";
<!-- this means that the file will be executed on the client side -->

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
<!-- we import the createClientComponentClient function from the auth-helpers-nextjs package, it will be used to create a supabase client -->

import { Auth } from '@supabase/auth-ui-react';
<!-- we import Auth component from the auth-ui-react package, it will be used to create the login and register form -->

import { ThemeSupa } from '@supabase/auth-ui-shared';
<!-- we import ThemeSupa object from the auth-ui-shared package, it will be used to customize the appearance of the login and register form -->

import Link from 'next/link';
<!-- we import Link component from the next/link package, it will be used to create a link to the home page -->

export default function AuthPage() {
<!-- export means that the function can be imported in other files, the function is called AuthPage, default means that the function is the default export of the file -->

    const supabase = createClientComponentClient();
<!-- we create a supabase client using the createClientComponentClient function and store it in the supabase variable. const means that the variable is a constant, it cannot be reassigned later in the code -->


    return (
<!-- the return statement is used to return the JSX code, it is the output of the function -->

      <>
<!-- this is a fragment, it is used to return multiple elements without adding extra nodes to the DOM -->

        <div id="AuthPage" className="w-full min-h-screen bg-white">
<!-- we create a div element with the id "AuthPage" and the classes "w-full min-h-screen bg-white" -->

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
<!-- we create a div element with the classes "w-full flex items-center justify-center p-5 border-b-gray-300" -->

                <Link href="/" className="min-w-[170px]">
<!-- we create a Link component with the href attribute set to "/" and the class "min-w-[170px]". The Link component is used to create a link to the home page -->

                    <img width="170" src="/images/logo.jpg"/>
<!-- we create an img element with the width attribute set to "170" and the src attribute set to "/images/logo.jpg". The img element is used to display an image -->

                </Link>
<!-- we close the Link component -->

            </div>
<!-- we close the div element -->

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
<!-- we create a div element with the classes "w-full flex items-center justify-center p-5 border-b-gray-300" -->
                Login / Register
<!-- we display the text "Login / Register" -->
            </div>
<!-- we close the div element -->

            <div className="max-w-[400px] mx-auto px-2">
<!-- we create a div element with the classes "max-w-[400px] mx-auto px-2" -->
                <Auth
<!-- we create an Auth component, the Auth component is used to create the login and register form -->
                    onlyThirdPartyProviders
<!-- we set the onlyThirdPartyProviders prop to true, this means that only third-party providers will be displayed in the form. A prop is a way to pass data from a parent component to a child component -->

                    redirectTo={`${window.location.origin}/auth/callback`}
<!-- we set the redirectTo prop to `${window.location.origin}/auth/callback`, this means that the user will be redirected to the specified URL after logging in or registering -->
<!-- This line is setting the redirectTo prop of the Auth component. The redirectTo prop is used to specify the URL that the user should be redirected to after they successfully log in or register.

The value of the redirectTo prop is a string that's constructed using a template literal. Template literals are a feature of JavaScript that allow you to embed expressions within strings. In this case, the expression is window.location.origin.

window.location.origin is a property of the window.location object, which contains information about the current URL. The origin property specifically returns the origin of the URL, which includes the protocol (e.g., http: or https:), the domain, and the port (if one is specified). For example, if the current URL is https://www.example.com:8000/path, window.location.origin would return https://www.example.com:8000.

So, ${window.location.origin}/auth/callback will evaluate to a string that starts with the origin of the current URL and ends with /auth/callback. For example, if the current URL is https://www.example.com/path, the redirectTo prop would be set to https://www.example.com/auth/callback.

This means that after the user logs in or registers, they will be redirected to the /auth/callback route on the same origin as the current page. This route should be set up in your application to handle the authentication callback and set up the user's session.

This line doesn't directly reference any other parts of the code, but it does rely on the /auth/callback route being properly set up in your application. The specifics of how this route should be set up depend on how you're handling authentication in your application. -->
                    supabaseClient={supabase}
<!-- we set the supabaseClient prop to the supabase variable, this means that the Auth component will use the supabase client to handle authentication -->
                    providers={['google']}
<!-- we set the providers prop to ['google'], this means that ONLY the Google provider will be displayed in the form -->
                    appearance={{theme: ThemeSupa}}
<!-- we set the appearance prop to {theme: ThemeSupa}, this means that the appearance of the form will be customized using the ThemeSupa object -->
                />
            </div>
<!-- we close the div <div className="max-w-[400px] mx-auto px-2"> -->

        </div>
<!-- we close the <div id="AuthPage" className="w-full min-h-screen bg-white"> -->
      </>
<!-- we close the fragment </>
    )
<!-- we close the return statement  of the AuthPage function -->
  }
<!-- we close the AuthPage function -->

  
<!-- directory: C:\cplusplusfiles\ebayclone\app\checkout\page.js -->

"use client";
<!-- make sure that only the client side code is executed -->

import CheckoutItem from "../components/CheckoutItem"
<!-- import the CheckoutItem component, it is used to display the items in the cart -->
import MainLayout from "../layouts/MainLayout"
<!-- import the MainLayout component, it is used to display the main layout of the page -->
import Link from "next/link"
<!-- import the Link component, it is used to create links to other pages -->
import { useUser } from "@/app/context/user";
<!-- import the useUser hook, it is used to get the user information -->
import { useCart } from "../context/cart";
<!-- import the useCart hook, it is used to get the cart information -->
import { useEffect, useRef, useState } from "react";
<!-- import the useEffect, useRef and useState hooks, they are used to handle side effects and state -->
import useIsLoading from "../hooks/useIsLoading";
<!-- import the useIsLoading hook, it is used to handle the loading state of the page, set to true or false -->
import { toast } from "react-toastify";
<!-- import the toast function, it is used to display toast messages -->
import { useRouter } from "next/navigation";
<!-- import the useRouter hook, it is used to get the router information -->
import ClientOnly from "../components/ClientOnly";
<!-- import the ClientOnly component, it is used to render the children only on the client side -->
import { loadStripe } from '@stripe/stripe-js';
<!-- import the loadStripe function, it is used to load the stripe library -->

export default function Checkout() {
<!-- define the Checkout component, it is a default component of the page -->

    const user = useUser();
<!-- get the user information using the useUser hook -->
    const cart = useCart();
<!-- get the cart information using the useCart hook -->
    const router = useRouter()
<!-- get the router information using the useRouter hook -->

    let stripe = useRef(null)
<!-- The useRef hook is a function provided by React that can be used to create mutable ref objects. These objects persist for the full lifetime of the component. That means they only get destroyed when the component is unmounted.

In the line let stripe = useRef(null), a ref object is being created with an initial value of null. This object is being assigned to the variable stripe. When console.log, it contains the api key, which is the public key of the stripe account.

The stripe ref is then used to store a reference to the Stripe.js instance. This is done in the stripeInit function with the line stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY || '');.

The .current property is used to access or modify the current value of the ref object. In this case, it's being used to store the Stripe.js instance so it can be used elsewhere in the component.

The main advantage of using useRef in this way is that the value can be changed without triggering a re-render of the component, unlike state variables created with the useState hook. This makes it ideal for values that need to persist across renders but don't affect the component's output. -->

<!-- The useRef hook is a function provided by React that can be used to create mutable ref objects. These objects persist for the full lifetime of the component.

In the line let stripe = useRef(null), a ref object is being created with an initial value of null. This object is being assigned to the variable stripe.

The stripe ref is then used to store a reference to the Stripe.js instance. This is done in the stripeInit function with the line stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY || '');.

The .current property is used to access or modify the current value of the ref object. In this case, it's being used to store the Stripe.js instance so it can be used elsewhere in the component.

The main advantage of using useRef in this way is that the value can be changed without triggering a re-render of the component, unlike state variables created with the useState hook. This makes it ideal for values that need to persist across renders but don't affect the component's output. -->

    let elements = useRef(null)
<!-- initialize the elements ref object with an initial value of null -->
    let card = useRef(null)
<!-- The line let elements = useRef(null) is using the useRef hook from React to create a mutable ref object and assign it to the variable elements.

The useRef hook is often used to create references to elements in the DOM, but it can also be used to store mutable values that will persist across re-renders of the component and not cause additional renders when they change.

In this case, elements is used to store a reference to the Stripe Elements instance. Stripe Elements are pre-built rich UI components that help you build your own pixel-perfect checkout flows across desktop and mobile.

Later in the code, you can see this line: elements.current = stripe.current.elements();. This is where the Stripe Elements instance is created and assigned to elements.current.

The .current property is a way to access or modify the current value of the ref object. In this case, it's being used to store the Stripe Elements instance so it can be used elsewhere in the component.-->
    let clientSecret = useRef(null)

<!-- The line let clientSecret = useRef(null) is using the useRef hook from React to create a mutable ref object and assign it to the variable clientSecret.

The useRef hook is often used to create references to elements in the DOM, but it can also be used to store mutable values that will persist across re-renders of the component and not cause additional renders when they change.

In this case, clientSecret is used to store a reference to the client secret returned from the Stripe API. This is done in the stripeInit function with the line clientSecret.current = result.client_secret.

The .current property is a way to access or modify the current value of the ref object. In this case, it's being used to store the client secret so it can be used elsewhere in the component, specifically in the pay function where it's used to confirm the card payment with Stripe. -->


    useEffect(() => {
        if (cart?.cartTotal() <= 0) {
            toast.error("Your cart is empty!", { autoClose: 3000 })
            return router.push('/')
        }

        useIsLoading(true)

        setTimeout(() => stripeInit(), 300)
    }, [user])

<!-- IMPORTANT: OPTIONAL CHAINING, this is used to check if the cart is empty or not. If the cart is empty, it displays a toast error message saying "Your cart is empty!" and redirects the user to the home page ('/'). The point of the ?. is to check if the cart object exists before trying to access the cartTotal method. If the cart object is null or undefined, the expression will short-circuit and return undefined, preventing an error from being thrown.
<!-- This code snippet is a useEffect hook in React. The useEffect hook allows you to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.

The function passed to useEffect will run after the render is committed to the screen. In this case, the function checks if the total cost of the items in the cart is zero or less. If it is, it displays a toast error message saying "Your cart is empty!" and redirects the user to the home page ('/').

The cart?.cartTotal() is using optional chaining (?.), which is a way to access deeply nested object properties without having to check if each property in the chain exists.

If the cart is not empty, it sets the loading state to true by calling useIsLoading(true). This could be used to display a loading spinner or some other indication to the user that something is loading.

Then, it calls the stripeInit function after a delay of 300 milliseconds. This is done using the setTimeout function. The stripeInit function is not shown in this code snippet, but it likely initializes Stripe for handling payments.

The useEffect hook in this code snippet has a dependency array of [user]. This means that the effect will re-run whenever the user object changes. If the user object changes (for example, if the user logs in or out), the effect will check again if the cart is empty and re-initialize Stripe. -->

<!-- toast.error is a function call from the react-toastify library, which is a library for displaying toast notifications in React applications. The error method is used to display an error toast, which will typically be styled with a red background to indicate an error.

The first argument to toast.error is the message to be displayed in the toast. In this case, the message is "Your cart is empty!".

The second argument to toast.error is an options object. In this case, the options object has a single property autoClose, which is set to 3000. This means that the toast will automatically close after 3000 milliseconds, or 3 seconds.

So, this line of code will display a toast notification with the message "Your cart is empty!" and automatically close it after 3 seconds. In short, if you go to /checkout with an empty cart, it will show you the toast error message for 3 seconds while redirecting you to the home page, which is '/' -->


<!-- ASYNC START-->

<!-- The async keyword is used to define an asynchronous function in JavaScript. An asynchronous function is a function that returns a Promise. A Promise is an object that represents the eventual completion or failure of an asynchronous operation, and its resulting value.

In the context of const stripeInit = async () => {...}, async is used to declare that stripeInit is an asynchronous function. This means that stripeInit will return a Promise.

The main benefit of asynchronous functions is that they enable the use of the await keyword inside the function. The await keyword can be used to pause the execution of the function until a Promise is resolved or rejected.

In the stripeInit function, await is used with the loadStripe function and the fetch function. These functions return Promises, and await is used to pause the execution of stripeInit until these Promises are resolved.

Here's a simplified example: -->

<!-- const asyncFunction = async () => {
  const result = await someOtherAsyncFunction();
  console.log(result);
};

asyncFunction(); -->

<!-- ASYNC END -->

    const stripeInit = async () => {
<!-- we initialize the stripeInit asynchronous function with no parameters. The async keyword is used to define an asynchronous function in JavaScript. An asynchronous function is a function that returns a Promise. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. -->
        stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY || '');
<!-- The stripe.current property is used to access or modify the current value of the ref object. In this case, it's being used to store the Stripe.js instance so it can be used elsewhere in the component. -->
    
        const response = await fetch('/api/stripe', {
<!-- The fetch() function is used to make a request to the server. It takes two arguments: the URL of the server endpoint and an options object that specifies the details of the request. In this case, the URL is '/api/stripe', which is the server endpoint that returns the client secret for the payment. The options object specifies that the request is a POST request and includes the amount of the payment in the request body. fetch is a function that returns a Promise that resolves with the response from the server. The await keyword is used to pause the execution of the function until this Promise is resolved. -->
            method: 'POST',
<!--  the method is set to 'POST', which is used to send data to the server. -->
            body: JSON.stringify({ amount: cart.cartTotal() })
<!-- The body of the request is set to JSON.stringify({ amount: cart.cartTotal() }), which converts the amount of the payment to a JSON string. -->
        })
        const result = await response.json()
<!-- The response.json() method is used to parse the JSON data returned by the server. It returns a Promise that resolves with the result of parsing the JSON data. The await keyword is used to pause the execution of the function until the Promise is resolved. -->

        clientSecret.current = result.client_secret
<!-- The clientSecret.current property is used to access or modify the current value of the ref object. In this case, it's being used to store the client secret returned from the Stripe API. We get it from the result object returned by the server. -->
        elements.current = stripe.current.elements();
<!-- The elements.current property is used to access or modify the current value of the ref object. In this case, it's being used to store the Stripe Elements instance so it can be used elsewhere in the component. -->
        var style = {
            base: { fontSize: "18px" },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#EE4B2B",
                iconColor: "#EE4B2B"
            }
        };
<!-- The style object is used to define the appearance of the Stripe Elements input fields. It has two properties: base and invalid. The base property defines the base style of the input fields, such as the font size. The invalid property defines the style of the input fields when they are invalid, such as the font family and color. This means that when the card details entered by the user are invalid, they will be displayed in red. -->
        card.current = elements.current.create("card", {  hidePostalCode: true, style: style });
<!-- The card.current property is used to access or modify the current value of the ref object. In this case, it's being used to store the Stripe Card Element instance so it can be used elsewhere in the component. The elements.current.create() method is used to create a new Stripe Element. The first argument is the type of element to create, which is "card" in this case. The second argument is an options object that specifies additional options for the element. In this case, the hidePostalCode option is set to true, which hides the postal code field on the card element. The style option is set to the style object defined earlier, which defines the appearance of the input fields. -->

<!-- The card.current = elements.current.create("card", { hidePostalCode: true, style: style }); line is creating a new Stripe Card Element and storing it in card.current.

The elements.current.create() method is part of the Stripe.js library and is used to create new instances of Stripe Elements. Stripe Elements are pre-built rich UI components that help you build your own pixel-perfect checkout flows across desktop and mobile.

The first argument to elements.current.create() is the type of element to create. In this case, it's "card", which creates a Card Element that collects all the necessary card details in a single, customizable UI.

The second argument to elements.current.create() is an options object that specifies additional options for the element. In this case, the hidePostalCode option is set to true, which hides the postal code field on the Card Element. The style option is set to the style object defined earlier, which defines the appearance of the input fields.     -->

        card.current.mount("#card-element");
<!-- The card.current.mount("#card-element"); line is mounting the Card Element to the DOM. The mount() method is part of the Stripe.js library and is used to attach the Card Element to a specific location in the DOM. In this case, the Card Element is being attached to the element with the ID "card-element". This is where the user will enter their card details. -->
        card.current.on("change", function (event) {
<!-- we add an event listener to the card element to listen for changes. When the user enters their card details, the change event is triggered. The event object contains information about the card details entered by the user. -->
            document.querySelector("button").disabled = event.empty;
<!-- we disable the button when the card details are empty. If the card details are empty, the event.empty property will be true, and the button will be disabled. If the card details are not empty, the event.empty property will be false, and the button will be enabled. -->
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
<!-- we display an error message if there is an error with the card details. If there is an error, the event.error property will contain information about the error, such as the error message. We display the error message in the element with the ID "card-error". If there is no error, we clear the error message by setting the textContent to an empty string. -->
        });

        useIsLoading(false)
<!-- we set the loading state to false by calling useIsLoading(false). -->
    }

    const pay = async (event) => {
<!-- we initialize the pay asynchronous function with the event parameter. The async keyword is used to define an asynchronous function in JavaScript. An asynchronous function is a function that returns a Promise. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. -->
        event.preventDefault()
<!-- The event.preventDefault() method is used to prevent the default behavior of an event. In this case, it's being used to prevent the default form submission behavior when the user clicks the submit button. -->

        let result = await stripe.current.confirmCardPayment(clientSecret.current, {
<!-- The stripe.current.confirmCardPayment(clientSecret.current, {...}) line is a call to the confirmCardPayment method of the Stripe.js library. This method is used to confirm a payment intent with a client secret and payment method details.

Here's what it does:

stripe.current: This is a reference to the Stripe.js instance that was created earlier with stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY || '').

confirmCardPayment(clientSecret.current, {...}): This is a call to the confirmCardPayment method. This method takes two arguments: the client secret of the payment intent and an options object that specifies the details of the payment.

clientSecret.current: This is the client secret of the payment intent. The client secret is a unique key that's used to confirm the payment intent. It was obtained earlier from the server with clientSecret.current = result.client_secret.

{...}: This is an options object that specifies the details of the payment. In this case, it specifies that the payment method is the Card Element that was created earlier with card.current = elements.current.create("card", { hidePostalCode: true, style: style }).

The confirmCardPayment method returns a Promise that resolves with the result of the payment confirmation. The await keyword is used to pause the execution of the function until this Promise is resolved. -->
            payment_method: { card: card.current },
<!-- we take the payment method from the card element. The payment method is specified in the options object of the confirmCardPayment method. In this case, the payment method is the Card Element that was created earlier with card.current = elements.current.create("card", { hidePostalCode: true, style: style }). -->
        })
    
        if (result.error) {
<!-- we check if there is an error in the result object. If there is an error, we display the error message using the showError function. -->
            showError(result.error.message)
<!-- we display the error message using the showError function. -->
        } else {
            useIsLoading(true)
<!-- we set the loading state to true by calling useIsLoading(true). -->

            try {
<!-- we use a try-catch block to handle any errors that may occur during the payment process. The try block contains the code that may throw an error, and the catch block contains the code to handle the error. -->
                let response = await fetch('/api/orders/create', {
<!-- we create the response variable and use the fetch function to make a request to the server. The fetch function takes two arguments: the URL of the server endpoint and an options object that specifies the details of the request. In this case, the URL is '/api/orders/create', which is the server endpoint that creates a new order. The options object specifies that the request is a POST request and includes the payment intent ID, the products in the cart, and the total amount of the order in the request body. -->
                    method: "POST",
                    body: JSON.stringify({
                        stripe_id: result.paymentIntent.id,
<!-- the stripe id is set to the payment intent ID returned by the Stripe API. -->
                        products: cart.getCart(),
<!-- the products are set to the products in the cart. -->
                        total: cart.cartTotal()
<!-- the total amount of the order is set to the total amount of the cart. -->
                    })
                })
                
                if (response.status == 200) {
                    toast.success('Order Complete!', { autoClose: 3000 })
<!-- if the status of the response is 200, we display a success toast message saying "Order Complete!". -->
                    cart.clearCart()
<!-- we clear the cart by calling the clearCart method of the cart object. -->
                    return router.push('/success')
<!-- we redirect the user to the success page ('/success'). -->
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong?', { autoClose: 3000 })
            }

            useIsLoading(false)
<!-- we set the loading state to false by calling useIsLoading(false). -->
        }
    }

    const showError = (errorMsgText) => {
        let errorMsg = document.querySelector("#card-error");
        toast.error(errorMsgText, { autoClose: 3000 })
        errorMsg.textContent = errorMsgText;
        setTimeout(() => { errorMsg.textContent = "" }, 3000);
    };

<!-- The showError function is a custom function that displays an error message to the user. It takes one argument, errorMsgText, which is the text of the error message to display.

Here's what it does:

let errorMsg = document.querySelector("#card-error");: This line selects the DOM element with the ID "card-error". This is where the error message will be displayed.

toast.error(errorMsgText, { autoClose: 3000 }): This line uses the toast.error function from the react-toastify library to display a toast notification with the error message. The toast notification will automatically close after 3000 milliseconds, or 3 seconds.

errorMsg.textContent = errorMsgText;: This line sets the text content of the "card-error" element to the error message. This displays the error message in the "card-error" element.

setTimeout(() => { errorMsg.textContent = "" }, 3000);: This line uses the setTimeout function to clear the error message after 3000 milliseconds, or 3 seconds. The setTimeout function takes two arguments: a function to execute after a delay, and the delay in milliseconds. In this case, the function clears the error message, and the delay is 3000 milliseconds.

So, the showError function displays the error message in a toast notification and the "card-error" element, and then clears the error message after 3 seconds. -->

<!-- In JavaScript, functions can be defined in several ways, including function declarations and function expressions.

A function declaration is of the form function functionName() {...}.

A function expression can be of the form const functionName = function() {...} or const functionName = () => {...} (the latter is an arrow function expression).

The const keyword is used in function expressions to declare a variable that is assigned the function. This has a few implications:

The function is defined when the line of code is reached, not when the script is loaded. This is known as "function expression hoisting". In contrast, function declarations are hoisted to the top of their scope and can be used before they are defined.

The function name is actually the variable name, and it cannot be changed. This can prevent bugs caused by accidentally reassigning the function.

The function can be passed around as a value, just like any other value. This is useful for higher-order functions, which are functions that take other functions as arguments or return functions.

In your code, const stripeInit = async () => {...} and const pay = async (event) => {...} are function expressions. They are defined as const because they are not meant to be reassigned, and they are defined where they are needed in the code. They are also asynchronous functions, which means they return a Promise and can use the await keyword to pause their execution until a Promise is resolved. const showError = (errorMsgText) is not an asynchronous function, so it does not return a Promise or use the await keyword. -->

<!-- return the Checkout component, it is a default component of the page -->
  return (

    <>
        <MainLayout>
            <div id="CheckoutPage" className="mt-4 max-w-[1100px] mx-auto">

                <div className="text-2xl font-bold mt-4 mb-4">Checkout</div>
    
                <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">
                    <div className="w-[65%]">

                        <ClientOnly>
                            <div id="Items" className="bg-white rounded-lg mt-4">
                                {cart.getCart().map(product => (
                                    <CheckoutItem key={product.id} product={product} />
                                ))}
                            </div>
                        </ClientOnly>
<!-- <ClientOnly> is a wrapper component that ensures its children are only rendered on the client side, not during server-side rendering. This can be useful when the child components rely on window or other browser-specific APIs, which are not available during server-side rendering.

Inside the <ClientOnly> component, there's a div with the id "Items" and several CSS classes for styling. This div will contain the list of items in the shopping cart.

{cart.getCart().map(product => (...))} is a JavaScript expression inside JSX. It's using the map function to create an array of <CheckoutItem> components, one for each product in the cart.

cart.getCart() is a function that returns an array of products in the cart. For each product in this array, map calls the provided function, which returns a <CheckoutItem> component.

<CheckoutItem key={product.id} product={product} /> is a React component that represents a single item in the checkout. It receives two props: key and product. The key prop is a special prop in React that helps it identify which items have changed, are added, or are removed, and it should be a unique value among its siblings. The product prop is the product object for the item, which can be used to display the product details. -->
                    </div>
                    
                    <div id="PlaceOrder" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <ClientOnly>
                            <div className="p-4">
                                <div className="flex items-baseline justify-between text-sm mb-1">
                                    <div>Items ({cart.getCart().length})</div>
<!-- get number of cart items -->
                                    <div>USD{(cart.cartTotal() / 100).toFixed(2)}</div>
<!-- get the total cost of the cart items divided by 100 rounded to 2 decimal places -->
                                </div>

                                <div className="border-t" />

                                <div className="flex items-center justify-between my-4">
                                    <div className="font-semibold">Order total</div>
                                    <div className="text-2xl font-semibold">
                                        USD{(cart.cartTotal() / 100).toFixed(2)}
                                    </div>
                                </div>

                                <form onSubmit={pay}>
<!-- onSubmit works as a submit button, it is used to submit the form data to the server. {pay} is the function that is called when the form is submitted. and is defined with const pay = async (event) => {...} -->
                                    <div 
                                        className="border border-gray-500 p-2 rounded-sm" 
                                        id="card-element" 
                                    />

                                    <p 
                                        id="card-error" 
                                        role="alert" 
                                        className="text-red-700 text-center font-semibold relative top-2" 
                                    />

                                    <button 
                                        type="submit"
                                        className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full"
                                    >
                                        <div>Confirm and pay</div>
                                    </button>
                                </form>
                            </div>
                        </ClientOnly>

                        <div className="flex items-center p-4 justify-center gap-2 border-t">
                            <img width={170} src="/images/logo.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </>
  )
}

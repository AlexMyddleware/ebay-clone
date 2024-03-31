"use client"
<!-- use client is a directive that tells the compiler to only render this component on the client side -->

import MainLayout from "../layouts/MainLayout"
<!-- import the MainLayout component that will be used to wrap the content of the page, it contains the header and footer. Its chilrden will be rendered in the main section of the layout -->

import CartItem from "../components/CartItem"
<!-- import the CartItem component that will be used to render the cart items in the cart page -->

import { useCart } from "../context/cart"
<!-- import the useCart hook that will be used to access the cart context and its methods. A hook is a function that lets you use state and other React features in a functional component. In the case of the useCart hook, it provides access to the cart context and its methods. The context is a way to share values between components without having to explicitly pass props through every level of the component tree. A prop is a special keyword in React that stands for properties. They are used to pass data from a parent component to a child component. -->

import { useEffect } from "react"
<!-- imports the useEffect hook from the React library. The useEffect hook is used to perform side effects in function components. Side effects are actions that are performed outside the scope of the component, such as data fetching, subscriptions, or DOM manipulation. The useEffect hook is called after the component has rendered and can be used to perform tasks that require access to the DOM or external data sources. -->

import { useRouter } from "next/navigation"
<!-- imports the useRouter hook from the next/navigation library. The useRouter hook is used to access the router object in Next.js. The router object allows you to programmatically navigate between pages in your Next.js application. -->

import useIsLoading from "../hooks/useIsLoading"
<!-- imports the useIsLoading hook from the hooks folder. The useIsLoading hook is a custom hook that is used to set the loading state of the application. The loading state is used to indicate to the user that the application is fetching data or performing an operation that may take some time. Here is what the useIsLoading hook looks like do :

It uses the localStorage.setItem method to store the value of bool in the local storage of the browser under the key 'isLoading'. Local storage allows you to store data persistently in a user's browser. The data will persist even after the browser window is closed or refreshed.

It dispatches a storage event on the window object. This event can be listened for elsewhere in your application to react when the 'isLoading' value in local storage changes. -->

<!-- An Event in JavaScript is an object that represents an occurrence, typically user interactions such as mouse clicks, key presses, or system-generated events like loading a web page. Events are used to trigger JavaScript functions.

In useIsLoading, new Event("storage") creates a new event named "storage". This event is then dispatched to the window object using window.dispatchEvent(). This means that any function that is listening for a "storage" event on the window object will be triggered when this event is dispatched. The javascript file that uses this storage event is the MainLayout component, with its useEffect hook that listens for the "storage" event and updates the loading state based on the value stored in local storage. -->

import ClientOnly from "../components/ClientOnly"
<!-- imports the ClientOnly component from the components folder. The ClientOnly component is a wrapper component that ensures that its children are only rendered on the client side, as opposeded to server-side. This is useful for components that rely on browser-specific APIs or features that are not available on the server side. -->

export default function Cart() {
<!-- defines the Cart component as a functional component. A functional component is a simple JavaScript function that returns JSX (JavaScript XML) to define the structure of the component. the default keyword is used to export the Cart component as the default export of the module. which means that when the module named 'Cart' is imported, the Cart component will be imported by default. Export means that the component can be imported and used in other files. -->

  const router = useRouter()
<!-- initializes the router variable using the useRouter hook. The useRouter hook returns the router object, which provides methods for programmatically navigating between pages in a Next.js application. The router object is used to access the current route, query parameters, and other information about the navigation state of the application.
the object router looks like this in a console.log :

Object { back: back(), forward: forward(), prefetch: prefetch(href, options), replace: replace(href, options), push: push(href, options), refresh: refresh(), fastRefresh: fastRefresh()
 }
​
back: function back()​
fastRefresh: function fastRefresh()​
forward: function forward()​
prefetch: function prefetch(href, options)​
push: function push(href, options)​
refresh: function refresh()​
replace: function replace(href, options)​
<prototype>: Object { … }

Object means that the router object is an instance of the Object class in JavaScript. An object is a collection of key-value pairs, where each key is a string (or Symbol) and each value can be any data type. In this case, the router object has several methods that can be used to navigate between pages in a Next.js application. -->

<!-- back is a method that navigates back to the previous page in the browser history. forward is a method that navigates forward to the next page in the browser history. prefetch is a method that prefetches a page in the background, which can improve the performance of navigation. replace is a method that replaces the current page in the browser history with a new page. push is a method that pushes a new page onto the browser history. refresh is a method that reloads the current page. fastRefresh is a method that performs a fast refresh of the current page. -->

  const cart = useCart()
<!-- initializes the cart variable using the useCart hook. The useCart hook returns the cart context, which contains the cart items and methods for managing the cart state. The cart context is used to store information about the items in the user's shopping cart and provides methods for adding, removing, and updating items in the cart. -->
<!-- the cart object looks like this
Object { isItemAdded: false, getCart: getCart(), addToCart: addToCart(product), removeFromCart: removeFromCart(product), isItemAddedToCart: isItemAddedToCart(product), cartCount: cartCount(), cartTotal: cartTotal(), clearCart: clearCart()
 }
​
addToCart: function addToCart(product)​
cartCount: function cartCount()​: gives the number of items in the cart
cartTotal: function cartTotal()​: gives the total price of the items in the cart in the form of an array of objects
clearCart: function clearCart()​: removes all items from the cart
getCart: function getCart(): gives the items in the cart
​
isItemAdded: false
​
isItemAddedToCart: function isItemAddedToCart(product)​
removeFromCart: function removeFromCart(product)​
<prototype>: Object { … } -->

<!-- it has several methods that can be used to interact with the cart state. addToCart is a method that adds a product to the cart. cartCount is a method that returns the number of items in the cart. cartTotal is a method that returns the total price of the items in the cart. clearCart is a method that removes all items from the cart. getCart is a method that returns the items in the cart. isItemAdded is a boolean value that indicates whether an item has been added to the cart. isItemAddedToCart is a method that checks if a specific product is in the cart. removeFromCart is a method that removes a product from the cart. -->

  useEffect(() => { 
    useIsLoading(true)
    cart.getCart() 
    cart.cartTotal()
    useIsLoading(false)
  }, [cart])

  <!-- Here's a breakdown of what this specific useEffect hook does:

useEffect(() => {...}, [cart]): This hook will run the function provided as the first argument whenever the cart object changes. The cart object is a dependency of this effect. If cart changes between renders, the effect will run again.

useIsLoading(true): This line is calling a function useIsLoading with the argument true. It sets the value of isLoading in the local storage to true and dispatches a storage event on the window object.

cart.getCart(): This line is calling the getCart method on the cart object. This method fetches the items in the cart as an array of objects.

cart.cartTotal(): This line is calling the cartTotal method on the cart object. This method calculates the total cost of the items currently in the cart.

useIsLoading(false): This line is calling the useIsLoading function again, this time with the argument false. This time,
it means theat the value of isLoading in the local storage is set to false and a storage event is dispatched on the window object.

This useEffect hook interacts with the cart object and the useIsLoading function. The cart object is likely provided by the useCart context, which is a way to share state and functions between different components in a React application. The useIsLoading function is likely a custom hook that manages a piece of state related to loading processes in your application.

The syntax used here is standard JavaScript function and method call syntax, along with the array dependency syntax used by the useEffect hook. The useEffect hook is part of the React library and is a way to perform side effects in function components. -->

<!-- the array [cart] is the dependency array. The dependency array is a list of variables that the effect depends on. If any of these variables change between renders, the effect (the function passed to useEffect) will run again.

In this case, [cart] means that the effect depends on cart. If cart changes (for example, if items are added or removed), the effect will run again.

If the dependency array was empty ([]), the effect would only run once after the initial render of the component. If there were no dependency array at all, the effect would run after every render.

So, by specifying [cart], you're telling React to only run this effect when cart changes. -->

  const goToCheckout = () => {
    if (!cart.cartTotal()) {
      alert("You don't have any items in the cart.")
      return
    }
    router.push('/checkout')
  }

<!-- if (!cart.cartTotal()) {...}: This line checks if the total cost of the items in the cart is zero. The cartTotal method on the cart object calculates the total cost of the items in the cart. If the total cost is zero, it means there are no items in the cart.

alert("You don't have any items in the cart."): If there are no items in the cart, this line shows an alert to the user saying "You don't have any items in the cart."

return: If there are no items in the cart, the function returns early and the rest of the code is not executed.

router.push('/checkout'): If there are items in the cart, this line navigates the user to the checkout page. The push method on the router object changes the current route to the one specified as the argument, in this case, '/checkout'.

This function interacts with the cart object and the router object. The cart object is likely provided by the useCart context, which is a way to share state and functions between different components in a React application. The router object is provided by the useRouter hook from Next.js, which is a way to manipulate the route in a Next.js application. -->

<!-- The () in const goToCheckout = () => {...} is the syntax for defining a function in JavaScript using arrow function syntax. The parentheses () are where you would put any parameters that the function takes.

In this case, goToCheckout is a function that takes no parameters, so the parentheses are empty.

Here's a quick example to illustrate this: -->

<!-- function with no parameters
const sayHello = () => {
  console.log("Hello, world!");
};

function with one parameter
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

function with two parameters
const add = (a, b) => {
  return a + b;
}; -->

<!-- The router.push('/checkout') line is used to programmatically navigate to a different route in a Next.js application. -->

<!-- router: This is an instance of the useRouter hook from Next.js. It provides access to the router object which contains methods and properties related to routing. -->

<!-- .push('/checkout'): The push method on the router object navigates to the specified route. In this case, it navigates to the '/checkout' route. -->

<!-- The return statement in the goToCheckout function is used to stop the execution of the function if there are no items in the cart. -->

<!-- if (!cart.cartTotal()) {...}: This line checks if the total cost of the items in the cart is zero. If the total cost is zero, it means there are no items in the cart. -->

<!-- alert("You don't have any items in the cart."): If there are no items in the cart, this line shows an alert to the user saying "You don't have any items in the cart." -->

<!-- return: If there are no items in the cart, the function returns early and the rest of the code is not executed. This means that the router.push('/checkout') line is not run, so the user is not navigated to the checkout page. -->

<!-- The return statement in the goToCheckout function is separate from the return statement that returns the JSX (HTML-like syntax) for the component. The return in the goToCheckout function is used to stop the execution of that function, while the return in the component function is used to specify what the component should render. -->

  return (
<!--  return statement is used to specify what the component should render. In this case, the Cart component returns a JSX fragment that contains the content of the cart page. A JSX fragment is a way to group multiple elements together without adding an extra DOM element. The fragment is represented by the <> and </> tags. -->
    <>
<!--  fragment is used to group multiple elements together without adding an extra DOM element. The fragment is represented by the <> and </> tags. -->
        <MainLayout>
<!--  The MainLayout component is used to wrap the content of the page. It contains the header and footer of the application. The children of the MainLayout component will be rendered in the main section of the layout. -->
          <div className="max-w-[1200px] mx-auto mb-8 min-h-[300px]">
<!--  The div element contains the content of the cart page. It has the following classes applied to it: max-w-[1200px], mx-auto, mb-8, and min-h-[300px]. These classes are used to style the div element. -->
            <div className="text-2xl font-bold my-4">Shopping cart</div>
<!--  The div element contains the text "Shopping cart" with the classes text-2xl and font-bold applied to it. These classes are used to style the text. -->
            <div className="relative flex items-baseline justify-between gap-2">
<!--  The div element contains a flex container with the classes relative, flex, items-baseline, justify-between, and gap-2 applied to it. These classes are used to style the flex container. -->
              <ClientOnly>
<!--  The ClientOnly component is used to ensure that its children are only rendered on the client side. This is useful for components that rely on browser-specific APIs or features that are not available on the server side. -->
                <div className="w-[65%]">
<!--  the div element contains a flex container with the class w-[65%] applied to it. This class is used to style the flex container. -->
                  {cart.getCart().map(product => (
<!--  the map method is used to iterate over the items in the cart. The map method takes a function as an argument that is called for each item in the cart. The function receives the current item as an argument and returns a new value. In this case, the function receives the current product as an argument and returns a CartItem component with the product as a prop. -->
                    <CartItem key={product.id} product={product}/>
<!--  the CartItem component is used to render the product in the cart. The key prop is used to uniquely identify each item in the list. The product prop is used to pass the product -->
                  ))}
<!--  closing the map method -->
                </div>
<!--  closing the div of the flex container -->
              </ClientOnly>
<!--  closing the ClientOnly component -->

              <div id="GoToCheckout" className="md:w-[33%] absolute top-0 right-0 m-2">
<!--  div element contains a button that allows the user to go to the checkout page. The div has the classes md:w-[33%], absolute, top-0, right-0, and m-2 applied to it. These classes are used to style the div element. -->
                  <ClientOnly>
<!--  clientOnly component is used to ensure that its children are only rendered on the client side. This is useful for components that rely on browser-specific APIs or features that are not available on the server side. -->
                      <div className="bg-white p-4 border">
<!--  div element contains a button that allows the user to go to the checkout page. The div has the classes bg-white, p-4, and border applied to it. These classes are used to style the div element. -->
                          <button 
<!--  button element is used to create a clickable button. -->
                            onClick={() => goToCheckout()} 
<!--  onClick event handler is used to call the goToCheckout function when the button is clicked. The goToCheckout function navigates the user to the checkout page. -->
                            className="flex items-center justify-center bg-blue-600 w-full text-white font-semibold p-3 rounded-full mt-4"
                          >
<!--  the button has the classes flex, items-center, justify-center, bg-blue-600, w-full, text-white, font-semibold, p-3, rounded-full, and mt-4 applied to it. These classes are used to style the button element. -->
                              Go to checkout
                          </button>
<!--  closing the button element -->

                          <div className="flex items-center justify-between mt-4 text-sm mb-1">
<!--  div element contains a flex container with the classes flex, items-center, justify-between, mt-4, and text-sm applied to it. These classes are used to style the flex container. -->
                              <div>Items ({cart.getCart().length})</div>
<!--  div element contains the text "Items" and includes the number of items in the cart. we call the getCart method on the cart object to get the items in the cart and then use the length property to get the number of items. -->
                              <div>USD{(cart.cartTotal() / 100).toFixed(2)}</div>
<!--  we get the total price of the items in the cart by calling the cartTotal method on the cart object. The total price is divided by 100 to convert it to dollars and then formatted to two decimal places using the toFixed method. -->
                          </div>
<!--  closing the div of the flex container -->

                          <div className="border-b border-gray-300"/>
<!--  div element contains a border that separates the subtotal from the total price. The div has the classes border-b and border-gray-300 applied to it. These classes are used to style the border. It is a horizontal grey line that separates the item and the price from the subtotal and its price. -->

                          <div className="flex items-center justify-between mt-4 mb-1 text-lg font-semibold">
<!--  div element contains a flex container with the classes flex, items-center, justify-between, mt-4, mb-1, text-lg, and font-semibold applied to it. These classes are used to style the flex container. -->
                              <div>Subtotal</div>
<!--  div for the subtotal -->
                              <div>USD{(cart.cartTotal() / 100).toFixed(2)}</div>
<!--  div for the total price of the items in the cart. we get the total price of the items in the cart by calling the cartTotal method on the cart object. The total price is divided by 100 to convert it to dollars and then formatted to two decimal places using the toFixed method. -->
                          </div>
                      </div>
                  </ClientOnly>
              </div>
            </div>
          </div>

      </MainLayout>
    </>
  )
}

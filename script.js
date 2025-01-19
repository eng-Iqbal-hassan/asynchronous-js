'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// Lecture 1:
// Asynchronous js deals with long running task that basically run in the background.
// One of the use case is to fetch data from remote server, is so called AJAX calls
// All stuff about promises, the fetch function , async await and error handling.

///////////////////////////////////////

// Lecture 3: Asynchronous Js, AJAX and Api

// First discuss what is the synchronous code: The code which runs line by line with the exact order in which it defines
// synchronous js blocks the code execution. First operation is completed and then second will be performed. Like, we get the alert window and on the next line we want to change the color of HTML, untill we will not click on the ok button of alert window, the HTML will not  get the color we mentioned.
// So the problem with synchronous code execution, let say there is task which needs 5ms to complete, in this time nothing will happen into the page. And in the solution of this problem asynchronous js comes into play.
// Consider the example of asynchronous code, we have setTimeout function, the time of 5 second is given the execution will go to the next line and execute it and after 5 second the code which is inside the setTimeout will execute.
// So,
// (1): Asynchronous code is executed when the task in the background is completed.
// (2): Asynchronous code is non-blocking.
// (3): Execution does not wait for asynchronous task to be completed.
// In simple words, Asynchronous means the code is not running at the same time.  
// call back function is a function which is executed when some other function or event completes its execution.
// call back function use to make asynchronous code but not all the time,it depends on the code formation, the code like setTimeout or load etc. make the code asynchronous.
// addEventListener does not automatically makes the code, like the click will not take time in the background but the thing like load make it asynchronous call to perform.
// So callback function alone or eventListener alone does not make the code asynchronous it depends upon the nature of task which makes it asynchronous.
// Example like, timer, load event, geolocation APIs or AJAX call give us async code.
// AJAX: asynchronous javascript and XML: Alow us to communicate with remote web server in an asynchronous way. With AJAX call we can request data from web server dynamically. 
// example with AJAX call, client (browser/we) REQUEST web server to give us the data about countries. These web server have data in the web API's. and these API's in RESPONSE give us the data.
// These REQUESTS are of different type like get request to get data from API or post request to give data to the API and some more like put, patch and delete request for their own purpose.
// API: piece of software that can be used another piece of software in order to allow application to talk to each other.
// There are endless types of API's 
// some API's like DOM API's, geolocation API's, own class API's, Online API's.
// own class API's like we write the code in js in classes and this piece of code was used in other objects so this thing fulfill the definition of API's which we have done before.
// online API's. we can build our own API's (backend development is required) or we can use third party API's.
// AJAX : X for the XML format of data but now a day json data is very popular and we use it most of the time.       

///////////////////////////////////////

// Lecture 5: Our first AJAX call XMLHttpRequest 

// in cards , we have data about certain countries and this data is coming from third party online API. A kind of magically get data from the internet and then use it in the website we are building.
// There are multiple way of doing AJAX call. We start with most old school one which is XMLHttpRequest
// The two reason for doing this. First one is that this kind of AJAX call still exists and second one is to show how AJAX call used to handle with events and call-back functions
// Then we will move to more modern way of handling asynchronous javascript, which is gonna be a feature called promises
// const getCountryData = function (country) {
// const request = new XMLHttpRequest();
// // we have called the function and store in the new variable.
// request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
// // in next step we need to apply the method .open on the request object we have made. This method will take two argument. To get the data from API, the type is simply get so we have used it and the second param is the URL(API end-point) from which we get the data.
// // The API we are going to use need no authentication
// // there is CORS set to yes or unknown -> this stand for cross origin resource sharing and without CORS we cannot access to third party API in our code.
// request.send();
// // we need to send off the request to this URL, so request.send() is done. 
// request.addEventListener('load', function(){
//     // console.log(this.responseText);
//     // const data = JSON.parse(this.responseText)
//     // destructuring to get the object out of the array.
//     const [data] = JSON.parse(this.responseText)
//     // console.log(data)
//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//     `
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// })
// }
// The result of this request is achieved using addEventListener which is in the call-back function of the load event.
// So this request is the asynchronous (non-blocking) code which is running in the background while other code is kept running. 
// We have requested for some data and when the data is arrived then addEventListener will omit the load event.
// the data we have this time is of JSON format and we need to convert it into the nice object format which  is done by using JSON.parse  
// the data we get is the array and we need an object so we will do destructuring over there
// Now in the next step we will make the card and we will get the HTML code and  then paste it inside the template literal.
// in this article  tag we just need to change the data with the data coming from the API.
// Next we just need to add this html into our page. We have selected already the countriesContainer for parent element of this HTML.
// insertAdjacentHTML will add the HTML, beforeEnd will do this thing inside the countriesContainer at the very last but inside it.
// lastly we need to set the style of this container with opacity 1.
// we want to convert it into the function and then call it for multiple countries to get cards for multiple countries. So instead of hard quoted data we will give the name of the countries to this function and it will give me multiple AJAX calls all running in the parallel. Any one can complete first and then it will give its card and load event for that card will be omitted by that time.

// getCountryData('pakistan')
// getCountryData('afghanistan')

///////////////////////////////////////

// Lecture 6: how web works behind the scene for request and response
// client(browser) requests for some data to the web server. This web server give the response back to the client no matter we are accessing the complete data or some part of data from server. This thing is called request-response model or client-server architecture.
// Now take a deep look into it.
// let say we are accessing the data with URL https://restcountries.com/v2/name/portugal
// here http or https is protocol restcountries.com is the domain name and v2/name/portugal is the resource. The domain name is not the real address of the server that we are trying to access but it is the nicer name to memorize. So we nne to convert the domain name to the real address of wen server. This thing happens through DNS which stands for domain name server.
// So when we access any web server, browser makes a request to DNS and this special server will then simply match the web address of the URL with real IP address. All it happens through your Internet service provider 
// then the thing like https://104.27.142.889:443 return back to the client(browser) which still contains but with real IP address and port number. 
// then in the next step TCP/IP socket connection is built in between the client and the server. And this connection is kept alive for the entire time that it takes to transfer all files of the website or all the data.

// get is used to get the data from API. Similarly post is used to  give data to the API, put and patch request is to modify the data.
// In the third step HTTP request is made which contains (1): start line( This start line: HTTP method+ request target + HTTP version ) (2): HTTP request headers contains the thing like Host: www.google.com, User-agent: Mozilla/5.0 and Accept-language: en-US and (3): body (Request body: only when sending data to the server e.g. POST)
// Now our request has hit the server then the server will return the data back to the client in 4th step which is called HTTP response. This response also contains (1): start line: HTTP version + status code + status message e.g. (code like 200 and its message is OK, code like 404 and its message is page not found ) (2): Response header many possibilities can happen (3): Response body(most responses have it) which contains the JSON.
// in the project first HTML file is loaded then scanned for the assets like JS, CSS and images and process is repeated for each file. and we get our web page according to these things
// In last lets talk about TCP and IP connection protocols, these protocols are for communication 
// TCP is to break request and response into small chunks called packets before the sent. Once the packets arrive in tne destination, TCP will re-assemble all the packets into the original request or response because this way the message arrives into its destination more quicker 
// the job of the IP protocol is to actually send and route these packets through the Internet.So it ensures that they arrive at the destination they should go,using IP addresses on each packet.  

///////////////////////////////////////

// Lecture 7 : callback hell 
// so in the lecture before we get the data randomly but if we want to get the data more in order then we create the call back hell by which the second call will be made after the first call.
// in the data of a country there is property which is borders which tells us about the neighbor country. So by first getting the data of a country with its property we will get the data of neighboring country so second AJAX call depends upon the first AJAX call. So we are implementing the sequence of AJAX calls 
// Now we will modify the code of function getCountryData and first its name be like getCountryAndNeighbor and when the data for the country is arrived the html for the neighbor country is parsed again so we will write it in the separate function  

const renderCountry = function(data, className='') {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
    // This property is moved in the finally method.
}

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend',msg);
  countriesContainer.style.opacity = 1;
}

// const getCountryAndNeighbor = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText)
//         // Render country 1
//         renderCountry(data)
//         // get neighbor country (2)
//         const [neighbor] = data.borders
//         // if there is no neighbor country then we will avoid error using guard clause
//         if(!neighbor) return;
//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`);
//         request2.send()
//         // in the neighbor we get the code and not the name wwe can access a country by the code which is the use of alpha so we have used it.
//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText)
//             // console.log(data2)
//             // in this time we do not need of destructuring because the country code give the unique data and so it gives us the direct object 
//             renderCountry(data2, 'neighbor')
//         })
//         // here we have call back inside a call back 
//         // No matter how many time we reload the page this second response comes after the first response there is no way to get this response before the first response. 
//         // What if we have call back inside call back which is inside call back and so on upto 10 times. This nested callback have the special name which is call back hell and all happens in the sequence.
//         // This thing is associated with the nature of call back function and not the AJAX call
//     })
// }
// getCountryAndNeighbor('germany')

// the other example to look the call back hell
// setTimeout(()=>{
//     console.log('1 sec passed')
//     setTimeout(()=>{
//         console.log('2 sec passed')
//         setTimeout(()=>{
//             console.log('3 sec passed')
//             setTimeout(()=>{
//                 console.log('4 sec passed')
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)
// this is hard to reason and hard to maintain code. So it will created more bugs and hard to add more feature in it. So the solution of it is in ES6 which is the concept of Promises in Js. 

///////////////////////////////////////

// Lecture 8: Promises and Fetch API
// More modern way of AJAX call is the fetch APIs.
// const request = fetch('https://countries-api-836d.onrender.com/countries/name/portugal')
// For the simple get request we just need to pass the API url in the fetch function. 
// console.log(request)
// in console we get that fetch request returns us the promise.
// Promise : An object that is used as placeholder for the future result of an asynchronous operations
//Promise: A container for an asynchronously delivered value.
//Promise: A container for future value. example: Response coming from AJAX call.
// because at the start there is no value in the AJAX call but we know that there must be some value in the future and we will handle this future value.
// Analogy -> i have bought the ticket of lottery now with the promise that if i will choose the right option i will get the amount.
// Two advantages of using promises
// (1): We no longer rely on the events and call back functions for AJAX call using fetch APIs.
// (2): Instead of nesting call-backs, now we have promises chain which has avoided the call-back hells.
// The promise life-cycle: Before the future value is available -> the promise status is pending. in this state the async task is running in the background. When the task is completed then the promise status is settled. This settled state is of two types (1): fulfilled -> if the data is successfully loaded and (2): Rejected -> if the data returns the error.  
///////////////////////////////////////

// Lecture 9: consuming the promise. 
// In lecture 8 we have the promise equals to request and we are in the state that we have build the promise. But most of the time we directly consume the process without building it.

// const getCountryData = function(country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//   .then(function(response) {
//     // console.log(response)
//       // in the response the data is in the response body which is readable stream and then to get the data we have to apply json method on this response. 
//     // response.json();
//       // But the problem is that this response.json is still a new asynchronous task which in return give us another promise and then we need to apply then method again on this promise
//     return response.json()
//   })
//   .then(function(data){
//     console.log(data)
//     // now in the console now i have the complete data about the country which i have added in getCountryData function call. this data is the array whose 0 index is the object for the country.
//     // so we have called the renderCountry function on it to get country card. 
//     renderCountry(data[0])
//   })
// }

// The simplified version of the code is like:
// const getCountryData = function(country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//   .then(response=>{
//     console.log('response', response)
//     if(!response.ok) {
//       throw new Error(`Country not found ${response.status}`)
//     }
//     return response.json()
//   })
//   .then(data=>{
//     renderCountry(data[0]);
//     const neighbor = data[0].borders?.[0];
//     // const neighbor = 'bkhchvyc'
//     // in this case the error will be generated for the neighboring country and we have handled them.
//     if (!neighbor) return;
//     return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`)
//   })
//   // .then(response=>response.json(), error => alert(error))
//   // instead of catching the error inside then method we have catch it at the end
//   .then(response=>{
//     console.log('response', response)
//     if(!response.ok) {
//       throw new Error(`Country not found ${response.status}`)
//     }
//     return response.json()
//   })
//   .then(data=>renderCountry(data,'neighbor'))
//   .catch(error => renderError(`something went wrong ${error.message} try again!`))
//   .finally(()=>{
//     countriesContainer.style.opacity = 1;
//   })
// }

const getJSON = function(url, errorMsg='Something went wrong') {
  return fetch(url).then(response=>{
    console.log('response', response)
    if(!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`)
    }
    return response.json()
  })
}

// const getCountryData = function(country) {
//   getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`,'Country not found')
//   .then(data=>{
//     renderCountry(data[0]);
//     const neighbor = data[0].borders?.[0];
//     if (!neighbor) throw new Error('no neighbor found');
//     return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`, 'Country not found')
//   })
//   .then(data=>renderCountry(data,'neighbor'))
//   .catch(error => renderError(`something went wrong ${error.message} try again!`))
//   .finally(()=>{
//     countriesContainer.style.opacity = 1;
//   })
// }

// so this piece of code getting the AJAX call is very short and straight forward. It has avoided the implementation of load event and addEventListener. We are still using the call back but it has avoided the call back hell.  
///////////////////////////////////////

// Lecture 10: Chaining the Promises.
// To get the data of neighbor country we need to make the second AJAX call.
// This call is inside the second then method
// one thing that must remember that if we return the AJAX call from the then method it returns the promise and on this promise we can apply further methods to give the data of second country 
// instead of returning the second fetch one can apply directly the then method on to it. This thing will work but it will again create the call back hell so we should avoid that thing and must use the return and apply the then method
// in this way we have avoided the call-back hell but we have created the flat chain of then methods.

// getCountryData('portugal')
// ok we have consumed the fetch function directly in the function. We  know that as soon as the fetch function is called, it ultimately gives us the promise which is still in the pending state but async task is running in the background. and it will ultimately be completed and it settles. let say the settled state is fulfilled and then we need to manage the result which this fetch API has generated. For it, then method is used 
// In this then method, call back function is given whose param let say is the response. and in console we get the response which is the object of output data and in this way the fetch API gonna work.  

///////////////////////////////////////

// Lecture 11: Handling Rejected Promises
// now let say that we find these countries card when we click on the button
btn.addEventListener('click',function(){
  getCountryData('Australia')
})
// now let say that we have loose the internet connection, then we will get
// uncaught (in promise) typeError: Failed to fetch
// so we need to handle this error
// one way is to handle it inside the then method of the response, second argument will be call-back function for the errors.
// so in the then method, first argument is success result and second argument is the error handling.
// Handling the error is also called catching the error.
// ok let say there is no error in the fetch and there is error in the second fetch then we will also catch the error in that response as well. 
// but it is not the good approach to catch these errors in that places 
// So, this catching should be at one global place which is at the last by using catch method.
// No matter where in the chain, the error moves down the track and if it is not catch at any place then it gives in the console uncaught (in promise) typeError 
// Ok instead of alert window, in real use-case we have to display some message in the browser
// So we have created the renderError function to give us the text message in place of cards if error does occur.
// So there are two ways of handling the error. One is inside the then method of the response and second is in the catch method
// then method is called when the status is fulfilled and catch method is called when it is rejected
// there is one method which is always called no matter then or catch method is applied or not. This method is called finally method.
// In both then and catch status one thing that we are doing is to add a property which is countriesContainer.style.opacity = 1; So the perfect place of its adding is in the finally method.
// if we search with the name which does not exist then it gives us the error which is 'cannot read property 'flag' of undefine'
// the error we get has not catch in the catch method. it is being catch in the getCountryData('dxjkbjhdv') and its status is 404. So for this kind of error we want to show that no country with this name does exist. 

///////////////////////////////////////

// Lecture 12: Throwing Errors Manually.
// So i have consoled the response and observe that for search of country with name does not exist, the status is 404 and ok property is set to false. If country does exist then status is 200 and ok is set to true.
// In case when country does not exist we have manually created the error object with constructor function new Error and inside it there is the error message. Then, there is throw keyword which immediately terminate the current function like return terminate the function. If error is returned from any function, then it will directly move down the track and perform the catch block.
// Why should we handle these errors. The reason is that there is no way of displaying these error messages without handling them and the other thing is that it is a very bad practice to let these error always hanging around. One should must handle these errors.
// always do handle the error in all the places so also in the neighbor fetch call these error should be handled  
// it is being seen that the then method for getting response for both fetches are exactly same. This is the nice place where we can use the helper function.
// so we will make one function which will make fetch function call and a then method for response. 
// So for a country for which no neighbor country we need to more reasonable message manually

///////////////////////////////////////

// Lecture 14: Async Js Behind the scene

// Js engine consists of two things (1): Heap -> where objects are stored in memory (2): Call stack -> where code is actually executed.
// Web APIs are DOM APIs, timers and fetch API. These APIs are not the part of Js but Js support them to do their work.
// These APIs are provided to the engine through event loop. These event loops sends call back from queue to call stack where its execution does happens. these call back continues to be sent to the call stack all the time.
// there is web API environment in Js, where async tasks are executed in the background
// lets consider the code snippet and its working in the Js
// el = document.querySelector('img');
// el.src = 'dog.jpg';
// el.addEventListener('load', ()=> {
//   el.classList.add('fadeIn')
// })
// fetch('API url').then(res=>console.log(res))
// In Js loading the images always an async task, so loading the images do not happen in the execution context rather it happens in the web API environment.
// In EC, addEventListener is executed and ()=>{ el.classList.add('fadeIn')} is in web API environment
//After that EC has the fetch call and fetching data is done in web API environment.
// So all other things keep executing and when the data is fetched meanwhile it shows its result in the page. 
// Similarly, then method has its call in EC and response is generated in web API environment.
// Now consider the image is loaded, then ()=>{ el.classList.add('fadeIn')} will move to call back queue 
// There can be multiple tasks in call back queue. Let say there is setTimeout which is executed in 5 seconds. Then it will take at least 5 second to execute. But it is not guaranteed that it will be executed in 5 second it can take more time and not the less time in the case when there are other tasks are completing first
// Now there is the work of event loop come into the place. It sees that if there is nothing in EC except global execution context, then it will take the task from call back queue into the EC.So in our case in EC the execution will be of (a): el.src (callback) (b): add()
// So event loop has the important task of coordinating call-back with EC in call stack.
// event loop decides when each call back is executed.
// Just the recap, image is loaded in the web API environment, once the image is loaded, the call back is gone in the call back queue and when there is call stack is left with global execution context only then the event loop moves the call back in the call stack.
// Noe fetching the data is also in the web API environment. when the data is fetched the callbacks of the promises do not move to the call back queue it moves to the micro-task queue and from here it goes to call stack and execution is performed.
// One thing about microtask queue is that it has priority over the call-back queue. So, event loop checks if there is any task in microtask queue if there is any then it performs no matter how many tasks are present in the call-back queue
  
///////////////////////////////////////

// Lecture 15: The Event Loop in practice
// console.log('test start')
// setTimeout(()=>console.log('0 sec timer'),0)
// Promise.resolve('Resolve Promise 1').then(res=>console.log(res));
// Promise.resolve('Resolve Promise 2').then(res=>{
//   for (let i=0; i<100000000; i++) {}
//   // So this is the timer who has delayed the response
//   console.log(res)
// })
// console.log('test end')
// in console that synchronous code executes first. So the order of result is 1,5,3,4,2
// Also the call backs in micro-task queue have priority than call backs in call-back queue.

///////////////////////////////////////

// Lecture 16: Building a simple Promise
// So far we know about consuming the promise like getting the promise from fetch call. Also we have the success of promise by promise.resolve 
// Now create our own new promise by promise constructor 
// in Js promises are special kind of objects. this promise constructor has one argument only which is called executor function. 
const lotteryPromise = new Promise(function(resolve,reject){
  setTimeout(function(){
    if(Math.random() >= 0.5) {
      resolve('You win the lottery')
    }else {
      reject('You have lost the lottery')
    }
  },2000)
})
// As soon as the promise constructor runs, it executes the executor function
// executor function in return pass in the two functions which are resolve in case when the promise is fulfilled and reject function in the case when the promise is rejected
// whatever the value is passed in the resolve function will be the response for then method.
// and in reject function there is the error message which will be handled in the catch method
// Now, we will consume the promise in the way
lotteryPromise.then(res=>console.log(res)).catch(err=>console.error(err))

// All the code is not really asynchronous yet so add the setTimeout in it to make it async.
// So in this way, we encapsulated the asynchronous behavior into a promise and then we consume the promise.
// Most of the time we only consume the promise and we usually built promises to basically wrap old call back functions into promise.
// So, this is the way to convert call-back based asynchronous behavior to promise base. this thing is called promisifying.

// Promisifying the setTimeout 


const wait = function(seconds) {
  return new Promise(function(resolve){
    setTimeout(resolve,seconds*1000)
  })
}

// this function will return a promise and in the call of the function we will use the then method we have not specified any value of the resolve and it is not mandetory. Also we do not need the reject function because it is impossible for timer to fail, so we are not countering the reject function. 



// it will avoid the call back hell and we will get flat chain of promise in our code. So this is the way of formatting our code to avoid the call back hell.

// setTimeout(()=>{
//     console.log('1 sec passed')
//     setTimeout(()=>{
//         console.log('2 sec passed')
//         setTimeout(()=>{
//             console.log('3 sec passed')
//             setTimeout(()=>{
//                 console.log('4 sec passed')
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

wait(1).then(()=>{
  console.log('1 second pass')
  return wait(1)
}).then(()=>{
  console.log('2 second pass')
  return wait(1)
}).then(()=>{
  console.log('3 second pass')
  return wait(1)
}).then(()=>{
  console.log('4 second pass')
})

// there are resolve and reject static methods on promise object which will give its value immidiately
Promise.resolve('abc').then(x=>console.log(x));
Promise.reject(new Error('error')).catch(x=>console.log(x))


///////////////////////////////////////

// Lecture 17: Promisifying the geo-location API
// We are gonna promisify the geolocation API
// navigator.geolocation.getCurrentPosition take two functions as argument. One is the success ion which it returns the position and second one is the error
// navigator.geolocation.getCurrentPosition(position=>console.log(position),err=>console.error(err))
console.log('getting position')
// getting the current position in this way is the async behavior. The proof is that console is run first, which i mentioned after
// this result generation of the geolocation API is moved to the web API environment and then move to the next line in the console.
// Here it is clear that this API is a call-back base API and there is nice opportunity to promisify it.

// so the code for API given above will change in this way 
const getPosition = function() {
  return new Promise(function(resolve,reject){
    // navigator.geolocation.getCurrentPosition(
    //   position=>resolve(position),
    //   err=>reject(err)
    // )
    navigator.geolocation.getCurrentPosition(resolve,reject)
    // the code i commented above and written below are the same
  })
}
getPosition().then(pos=>console.log(pos))
// i have called the getPosition function and it is giving me my location object still. So in this way we have change our call-back base async code to promise base

///////////////////////////////////////


/*
// Lecture 18: Coding challenge
const imgContainer = document.querySelector('.images');
// create the function which return the promise 
const createImage = function(imgPath){
  return new Promise(function(resolve,reject){
    const img = document.createElement('img');
    img.src=imgPath;
    img.addEventListener('load',function(){
      imgContainer.append(img);
      resolve(img)
    })
    img.addEventListener('error',function(){
      reject(new Error('Image not found'))
    })
  })
} 
// call the function
let currentImg;
createImage('img/img-1.jpg').then(img=>{
  currentImg = img
  console.log('image 1 is loaded')
  return wait(2)
})
.then(()=>{
  currentImg.style.display = 'none'
  return createImage('img/img-2.jpg')
})
.then(img=>{
  currentImg = img
  console.log('image 2 is loaded')
  return wait(2)
})
.then(()=>{
  currentImg.style.display = 'none'
})
.catch(err=>console.error(err))
// in this whole process img-1 is loaded and after 2 second it is removed and second image is added and after 2 second the second image also have removed

///////////////////////////////////////
*/

// Lecture 19: Consuming Promise with async/await
// we can make our function asynchronous by just adding async in front of the function
// This special kind of function will run in the background while performing the code inside it and when this function is done it will return the promise.
// and with this async function we use the await keyword for the wait of result.
// basically await will stop the code execution at this point until the promise is fulfilled
// Is it blocking the EC?
// No, it is not blocking the main thread of the call stack as this code is executing in the background.
// and in our current case the data is fetched

const getCountryData2 = async function(country) {
  try {
    const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    if(!res.ok) throw new Error('Problem finding the country')
    // this await statement will give us the response when data appears. so we need to store it in the variable
    // so this thing has given us the rid from then method and directly give us the response object.
    console.log('response using async await',res)
    // in console it is clear that the result is the data object.
    const data = await res.json();
    const [data2] = data;
    console.log('object', data2,data2.capital)
    console.log('data-2',data)
    // console.log('data-2',data[0])
    renderCountry(data[0])
    // So these two awaits give us the promises and these are the replacement of then method 
    return `you are in ${data2.capital}`
  } catch(err) {
    console.error(err)
    renderError(`Something went wrong ${err.message}`)

    // Reject promise returned from async function
    throw err;

  }
}
console.log('1: Start getting country data')
// getCountryData2('Portugal')
// here in the given example we are returning the string from aync function. Now like regular function we store this function call in a variable and then get that variable value in console
// const city =getCountryData2('Portugal');
// console.log(city)
// in console it is being observed that promise is returned from this async function while we wanted to have the string
// because the code for this function is running in the background and js has no way of knowing that what will be the return of this function so at this point js returns the promise
// the string which we wanted to return is the fulfilled value of the promise.
// the solution is the same that calling the then method will give us the success of this call.
// so;
// also it is being observed that if there is something wrong then it still giving us the success and in success there is undefine in the call.
// the solution of this thing is to re-throw the error.
// the thing we have done so far is the mixing of new async await with the old then method which is on personal level is not preferred.

getCountryData2('Portugal')
.then(city=>console.log(city))
.catch(err=>console.error(err.message))
.finally(()=>console.log('3: Finish getting the country data'))

// conversion into the format of async await with IIFE
// (async function(){
//   try {
//     const city = await getCountryData2('Portugal')
//     console.log(city)
//   }
//   catch(err) {console.log(err.message)}
// })()
// So, async await are just syntactic sugar over the then method and behind the scene we still use the promises 
// The country card is shown and we have make the call even avoiding the chaining method as well and also avoid the mess of call-back function 

///////////////////////////////////////

// Lecture 20: Error handling with try---catch
// we write our complete code in the try block if some error occurs then it handles in the catch block
// try {
//   const a=3;
//   a=2;
// } catch(err) {
//   alert(err.message)
// }
// here the error has appear in the alert window and remove from console.
// we do not make our try catch block to find the error of our code we do it for async calls, if any error appears there, it will be catered
// the error find in the catch block on its own are not meaningful so we can manually throw the error and this error will immidiately catch in the catch block
// in the response there is flag of ok which gives the value false if the country is wrong so use that flag for getting the right error message.

///////////////////////////////////////

// Lecture 21: Returning value from Async functions

///////////////////////////////////////

// Lecture 22: Running promises in parallel
// Now we wanted to get a function which takes the data of 3 countries and in return gives us the array of the capital of these 3 countries

const get3Countries = async function(c1,c2,c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // the response of the await is the array which is containing the object data, so getting the first element of the response we just do de-structuring and then we get the data object from it.

    // console.log([data1.capital,data2.capital,data3.capital])
    // it has been observed that with this kind of code the ajax call c2 waits for c1 to load and similar way c3 waits for c2
    // this thing does not make sense. All the AJAX call should be done in parallel. It will save the valuable loading time
    // For this thing we use the promise.all combinator function which is a kind of helper static function
    // this function takes the promises and return a single promise which runs all the promises inside it in the same time.
    const data = await Promise.all([
      await getJSON(`https://restcountries.com/v2/name/${c1}`),
      await getJSON(`https://restcountries.com/v2/name/${c2}`),
      await getJSON(`https://restcountries.com/v2/name/${c3}`),
    ])
    console.log(data.map(d=>d[0].capital))
    // console.log(data)
    // it has been observed that this data contains the three array for three countries which we just map over to get the capital out from these arrays
    // when any of the AJAX call is rejected the whole promise is gonna rejected(short-circuited)
    // whenever we need to make the multiple AJAX call which does not depend on each other then they must do in combinator function like this way
    // if you are not using async await, then the same thing can be done when the response coming is tackled using the then method the whole helper function and after that then method used on them will give us the similar way as we are getting the result over there.
  }
  catch(err) {console.error(err)}
}
get3Countries('Pakistan','Japan','Afghanistan')

///////////////////////////////////////
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
const request = fetch('https://countries-api-836d.onrender.com/countries/name/portugal')
// For the simple get request we just need to pass the API url in the fetch function. 
console.log(request)
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
const getCountryData = function(country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
  .then(response=>response.json())
  .then(data=>{
    renderCountry(data[0]);
    const neighbor = data[0].borders?.[0];
    if (!neighbor) return;
    return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`)
  })
  .then(response=>response.json())
  .then(data=>renderCountry(data,'neighbor'))
}
// so this piece of code getting the AJAX call is very short and straight forward. It has avoided the implementation of load event and addEventListener. We are still using the call back but it has avoided the call back hell.  
///////////////////////////////////////

// Lecture 10: Chaining the Promises.
// To get the data of neighbor country we need to make the second AJAX call.
// This call is inside the second then method
// one thing that must remember that if we return the AJAX call from the then method it returns the promise and on this promise we can apply further methods to give the data of second country 
// instead of returning the second fetch one can apply directly the then method on to it. This thing will work but it will again create the call back hell so we should avoid that thing and must use the return and apply the then method
// in this way we have avoided the call-back hell but we have created the flat chain of then methods. 

getCountryData('portugal')
// ok we have consumed the fetch function directly in the function. We  know that as soon as the fetch function is called, it ultimately gives us the promise which is still in the pending state but async task is running in the background. and it will ultimately be completed and it settles. let say the settled state is fulfilled and then we need to manage the result which this fetch API has generated. For it, then method is used 
// In this then method, call back function is given whose param let say is the response. and in console we get the response which is the object of output data and in this way the fetch API gonna work.  



///////////////////////////////////////


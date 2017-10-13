// making the code work both in the browser and node.js
if (typeof global === 'undefined') {
  global = window;
}





// define the api-client object to be exported
const api =  {
  function get (param) =>{
    global.fetch();

  }
  function go ()
};

Object.defineProperty(api, 'property', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: 'me'
})



// making the code work both in the browser and node.js
if (typeof module !== 'undefined') { module.exports = api; }
if (typeof window !== 'undefined') { window.api = api; }

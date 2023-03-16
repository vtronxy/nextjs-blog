
export const sleep  = (ms) => new Promise((resolve) =>{
  setTimeout(resolve, ms);
})


export const getInitialData = async (id) => {
  console.log(`${id} HTTP request: getInitialData api invoked`);
  await sleep(1000);
  console.log(`${id} HTTP request: getInitialData api invoked end`);
  return Array.from({length: 20}).fill('Hello World');
}
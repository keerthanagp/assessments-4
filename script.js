// comparing tow JSON property
// a. let obj1 ={name: "Person 1", age:5};
// b. let obj2 ={age:5, "Person 1"};

let obj1 = { name: "Person 1", age: 5 };
let obj2 = { age: 5, name: "Person 1" };


let str1 = JSON.stringify(obj1);
let str2 = JSON.stringify(obj2);


let parsedObj1 = JSON.parse(str1);
let parsedObj2 = JSON.parse(str2);


function deepCompare(obj1, obj2) {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];

    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!deepCompare(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}


const isEqual = deepCompare(parsedObj1, parsedObj2);

console.log("Are the objects equal?", isEqual);


// =============================================================================================================================

// 2. Fetch data from the REST Countries API
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
   
    data.forEach(country => {
      const flags = country.flags;

      if (flags) {
       
        console.log(`${country.name.common}: ${flags.png}`);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// ================================================================================================================================

//3. printing all country names, region, sub-region, population:


fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
   
    data.forEach(country => {
      const name = country.name.common;
      const region = country.region;
      const subRegion = country.subregion;
      const population = country.population;

      
      console.log(`Country: ${name}`);
      console.log(`Region: ${region}`);
      console.log(`Sub-Region: ${subRegion}`);
      console.log(`Population: ${population}`);
      console.log('---'); 
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

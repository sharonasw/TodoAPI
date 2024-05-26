async function processDataAsync(key,arr)
{
    // return new Promise((resolve,reject)=>
    // {
        const resultMap = new Map();

        await Promise.all(arr.map(async (obj)=>
        {
                if (obj.hasOwnProperty(key)) {
                    const val = obj[key];
                    resultMap.set(val, (resultMap.get(val) || 0) + 1);
                }
        }))
        //.then(()=>{resolve(resultMap)})
        return resultMap;
        //.catch((err)=>reject(err))
    // });
}

async function getSumByKey(key,arr)
{
    const sumMap = new Map();
    const arrSum = await arr.reduce((sum,obj)=>sum+=obj[key],0);
    sumMap.set(key,arrSum);
    return sumMap;
}
const objArr = 
    [
    {
       "k1":4,
       "k2":6 
    },
    {
        "k1":4,
        "k2":7 
     },
     {
        "k1":3,
        "k2":7 
     },
    ];

    const main = async()=>
    {
        const resMap = await processDataAsync('k1',objArr);
        // .then((resultMap) => {
        //     console.log('Aggregated results:', resultMap);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    }
    main();
    // const sumMap = await getSumByKey("k1",objArr);
    // console.log("getSumByKey:"+sumMap.get("k1"));


function getMax(numbers)
{    
    if(numbers.length===0) return undefined;
    let currentMax = -1;
    for(let i=0;i<numbers.length;i++)
    {
        if(numbers[i]>currentMax)
            currentMax = numbers[i];
    }
    return currentMax;
};

console.log(getMax([2,5,3]));
console.log(getMax([]));

function findMaxKey(map) {
    let maxKey;
    let maxValue = -Infinity; // Initialize with a very small value

    // Iterate over the entries of the Map
    for (const [key, value] of map.entries()) {
        if (value > maxValue) {
            maxValue = value; // Update the maximum value
            maxKey = key; // Update the key corresponding to the maximum value
        }
    }

    return maxKey;
}

// Example usage:
const myMap = new Map([
    ['a', 10],
    ['b', 20],
    ['c', 15]
]);

const maxKey = findMaxKey(myMap);
console.log('Key with maximum value:', maxKey); // Output: 'b
    




module.exports = { getMax };
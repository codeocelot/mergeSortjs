var mergeSort = require('./main.js');
var assert = require('assert');
var m=mergeSort.mergeSort

assert.deepEqual(mergeSort.mergeSort([2,1]),[1,2]);
assert.deepEqual(mergeSort.mergeSort([1,3,2,4]),[1,2,3,4]);
assert.deepEqual(m([1,1,2,3]),[1,1,2,3])
assert.deepEqual(m([1,6,2,5,4,3,3]),[1,2,3,3,4,5,6])

// now lets test performance.
// generate a big array
var bigArray = [];
for(var i =0;i<10000;i++){
  bigArray[i] = +Math.floor(Math.random()*100)+1
}

var startTime = new Date().getTime();
var bigArrayClone = Object.assign([],bigArray);
var result = m(bigArrayClone);
var endTime = new Date().getTime();
console.log('sync lenth:', result.length)
console.log('sync time: ',endTime-startTime);
checkOrdered(result);

bigArrayClone = Object.assign([],bigArray);
startTime=new Date().getTime();
mergeSort.mergeSortAsync(bigArray,function(res){
  endTime = new Date().getTime();
  console.log('async time' , endTime - startTime);
  checkOrdered(res);
})

function checkOrdered(arr){
  arr.forEach(function(el,i){
    if(arr[i]>arr[i+1]){
      throw new Error('not sorted correctly')
    }
  });
}


bigArrayClone = Object.assign([],bigArray);
startTime=new Date().getTime();
mergeSort.mergeSortMoreAsync(bigArray,function(res){
  endTime = new Date().getTime();
  console.log('async time' , endTime - startTime);
  checkOrdered(res);
})

function checkOrdered(arr){
  arr.forEach(function(el,i){
    if(arr[i]>arr[i+1]){
      throw new Error('not sorted correctly')
    }
  });
}

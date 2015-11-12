var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var Promise = require('bluebird');

function mergeSort(arr){
  if(!arr || arr.length === 1) return arr;
  var left = arr.splice(0,Math.ceil(arr.length/2));
  var left = mergeSort(left);
  var right = mergeSort(arr);
  return merge(left,right);
}

function merge(a,b){
  if(!a) return b;
  if(!b) return a;
  var i = 0;j=0;k=0;
  var c = [];
  while(k < (b.length + a.length)){
    if(!a[i]){c[k++] = b[j++];}
    else if (!b[j]){c[k++] = a[i++];}
    else c[k++] = (a[i] < b[j] ? a[i++] : b[j++]);
  }
  return c;
}

function mergeSortAsync(arr,callback){
  if(!arr || arr.length === 1) {
    return callback(arr);
  }
  var left = arr.splice(0,Math.ceil(arr.length/2));
  setTimeout(function(){
    mergeSortAsync(left,function(resFromLeft){
      mergeSortAsync(arr,function(resFromRight){
        var res = merge(resFromLeft,resFromRight);
        callback(res);
      });
    });

  },0);
}

function mergeSortMoreAsync(arr,callback){
  if(!arr || arr.length === 1) {
    return callback(arr);
  }
  var left = arr.splice(0,Math.ceil(arr.length/2));
  setImmediate(function(){
    mergeSortAsync(left,function(resFromLeft){
      setImmediate(function(){
        mergeSortAsync(arr,function(resFromRight){
          var res = merge(resFromLeft,resFromRight);
          callback(res);
        });
      })

    });

  });
}

function mergeSortBluebirdA(arr){
  if(!arr || arr.length === 1) return arr;
  var left = arr.splice(0,Math.ceil(arr.length/2));
  var resFromLeft = new Promise(
    function(resolve,reject){
      return resolve(mergeSortBluebirdA(left));
    }
  );
  var resFromRight = new Promise(
    function(resolve,reject){
      return resolve(mergeSortBluebirdA(arr));
    }
  );
  return Promise.all([resFromLeft,resFromRight])
    .then(function(results){
      return merge(results[0],results[1]);
    })
}

function mergeSortBluebirdB(arr){
  if(!arr || arr.length === 1) return arr;
  var left = arr.splice(0,Math.ceil(arr.length/2));
  var resFromLeft = new Promise(
    function(resolve,reject){
      return resolve(mergeSortBluebirdB(left));
    }
  );
  var resFromRight = new Promise(
    function(resolve,reject){
      return resolve(mergeSortBluebirdB(arr));
    }
  );
  return Promise.all([resFromLeft,resFromRight])
    .then(function(results){
      return new Promise(
        function(resolve,reject){
          return resolve(merge(results[0],results[1]))
        }
      )
    })
}


function mergeSort_async(arr,callback) {
setTimeout ( function() {
    callback(mergeSort(arr));
}, 0);
};

module.exports = {
  merge:merge,
  mergeSort:mergeSort,
  mergeSort_async:mergeSort_async,
  mergeSortAsync:mergeSortAsync,
  mergeSortMoreAsync:mergeSortMoreAsync,
  bluebirdA:mergeSortBluebirdA,
  bluebirdB:mergeSortBluebirdB
}

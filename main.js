var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

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
  setTimeout(function(){
    mergeSortAsync(left,function(resFromLeft){
      setTimeout(function(){
        mergeSortAsync(arr,function(resFromRight){
          var res = merge(resFromLeft,resFromRight);
          callback(res);
        },0);
      })

    });

  },0);
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
  mergeSortMoreAsync:mergeSortMoreAsync
}

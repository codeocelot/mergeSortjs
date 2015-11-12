# mergeSortjs
Sync &amp; Async implementations

Today I wanted to test my understanding of recursion.  It's been a while since I've implemented recursion, 
so why not do it in our favourite language.  And then I decided to make it async just using immediate setTimeout's 

The results are surprising-- async merge sort **sucks**.  It's at least 200x slower that sync.  So here's something
to ponder about: are the 'performance' reasons behind using Nodejs all that valid? 

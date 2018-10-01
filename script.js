/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

function pageAdd(){
  var page = document.getElementById('page-1');
  var page_clone = page.cloneNode(false);
  var paper = document.getElementById('paper');
  window.budgetManager.addPages(1);
  page_clone.setAttribute('id', 'page-'+window.budgetManager.getPages());
  paper.appendChild(page_clone);
}

function ipsumAdd(charCount){
  var continuation = '';
  if (182 < charCount){
    var diff = charCount - 182;
    if (182 < diff){
        continuation = ipsumAdd(diff);
    } else {
      continuation = HolderIpsum.words(diff, true);
    }
  }
  return HolderIpsum.words(150, false)+'. '+continuation;
}

function addNewStoryToPage(pageNumber, storyType){
  var page = document.getElementById('page-'+pageNumber.toString()); 
  var newStory = document.createElement('div');
  newStory.className = 'story '+storyType;
  window.budgetManager.addStories(1);
  newStory.innerText += ipsumAdd(275); 
  window.budgetManager.pages[(pageNumber-1)].wordcount += 275
  window.budgetManager.addWordcount(275);
  page.appendChild(newStory);
}

function addStoryToToolbox(){
  var toolbox = document.getElementById('toolbox'); 
  var newStory = document.createElement('div');
  newStory.id = 'story-'+window.budgetManager.getStories();
  newStory.className = 'story story-preview';
  window.budgetManager.addStories(1);
  newStory.innerText += ipsumAdd(275);
  toolbox.appendChild(newStory);
}

function addAdToToolbox(){
  var toolbox = document.getElementById('toolbox'); 
  var newAd = document.createElement('div');
  newAd.id = 'ad-'+window.budgetManager.getAdCount();
  newAd.className = 'ad ad-preview';
  toolbox.appendChild(newAd);
}

function addNewAdToPage(pageNumber, adType){
  var page = document.getElementById('page-'+pageNumber.toString()); 
  var newAd = document.createElement('div');
  newAd.id = 'ad-'+window.budgetManager.getAdCount();
  var adSquareCount = 1;
  if ( 'small-square' !== adType ){
      if ('three-quarter'){ adSquareCount = 2; }
      if ('three-quarter-column'){ adSquareCount = 2; }
      if ('full-height'){ adSquareCount = 3; }
      if ('full-width'){ adSquareCount = 3; }
      if ('full-page'){ adSquareCount = 9; }
  }
  window.budgetManager.addAdCount(adSquareCount);
  newAd.className = 'ad ad-'+adType;
  page.appendChild(newAd);
}

function breakEven(){
  pageAdd();
  pageAdd();
  pageAdd();
  pageAdd();
  addNewStoryToPage(2, 'story-skinny');
  addNewStoryToPage(1, 'story-skinny');
  addNewStoryToPage(4, 'story-default');
  addNewStoryToPage(1, 'story-default');
  addNewStoryToPage(2, 'story-default');
  addNewAdToPage(3, 'full-page');
  addNewAdToPage(5, 'full-page');
  addNewAdToPage(1, 'full-width');
  addNewAdToPage(2, 'full-width');
  addNewAdToPage(2, 'three-quarter');
  addNewAdToPage(4, 'full-height');
  addNewAdToPage(4, 'three-quarter');
  addNewAdToPage(4, 'small-square');
  addNewAdToPage(4, 'small-square');
}

        if (
            document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll)
        ) {
          scriptInit();
        } else {
          document.addEventListener("DOMContentLoaded", scriptInit);
        }

function scriptInit(){

        window.paper.addEventListener('budgetChanged', function(returnedObject){
          var budgetSpan = document.getElementById('total-budget');
          budgetSpan.innerHTML = window.budgetManager.getBudget();
        }, false);
        window.paper.addEventListener('distributionChanged', function(returnedObject){
          var budgetSpan = document.getElementById('total-distribution');
          budgetSpan.innerHTML = window.budgetManager.getDistribution();
        }, false);
        window.commandSet.push(function(){ addNewStoryToPage(1, 'story-default'); });
  
}
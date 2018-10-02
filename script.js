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
  page_clone.setAttribute('data-page-number', window.budgetManager.getPages());
  paper.prepend(page_clone);
  makePagesDraggable();
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
  newStory.className = 'isDraggable story '+storyType;
  window.budgetManager.addStories(1);
  newStory.innerText += ipsumAdd(275); 
  window.budgetManager.pages[(pageNumber-1)].wordcount += 275
  window.budgetManager.addWordcount(275);
  page.appendChild(newStory);
}

function addStoryToToolbox(){
  var toolbox = document.getElementById('toolbox_grid'); 
  var newStory = document.createElement('div');
  newStory.id = 'story-'+window.budgetManager.getStories();
  newStory.className = 'story story-preview story-default isDraggable';
  window.budgetManager.addStories(1);
  newStory.innerText += ipsumAdd(275);
  toolbox.appendChild(newStory);
    window.toolboxManager.storyCount += 1;
}

function addAdToToolbox(){
  var toolbox = document.getElementById('toolbox_grid'); 
  var newAd = document.createElement('div');
  newAd.id = 'ad-'+window.budgetManager.getAdCount();
  var rollDie = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
  var classNameForAd = 'small-square';
  var adValue = 1;
  var adName = '1x1';
  switch (rollDie) {
    case 1:
      classNameForAd = 'small-square';
      adName = '1x1';
      adValue = 1;
      break;
    case 2:
      classNameForAd = 'three-quarter';
      adName = '1x1';
      adName = '2x1';
      adValue = 2;
      break;
    case 3:
      classNameForAd = 'three-quarter-column';
      adValue = 2;
      adName = '1x2';
      break;      
    case 4:
      classNameForAd = 'full-height';
      adValue = 3;
      adName = '1x3';
      break;     
    case 5:
      classNameForAd = 'full-width';
      adValue = 3;
      adName = '3x1';
      break;    
    case 5:
      classNameForAd = 'full-height';
      adValue = 6;
      adName = '3x2';
      break;        
    default:
      break;
  }
  newAd.className = 'ad ad-preview isDraggable ad-'+classNameForAd;
  newAd.setAttribute('data-ad-value', adValue);
  newAd.innerHTML = 'Ad: <span class="ad-name">'+adName+'</span>';
  toolbox.appendChild(newAd);
  window.budgetManager.addAdCount(adValue);
  window.toolboxManager.adCount += 1;
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
      if ('full-page'){ adSquareCount = 6; }
  }
  window.budgetManager.addAdCount(adSquareCount);
  newAd.className = 'ad ad-'+adType;
  page.appendChild(newAd);
  window.budgetManager.pages[(pageNumber-1)].adCount += 1;
}

function shipPaper(){
  console.log('Trying to ship');
  var statusCheckIn = document.getElementById('ship-status');
  if (window.budgetManager.pages){
    console.log('Check pages');
    window.budgetManager.pages.forEach(function(page){
      if (page.wordcount <= 0 && page.adCount <= 0){
        statusCheckIn.innerText = 'You can\'t ship a paper with an empty page.';
        return false;
      }
    });
    if (window.toolboxManager.adCount > 0){
      statusCheckIn.innerText = 'You have to place all sold ads.';
      return false;
    }
    if (window.budgetManager.getBudget() <= 0){
      statusCheckIn.innerText = 'You didn\'t even break even! You\'re bankrupt';
      return false;
    }
    statusCheckIn.innerText = 'You\'ve shipped the newspaper! Your total score is: $'+Number(window.budgetManager.getBudget()).toLocaleString();
    return true;
  } else {
    statusCheckIn.innerText = 'No pages';
    return false;
  }
}

function breakEven(iteration){
  var iterationFactor = ((iteration*5)-5)+1;
  if (iteration > 1){
    pageAdd();
    addNewStoryToPage(iterationFactor, 'story-default');
  }
  pageAdd();
  pageAdd();
  pageAdd();
  pageAdd();
  addNewStoryToPage(iterationFactor+1, 'story-skinny');
  addNewStoryToPage(iterationFactor, 'story-skinny');
  addNewStoryToPage(iterationFactor+3, 'story-default');
  addNewStoryToPage(iterationFactor, 'story-default');
  addNewStoryToPage(iterationFactor+1, 'story-default');
  addNewAdToPage(iterationFactor+2, 'full-page');
  addNewAdToPage(iterationFactor+4, 'full-page');
  addNewAdToPage(iterationFactor, 'full-width');
  addNewAdToPage(iterationFactor+1, 'full-width');
  addNewAdToPage(iterationFactor+1, 'three-quarter');
  addNewAdToPage(iterationFactor+3, 'full-height');
  addNewAdToPage(iterationFactor+3, 'three-quarter');
  addNewAdToPage(iterationFactor+3, 'small-square');
  addNewAdToPage(iterationFactor+3, 'small-square');
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
          var theValue = window.budgetManager.getBudget();
          if (theValue < 0){
            budgetSpan.innerHTML = '<span style="color:darkred">$'+Number(theValue).toLocaleString()+'</span>';
          }
          if (theValue > 0){
            budgetSpan.innerHTML = '<span style="color:darkgreen">$'+Number(theValue).toLocaleString()+'</span>';
          }
        }, false);
  
        window.paper.addEventListener('distributionChanged', function(returnedObject){
          var budgetSpan = document.getElementById('total-distribution');
          var theValue = window.budgetManager.getDistribution();
          if (theValue < 0){
            budgetSpan.innerHTML = '<span style="color:darkred">'+Number(window.budgetManager.getDistribution()).toLocaleString()+'</span>';
          }
          if (theValue > 0){
            budgetSpan.innerHTML = '<span style="color:darkgreen">'+Number(window.budgetManager.getDistribution()).toLocaleString()+'</span>';
          }
        }, false);
  
        window.commandSet.push(function(){ addNewStoryToPage(1, 'story-default'); });
        window.draggableObjects = {};
  window.draggableObjects.mainObject = {};
  window.draggableObjects.dragablePages = [];
  
  const containers = document.querySelectorAll('.draggableContainer');
  
        window.draggableObjects.mainObject = new window.Draggable.Draggable(containers, {
          draggable: '.isDraggable', 
          mirror: {
            appendTo: 'page-1',
            constrainDimensions: true
          },
          plugins: [window.Draggable.Plugins.Snappable]
        });
  
  window.draggableObjects.currentlyOver = '';
  window.draggableObjects.previouslyOver = '';
  window.draggableObjects.sample = '';
  
        var page1 = document.getElementById('page-1');
        trackPageDrags();
}

function trackPageDrags(){
        window.draggableObjects.mainObject.on('drag:over', function(e){
          console.log(e);
        });
  
        window.draggableObjects.mainObject.on('drag:over:container', function(e){
          console.log('toolboxDrag Over Container', e);
          window.draggableObjects.previouslyOver = e.data.originalSource;
          if (e.data.originalSource != e.data.overContainer){
            console.log('container move attempt');
            //window.draggableObjects.sample = e.data.source.cloneNode(false);
            e.data.overContainer.appendChild(e.data.source);
            window.draggableObjects.previouslyOver = e.data.overContainer;
          }
        });
  
        window.draggableObjects.mainObject.on('drag:stop', function(e){
          console.log('Drag stop Container', e);
          //window.draggableObjects.sample.remove();
          if (e.data.originalSource != e.data.overContainer){
            console.log('container move attempt');
            // e.data.overContainer.appendChild(e.data.source);
          }
        });
}

function makePagesDraggable(){
  window.draggableObjects.mainObject.destroy();
  const containers = document.querySelectorAll('.draggableContainer');
        window.draggableObjects.mainObject = new window.Draggable.Draggable(containers, {
          draggable: '.isDraggable',
          plugins: [window.Draggable.Plugins.Snappable]
        });
  trackPageDrags();
}

function scrap(){


        window.draggableToolboxObj =  new window.Draggable.Draggable(document.getElementById('toolbox_grid'), {
          draggable: '.isDraggable', 
          mirror: {
            appendTo: 'page-1',
            constrainDimensions: true
          },
          plugins: [window.Draggable.Plugins.Snappable]
        });
        window.draggableToolboxObj.on('drag:over', function(e){
          console.log('toolboxDrag Over', e);
          if (e.data.originalSource != e.data.overContainer){
            console.log('container move attempt');
            e.data.overContainer.appendChild(e.data.source);
          }
        });
}
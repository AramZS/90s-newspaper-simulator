/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

function pageAdd(){
  var page = document.getElementById('page-1');
  var page_clone = page.cloneNode(false);
  var paper = document.getElementById('paper');
  page_clone.setAttribute('id', 'page-'+window.budgetManager.getPages());
  window.budgetManager.addPages(1);
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

function addStoryToPage(pageNumber, storyType){
  var page = document.getElementById('page-'+pageNumber.toString()); 
  var newStory = document.createElement('div');
  newStory.className = storyType;
  window.budgetManager.addStories(1);
  newStory.innerText += ipsumAdd(300); 
  page.appendChild(newStory);
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

        window.paper.addEventListener('pageValueChanged', function(returnedObject){
          var budgetSpan = document.getElementById('total-budget');
          budgetSpan.innerHTML = window.budgetManager.getBudget();
        }, false);
  
}
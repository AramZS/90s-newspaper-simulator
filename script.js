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
  if (182 < charCount){
    var diff = charCount - 182;
    if (182 < diff){
      
    }
  }
  return HolderIpsum.words(150, false)+' '+HolderIpsum.words(150, true);
}

        window.paper.addEventListener('pageValueChanged', function(returnedObject){
          var budgetSpan = document.getElementById('total-budget');
          budgetSpan.innerHTML = window.budgetManager.getBudget();
        }, false);
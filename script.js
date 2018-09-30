/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

function pageAdd() {
  var page = document.getElementById('page-1');
  var page_clone = page.cloneNode(false);
  var paper = document.getElementById('paper');
  paper.appendChild(page_clone);
}

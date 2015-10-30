
var MyModal = function(title, content){
  this.title = title
  this.content = content
}

MyModal.prototype.render = function() {

  // modal goes off bottom of screen with a long description. Would be good to make it scrollable
  var container = document.createElement("div");
  container.setAttribute("class", "modal-background");

  var modal = document.createElement("div");
  modal.setAttribute("class", "my-modal");
  modal.setAttribute("onclick","app.removeMyModal()")

  var heading = document.createElement('h3');
  heading.innerText = this.title
  var paragraph = document.createElement('p');
  paragraph.innerHTML = this.content

  img = $(paragraph).find('img')
  $(img).on("load",function() {
    $(this).animate({opacity:1})
  })
  modal.appendChild(heading)
  modal.appendChild(paragraph)
  container.appendChild(modal)

  return container;

}

// MyModal.prototype.


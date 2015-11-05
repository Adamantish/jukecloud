
// $('.catalog-entry').ready(function() {
//   console.log( event.currentTarget);
//   $(event.currentTarget).animate({opacity:1});
// })

function Helpers() {};

Helpers.prototype.removeMeFromDom = function(element) {
  element.parentNode.removeChild(element)
};


function App() {

  // TODO: move this into API
    SC.initialize({
    client_id: 'fd69671c33c9f89d3015a61724293122'
  });

  this.catalog = new Catalog()

};

App.prototype.showMyModal = function() {
  this.modal = new MyModal(this.title, this.content)
  var modalElements = this.modal.render()

  modalElements.setAttribute("style","background-color : rgba(1, 1, 1, 0)");
  document.getElementsByTagName('body')[0].appendChild(modalElements)
  window.getComputedStyle(modalElements).backgroundColor
  modalElements.setAttribute("style","background-color : rgba(1, 1, 1, 0.8)")

}


App.prototype.removeMyModal = function() {
  var removeMe = document.getElementsByClassName('modal-background')[0]
  
  // Trying to get it to wait for the fade out before removing the modal. No luck.
  removeMe.addEventListener('transitionend', function() {helpers.removeMeFromDom(removeMe)})
  window.getComputedStyle(removeMe).opacity
  removeMe.setAttribute("style","background-color : rgba(1, 1, 1, 0)");
  // removeMe.removeEventListener('transitionend', helpers.removeMeFromDom(removeMe), false)
}

function API() {};

API.prototype.doSearch = function() {
  var searchTerm = document.getElementById('search').value;

  // Encode spaces
  searchTerm = searchTerm.replace(" ", "%20");

  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm }, function(apiTracks) {
      
      app.catalog.element.innerHTML = ""
      // app.catalog.addCacheOnLoad()
      for(i in apiTracks) {

        var t = apiTracks[i]
        track = new Track(app.catalog, t.title, t.artwork_url, t.description, t.uri, t.genre, t.tag_list, t.duration, t.user.avatar_url, t.user.username, t.playback_count)
        track.addMeToCatalog()

      }
    }
  );
};

function Catalog() {

  this.tracks = [];
  var catalog =  document.getElementById("catalog");
  var ul = document.createElement('ul')
  this.element = document.getElementById("catalog");

};

Catalog.prototype = new App()

Catalog.prototype.addTrack = function(track) {

    this.element.appendChild(track.rendered)
    this.tracks.push(track)

}

Catalog.prototype.addCacheOnLoad = function() {
  $(this.element).on("load", function() {
    
  })
};


function Track(catalog, title, artwork_url, description, uri, genre, tags, duration, userAvatar, username, numOfPlays) {

  this.catalog = catalog;
  this.title = title;
  this.artwork_url = artwork_url || "";
  this.artwork_url_300 = this.artwork_url.replace( "large", "t300x300")
  this.userAvatar = userAvatar;
  this.default_image_url = artwork_url || userAvatar || ""
  this.default_image_url_300 = this.default_image_url.replace( "large", "t300x300")
  this.description = description;
  this.uri = uri;
  this.tags = tags
  this.genre = genre;
  this.duration = duration; 
  this.username = username;
  this.numOfPlays = numOfPlays;

  this.makeModalContent()

};


Track.prototype = new Catalog()

Track.prototype.addMeToCatalog = function(catalog) {

  var catalogEntry = document.createElement("div")
  catalogEntry.setAttribute("class", "catalog-entry")

  var image = document.createElement("img")
  var image_url =  this.artwork_url || this.avatar_url || ""
  image.setAttribute("src", image_url)
  
  var imageContainer = document.createElement("div")
  var catalogIndex = app.catalog.tracks.length

  imageContainer.setAttribute("class", "image-container")

  catalogEntry.setAttribute("onclick", "app.catalog.tracks[" + catalogIndex + "].showMyModal()")

  var entryTitle = document.createElement("p")
  entryTitle.innerText = this.title

  imageContainer.appendChild(image)
  catalogEntry.appendChild(imageContainer)
  catalogEntry.appendChild(entryTitle)

  // cacheImage = $(catalogEntry).append("<img>").addClass("hidden-cache-image")
  // cacheImage.attr("src",this.default_image_url_300)

  this.rendered = catalogEntry

  app.catalog.addTrack(this)
  
  if(image_url == "") {
    $(catalogEntry).animate({opacity:1})
  }
  else {
    image.addEventListener("load", function() {$(catalogEntry).animate({opacity:1})})   
  };
}

Track.prototype.makeModalContent = function() {
  
  var html = "<p><i>from " + this.username + "</i></p>"

  if (!!this.artwork_url){
    html = html 
    html = html + "<div class = 't300img-container'>"
    html = html + "<img src='" + this.artwork_url_300 + "'></div>"
  };

  html = html + "<p>" + this.description + "</p>"
  html = html + "<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=" + this.uri + "&amp;color=0066cc'></iframe>"
  this.content = html;
  // return this.content
}

var api = new API()
var app = new App()
var helpers = new Helpers()


// function createCatalogEntry ()
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
    // console.log("SC re-initialized")

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
  removeMe.addEventListener('transitionend', helpers.removeMeFromDom(removeMe))

  removeMe.setAttribute("style","background-color : rgba(1, 1, 1, 0)")
  // removeMe.removeEventListener('transitionend', helpers.removeMeFromDom(removeMe), false)
}

function API() {};

API.prototype.doSearch = function() {
  var searchTerm = document.getElementById('search').value;

  // Encode spaces
  searchTerm = searchTerm.replace(" ", "+");

  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm, license: 'cc-by-sa' }, function(apiTracks) {
      
      app.catalog.element.innerHTML = ""
      for(i in apiTracks) {

        var t = apiTracks[i]

        track = new Track(app.catalog, t.title, t.artwork_url, t.description)
        track.addMeToCatalog()

      }
    }
  );
};

function Catalog() {

  this.tracks = [];
  this.element = document.getElementById("catalog");

  // return this.element

};

Catalog.prototype = new App()

function Track(catalog, title, artwork_url, description, numOfPlays) {

  this.catalog = catalog;
  this.title = title;
  this.artwork_url = artwork_url;
  this.description = description;
  this.numOfPlays = numOfPlays

  this.makeModalContent()

};

Track.prototype = new Catalog()

Track.prototype.addMeToCatalog = function() {

        var catalogEntry = document.createElement("div")
        catalogEntry.setAttribute("class","catalog-entry")

        var image = document.createElement("img")
        var imageContainer = document.createElement("div")
        var list = document.createElement("ul")
        var catalogIndex = app.catalog.tracks.length

        imageContainer.setAttribute("class", "image-container")
        image.setAttribute("src", this.artwork_url || "")
        catalogEntry.setAttribute("onclick", "app.catalog.tracks[" + catalogIndex + "].showMyModal()")

        var entryTitle = document.createElement("div")
        entryTitle.innerText = this.title
        // entryTitle.setAttribute('class', 'entry-title')

        imageContainer.appendChild(image)
        catalogEntry.appendChild(imageContainer)
        catalogEntry.appendChild(entryTitle)
        list.appendChild(catalogEntry)

        app.catalog.element.appendChild(catalogEntry)
        app.catalog.tracks.push(this)

}

Track.prototype.makeModalContent = function() {
  var html = !!this.artwork_url ? "<img src='" + this.artwork_url + "'>" : ""
  html = html + "<p>" + this.description + "</p>"
  this.content = html;
  // return this.content
}

var api = new API()
var app = new App()
var helpers = new Helpers()


// function createCatalogEntry ()

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
  var element = this.modal.render()
  document.getElementsByTagName('body')[0].appendChild(element)
}

App.prototype.removeMyModal = function() {
  var remove_me = document.getElementsByClassName('modal-background')[0]
  remove_me.parentNode.removeChild(remove_me)
}

function API() {};

API.prototype.doSearch = function() {
  var searchTerm = document.getElementById('search').value;

  // Encode spaces
  searchTerm = searchTerm.replace(" ", "+");

  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm, license: 'cc-by-sa' }, function(apiTracks) {
      
      app.catalog.innerHTML = ""
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
        var catalogIndex = app.catalog.tracks.length

        image.setAttribute("src", this.artwork_url || "")
        image.setAttribute("onclick", "app.catalog.tracks[" + catalogIndex + "].showMyModal()")

        var entryTitle = document.createElement("span")
        entryTitle.innerText = this.title
        // entryTitle.setAttribute('class', 'entry-title')
        catalogEntry.appendChild(image)
        catalogEntry.appendChild(entryTitle)

        app.catalog.element.appendChild(catalogEntry)
        app.catalog.tracks.push(this)

}

Track.prototype.makeModalContent = function() {

  this.content = this.description;
  // return this.content
}

var api = new API()
var app = new App()


// function createCatalogEntry ()
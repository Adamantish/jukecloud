SC.initialize({
  client_id: 'fd69671c33c9f89d3015a61724293122'
});

function API() {};

API.prototype.doSearch = function() {
  var searchTerm = document.getElementById('search').value;

  // Encode spaces
  searchTerm = searchTerm.replace(" ", "+");

  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm, license: 'cc-by-sa' }, function(apiTracks) {
      var catalog = new Catalog
      catalog.innerHTML = ""
      for(i in apiTracks) {

        var t = apiTracks[i]

        var catalogEntry = document.createElement("div")
        catalogEntry.setAttribute("class","catalog-entry")

        var image = document.createElement("img")
        image.setAttribute("src", t.artwork_url || "")

        var entryTitle = document.createElement("span")
        // entryTitle.innerText = tracks[track].
        // entryTitle.setAttribute('class', 'entry-title')
        catalogEntry.appendChild(image)

        catalog.appendChild(catalogEntry)

        // new Track(catalog, t.title, t.artwork_url, t.description)

      }
    }
  );
};
function Catalog() {

  this.element = document.getElementById("catalog")

  return this.element
};

function Track(catalog, title, artwork_url, description, numOfPlays) {

  this.catalog = catalog;
  this.title = title;
  this.artwork_url = artwork_url;
  this.description = description;
  this.numOfPlays = numOfPlays

};

Track.prototype.addMeToCatalog = function() {

        var catalogEntry = document.createElement("div")
        catalogEntry.setAttribute("class","catalog-entry")

        var image = document.createElement("img")
        image.setAttribute("src", tracks[track].artwork_url || "")

        var entryTitle = document.createElement("span")
        // entryTitle.innerText = tracks[track].
        // entryTitle.setAttribute('class', 'entry-title')
        catalogEntry.appendChild(image)

        catalog.appendChild(catalogEntry)
}

var api = new API


// function createCatalogEntry ()
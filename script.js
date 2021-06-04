// ⬇ state init ⬇ (state holds all info from the base url https://rickandmortyapi.com/api )

state = {
  character: [],
  location: [],
  episode: [],
  favourites: [],
  currentPage: 1,
};

// ⬇ query selectors for html bridge⬇ //////////////////////////////////////////////////

const mainElement = document.querySelector("#main");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

// ⬇ function to create 1 user chip ⬇ /////////////////////////////////////////////////

function renderCharacterChip(character) {
  const characterChipEl = document.createElement("div");
  characterChipEl.setAttribute("class", "characterChip");

  const characterImage = document.createElement("div");
  characterImage.setAttribute("class", "characterImage");

  const characterImgEl = document.createElement("img");
  characterImgEl.setAttribute("class", "charImage");
  characterImgEl.setAttribute("src", character.image);
  characterImgEl.setAttribute("alt", "Rick");

  const mainUl = document.createElement("ul");
  mainUl.setAttribute("class", "mainDiv");

  const nameLi = document.createElement("li");
  nameLi.setAttribute("class", "nameLi");
  nameLi.innerText = `Name: ${character.name}`;

  const statusLi = document.createElement("li");
  statusLi.setAttribute("class", "statusLi");
  statusLi.innerText = `Status: ${character.status}`;

  const speciesLi = document.createElement("li");
  speciesLi.setAttribute("class", "speciesLi");
  speciesLi.innerText = `Species: ${character.species}`;

  const genderLi = document.createElement("li");
  genderLi.setAttribute("class", "genderLi");
  genderLi.innerText = `Gender: ${character.gender}`;

  const typeLi = document.createElement("li");
  typeLi.setAttribute("class", "typeLi");
  typeLi.innerText = `type: ${character.type}`;

  const favouriteLabel = document.createElement("label");
  favouriteLabel.setAttribute("class", "favourite");
  favouriteLabel.setAttribute("for", "Favourite");
  favouriteLabel.innerText = "Add Me To Favourites... ";

  const favouriteCheckbox = document.createElement("input");
  favouriteCheckbox.setAttribute("class", "favouriteCheckBox");
  favouriteCheckbox.setAttribute("type", "checkbox");
  favouriteCheckbox.setAttribute("name", "favouriteCheckBox");
  favouriteCheckbox.setAttribute("value", "input");

  favouriteCheckbox.addEventListener("change", function (event) {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      fetch;
      console.log("true if statement triggered");
      state.favourites.push(character);
      console.log("what is state now after push?:", state.favourites);
    } else {
      event.target.checked === character.id;
      console.log("Checkbox is not checked..");
      state.favourites.pop(character);
      console.log("what is state now after pop?:", state.favourites);
    }
  });

  const deleteLabel = document.createElement("label");
  deleteLabel.setAttribute("class", "delete");
  deleteLabel.setAttribute("for", "Delete");
  deleteLabel.innerText = "Delete Me From Favourites... ";

  const deleteFavouriteCheckbox = document.createElement("input");
  deleteFavouriteCheckbox.setAttribute("class", "deleteFavouriteCheckBox");
  deleteFavouriteCheckbox.setAttribute("type", "checkbox");
  deleteFavouriteCheckbox.setAttribute("name", "deleteFavouriteCheckBox");
  deleteFavouriteCheckbox.setAttribute("value", "input");

  deleteFavouriteCheckbox.addEventListener("change", function (event) {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      console.log("true if statement triggered", event);
      state.favourites.pop(character);
      mainElement.innerHTML = "";
      renderFavouriteCharacters();
      console.log("what is state now after push?:", state.favourites);
    }
  });

  const viewFavouriteButton = document.createElement("button");
  viewFavouriteButton.setAttribute("class", "viewFavouriteButton");
  viewFavouriteButton.innerText = "View Favourites";

  viewFavouriteButton.addEventListener("click", function () {
    console.log("you've clicked favourite :", state.favourites);
    mainElement.innerHTML = "";
    renderFavouriteCharacters();
  });

  mainUl.append(nameLi, statusLi, speciesLi, genderLi, typeLi);
  characterImage.append(characterImgEl, mainUl);

  characterChipEl.append(
    characterImage,
    favouriteLabel,
    favouriteCheckbox,
    deleteLabel,
    deleteFavouriteCheckbox,
    viewFavouriteButton
  );
  mainElement.append(characterChipEl);
}

// ⬇ function to create all the user chips ⬇ /////////////////////////////////////////

function renderCharacterChips() {
  for (const character of state.character.results) {
    renderCharacterChip(character);
  }
}

// ⬇ function to create all the favourites chips ⬇ /////////////////////////////////////////

function renderFavouriteCharacters() {
  for (const character of state.favourites) {
    renderCharacterChip(character);
  }
}

// ⬇ function to add the top function ability ⬇ /////////////////////////////////////////

function addSearchFacilty() {
  const searchEl = document.createElement("input");
  searchEl.setAttribute("class", "topSearchBar");
  searchEl.setAttribute("type", "text");
  searchEl.setAttribute("name", "topSearchBar");
  searchEl.setAttribute(
    "placeholder",
    "Search Characters (By Name or single letter)..."
  );

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "buttonContainer");

  const buttonSearchEl = document.createElement("button");
  buttonSearchEl.setAttribute("class", "buttonSearchBar");
  buttonSearchEl.setAttribute("name", "topSearchBar");
  buttonSearchEl.innerText = "Schwifty Search";

  buttonSearchEl.addEventListener("click", function () {
    const getSearch = document.querySelector(".topSearchBar");

    fetch(`https://rickandmortyapi.com/api/character/?name=${searchEl.value}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (characters) {
        mainElement.innerHTML = "";
        state.character = characters;
        renderCharacterChips();
      });
  });

  const buttonResetEl = document.createElement("button");
  buttonResetEl.setAttribute("class", "buttonResetBar");
  buttonResetEl.innerText = "Schwifty Reset";

  buttonResetEl.addEventListener("click", function () {
    state.currentPage = 1;
    state.favourites = [];
    console.log("the current state page is :", state.currentPage);
    console.log("the current state favouties is :", state.favourites);
    mainElement.innerHTML = "";
    getCharactersFromServer();
  });

  buttonDiv.append(buttonSearchEl, buttonResetEl);
  header.append(searchEl, buttonDiv);
}

// ⬇ function to add the bottom button 'more' ability ⬇ /////////////////////////////////////////
// I need to amend this for when searching and looking to view more of search ////////////////////

function addMoreButton() {
  const moreButton = document.createElement("button");
  moreButton.setAttribute("class", "moreButton");
  moreButton.innerText = "Click for more Characters";
  footer.append(moreButton);

  moreButton.addEventListener("click", function (character) {
    state.currentPage = state.currentPage + 1;
    mainElement.innerHTML = "";

    fetch(`https://rickandmortyapi.com/api/character?page=${state.currentPage}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (characters) {
        state.character = characters;
        renderCharacterChips(characters);
      });
    console.log("state page is now: ", state.currentPage);
  });
}

// ⬇ function to add the bottom back page ability ⬇ /////////////////////////////////////////

function backPageButton() {
  const backButton = document.createElement("button");
  backButton.setAttribute("class", "backButton");
  backButton.innerText = "Click to go back a page";
  footer.append(backButton);

  backButton.addEventListener("click", function (character) {
    if (state.currentPage >= 2) {
      state.currentPage = state.currentPage - 1;
    } else state.currentPage = 1;

    mainElement.innerHTML = "";

    fetch(`https://rickandmortyapi.com/api/character?page=${state.currentPage}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (characters) {
        state.character = characters;
        renderCharacterChips(characters);
      });
    console.log("state page is now: ", state.currentPage);
  });
}

// ⬇ functions to get info from server and store in state ⬇ (i'm only using characters for now)//

function getCharactersFromServer() {
  fetch("https://rickandmortyapi.com/api/character")
    .then(function (response) {
      return response.json();
    })
    .then(function (characters) {
      state.character = characters;
      renderCharacterChips(characters);
    });
}

function getLocationFromServer() {
  fetch("https://rickandmortyapi.com/api/location")
    .then(function (response) {
      return response.json();
    })
    .then(function (location) {
      state.location = location;
    });
}

function getEpisodeFromServer() {
  fetch("https://rickandmortyapi.com/api/episode")
    .then(function (response) {
      return response.json();
    })
    .then(function (episode) {
      state.episode = episode;
    });
}

// ⬇ function to run all functions ahhahhhahhhhhahhhhhhh⬇ ///////////////////////////////////////

function runFunctions() {
  getCharactersFromServer();
  getLocationFromServer();
  getEpisodeFromServer();
  addSearchFacilty();
  addMoreButton();
  backPageButton();
}

runFunctions();

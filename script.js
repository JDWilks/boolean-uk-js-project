// ⬇ state init ⬇ (state holds all info from the base url https://rickandmortyapi.com/api )

state = {
  character: [],
  location: [],
  episode: [],
  favourits: [],
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

  const favouriteLabel = document.createElement("label");
  favouriteLabel.setAttribute("class", "favourite");
  favouriteLabel.setAttribute("for", "Favourite");
  favouriteLabel.innerText = "Favour Meeee ";

  const favouriteCheckbox = document.createElement("input");
  favouriteCheckbox.setAttribute("class", "favouriteCheckBox");
  favouriteCheckbox.setAttribute("type", "checkbox");
  favouriteCheckbox.setAttribute("name", "favouriteCheckBox");
  favouriteCheckbox.setAttribute("value", "input");

  favouriteCheckbox.addEventListener("change", function (event) {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      console.log("true if statement triggered");
      // renderCharacterChip(character); this currently adds the character to the end of the page - not right
    } else {
      console.log("Checkbox is not checked..");
    }
  });

  mainUl.append(nameLi, statusLi, speciesLi, genderLi);
  characterImage.append(characterImgEl, mainUl);

  characterChipEl.append(characterImage, favouriteLabel, favouriteCheckbox);
  mainElement.append(characterChipEl);
}

// ⬇ function to create all the user chips ⬇ /////////////////////////////////////////

function renderCharacterChips(characters) {
  for (const character of state.character.results) {
    renderCharacterChip(character);
  }
}

// ⬇ function to add the top function ability ⬇ /////////////////////////////////////////
// trying to add in document.getElementsByClassName("topSearchBar").reset(); to reset form - not working

function addSearchFacilty() {
  const searchEl = document.createElement("input");
  searchEl.setAttribute("class", "topSearchBar");

  searchEl.setAttribute("type", "text");
  searchEl.setAttribute("placeholder", "Search Characters...");

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "buttonContainer");

  const buttonSearchEl = document.createElement("button");
  buttonSearchEl.setAttribute("class", "buttonSearchBar");
  buttonSearchEl.innerText = "Schwifty Search";

  buttonSearchEl.addEventListener("click", function () {
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
    mainElement.innerHTML = "";
    getCharactersFromServer();
  });

  buttonDiv.append(buttonSearchEl, buttonResetEl);
  header.append(searchEl, buttonDiv);
}

// ⬇ function to add the bottom button 'more' ability ⬇ /////////////////////////////////////////

function addMoreButton() {
  const moreButton = document.createElement("button");
  moreButton.setAttribute("class", "moreButton");
  moreButton.innerText = "Click for more Characters";
  footer.append(moreButton);

  moreButton.addEventListener("click", function (character) {
    fetch("https://rickandmortyapi.com/api/character?page=2")
      .then(function (response) {
        return response.json();
      })
      .then(function (characters) {
        state.character = characters;
        renderCharacterChips(characters);
      });

    console.log("you clicked more button - good boy - well done - very clever");
  });
}

// ⬇ functions to get info from server and store in state ⬇ //////////////////////////

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

function runFunctions() {
  getCharactersFromServer();
  getLocationFromServer();
  getEpisodeFromServer();
  addSearchFacilty();
  addMoreButton();
}

runFunctions();

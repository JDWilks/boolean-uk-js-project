// ⬇ state init ⬇ (state holds all info from the base url https://rickandmortyapi.com/api )

state = {
  character: [],
  location: [],
  episode: [],
  favourits: [],
};

// ⬇ query selector for html bridge⬇ //////////////////////////////////////////////////

const mainElement = document.querySelector("#main");
console.log("is this working :", mainElement);

// ⬇ function to create 1 user chip ⬇ /////////////////////////////////////////////////

function renderCharacterChip(character) {
  const characterChipEl = document.createElement("div");
  characterChipEl.setAttribute("class", "characterChip");

  const characterImage = document.createElement("div");
  characterImage.setAttribute("class", "characterImage");

  const characterImgEl = document.createElement("img");
  characterImgEl.setAttribute("class", "charImage");
  characterImgEl.setAttribute(
    "src",
    "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  );
  characterImgEl.setAttribute("alt", "Rick");

  const mainUl = document.createElement("ul");
  mainUl.setAttribute("class", "mainDiv");

  const nameLi = document.createElement("li");
  nameLi.setAttribute("class", "nameLi");
  nameLi.innerText = "Rick Sanchez";

  const statusLi = document.createElement("li");
  statusLi.setAttribute("class", "statusLi");
  statusLi.innerText = "Alive";

  const speciesLi = document.createElement("li");
  speciesLi.setAttribute("class", "speciesLi");
  speciesLi.innerText = "Human";

  const genderLi = document.createElement("li");
  genderLi.setAttribute("class", "genderLi");
  genderLi.innerText = "Male";

  const favouriteLabel = document.createElement("label");
  favouriteLabel.setAttribute("for", "Favourite");
  favouriteLabel.innerText = "Favour meeee ";

  const favouriteCheckbox = document.createElement("input");
  favouriteCheckbox.setAttribute("type", "checkbox");
  favouriteCheckbox.setAttribute("name", "favouriteCheckBox");
  favouriteCheckbox.setAttribute("value", "input");

  mainUl.append(nameLi, statusLi, speciesLi, genderLi);
  characterImage.append(characterImgEl, mainUl);

  characterChipEl.append(
    characterImage,

    favouriteLabel,
    favouriteCheckbox
  );
  mainElement.append(characterChipEl);
}

// ⬇ function to create all the user chips ⬇ //( not working)//////////////////////////

function renderCharacterChips(characters) {
  for (const character of state.character.results) {
    renderCharacterChip(character);
  }
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
  // renderCharacterChip();
}

runFunctions();

console.log("this is state :", state);

"use strict";
//Elements
const input = document.querySelector(".form__search");
const characterList = document.querySelector(".card__wrapper");
//All characters array
let allCharacters = [];

//Search from a character event
input.addEventListener("keyup", (event) => {
    const value = event.target.value.toLowerCase();
    const sortedCharacters = allCharacters.filter(character => {
        return (
            character.name.toLowerCase().includes(value) ||
            character.gender.toLowerCase().includes(value) ||
            character.actor.toLowerCase().includes(value)
        );
    });
    displayHTMLCharacter(sortedCharacters);
});

//Function that displays the caracters
const displayHTMLCharacter = characters => {
    const characterCard = characters
        .map((character) => {
            return `
        <li class="card__item">
             <img class="card__item-image" src="${character.image}" alt="character image">
             <h3 class="card__item-name">Name: <span class="card__item-name--value">${character.name}</span></h3>
             <div class="card__item-more">
                 <p class="card__item-year">Gender: <span class="card__item-year--value">${character.gender}</span></p>
                 <p class="card__item-date">Actor: <span class="card__item-date--value">${character.actor}</span></p>
             </div>
        </li>
         `;
        })
        .join("");
    characterList.innerHTML = characterCard;
}

//Function that gets characters from an API
const searchCharacters = async () => {
    try {
        const result = await fetch("https://hp-api.onrender.com/api/characters")
            .then((data) => data.json())
            .catch(err => console.log(err));
        allCharacters = await result;
    } catch (error) {
        console.log(`Error is ${error}`);
    }
    input.value = "";
};
searchCharacters();
const pokemonCard = document.querySelector('[data-pokemon-card]');
const pokemonName = document.querySelector('[data-pokemon-name]');
const pokemonImg = document.querySelector('[data-pokemon-img]');
const pokemonImgDiv = document.querySelector('[data-pokemon-img-div]');
const pokemonId = document.querySelector('[data-pokemon-id]');
const pokemonTypes = document.querySelector('[data-pokemon-types]');
const pokemonStats = document.querySelector('[data-pokemon-stats]');
const pokemonInput = document.getElementById('pokemon-input');

const pokemonTypesColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const buscarPokemon = event => {
    event.preventDefault();

    const { value } = event.target.pokemon_name;

    const searchPokemonName = value.toLowerCase();

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchPokemonName}`;

    fetch(apiUrl)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(error => notFound())

}

const renderPokemonData = data => {

    const pokemonSprite = data.sprites.front_default;
    const { stats, types } = data;

    pokemonName.textContent = data.name;
    pokemonImg.setAttribute('src', pokemonSprite);
    pokemonId.textContent = `No. ${data.id}`;

    cardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
}

const cardColor = types => {
    const firstColor = pokemonTypesColors[types[0].type.name];
    const secondColor = types[1] ? pokemonTypesColors[types[1].type.name] : pokemonTypesColors.default;

    pokemonImg.style.background =  `radial-gradient(${secondColor} 33%, ${firstColor} 33%)`;
    pokemonImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokemonTypes.innerHTML = '';

    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = pokemonTypesColors[type.type.name];
        typeTextElement.textContent = type.type.name;

        pokemonTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokemonStats.innerHTML = '';

    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
    
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);

        pokemonStats.appendChild(statElement);
    });

}

const notFound = () => {
    pokemonName.textContent = 'Pokemon No Encontrado';
    pokemonImg.setAttribute('src','./assets/no-pokemon.png');
    pokemonImg.style.background = '#FFFFF';

    pokemonTypes.innerHTML = '';
    pokemonStats.innerHTML = '';
    pokemonId.innerHTML = '';

    pokemonImg.style.background =  `none`;
    pokemonImg.style.backgroundSize = 'none';
}

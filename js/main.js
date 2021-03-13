//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", pokeHandler);
let dataFromFirstFetch;

//let pokeID

async function pokeHandler() {
  async function getFetch(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async function getPokeInfo(pokemon) {
    const pokeData = await getFetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemon
    );
    return pokeData;
  }

  async function postPokeSprite(pokemonData) {
    const pokeHTML = `
      <p>${pokemonData.name}</p>
      <img src=${pokemonData.sprites.front_default} />
    `;
    const pokeDestination = document.getElementById("pokeContainer");

    pokeDestination.insertAdjacentHTML("beforeend", pokeHTML);
  }

  try {
    // when the function is called it will step outside its syncrronous structure
    const choice = document.querySelector("input").value;

    const pokeData = await getPokeInfo(choice);

    console.log(pokeData);

    document.querySelector("span").innerHTML = pokeData.types[0].type.name;
    document.querySelector("#moves").innerHTML = pokeData.moves[0].move.name;
    document.querySelector("#moves2").innerHTML = pokeData.moves[1].move.name;
    document.querySelector("#moves3").innerHTML = pokeData.moves[2].move.name;
    document.querySelector("#img1").src = pokeData.sprites.front_default;
    document.querySelector("#img").src = pokeData.sprites.back_default;

    pokeID = pokeData.species.url;
    const speciesData = await getFetch(pokeID);

    console.log(speciesData);

    const evoChainUrl = speciesData.evolution_chain.url;
    const evoChainData = await getFetch(evoChainUrl);

    console.log(evoChainData);

    const basePokemon = evoChainData.chain.species.name;
    const secondPokemon = evoChainData.chain.evolves_to[0].species.name;
    const thirdPokemon =
      evoChainData.chain.evolves_to[0].evolves_to[0].species.name;

    postPokeSprite(await getPokeInfo(basePokemon));
    postPokeSprite(await getPokeInfo(secondPokemon));
    postPokeSprite(await getPokeInfo(thirdPokemon));

    // const evoThreeUrl =
    // const evoThreeRes = await fetch(evoThreeUrl)
    // const evoThreeData = await evoThreeRes.json()
    // console.log(evoThreeData)

    // evoThreeData.
    // const
    // // console.log(data.chain.evolves_to[0].species)
    // console.log(data.chain.species)

    // document.querySelector('#img3').src = data.sprites
    // document.querySelector('#img4').src = data.sprites
    // document.querySelector('#img5').src = data.sprites
    // document.querySelector('#img6').src = data.sprites

    // fetch(url3)
    // .then(res => res.json()) // parse response as JSON
    // .then(data => {
    // console.log(data)
    // })
  } catch (err) {
    console.log(`err ${err}`);
  }
}

/*for()
// this will generate these evolutions 
//I will have to plug them into a loop
//it will require a for of and an if statement
first evo = data.chain.species.name
second evo = data.chain.evolves_to[0].species.name
third evo = data.chain.evolves_to[0].evolves_to.species*/

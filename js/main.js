//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', pokeHandler);
let dataFromFirstFetch;

//let pokeID

async function pokeHandler() {
  async function getFetch(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async function getPokeInfo(pokemon) {
    const pokeData = await getFetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    return pokeData;
  }

  async function postPokeSprites(pokemonData) {
    // container for ALL pokemon evolutions
    const pokeDestination = document.getElementById('pokeContainer');
    const pokeName = pokemonData[0].name;
    const capitalizedPokeName = pokeName[0].toUpperCase() + pokeName.slice(1);
    pokeDestination.innerHTML = `<h3>${capitalizedPokeName} Evolutions: </h3>`;

    //we can send all the evolution data together and loop over it
    //to post the individual pokemon in the same function call

    for (let i = 0; i < pokemonData.length; i++) {
      // these happen TO EACH pokemon
      const pokeHTML = `
        <p>${pokemonData[i].name}</p>
        <img src=${pokemonData[i].sprites.front_default} />
      `;
      pokeDestination.insertAdjacentHTML('beforeend', pokeHTML);
    }
  }

  try {
    // when the function is called it will step outside its syncrronous structure
    const choice = document.querySelector('input').value;

    const pokeData = await getPokeInfo(choice);

    console.log(pokeData);

    document.querySelector('span').innerHTML = pokeData.types[0].type.name;
    document.querySelector('#moves').innerHTML = pokeData.moves[0].move.name;
    document.querySelector('#moves2').innerHTML = pokeData.moves[1].move.name;
    document.querySelector('#moves3').innerHTML = pokeData.moves[2].move.name;
    document.querySelector('#img1').src = pokeData.sprites.front_default;
    document.querySelector('#img').src = pokeData.sprites.back_default;

    pokeID = pokeData.species.url;
    const speciesData = await getFetch(pokeID);

    console.log(speciesData);

    const evoChainUrl = speciesData.evolution_chain.url;
    const evoChainData = await getFetch(evoChainUrl);

    console.log(evoChainData);

    function gatherEvolutions(evolutionChain) {
      if (evolutionChain.length === 0) {
        return [];
      }
      const evolutions = evolutionChain.map((pokemonObj) => {
        const evolutions = [pokemonObj.species.name, ...gatherEvolutions(pokemonObj.evolves_to)];
        return evolutions;
      });
      return evolutions.flat(5);
    }

    const evolutions = [
      evoChainData.chain.species.name,
      ...gatherEvolutions(evoChainData.chain.evolves_to),
    ];

    console.log(evolutions);

    const pokemonInfos = await Promise.all(evolutions.map((pokemon) => getPokeInfo(pokemon)));
    console.log(pokemonInfos);

    postPokeSprites(pokemonInfos);
    // postPokeSprites(await getPokeInfo(basePokemon));
    // postPokeSprites(await getPokeInfo(secondPokemon));
    // postPokeSprites(await getPokeInfo(thirdPokemon));

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

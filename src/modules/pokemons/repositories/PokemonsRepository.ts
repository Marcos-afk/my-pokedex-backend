import { firestoreDb } from '../../../config/database/firestore';
import { AppError } from '../../../shared/errors';
import { IPokemons } from '../models/pokemonsModel';

class PokemonsRepository {
  public async get() {
    const pokemonRef = firestoreDb.collection('pokemons');
    const responseInitial = await pokemonRef.get();
    const pokemons: FirebaseFirestore.DocumentData[] = [];

    const response = await pokemonRef.orderBy('numberPokedex').get();

    response.forEach(doc => pokemons.push(doc.data()));
    return { pokemons, count: responseInitial.docs.length };
  }

  public async getById(id: string) {
    const pokemonRef = firestoreDb.collection('pokemons').where('name', '==', id);
    const response = await pokemonRef.get();
    return { pokemon: response.docs[0].data() };
  }

  public async create({ name, imgUrl, numberPokedex, types }: IPokemons) {
    const pokemonRef = firestoreDb.collection('pokemons');

    const isExistPokemonName = await pokemonRef.where('name', '==', name).get();
    if (!isExistPokemonName.empty) {
      throw new AppError('Pokemon com esse nome já registrado!', 404);
    }
    const isExistPokemonNumberPokedex = await pokemonRef.where('numberPokedex', '==', numberPokedex).get();
    if (!isExistPokemonNumberPokedex.empty) {
      throw new AppError('Pokemon com esse número de pokedex já registrado!', 404);
    }

    const isExistPokemonImg = await pokemonRef.where('imgUrl', '==', imgUrl).get();
    if (!isExistPokemonImg.empty) {
      throw new AppError('Pokemon com esse sprite já registrado!', 404);
    }

    const response = await pokemonRef.doc(name).set({
      name,
      imgUrl,
      numberPokedex,
      types,
    });

    return response;
  }

  public async update(id: string, { name, numberPokedex }: IPokemons) {
    const pokemonRef = await firestoreDb.collection('pokemons').where('name', '==', id).get();
    const pokemonUpdate = firestoreDb.collection('pokemons').doc(pokemonRef.docs[0].id);
    const pokemonRefValidate = firestoreDb.collection('pokemons');

    const isExistPokemonName = await pokemonRefValidate.where('name', '==', name).get();
    if (!isExistPokemonName.empty && isExistPokemonName.docs[0].id !== pokemonRef.docs[0].id) {
      throw new AppError('Pokemon com esse nome já registrado!', 404);
    }
    const isExistPokemonNumberPokedex = await pokemonRefValidate.where('numberPokedex', '==', numberPokedex).get();
    if (!isExistPokemonNumberPokedex.empty && isExistPokemonNumberPokedex.docs[0].id !== pokemonRef.docs[0].id) {
      throw new AppError('Pokemon com esse número de pokedex já registrado!', 404);
    }

    const response = await pokemonUpdate.update({
      name,
      numberPokedex,
    });

    return response;
  }

  public async remove(id: string) {
    const pokemonRef = await firestoreDb.collection('pokemons').where('name', '==', id).get();
    const pokemonRemove = firestoreDb.collection('pokemons').doc(pokemonRef.docs[0].id);
    const response = await pokemonRemove.delete();

    return response;
  }
}

export default new PokemonsRepository();

import { IPokemons } from '../models/pokemonsModel';
import PokemonsRepository from '../repositories/PokemonsRepository';

class PokemonsService {
  public async get() {
    return await PokemonsRepository.get();
  }

  public async getById(id: string) {
    return await PokemonsRepository.getById(id);
  }

  public async create(pokemon: IPokemons) {
    return await PokemonsRepository.create(pokemon);
  }

  public async update(id: string, pokemon: IPokemons) {
    return await PokemonsRepository.update(id, pokemon);
  }

  public async remove(id: string) {
    return await PokemonsRepository.remove(id);
  }
}

export default new PokemonsService();

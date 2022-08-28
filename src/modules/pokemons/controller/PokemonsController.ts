import { Request, Response } from 'express';
import PokemonsService from '../services/PokemonsService';

class PokemonsController {
  public async get(req: Request, res: Response) {
    const pokemons = await PokemonsService.get();
    return res.status(200).json(pokemons);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const pokemon = await PokemonsService.getById(id);
    return res.status(200).json(pokemon);
  }

  public async create(req: Request, res: Response) {
    const { name, imgUrl, numberPokedex, types } = req.body;
    await PokemonsService.create({ name, imgUrl, numberPokedex, types });
    return res.status(201).json({ message: 'Pokemon adicionado com sucesso!' });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, numberPokedex } = req.body;
    await PokemonsService.update(id, { name, numberPokedex });
    return res.status(201).json({ message: 'Pokemon atualizado com sucesso!' });
  }

  public async remove(req: Request, res: Response) {
    const { id } = req.params;

    await PokemonsService.remove(id);
    return res.status(201).json({ message: 'Pokemon removido com sucesso!' });
  }
}

export default new PokemonsController();

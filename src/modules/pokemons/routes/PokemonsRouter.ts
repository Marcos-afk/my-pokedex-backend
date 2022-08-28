import { Router } from 'express';
import PokemonsController from '../controller/PokemonsController';
import { celebrate, Joi, Segments } from 'celebrate';

const pokemonRouter = Router();

pokemonRouter.get('/', PokemonsController.get);

pokemonRouter.get('/:id', PokemonsController.getById);

pokemonRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().lowercase(),
      imgUrl: Joi.string().required(),
      numberPokedex: Joi.number().required(),
      types: Joi.array().items(Joi.string().required().lowercase()).required().max(2),
    },
  }),
  PokemonsController.create,
);

pokemonRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().lowercase(),
      numberPokedex: Joi.number().required(),
    },
  }),
  PokemonsController.update,
);

pokemonRouter.delete('/:id', PokemonsController.remove);

export default pokemonRouter;

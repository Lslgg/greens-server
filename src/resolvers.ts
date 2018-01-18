
import { Scalar } from "./common/scalar/scalar";
import { SystemResolver } from './gql-system';
import { GameResolver } from './gql-game';
import { MallResolver } from './gql-mall';
import { GreensResolver } from './gql-greens';


export default {
	Query: {
		...GameResolver.Query,
		...SystemResolver.Query,
		...MallResolver.Query,
		...GreensResolver.Query,
	},
	Mutation: {
		...GameResolver.Mutation,
		...SystemResolver.Mutation,
		...MallResolver.Mutation,
		...GreensResolver.Mutation,
	},
	...SystemResolver.System,
	...GameResolver.Game,
	...MallResolver.Mall,
	...Scalar.Scalar,
	...GreensResolver.Greens
};

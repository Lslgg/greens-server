
import { Scalar } from "./common/scalar/scalar";
import { SystemResolver } from './gql-system';
import { GreensResolver } from './gql-greens';


export default {
	Query: {
		...SystemResolver.Query,
		...GreensResolver.Query,
	},
	Mutation: {
		...SystemResolver.Mutation,
		...GreensResolver.Mutation,
	},
	...SystemResolver.System,
	...Scalar.Scalar,
	...GreensResolver.Greens
};

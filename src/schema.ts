var { makeExecutableSchema } = require('graphql-tools');
var requireText = require('require-text');
import resolvers from './resolvers'

var Base = requireText('./base.gql', require);
import { GameSchema } from "./gql-game";
import { SystemSchema } from "./gql-system";
import { MallSchema } from "./gql-mall";
import { GreensSchema } from "./gql-greens";
//基础表
var typeDefs = [Base];
//系统表
typeDefs = typeDefs.concat(SystemSchema);
//游戏表
typeDefs = typeDefs.concat(GameSchema);
//商城表
typeDefs = typeDefs.concat(MallSchema);
typeDefs = typeDefs.concat(GreensSchema);

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
  logger: { log: e => console.log(e) }
})


export default schema;
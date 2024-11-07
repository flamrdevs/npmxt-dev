import api_npmjs from './handlers/api.npmjs/handlers';
import npmxt from './handlers/npmxt/handlers';
import registry_npmjs from './handlers/registry.npmjs/handlers';

export default [...npmxt, ...registry_npmjs, ...api_npmjs];

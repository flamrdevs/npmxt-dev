import api_npmjs from './handlers/api.npmjs/handlers';
import registry_npmjs from './handlers/registry.npmjs/handlers';

export default [...registry_npmjs, ...api_npmjs];

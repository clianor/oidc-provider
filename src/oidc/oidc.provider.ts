import { Provider } from 'oidc-provider';
import oidcConfig from '../configs/oidc.config';

const provider = new Provider(`http://localhost:3000`, oidcConfig);
// provider.proxy = true;
export default provider;

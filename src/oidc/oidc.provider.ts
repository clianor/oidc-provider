import { Provider } from 'oidc-provider';
import oidcConfig from '../configs/oidc.config';

const provider = new Provider(`http://localhost:8888`, oidcConfig);
// provider.proxy = true;
export default provider;

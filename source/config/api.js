// Core
import { getFullApiUrl } from "instruments";

const GROUP_ID = "1WWWsc7M7A";
const TOKEN = "qab1kj1h58";
const url = "https://lab.lectrum.io/react/api";
const api = getFullApiUrl(url, GROUP_ID);

export { GROUP_ID, TOKEN, api, url };

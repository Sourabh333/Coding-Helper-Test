const { hostname, port, protocol } = window.location;
const rootHost = `${hostname}${port ? ":" + port : ""}`;
const WS_PROTO = protocol.startsWith("https") ? "wss://" : "ws://";
export const WEB_SOCKET_BASE_URL = `${WS_PROTO}${rootHost}/subscribe`;
export const API_BASE_URL = `${protocol}//${rootHost}`;

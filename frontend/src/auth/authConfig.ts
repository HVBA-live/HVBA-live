import type { AuthProviderProps } from "react-oidc-context";

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const realm = import.meta.env.VITE_KEYCLOAK_REALM;

export const authConfig: AuthProviderProps = {
  authority: `${keycloakUrl}/realms/${realm}`,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  scope: "openid profile email",

  //lange code na inloggen url wordt met onderstaande weggehaald
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

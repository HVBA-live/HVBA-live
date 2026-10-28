FROM quay.io/keycloak/keycloak:26.8.1

ENV KC_DB=postgres

# HVBA-thema in het image
COPY themes/hvba /opt/keycloak/themes/hvba

# Realm-instellingen: worden bij de eerste start geimporteerd
COPY realm/hvba-realm.json /opt/keycloak/data/import/hvba-realm.json

# Standaard: lokaal ontwikkelen. Op de server overschrijven met "start --import-realm".
CMD ["start-dev", "--import-realm"]
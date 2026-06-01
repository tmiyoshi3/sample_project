FROM quay.io/keycloak/keycloak:26.6.2

COPY proquip-realm.json /opt/keycloak/data/import/proquip-realm.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--import-realm"]

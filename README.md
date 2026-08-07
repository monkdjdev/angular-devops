# angular-devops

Gestor de tareas en Angular 22, usado como aplicacion de ejemplo para el
pipeline de CI/CD en Azure DevOps.

## Requisitos

- Node.js 22
- npm 10

## Desarrollo

```bash
npm install
npm start
```

La aplicacion queda en http://localhost:4200.

## Pruebas

```bash
npm test                       # modo watch
npm test -- --configuration ci # una corrida, con cobertura y reporte JUnit
```

La configuracion `ci` genera:

- `TESTS-results.xml` con el reporte JUnit que consume Azure DevOps
- `coverage/angular-devops/lcov.info` para SonarCloud
- `coverage/angular-devops/cobertura-coverage.xml` para la pestana Code Coverage

## Build

```bash
npm run build -- --configuration production
```

La salida queda en `dist/angular-devops/browser`.

## Imagen Docker

```bash
docker build -f devops/Dockerfile -t angular-devops:local .
docker run --rm -p 8080:8080 angular-devops:local
```

nginx sirve la aplicacion en el puerto 8080 y expone `/health` para las probes
de Kubernetes.

## Despliegue

El chart de Helm esta en `devops/helm`.

```bash
helm upgrade --install angular-devops devops/helm \
  --namespace frontend --create-namespace \
  --set image.tag=<tag>
```

## Pipeline

`azure-pipelines.yml` define dos stages:

| Stage | Que hace |
| --- | --- |
| CI | instala dependencias, lint, pruebas con cobertura, build de produccion, analisis SonarCloud y publicacion del artefacto |
| CD | construye la imagen, la verifica levantandola y consultando `/health`, y la publica en Docker Hub |

Requiere dos Service Connections: `SonarCloud-ServiceConnection` y
`DockerHub-ServiceConnection`.

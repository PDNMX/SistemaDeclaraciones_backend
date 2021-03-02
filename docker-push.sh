# gcloud auth configure-docker

DOCKER_BUILDKIT=1 docker build -t us.gcr.io/sertech-arq/pdn-back:$(git rev-parse --short HEAD) .
docker push us.gcr.io/sertech-arq/pdn-back:$(git rev-parse --short HEAD)
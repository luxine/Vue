#!/usr/bin/env bash
set -euo pipefail

# —— config —— 
IMAGE_NAME="product/lux32dev/binguin:prod"
REGISTRY="registry.cn-heyuan.aliyuncs.com"
USERNAME="olianna"
PASSWORD="luke8888"
TARGET_IMAGE="${REGISTRY}/olianna-docker-private/private-images:prod"
# ————————

echo "1/4 ▶ build images：${IMAGE_NAME}"
docker build --target prod -t "${IMAGE_NAME}" .

echo "2/4 ▶ aliyun login：${REGISTRY}"
echo "${PASSWORD}" | docker login "${REGISTRY}" \
    --username "${USERNAME}" \
    --password-stdin

echo "3/4 ▶ images tag：${IMAGE_NAME} → ${TARGET_IMAGE}"
docker tag "${IMAGE_NAME}" "${TARGET_IMAGE}"

echo "4/4 ▶ push images：${TARGET_IMAGE}"
docker push "${TARGET_IMAGE}"

echo "✅ success"

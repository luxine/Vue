<!-- docker aliyuncs -->
'luke8888' | docker login registry.cn-heyuan.aliyuncs.com --username olianna --password-stdin
docker tag product/lux32dev/binguin:prod registry.cn-heyuan.aliyuncs.com/olianna-docker-private/private-images:prod 
docker push registry.cn-heyuan.aliyuncs.com/olianna-docker-private/private-images:prod
<!-- docker build -->
docker build --target dev -t product/lux32dev/binguin:dev .
docker build --target prod -t product/lux32dev/binguin:prod .

<!-- docker run dev -->
docker run -it --rm  --name binguin-dev -p 5173:5173  -v  "${PWD}/code/base:/app/code:rw" -v "${pwd}:/app:rw" --mount source=ynode_modules,target=/app/code/node_modules -e "NODE_ENV=development" --entrypoint bash product/lux32dev/binguin:dev

<!-- docker run prod -->
docker pull registry.cn-heyuan.aliyuncs.com/olianna-docker-private/private-images:prod
docker run -d --name binguin-prod -p 80:80 --restart unless-stopped  --health-cmd="curl -f http://localhost/ || exit 1" --health-interval=30s --health-retries=3 product/lux32dev/binguin:prod

docker run -d --name binguin-prod -p 80:80 --restart unless-stopped  --health-cmd="curl -f http://localhost/ || exit 1" --health-interval=30s --health-retries=3 registry.cn-heyuan.aliyuncs.com/olianna-docker-private/private-images:prod
docker run -d --name binguin-prod -p 81:80 --restart unless-stopped  --health-cmd="curl -f http://localhost/ || exit 1" --health-interval=30s --health-retries=3 registry.cn-heyuan.aliyuncs.com/olianna-docker-private/private-images:prod


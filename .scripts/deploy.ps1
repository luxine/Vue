Param (
    [string]$ImageName    = "product/lux32dev/binguin:prod",
    [string]$Registry     = "registry.cn-heyuan.aliyuncs.com",
    [string]$Username     = "olianna",
    [string]$Password     = "luke8888",
    [string]$TargetImage  = "$Registry/olianna-docker-private/private-images:prod"
)

$ErrorActionPreference = 'Stop'

[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::InputEncoding  = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding            = New-Object System.Text.UTF8Encoding $false

function Check-LastExit {
    param([string]$Step)
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 步骤 '$Step' 失败，退出脚本 (Exit Code: $LASTEXITCODE)" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Write-Host "1/4 ▶ docker build image：$ImageName"
docker build --memory=6g --memory-swap=8g --target prod -t $ImageName .
Check-LastExit "docker build"

Write-Host "2/4 ▶ aliyun login：$Registry"
$Password | docker login $Registry --username $Username --password-stdin
Check-LastExit "docker login"

Write-Host "3/4 ▶ docker push images：$ImageName → $TargetImage"
docker tag $ImageName $TargetImage
Check-LastExit "docker tag"

Write-Host "4/4 ▶ docker push images：$TargetImage"
docker push $TargetImage
Check-LastExit "docker push"

Write-Host "✅ success " -ForegroundColor Green

# 开发环境
# 项目启动请执行inithook.sh来初始化配置 （ window环境下执行 inithook.ps1 ）


# 发布
# 执行deploy.sh发布docker镜像 （ window环境下执行 deploy.ps1 ）

# git config --global --add safe.directory D:/ynyoung




# ubuntu 20.04 nginx部署文档

# 1. 更新系统基础索引并准备依赖
sudo apt update
sudo apt install -y ca-certificates curl apt-transport-https

# 2. 导入 AnyDesk GPG 密钥（2025-02-02 以后重新生成，旧版需重导）
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://keys.anydesk.com/repos/DEB-GPG-KEY \
  | sudo tee /etc/apt/keyrings/keys.anydesk.com.asc >/dev/null
sudo chmod a+r /etc/apt/keyrings/keys.anydesk.com.asc

# 3. 添加官方仓库
echo "deb [signed-by=/etc/apt/keyrings/keys.anydesk.com.asc] \
https://deb.anydesk.com all main" \
| sudo tee /etc/apt/sources.list.d/anydesk-stable.list >/dev/null

# 4. 安装 AnyDesk
sudo apt update
sudo apt install -y anydesk

# 5. 启动 配置nginx
sudo apt update
sudo apt install nginx -y
sudo systemctl enable --now nginx
sudo systemctl status nginx
nginx -v   
sudo ufw allow 'Nginx Full' 
sudo ufw reload
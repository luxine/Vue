# Changelog

所有重要的更改都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增
- 完善项目文档体系
- 添加架构设计文档
- 添加API使用指南
- 添加开发指南
- 优化Docs页面展示

### 改进
- 更新README文档结构
- 完善项目介绍和特性说明
- 优化快速开始指南

## [1.0.0] - 2024-01-01

### 新增
- 🎉 初始版本发布
- ✨ Vue 3.5 + TypeScript + Vite 现代化项目模板
- 🌐 多平台支持 (Web、Electron、Capacitor)
- 🏗️ 依赖注入容器 (DIContainer)
- 🌐 三层网络请求架构
- 💾 存储服务抽象层
- 🔌 可扩展插件系统
- 🎮 Pinia Hooks 状态管理
- 🌐 WebSocket 实时通信模块
- 🎨 Tailwind CSS v4 样式框架
- 🔧 完整的开发工具链

### 核心特性
- **技术栈**: Vue 3.5、TypeScript 5.8、Vite 6、Tailwind CSS v4
- **状态管理**: Pinia + 自定义Hooks
- **路由管理**: Vue Router 4
- **UI组件**: Element Plus
- **代码质量**: ESLint + Prettier + TypeScript
- **构建工具**: Vite + Electron Builder + Capacitor CLI

### 架构设计
- **分层架构**: 清晰的职责分离
- **依赖注入**: 统一的服务管理
- **适配器模式**: 支持多种存储和请求方式
- **插件系统**: 可扩展的插件架构

### 开发工具
- **代码格式化**: Prettier + ESLint
- **类型检查**: TypeScript 严格模式
- **Git Hooks**: 预提交代码检查
- **热重载**: Vite 快速开发体验

### 多平台支持
- **Web应用**: 现代化的单页应用
- **Electron**: 跨平台桌面应用
- **Capacitor**: 原生移动应用

---

## 版本说明

### 版本号格式
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 更新类型
- **新增**: 新功能
- **改进**: 现有功能的改进
- **修复**: 问题修复
- **破坏性变更**: 不兼容的变更
- **文档**: 文档更新
- **性能**: 性能优化
- **安全**: 安全相关更新

---

## 贡献指南

### 提交规范
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型说明
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例
```
feat(user): 添加用户登录功能

- 实现用户登录界面
- 添加登录验证逻辑
- 集成JWT认证

Closes #123
```

---

## 发布流程

1. **功能开发**: 在功能分支开发新功能
2. **代码审查**: 提交Pull Request进行代码审查
3. **测试验证**: 运行测试确保功能正常
4. **版本更新**: 更新版本号和CHANGELOG
5. **发布**: 创建Release Tag
6. **部署**: 自动构建和部署

---

## 支持

如果您在使用过程中遇到问题，请：

1. 查看 [文档](README.md)
2. 搜索 [Issues](https://github.com/your-repo/issues)
3. 创建新的 [Issue](https://github.com/your-repo/issues/new)

---

*感谢所有为这个项目做出贡献的开发者们！*

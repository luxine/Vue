// .vscode/settings.json

{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": ["javascript", "typescript", "vue"]
}


* 仓库内部自定义Hooks
*  __init__ Hooks : 仓库被激活时自动调用
*  __initState__ Hooks : 固定值Ref<boolean>, 维护仓库 __init__ 状态, 当使用 __waitInit__ Hooks 时, 必须抛出 __initState__ 值
*  __waitInit__ Hooks : 异步,当 __init__ 执行完毕时返回


<!-- 网络模块流程 -->

Vue 组件 / 业务代码
    ↓
RequestService.get(...)  ←—— 静态入口
    ↓
DIContainer → 拿到注入的 BusinessService 实例
    ↓
BusinessService.get(...) —— 转发给 BusinessRequestService
    ↓
BusinessRequestService.get(...) —— 调用 BaseRequestService，拿到 ServerResponse<T> 并统一处理
    ↓
BaseRequestService.get(...) —— 使用 底层请求库 发起原生 HTTP 请求，并 解析为 `json<T>()` 解析
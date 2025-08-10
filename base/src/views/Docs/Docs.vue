<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 绑定 ref 以获取内部 wrapRef -->
    <el-scrollbar ref="scRef">
      <!-- 顶部导航栏 -->
      <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <RouterLink to="/"
                class="flex items-center space-x-2 text-gray-900 hover:text-indigo-600 transition-colors">
                <svg class="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M12 2L1 21h22L12 2z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"
                    fill-opacity="0.15" />
                </svg>
                <span class="font-bold text-lg">Luxine Vue</span>
              </RouterLink>
            </div>
            <div class="flex items-center space-x-4">
              <RouterLink to="/" class="text-gray-600 hover:text-gray-900 transition-colors">
                首页
              </RouterLink>
              <span class="text-gray-900 font-medium">文档</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- 主要内容区域 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- 侧边栏导航 -->
          <aside class="lg:col-span-1">
            <div class="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">目录</h3>
              <!-- 使用 el-anchor，并指定 container 与 offset；阻止默认以避免修改 URL 哈希 -->
              <el-anchor :container="containerEl" :offset="HEADER_OFFSET" @click="(e) => e.preventDefault()"
                class="space-y-2">
                <el-anchor-link v-for="section in sections" :key="section.id" :href="`#${section.id}`"
                  :title="section.title"
                  class="block text-sm text-gray-600 hover:text-indigo-600 transition-colors py-1" />
              </el-anchor>
            </div>
          </aside>

          <!-- 主内容 -->
          <main class="lg:col-span-3">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
              <!-- 页面标题 -->
              <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Luxine Vue架构文档</h1>
                <p class="text-lg text-gray-600">Vue 3 + TypeScript + Vite 现代化项目模板</p>
              </div>

              <!-- 核心特性 -->
              <section id="features" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />
                  </svg>
                  核心特性
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">技术栈</h3>
                    <ul class="space-y-2 text-gray-700">
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Vue 3.5 + Composition API
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        TypeScript 5.8
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Vite 6 构建工具
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Tailwind CSS v4
                      </li>
                    </ul>
                  </div>
                  <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">多平台支持</h3>
                    <ul class="space-y-2 text-gray-700">
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Web 应用
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Electron 桌面应用
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Capacitor 移动应用
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        一键打包部署
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- 架构设计 -->
              <section id="architecture" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  架构设计
                </h2>

                <!-- 依赖注入容器 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">依赖注入容器 (DIContainer)</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                    <p class="text-gray-700 mb-3">统一的服务管理，确保全局单例模式：</p>
                    <div class="bg-white rounded border p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      <div class="text-indigo-600">// 注入服务</div>
                      <div class="break-all">DIContainer.injectStoreModel(LocalStorageService);</div>
                      <div class="break-all">DIContainer.injectRequestsModel(apiService);</div>
                      <div class="text-indigo-600 mt-2">// 使用服务</div>
                      <div class="break-all">const apiResult = await RequestService.get('/api/version');</div>
                      <div class="break-all">const storeResult = await StoreService.get('version');</div>
                    </div>
                  </div>
                </div>

                <!-- 网络请求层 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">网络请求抽象层</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div class="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                      <h4 class="font-semibold text-blue-900 mb-2 text-sm sm:text-base">BaseRequestService</h4>
                      <p class="text-xs sm:text-sm text-blue-700">底层 HTTP 请求实现</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                      <h4 class="font-semibold text-green-900 mb-2 text-sm sm:text-base">BusinessRequestService</h4>
                      <p class="text-xs sm:text-sm text-green-700">业务逻辑处理层</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                      <h4 class="font-semibold text-purple-900 mb-2 text-sm sm:text-base">ApiRequestService</h4>
                      <p class="text-xs sm:text-sm text-purple-700">API 接口封装层</p>
                    </div>
                  </div>
                </div>

                <!-- 存储服务 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">存储服务抽象</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p class="text-gray-700 mb-3">统一的数据存储接口，支持多种存储方式：</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">LocalStorageService</h4>
                        <p class="text-xs sm:text-sm text-gray-600">基于 localStorage 的本地存储</p>
                      </div>
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">IndexDBStorageService</h4>
                        <p class="text-xs sm:text-sm text-gray-600">基于 IndexedDB 的大容量存储</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 插件系统 -->
              <section id="plugins" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd" />
                  </svg>
                  插件系统
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div
                    class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">国际化 (i18n)</h3>
                    <p class="text-xs sm:text-sm text-gray-700">多语言支持，动态切换</p>
                  </div>
                  <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-red-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">消息提示</h3>
                    <p class="text-xs sm:text-sm text-gray-700">统一的消息通知系统</p>
                  </div>
                  <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">加载状态</h3>
                    <p class="text-xs sm:text-sm text-gray-700">全局加载状态管理</p>
                  </div>
                  <div
                    class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">通知系统</h3>
                    <p class="text-xs sm:text-sm text-gray-700">桌面通知集成</p>
                  </div>
                  <div
                    class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Pinia Hooks</h3>
                    <p class="text-xs sm:text-sm text-gray-700">状态管理生命周期</p>
                  </div>
                  <div
                    class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-indigo-200">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">用户活动</h3>
                    <p class="text-xs sm:text-sm text-gray-700">用户行为追踪</p>
                  </div>
                </div>
              </section>

              <!-- 开发工具 -->
              <section id="tools" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clip-rule="evenodd" />
                    <path
                      d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  开发工具
                </h2>
                <div class="bg-gray-50 rounded-lg p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">代码质量</h3>
                      <ul class="space-y-2 text-gray-700">
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          ESLint + Prettier
                        </li>
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          TypeScript 类型检查
                        </li>
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          Lint-staged 预提交检查
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">构建工具</h3>
                      <ul class="space-y-2 text-gray-700">
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          Vite 快速构建
                        </li>
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          Electron Builder
                        </li>
                        <li class="flex items-center">
                          <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd" />
                          </svg>
                          Capacitor CLI
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 快速开始 -->
              <section id="quickstart" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                  快速开始
                </h2>
                <div class="bg-gray-900 rounded-lg p-4 sm:p-6 text-white">
                  <div class="space-y-3 sm:space-y-4">
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold mb-2">一键启动</h3>
                      <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                        <span class="text-green-400">$</span> npm init @luxine/vue@latest
                      </div>
                    </div>
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold mb-2">构建生产版本</h3>
                      <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                        <span class="text-green-400">$</span> pnpm build
                      </div>
                    </div>
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold mb-2">桌面应用构建</h3>
                      <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                        <span class="text-green-400">$</span> pnpm build/desktop
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 项目结构 -->
              <section id="structure" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 001 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clip-rule="evenodd" />
                  </svg>
                  项目结构
                </h2>
                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3">核心目录</h3>
                      <ul class="space-y-2 text-xs sm:text-sm text-gray-700">
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/basis/</code>
                            <span class="ml-2">基础架构</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/adapters/</code>
                            <span class="ml-2">适配器层</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/interface/</code>
                            <span class="ml-2">接口定义</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/plugins/</code>
                            <span class="ml-2">插件系统</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3">功能模块</h3>
                      <ul class="space-y-2 text-xs sm:text-sm text-gray-700">
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/views/</code>
                            <span class="ml-2">页面组件</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/components/</code>
                            <span class="ml-2">通用组件</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/router/</code>
                            <span class="ml-2">路由配置</span>
                          </div>
                        </li>
                        <li class="flex items-start">
                          <span class="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <div class="flex-1 min-w-0">
                            <code class="bg-white px-2 py-1 rounded text-xs">src/shared/</code>
                            <span class="ml-2">工具函数</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <!-- API使用指南 -->
              <section id="api-guide" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 001 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clip-rule="evenodd" />
                  </svg>
                  API使用指南
                </h2>

                <!-- 依赖注入容器 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">依赖注入容器 (DIContainer)</h3>
                  <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <p class="text-gray-700 mb-3">统一的服务管理，确保全局单例模式：</p>
                    <div class="bg-white rounded border p-4 font-mono text-sm overflow-x-auto">
                      <div class="text-indigo-600">// 注入服务</div>
                      <div>DIContainer.injectStoreModel(LocalStorageService);</div>
                      <div>DIContainer.injectRequestsModel(apiService);</div>
                      <div class="text-indigo-600 mt-2">// 使用服务</div>
                      <div>const apiResult = await RequestService.get('/api/version');</div>
                      <div>const storeResult = await StoreService.get('version');</div>
                    </div>
                  </div>
                </div>

                <!-- 网络请求 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">网络请求服务</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">GET请求</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const users = await requestService</div>
                          <div class="break-all">.get&lt;User[]&gt;('/api/users');</div>
                        </div>
                      </div>
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">POST请求</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const user = await requestService</div>
                          <div class="break-all">.post&lt;User&gt;('/api/users', userData);</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 存储服务 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">存储服务</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">存储数据</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">await storeService.set('user', userData);</div>
                        </div>
                      </div>
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">读取数据</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const user = await storeService</div>
                          <div class="break-all">.get&lt;User&gt;('user');</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- WebSocket服务 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">WebSocket服务</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">初始化连接</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const ws = initWebSocket</div>
                          <div class="break-all">('ws://localhost:8080');</div>
                        </div>
                      </div>
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">监听消息</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">ws.on('message', (data) => {</div>
                          <div class="break-all"> console.log(data);</div>
                          <div class="break-all">});</div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">发送消息</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">ws.send('chat', 'user', { message: 'Hello!'});</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 工具函数 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">工具函数 (Utils)</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">二进制编码</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const binary = Utils.toBinary(data);</div>
                          <div class="break-all">const base64 = Utils.toBaseBinary(data);</div>
                        </div>
                      </div>
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">URL生成</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const url = Utils.generateQueryUrl</div>
                          <div class="break-all">('/api/users', { page: 1 });</div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4">
                      <div class="bg-white rounded border p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">环境检测</h4>
                        <div class="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto">
                          <div class="break-all">const isDev = Utils.isDev();</div>
                          <div class="break-all">const apiUrl = Utils.getApiBaseURL();</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 开发指南 -->
              <section id="development" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clip-rule="evenodd" />
                  </svg>
                  开发指南
                </h2>

                <!-- 环境要求 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">环境要求</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="bg-white rounded border p-3 text-center">
                        <div class="text-2xl font-bold text-blue-600 mb-1">18.0.0+</div>
                        <div class="text-sm text-gray-600">Node.js</div>
                      </div>
                      <div class="bg-white rounded border p-3 text-center">
                        <div class="text-2xl font-bold text-green-600 mb-1">8.0.0+</div>
                        <div class="text-sm text-gray-600">pnpm</div>
                      </div>
                      <div class="bg-white rounded border p-3 text-center">
                        <div class="text-2xl font-bold text-purple-600 mb-1">2.0.0+</div>
                        <div class="text-sm text-gray-600">Git</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 开发命令 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">开发命令</h3>
                  <div class="bg-gray-900 rounded-lg p-4 sm:p-6 text-white">
                    <div class="space-y-3 sm:space-y-4">
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold mb-2">安装依赖</h4>
                        <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                          <span class="text-green-400">$</span> pnpm install
                        </div>
                      </div>
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold mb-2">Web开发</h4>
                        <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                          <span class="text-green-400">$</span> pnpm dev
                        </div>
                      </div>
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold mb-2">桌面开发</h4>
                        <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                          <span class="text-green-400">$</span> pnpm dev/desktop
                        </div>
                      </div>
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold mb-2">代码检查</h4>
                        <div class="bg-gray-800 rounded p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                          <span class="text-green-400">$</span> pnpm fix
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 状态管理 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">状态管理 (Pinia Hooks)</h3>
                  <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p class="text-gray-700 mb-3">使用自定义Hooks进行状态管理：</p>
                    <div class="bg-white rounded border p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      <div class="text-indigo-600">// 定义Store</div>
                      <div class="break-all">export const useUserStore = defineStore('user', () => {</div>
                      <div class="ml-4 break-all">const user = ref&lt;User | null&gt;(null);</div>
                      <div class="ml-4 text-indigo-600">// 初始化Hook</div>
                      <div class="ml-4 break-all">const __init__ = async () => {</div>
                      <div class="ml-8 break-all">const userData = await loadUserData();</div>
                      <div class="ml-8 break-all">user.value = userData;</div>
                      <div class="ml-4">};</div>
                      <div class="ml-4 text-indigo-600">拓展用法( 获取__init__状态(固定写法) )</div>
                      <div class="ml-4 break-all">const __initState__ = ref(false);</div>
                      <div class="ml-4 break-all">const __waitInit__ = async () => {</div>
                      <div class="ml-4 break-all">return await __watchInitState__(__initState__)</div>
                      <div class="ml-4 break-all">};</div>
                      <div class="ml-4"></div>
                      <div class="ml-4"></div>
                      <br/>
                      <div class="ml-4 break-all">return { user, __init__, __initState__, __waitInit__ };</div>
                      <div>});</div>
                    </div>
                    <br/>
                    <p class="text-gray-700 mb-3">组件中使用<p class="ml-4 text-indigo-600">await demoStore.__waitInit__();</p>可等待 __init__ 执行完成再操作</p>
                  </div>
                </div>
              </section>

              <!-- 更新日志 -->
              <section id="changelog" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd" />
                  </svg>
                  更新日志
                </h2>

                <!-- 最新版本 -->
                <div class="mb-8">
                  <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-xl font-semibold text-gray-900">v1.0.0 - 2025-08-11</h3>
                      <span
                        class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">最新版本</span>
                    </div>
                    <div class="space-y-3">
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">✨ 新增功能</h4>
                        <ul class="text-sm text-gray-700 space-y-1">
                          <li>• Vue 3.5 + TypeScript + Vite 现代化项目模板</li>
                          <li>• 多平台支持 (Web、Electron、Capacitor)</li>
                          <li>• 依赖注入容器 (DIContainer)</li>
                          <li>• 三层网络请求架构</li>
                          <li>• 存储服务抽象层</li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">🔧 核心特性</h4>
                        <ul class="text-sm text-gray-700 space-y-1">
                          <li>• 技术栈: Vue 3.5、TypeScript 5.8、Vite 6</li>
                          <li>• 状态管理: Pinia + 自定义Hooks</li>
                          <li>• UI组件: Element Plus</li>
                          <li>• 样式框架: Tailwind CSS v4</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 版本说明 -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">版本说明</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white rounded border p-3">
                      <h4 class="font-semibold text-red-600 mb-2">主版本号</h4>
                      <p class="text-sm text-gray-600">不兼容的API修改</p>
                    </div>
                    <div class="bg-white rounded border p-3">
                      <h4 class="font-semibold text-yellow-600 mb-2">次版本号</h4>
                      <p class="text-sm text-gray-600">向下兼容的功能性新增</p>
                    </div>
                    <div class="bg-white rounded border p-3">
                      <h4 class="font-semibold text-green-600 mb-2">修订号</h4>
                      <p class="text-sm text-gray-600">向下兼容的问题修正</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 贡献指南 -->
              <section id="contributing" class="mb-12 anchor-section">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clip-rule="evenodd" />
                  </svg>
                  贡献指南
                </h2>

                <!-- 贡献流程 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">贡献流程</h3>
                  <div class="bg-gray-50 rounded-lg p-6">
                    <div class="space-y-4">
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span class="text-blue-600 font-semibold">1</span>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Fork 项目</h4>
                          <p class="text-sm text-gray-600">在 GitHub 上 Fork 本仓库到你的账户</p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span class="text-green-600 font-semibold">2</span>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">创建分支</h4>
                          <p class="text-sm text-gray-600">创建特性分支：<code
                              class="bg-white px-2 py-1 rounded text-sm">git checkout -b feature/AmazingFeature</code>
                          </p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span class="text-yellow-600 font-semibold">3</span>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">提交更改</h4>
                          <p class="text-sm text-gray-600">提交你的更改：<code
                              class="bg-white px-2 py-1 rounded text-sm">git commit -m 'Add some AmazingFeature'</code>
                          </p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span class="text-purple-600 font-semibold">4</span>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">推送分支</h4>
                          <p class="text-sm text-gray-600">推送到分支：<code
                              class="bg-white px-2 py-1 rounded text-sm">git push origin feature/AmazingFeature</code>
                          </p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span class="text-red-600 font-semibold">5</span>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">创建 Pull Request</h4>
                          <p class="text-sm text-gray-600">打开 Pull Request 并等待审核</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 提交规范 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">提交规范</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-gray-700 mb-3">使用语义化提交信息：</p>
                    <div class="bg-white rounded border p-4 font-mono text-sm">
                      <div class="text-indigo-600">// 提交格式</div>
                      <div>&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</div>
                      <div class="text-indigo-600 mt-2">// 示例</div>
                      <div>feat(api): add user authentication</div>
                      <div>fix(ui): resolve button alignment issue</div>
                      <div>docs(readme): update installation guide</div>
                    </div>
                  </div>
                </div>

                <!-- 类型说明 -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">提交类型</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-green-600 mb-2 text-sm sm:text-base">feat</h4>
                      <p class="text-xs sm:text-sm text-gray-600">新功能</p>
                    </div>
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-red-600 mb-2 text-sm sm:text-base">fix</h4>
                      <p class="text-xs sm:text-sm text-gray-600">修复问题</p>
                    </div>
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-blue-600 mb-2 text-sm sm:text-base">docs</h4>
                      <p class="text-xs sm:text-sm text-gray-600">文档更新</p>
                    </div>
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-yellow-600 mb-2 text-sm sm:text-base">style</h4>
                      <p class="text-xs sm:text-sm text-gray-600">代码格式调整</p>
                    </div>
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-purple-600 mb-2 text-sm sm:text-base">refactor</h4>
                      <p class="text-xs sm:text-sm text-gray-600">重构</p>
                    </div>
                    <div class="bg-white rounded border p-3 sm:p-4">
                      <h4 class="font-semibold text-indigo-600 mb-2 text-sm sm:text-base">test</h4>
                      <p class="text-xs sm:text-sm text-gray-600">测试相关</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ElScrollbar } from 'element-plus'

// 定义页面章节
const sections = ref([
  { id: 'features', title: '核心特性' },
  { id: 'architecture', title: '架构设计' },
  { id: 'plugins', title: '插件系统' },
  { id: 'tools', title: '开发工具' },
  { id: 'quickstart', title: '快速开始' },
  { id: 'structure', title: '项目结构' },
  { id: 'api-guide', title: 'API使用指南' },
  { id: 'development', title: '开发指南' },
  { id: 'changelog', title: '更新日志' },
  { id: 'contributing', title: '贡献指南' }
])

// 顶部固定区高度（按实际导航高度微调：h-16 ≈ 64px，再加一些余量）
const HEADER_OFFSET = 80

// el-scrollbar 实例与其内部滚动容器
const scRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const containerEl = computed<HTMLElement | Window | null>(() => scRef.value?.wrapRef ?? null)

/**
 * 说明：
 * 原先的 scrollToSection 使用 window 的 scrollIntoView，
 * 在使用 el-anchor + container 后已不再需要，
 * 如仍需保留手动滚动，可改为操作 containerEl.scrollTo 计算偏移。
 */
// 平滑滚动到指定章节（保留但未使用）
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 让锚点对齐时预留出固定头部高度（与 HEADER_OFFSET 保持一致） */
.anchor-section {
  scroll-margin-top: 80px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sticky {
    position: relative;
    top: 0;
  }

  /* 小屏幕下的文本调整 */
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  /* 小屏幕下的间距调整 */
  .space-y-3>*+* {
    margin-top: 0.75rem;
  }

  /* 小屏幕下的代码块调整 */
  .font-mono {
    font-size: 0.75rem;
  }

  /* 小屏幕下的网格调整 */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .p-3 {
    padding: 0.5rem;
  }

  .text-xs {
    font-size: 0.7rem;
  }

  .font-mono {
    font-size: 0.7rem;
  }
}
</style>

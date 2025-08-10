<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="flex items-center space-x-2 text-gray-900 hover:text-indigo-600 transition-colors">
              <svg class="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2z" stroke="currentColor" stroke-width="1" stroke-linejoin="round" fill-opacity="0.15" />
              </svg>
              <span class="font-bold text-lg">Vue Template</span>
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
            <nav class="space-y-2">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block text-sm text-gray-600 hover:text-indigo-600 transition-colors py-1"
                @click="scrollToSection(section.id)"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- 主内容 -->
        <main class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <!-- 页面标题 -->
            <div class="mb-8">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">项目架构文档</h1>
              <p class="text-lg text-gray-600">Vue 3 + TypeScript + Vite 现代化项目模板</p>
            </div>

            <!-- 核心特性 -->
            <section id="features" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
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
            <section id="architecture" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                架构设计
              </h2>
              
              <!-- 依赖注入容器 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">依赖注入容器 (DIContainer)</h3>
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <p class="text-gray-700 mb-3">统一的服务管理，确保全局单例模式：</p>
                  <div class="bg-white rounded border p-4 font-mono text-sm">
                    <div class="text-indigo-600">// 注入服务</div>
                    <div>DIContainer.injectStoreModel(LocalStorageService);</div>
                    <div>DIContainer.injectRequestsModel(apiService);</div>
                    <div class="text-indigo-600 mt-2">// 获取实例</div>
                    <div>const store = DIContainer.getStoreInstance();</div>
                    <div>const request = DIContainer.getRequestInstance();</div>
                  </div>
                </div>
              </div>

              <!-- 网络请求层 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">网络请求抽象层</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 class="font-semibold text-blue-900 mb-2">BaseRequestService</h4>
                    <p class="text-sm text-blue-700">底层 HTTP 请求实现</p>
                  </div>
                  <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 class="font-semibold text-green-900 mb-2">BusinessRequestService</h4>
                    <p class="text-sm text-green-700">业务逻辑处理层</p>
                  </div>
                  <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 class="font-semibold text-purple-900 mb-2">ApiRequestService</h4>
                    <p class="text-sm text-purple-700">API 接口封装层</p>
                  </div>
                </div>
              </div>

              <!-- 存储服务 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">存储服务抽象</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-700 mb-3">统一的数据存储接口，支持多种存储方式：</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white rounded border p-3">
                      <h4 class="font-semibold text-gray-900 mb-2">LocalStorageService</h4>
                      <p class="text-sm text-gray-600">基于 localStorage 的本地存储</p>
                    </div>
                    <div class="bg-white rounded border p-3">
                      <h4 class="font-semibold text-gray-900 mb-2">IndexDBStorageService</h4>
                      <p class="text-sm text-gray-600">基于 IndexedDB 的大容量存储</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 插件系统 -->
            <section id="plugins" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
                插件系统
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <h3 class="font-semibold text-gray-900 mb-2">国际化 (i18n)</h3>
                  <p class="text-sm text-gray-700">多语言支持，动态切换</p>
                </div>
                <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                  <h3 class="font-semibold text-gray-900 mb-2">消息提示</h3>
                  <p class="text-sm text-gray-700">统一的消息通知系统</p>
                </div>
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                  <h3 class="font-semibold text-gray-900 mb-2">加载状态</h3>
                  <p class="text-sm text-gray-700">全局加载状态管理</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <h3 class="font-semibold text-gray-900 mb-2">通知系统</h3>
                  <p class="text-sm text-gray-700">桌面通知集成</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                  <h3 class="font-semibold text-gray-900 mb-2">Pinia Hooks</h3>
                  <p class="text-sm text-gray-700">状态管理生命周期</p>
                </div>
                <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
                  <h3 class="font-semibold text-gray-900 mb-2">用户活动</h3>
                  <p class="text-sm text-gray-700">用户行为追踪</p>
                </div>
              </div>
            </section>

            <!-- 开发工具 -->
            <section id="tools" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
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
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        ESLint + Prettier
                      </li>
                      <li class="flex items-center">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        TypeScript 类型检查
                      </li>
                      <li class="flex items-center">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
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
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Vite 快速构建
                      </li>
                      <li class="flex items-center">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Electron Builder
                      </li>
                      <li class="flex items-center">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Capacitor CLI
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- 快速开始 -->
            <section id="quickstart" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                </svg>
                快速开始
              </h2>
              <div class="bg-gray-900 rounded-lg p-6 text-white">
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-semibold mb-2">安装依赖</h3>
                    <div class="bg-gray-800 rounded p-3 font-mono text-sm">
                      <span class="text-green-400">$</span> pnpm install
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">启动开发服务器</h3>
                    <div class="bg-gray-800 rounded p-3 font-mono text-sm">
                      <span class="text-green-400">$</span> pnpm dev
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">构建生产版本</h3>
                    <div class="bg-gray-800 rounded p-3 font-mono text-sm">
                      <span class="text-green-400">$</span> pnpm build
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">桌面应用构建</h3>
                    <div class="bg-gray-800 rounded p-3 font-mono text-sm">
                      <span class="text-green-400">$</span> pnpm build:desktop
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 项目结构 -->
            <section id="structure" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="h-6 w-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd" />
                </svg>
                项目结构
              </h2>
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">核心目录</h3>
                    <ul class="space-y-2 text-sm text-gray-700">
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/basis/</code> - 基础架构
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/adapters/</code> - 适配器层
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/interface/</code> - 接口定义
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/plugins/</code> - 插件系统
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">功能模块</h3>
                    <ul class="space-y-2 text-sm text-gray-700">
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/views/</code> - 页面组件
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/components/</code> - 通用组件
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/router/</code> - 路由配置
                      </li>
                      <li class="flex items-center">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <code class="bg-white px-2 py-1 rounded">src/shared/</code> - 工具函数
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义页面章节
const sections = ref([
  { id: 'features', title: '核心特性' },
  { id: 'architecture', title: '架构设计' },
  { id: 'plugins', title: '插件系统' },
  { id: 'tools', title: '开发工具' },
  { id: 'quickstart', title: '快速开始' },
  { id: 'structure', title: '项目结构' }
])

// 平滑滚动到指定章节
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
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

/* 响应式调整 */
@media (max-width: 768px) {
  .sticky {
    position: relative;
    top: 0;
  }
}
</style>

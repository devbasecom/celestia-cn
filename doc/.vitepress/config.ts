import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Celestia 中文社区",
  description: "模块化区块链 Celestia 中文开发者社区，由 DevBase 和 OpenBuild 发起",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "模块化101",
        link: "/concepts/how-celestia-works/introduction",
      },
      { text: "运行节点", link: "/nodes/overview" },
      { text: "开发文档", link: "/developers/overview" },
      { text: "社区RPC(soon)", link: "/community-rpc" },
      { text: "开发教程(soon)", link: "/dev-tutorial" },
    ],

    sidebar: {
      "/concepts/": [
        {
          text: "模块化101",
          items: [
            { text: "介绍", link: "/concepts/how-celestia-works/introduction" },
            {
              text: "单体vs模块化区块链",
              link: "/concepts/how-celestia-works/monolithic-vs-modular",
            },
            {
              text: "Celestia的 数据可用性层",
              link: "/concepts/how-celestia-works/data-availability-layer",
            },
          ],
        },
      ],
      "/nodes/": [
        {
          items: [
            {
              text: "概览",
              link: "/nodes/overview",
            },
          ],
        },
        {
          text: "网络",
          items: [
            {
              text: "Arabica devnet",
              link: "/nodes/arabica-devnet",
            },
          ],
        },
      ],
      "/developers/": [
        { text: "概览", link: "/developers/overview" },
        { text: "构建模块化", link: "/developers/build-modular" },
        {
          collapsed: false,
          text: "创建Celestia钱包",
          items: [{ text: "Keplr集成", link: "/developers/keplr" },
            { collapsed: false, text: "使用 celestia-app 创建钱包", link: "/developers/celestia-app-wallet",
              items: [{
                text: "使用 celestia-app 创建权益账户", link: "/developers/celestia-app-vesting"
              }]
            },
            { text: "使用 Celestia 节点创建钱包", link: "/developers/celestia-node-key" },
          ],
        },
        {
          collapsed: false,
          text: "节点 API",
          link: "/developers/node-api",
          items: [
              { text: "Celestia 节点 RPC CLI 教程", link: "/developers/node-tutorial" },
              { text: "Celestia 节点 API 文档", link: "https://node-rpc-docs.celestia.org/" },
              { collapsed: false, text: "网关 API",
              items: [{
                collapsed: false, text: "GPT \"提示\"猎人", link: "/developers/prompt-scavenger"
              }]
            },
          ],
        },
        {
          collapsed: false,
          text: "部署 Rollup",
          link: "/developers/node-api",
          items: [
            { text: "Rollkit", link: "/developers/rollkit" },
            { collapsed: false,text: "Optimism",items: [
                { text: "OP Stack 集成简介", link: "/developers/intro-to-op-stack" },
                { text: "Bub 测试网", link: "/developers/bubs-testnet" },
                { text: "基于 Bub 测试网部署智能合约", link: "/developers/deploy-on-bubs" },
                { text: "基于 Bub 测试网部署一个 DApp", link: "/developers/gm-portal-bubs" },
                { text: "使用 thirdweb 部署一个 DApp", link: "https://thirdweb.com/bubs-testnet" },
                { text: "部署一个 OP Stack 开发网", link: "/developers/optimism-devnet" },
                { text: "基于 Celestia 部署一个 OP Stack 测试网", link: "/developers/optimism" },
                { collapsed: false,text: "Rollups 即服务", items:[
                    { text: "Caldera", link: "https://caldera.xyz/" },
                  ] },
              ]},
            {
              text: "全栈模块化区块链开发指南", link: "/developers/full-stack-modular-development-guide"
            },
            {
              text: "IBC Relaying 指南", link: "/developers/ibc-relayer"
            },
            {
              text: "Sovereign SDK", link: "https://github.com/Sovereign-Labs/sovereign-sdk/tree/main/examples/demo-rollup#demo-rollup"
            },
            {
              text: "Dymension", link: "https://dymension.xyz"
            },
          ],
        },
        {
          text: "Celestia 开发案例展示", link: "/developers/demos"
        },
        {
          text: "Celestia 集成", link: "/developers/integrate-celestia"
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/devbasecom/celestia-cn" }],
  },
  ignoreDeadLinks: ["/development/build/fx"],
})

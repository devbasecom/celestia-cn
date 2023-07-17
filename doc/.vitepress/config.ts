import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Celestia China Community",
    description: "Celestia China Community, empowered by DevBase.dev",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: '模块化概念101', link: '/concepts/how-celestia-works/introduction'},
            {text: '开发文档', link: '/developer/README'},
            {text: '开发教程', link: '/markdown-examples'}
        ],

        sidebar: {
            '/concepts/': [
                {
                    text: '模块化概念101',
                    items: [
                        {text: '介绍', link: '/concepts/how-celestia-works/introduction'},
                        {text: '单体vs模块化区块链', link: '/concepts/how-celestia-works/monolithic-vs-modular.md'}
                    ]
                }],
            '/developer/': [
                {
                    text: '开发文档',
                    items: [
                        {text: '首页', link: '/developer/README'},
                    ]
                }],

        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/devbasecom/celestia-cn'}
        ]
    }
})

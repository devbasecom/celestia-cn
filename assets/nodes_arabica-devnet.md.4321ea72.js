import{A as e}from"./chunks/ArabicaVersionTags.64946889.js";import{o as r,c as t,J as c,l as i,U as a}from"./chunks/framework.1cfd022e.js";import"./chunks/constants.9fadf693.js";const o=a('<h1 id="arabica-devnet" tabindex="-1">Arabica devnet <a class="header-anchor" href="#arabica-devnet" aria-label="Permalink to &quot;Arabica devnet&quot;">​</a></h1><p><img src="https://docs.celestia.org/assets/images/arabica-devnet-d7ec894d41dfc56748cc565a7e1a5b91.png" alt="arabica-devnet"></p><p>Arabica Devnet 是 Celestia Labs 推出的一个全新的测试网，专注于为开发人员提供增强的性能和最新的升级，用于测试他们的 rollups 和应用程序。</p><p>Arabica 并不关注与验证器或共识级别的测试，这正是 Mocha Testnet 的用途。如果您是与验证器，我们建议您在<a href="https://docs.celestia.org/nodes/mocha-testnet/" target="_blank" rel="noreferrer"><code>Mocha</code></a>上测试您的与验证器操作。</p><p>由于 Arabica 部署了 Celestia 的所有产品的最新更新，它可能会经历很多变化。因此，作为一个公平的警告，Arabica 可能会出现意外中断，但鉴于它将持续更新，这是一种测试软件最新变化的有用方式。</p><p>开发人员仍然可以选择在 Mocha Testnet 上部署他们的自主 rollups，只是它会一直落后于 Arabica Devnet，直到 Mocha 与验证器协调进行硬分叉升级。</p><h2 id="软件版本号" tabindex="-1">软件版本号 <a class="header-anchor" href="#软件版本号" aria-label="Permalink to &quot;软件版本号&quot;">​</a></h2>',7),s=a('<h2 id="集成" tabindex="-1">集成 <a class="header-anchor" href="#集成" aria-label="Permalink to &quot;集成&quot;">​</a></h2><p>此指南包含了如何连接到 Arabica 的相关部分，具体取决于您运行的节点类型。</p><p>您参与的最佳方式是首先确定您想要运行的节点类型。每个节点指南都会链接到相应的页面，以向您展示如何连接到网络。</p><p>以下是您可以运行的节点类型选项，以参与 Arabica：</p><p>数据可用性：</p><ul><li><a href="https://docs.celestia.org/nodes/bridge-node/" target="_blank" rel="noreferrer">桥接节点</a></li><li><a href="https://docs.celestia.org/nodes/full-storage-node/" target="_blank" rel="noreferrer">完整存储节点</a></li><li><a href="https://docs.celestia.org/nodes/light-node/" target="_blank" rel="noreferrer">轻节点</a></li></ul><p>选择您想要运行的节点类型，并按照各自页面上的说明进行操作。在这些指南中，当要求您选择要连接的网络类型时，请选择<code>Arabica</code>， 以便参考本页面上有关如何连接到 Arabica 的正确说明。</p><h2 id="rpc-接入点" tabindex="-1">RPC 接入点 <a class="header-anchor" href="#rpc-接入点" aria-label="Permalink to &quot;RPC 接入点&quot;">​</a></h2><p>RPC 接入点用于允许用户通过查询节点状态和在 Celestia 网络上广播交易与 Celestia 节点进行交互。默认端口为 26657</p><p>以下是您可以使用的 RPC 接入点列表，用于连接到 Arabica Devnet:</p><ul><li><code>consensus-full-arabica-9.celestia-arabica.com</code></li></ul><h2 id="api-接入点" tabindex="-1">API 接入点 <a class="header-anchor" href="#api-接入点" aria-label="Permalink to &quot;API 接入点&quot;">​</a></h2><p>API 接入点用于允许用户通过 Cosmos SDK 中实现的 gRPC-gateway 与 REST API 进行交互，该 gRPC-gateway 将 gRPC 接入点暴露为 REST 接入点。这允许使用 REST 调用与节点进行通信，如果客户端不支持 gRPC 或 HTTP2，这将非常有用。其默认端口为 1317</p><p>以下是您可以使用的 API 接入点列表，用于连接到 Arabica Devnet</p><ul><li><a href="https://api-arabica-9.consensus.celestia-arabica.com/" target="_blank" rel="noreferrer"><code>https://api-arabica-9.consensus.celestia-arabica.com/</code></a></li><li><a href="https://api-2-arabica-9.consensus.celestia-arabica.com/" target="_blank" rel="noreferrer"><code>https://api-2-arabica-9.consensus.celestia-arabica.com/</code></a></li></ul><h2 id="grpc-接入点" tabindex="-1">gRPC 接入点 <a class="header-anchor" href="#grpc-接入点" aria-label="Permalink to &quot;gRPC 接入点&quot;">​</a></h2><p>gRPC 接入点用于允许用户使用 gRPC 与 Celestia 节点进行交互，gRPC 是一种现代开源且高性能的 RPC 框架。默认端口为 9090。在 Cosmos SDK 中，gRPC 用于定义状态查询和广播事务。</p><p>以下是您可以使用的 gRPC 接入点列表，用于连接到 Arabica Devnet：</p><ul><li><code>grpc-arabica-9.consensus.celestia-arabica.com:443</code></li><li><code>grpc-2-arabica-9.consensus.celestia-arabica.com:443</code></li></ul><h2 id="arabica-devnet-水龙头" tabindex="-1">Arabica devnet 水龙头 <a class="header-anchor" href="#arabica-devnet-水龙头" aria-label="Permalink to &quot;Arabica devnet 水龙头&quot;">​</a></h2><blockquote><p>使用此水龙头不会使您有权获得任何主网 Celestia 代币的空投或其他分发。当前并不存在主网 Celestia 代币，并且没有任何主网 Celestia 代币的公开销售或其他公开分发。</p></blockquote><h3 id="discord" tabindex="-1">Discord <a class="header-anchor" href="#discord" aria-label="Permalink to &quot;Discord&quot;">​</a></h3><p>您可以使用以下命令在 Celestia 的 Discord 服务器的 #arabica-faucet 频道上请求 Arabica Devnet 代币：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$request </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">CELESTIA-ADDRESS</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>在上述命令中，&quot;&lt;CELESTIA-ADDRESS&gt;&quot; 是一个生成的 celestia1****** 地址。</p><p>注意：水龙头对于每个地址/ Discord ID 每周有 10 个代币的限制。</p><h3 id="web-页面" tabindex="-1">Web 页面 <a class="header-anchor" href="#web-页面" aria-label="Permalink to &quot;Web 页面&quot;">​</a></h3><p>Web 水龙头可在以下网址访问：<a href="https://faucet-arabica-9.celestia-arabica.com/" target="_blank" rel="noreferrer"><code>https://faucet-arabica-9.celestia-arabica.com/</code></a>。</p><h2 id="区块浏览器" tabindex="-1">区块浏览器 <a class="header-anchor" href="#区块浏览器" aria-label="Permalink to &quot;区块浏览器&quot;">​</a></h2><p>您可以使用以下区块浏览器来查看 Arabica 的相关信息：</p><ul><li><a href="https://explorer-arabica-9.celestia-arabica.com/arabica-9" target="_blank" rel="noreferrer"><code>https://explorer-arabica-9.celestia-arabica.com/arabica-9</code></a></li></ul><h2 id="网络升级" tabindex="-1">网络升级 <a class="header-anchor" href="#网络升级" aria-label="Permalink to &quot;网络升级&quot;">​</a></h2><p>加入我们的 <a href="https://t.me/+smSFIA7XXLU4MjJh" target="_blank" rel="noreferrer">Telegram 公告频道</a>以获取网络升级的最新消息。</p>',33),_=JSON.parse('{"title":"Arabica devnet","description":"","frontmatter":{},"headers":[],"relativePath":"nodes/arabica-devnet.md","filePath":"nodes/arabica-devnet.md"}'),l={name:"nodes/arabica-devnet.md"},g=Object.assign(l,{setup(n){return(d,p)=>(r(),t("div",null,[o,c(i(e)),s]))}});export{_ as __pageData,g as default};

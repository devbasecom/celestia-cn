# Mocha测试网

![mocha-testnet](https://docs.celestia.org/assets/images/mocha-57e8627f3a1ad8d70c559a19553f439d.jpg)

本指南包含与Mocha测试网连接相关的部分，取决于您运行的节点类型。Mocha测试网旨在帮助验证者测试其基础设施和节点软件。开发者可以在Mocha上部署他们的主权侧链（sovereign rollups），但我们也推荐 [Arabica devnet](https://docs.celestia.org/nodes/arabica-devnet/) 用于开发目的。

Mocha是Celestia的一个重要里程碑，使每个人都可以测试网络上的核心功能。可以阅读公告：[Celestia Testnet Introduces Alpha Data Availability API](https://blog.celestia.org/celestia-testnet-introduces-alpha-data-availability-api)。您最好的参与方式是首先确定要运行的节点类型。每个节点指南都将链接到相应的网络，以向您展示如何连接到它们。

您可以选择运行以下类型的节点来参与Mocha：

共识节点：

* [Validator node, 验证者节点](https://docs.celestia.org/nodes/validator-node/)
* [Full consensus node, 完整共识节点](https://docs.celestia.org/nodes/full-consensus-node/)

数据可用性节点：

* [Bridge node, 桥节点](https://docs.celestia.org/nodes/bridge-node/)
* [Full storage node, 完整存储节点](https://docs.celestia.org/nodes/full-storage-node/)
* [Light node, 轻节点](https://docs.celestia.org/nodes/light-node/)

选择您想运行的节点类型，并按照每个相应页面上的指示进行操作。在这些指南中，当您被要求选择要连接的网络类型时，请选择 `Mocha` ，以便参考本页面上关于如何连接到Mocha的正确指示。

## 软件版本号

- Celestia Chain ID - [mocha-3](https://github.com/celestiaorg/networks/tree/master/mocha-3)
- Celestia Node - [v0.11.0-rc8](https://github.com/celestiaorg/celestia-node/releases/tag/v0.11.0-rc8)
- Celestia App - [v1.0.0-rc10](https://github.com/celestiaorg/celestia-app/releases/tag/v1.0.0-rc10)
- Rollkit - [currently not compatible](https://github.com/rollkit/rollkit/releases/tag/currently not compatible)

## RPC端点

RPC端点允许用户与Celestia的节点进行交互，查询节点的状态并广播交易到Celestia网络。默认端口为26657。

以下是您可以用于连接到Mocha测试网的RPC端点列表：

* `rpc-mocha.pops.one`
* `rpc.mocha.celestia.counterpoint.software`
* `celestia-testnet-rpc.itrocket.net`
* `celestia-testnet.rpc.kjnodes.com`
* `rpc-t.celestia.nodestake.top`
* `celestia.cumulo.org.es`
* `celestia-testnet-rpc.polkachu.com`
* `rpc.mocha-3.celestia.aviaone.com`
* `rpc-celestia-mocha3.architectnodes.com`
* `celestia-rpc.f5nodes.com`
* `rpc-celestia-testnet.mms.team`
* `celestia-testnet.nodejumper.io`

## API端点

API端点允许用户与Cosmos SDK中使用gRPC-gateway实现的REST API进行交互，gRPC-gateway将gRPC端点公开为REST端点。这允许通过REST调用与节点进行通信，这在客户端不支持gRPC或HTTP2时可能会很有用。默认端口为1317。

* [https://api-mocha.pops.one](https://api-mocha.pops.one)
* [https://api.mocha.celestia.counterpoint.software](https://api.mocha.celestia.counterpoint.software)
* [https://celestia-testnet-api.itrocket.net](https://celestia-testnet-api.itrocket.net:443)
* [https://celestia-testnet.api.kjnodes.com](https://celestia-testnet.api.kjnodes.com)
* [https://api-t.celestia.nodestake.top](https://api-t.celestia.nodestake.top)
* [https://celestia.api.cumulo.org.es](https://celestia.api.cumulo.org.es)
* [https://celestia-testnet-api.polkachu.com](https://celestia-testnet-api.polkachu.com)
* [https://api.mocha-3.celestia.aviaone.com](https://api.mocha-3.celestia.aviaone.com)
* [https://rest-celestia-mocha3.architectnodes.com](https://rest-celestia-mocha3.architectnodes.com)
* [https://celestia-api.f5nodes.com](https://celestia-api.f5nodes.com)
* [https://api-celestia-testnet.mms.team](https://api-celestia-testnet.mms.team)
* [https://celestia-testnet.nodejumper.io:1317](https://celestia-testnet.nodejumper.io:1317)

## gRPC端点

## gRPC端点

gRPC端点允许用户使用gRPC与Celestia节点交互，gRPC是一种现代开源高性能的RPC框架。默认端口为9090。在Cosmos SDK中，gRPC用于定义状态查询和广播交易。

- [https://grpc-mocha.pops.one](https://grpc-mocha.pops.one/)
- [https://grpc.mocha.celestia.counterpoint.software](https://grpc.mocha.celestia.counterpoint.software/)
- [https://celestia-testnet-grpc.itrocket.net:11090](https://celestia-testnet-grpc.itrocket.net:11090/)
- [https://celestia-testnet.grpc.kjnodes.com](https://celestia-testnet.grpc.kjnodes.com/)
- [https://grpc-t.celestia.nodestake.top](https://grpc-t.celestia.nodestake.top/)
- https://gprc.mocha-3.celestia.aviaone.com/
- [https://grpc-celestia-mocha3.architectnodes.com:1443](https://grpc-celestia-mocha3.architectnodes.com:1443/)
- [https://celestia.grpc.cumulo.org.es](https://celestia.grpc.cumulo.org.es/)
- [https://celestia-grpc.f5nodes.com](https://celestia-grpc.f5nodes.com/)
- [https://grpc-celestia-testnet.mms.team:12090](https://grpc-celestia-testnet.mms.team/)
- [https://celestia-testnet.nodejumper.io:9090](https://celestia-testnet.nodejumper.io:9090/)

## Mocha测试网水龙头

> 使用此水龙头不会让您获得任何主网Celestia代币的空投或其他分发。目前主网Celestia代币不存在，并且没有任何主网Celestia代币的公开销售或其他公开分发。

您可以在Celestia的Discord服务器上的#mocha-faucet频道中使用以下命令从Mocha测试网水龙头请求代币：

```
textCopy code
$request <CELESTIA-ADDRESS>
```

其中`<CELESTIA-ADDRESS>`是生成的`celestia1******`地址。

> 注意：水龙头每个地址/ Discord ID每周有10个代币的限制。

## 浏览器

您可以使用以下浏览器来查看Mocha测试网：

- https://testnet.mintscan.io/celestia-testnet
- https://celestia.explorers.guru/
- https://celestiascan.vercel.app/
- [https://explorer.nodestake.top/celestia-testnet/](https://explorer.nodestake.top/celestia-testnet)

## 网络升级

加入我们的[Telegram公告频道](https://t.me/+smSFIA7XXLU4MjJh)，以获取网络升级的最新消息。

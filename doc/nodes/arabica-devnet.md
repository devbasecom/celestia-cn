# Arabica devnet

<script setup>
import ArabicaVersionTags from '../../src/components/ArabicaVersionTags';
</script>

![arabica-devnet](https://docs.celestia.org/assets/images/arabica-devnet-d7ec894d41dfc56748cc565a7e1a5b91.png)

Arabica Devnet 是 Celestia Labs 推出的一个全新的测试网，专注于为开发人员提供增强的性能和最新的升级，用于测试他们的 rollups 和应用程序。

Arabica 并不关注与验证器或共识级别的测试，这正是 Mocha Testnet 的用途。如果您是与验证器，我们建议您在[`Mocha`](https://docs.celestia.org/nodes/mocha-testnet/)上测试您的与验证器操作。

由于 Arabica 部署了 Celestia 的所有产品的最新更新，它可能会经历很多变化。因此，作为一个公平的警告，Arabica 可能会出现意外中断，但鉴于它将持续更新，这是一种测试软件最新变化的有用方式。

开发人员仍然可以选择在 Mocha Testnet 上部署他们的自主 rollups，只是它会一直落后于 Arabica Devnet，直到 Mocha 与验证器协调进行硬分叉升级。

## 软件版本号

<ArabicaVersionTags />

## 集成

此指南包含了如何连接到 Arabica 的相关部分，具体取决于您运行的节点类型。

您参与的最佳方式是首先确定您想要运行的节点类型。每个节点指南都会链接到相应的页面，以向您展示如何连接到网络。

以下是您可以运行的节点类型选项，以参与 Arabica：

数据可用性：

- [桥接节点](https://docs.celestia.org/nodes/bridge-node/)
- [完整存储节点](https://docs.celestia.org/nodes/full-storage-node/)
- [轻节点](https://docs.celestia.org/nodes/light-node/)

选择您想要运行的节点类型，并按照各自页面上的说明进行操作。在这些指南中，当要求您选择要连接的网络类型时，请选择`Arabica`， 以便参考本页面上有关如何连接到 Arabica 的正确说明。

## RPC 接入点

RPC 接入点用于允许用户通过查询节点状态和在 Celestia 网络上广播交易与 Celestia 节点进行交互。默认端口为 26657

以下是您可以使用的 RPC 接入点列表，用于连接到 Arabica Devnet:

- `consensus-full-arabica-9.celestia-arabica.com`

## API 接入点

API 接入点用于允许用户通过 Cosmos SDK 中实现的 gRPC-gateway 与 REST API 进行交互，该 gRPC-gateway 将 gRPC 接入点暴露为 REST 接入点。这允许使用 REST 调用与节点进行通信，如果客户端不支持 gRPC 或 HTTP2，这将非常有用。其默认端口为 1317

以下是您可以使用的 API 接入点列表，用于连接到 Arabica Devnet

- [`https://api-arabica-9.consensus.celestia-arabica.com/`](https://api-arabica-9.consensus.celestia-arabica.com/)
- [`https://api-2-arabica-9.consensus.celestia-arabica.com/`](https://api-2-arabica-9.consensus.celestia-arabica.com/)

## gRPC 接入点

gRPC 接入点用于允许用户使用 gRPC 与 Celestia 节点进行交互，gRPC 是一种现代开源且高性能的 RPC 框架。默认端口为 9090。在 Cosmos SDK 中，gRPC 用于定义状态查询和广播事务。

以下是您可以使用的 gRPC 接入点列表，用于连接到 Arabica Devnet：

- `grpc-arabica-9.consensus.celestia-arabica.com:443`
- `grpc-2-arabica-9.consensus.celestia-arabica.com:443`

## Arabica devnet 水龙头

> 使用此水龙头不会使您有权获得任何主网 Celestia 代币的空投或其他分发。当前并不存在主网 Celestia 代币，并且没有任何主网 Celestia 代币的公开销售或其他公开分发。

### Discord

您可以使用以下命令在 Celestia 的 Discord 服务器的 #arabica-faucet 频道上请求 Arabica Devnet 代币：

```shell
$request <CELESTIA-ADDRESS>
```

在上述命令中，"\<CELESTIA-ADDRESS\>" 是一个生成的 celestia1**\*\*** 地址。

注意：水龙头对于每个地址/ Discord ID 每周有 10 个代币的限制。

### Web 页面

Web 水龙头可在以下网址访问：[`https://faucet-arabica-9.celestia-arabica.com/`](https://faucet-arabica-9.celestia-arabica.com/)。

## 区块浏览器

您可以使用以下区块浏览器来查看 Arabica 的相关信息：

- [`https://explorer-arabica-9.celestia-arabica.com/arabica-9`](https://explorer-arabica-9.celestia-arabica.com/arabica-9)

## 网络升级

加入我们的 [Telegram 公告频道](https://t.me/+smSFIA7XXLU4MjJh)以获取网络升级的最新消息。

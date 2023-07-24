# Bubs testnet

![](https://docs.celestia.org/assets/images/Celestia_Bubs_Testnet-832dc7aac96c45dba91b5151f52bbb8f.jpg)

[Bubs Testnet](https://bubstestnet.com/) 是 [Caldera](https://caldera.xyz/) 提供的最新服务，得到了 Celestia Labs 的支持，使用了 OP Stack 和 Celestia，并致力于为开发人员提供一个与 EVM 兼容的执行层，以便部署他们的 EVM 应用程序。

## 使用 OP Stack 和 Celestia 构建

Bubs Testnet 是一个测试网络 `rollup`，它是基于 `optimism-bedrock` 的修改版本，使用 Celestia 作为数据可用性（DA）层。这个集成可以在[这个仓库](https://github.com/celestiaorg/optimism)中找到。该测试网络由 [Caldera](https://caldera.xyz/) 托管，使得启动 rollup 变得简单，无需编写代码。

在这个设置中，数据处理有两种方式。首先，数据被写入 DA 层，即 Celestia（在 [`Arabica devnet`](../nodes/arabica-devnet.md) 上）。然后，数据凭证被写入 `op-batcher`。在读取时，`op-node` 首先从 `op-batcher` 读取数据凭证，然后通过使用数据凭证从 DA 层读取数据。因此，以前 `op-node` 是从以太坊的 `calldata` 中读取数据，但现在它从 Celestia 中读取数据。

参与数据处理过程的工具包括 `op-batcher`，它将 rollup 区块进行批处理并将其发布到以太坊上，`op-geth` 负责执行，而 `op-proposer` 负责提交状态凭证。

通过将 Celestia 作为 DA 层，现有的 L2 可以从将数据作为 `calldata` 发布到以太坊切换到发布到 Celestia。区块的凭证被发布在 Celestia 上，Celestia 专为数据可用性而构建。这比将数据作为 `calldata` 发布到单一链上的传统方法更具可扩展性。

## 在 Bubs 上开发

Bubs Testnet 为开发人员提供了一个强大的环境，用于测试他们的以太坊虚拟机（EVM）应用程序。它提供了一个与 EVM 兼容的执行层，使其成为开发人员构建和测试应用程序的理想平台，该平台与在 Celestia 上的 OP Stack Rollup 非常相似。

请访问 https://bubstestnet.com 了解更多信息。

### RPC URLs

RPC URL 是允许开发人员与区块链进行交互的接入点。它们对于发送交易、查询区块链数据以及执行其他与区块链的交互非常重要。

对于 Bubs Testnet，您可以连接到以下 RPC URL：

#### HTTPS

- `https://bubs.calderachain.xyz/http`

#### WSS

- `wss://bubs.calderachain.xyz/ws`

这个 URL 是 Bubs 测试网络的接入点。您可以在应用程序中使用它连接到测试网络，并与您在那里部署的智能合约进行交互。

请记住，`Bubs Testnet`是一个用于测试的环境！

### 水龙头

- `https://bubstestnet.com`

### 区块浏览器

- `https://explorer.bubstestnet.com/`

## 下一步

现在您对 Bubs 测试网络及其整合了 OP Stack 和 Celestia 的理解更加深入，您可以开始探索其功能：

- [在 Bubs testnet 上部署智能合约](./deploy-on-bubs.md)
- [在 Bubs testnet 上部署 GM Portal dapp](./gm-portal-bubs.md)
- [通过 Thirdweb 部署智能合约](https://thirdweb.com/bubs-testnet)

# OP Stack 集成简介

[Optimism](https://optimism.io/)是一个低成本且快速的以太坊第二层区块链，其采用了 [OP Stack](https://stack.optimism.io/) 构建。

[Celestia](https://celestia.org/) 是一个模块化的共识和数据网络，旨在使任何人都能轻松部署自己的区块链，并且开销最小化。

## 关于集成

_了解如何将现有的区块链框架（如 OP Stack）与 Celestia 集成在这个类别中。_
::: tip
在一台配备 8GB RAM、160GB SSD、Ubuntu 22.10 和 4 核 AMD CPU 的机器上进行测试。
:::
::: warning
这是一个**测试集成版本**，我们正在努力解决一些未解决的[问题](https://github.com/celestiaorg/optimism/issues)。当前此设置兼容的测试网络是 [Arabica devnet](../nodes/arabica-devnet.md/)。
:::

[Optimism](https://www.optimism.io/)使用以太坊作为数据可用性（DA）层。目前，Optimism 的结算和 DA 都在以太坊上，都是链上的。`op-batcher` 会将 Rollup 区块进行批处理，并发布到以太坊上。

### 该类别的目录如下

- [Bubs testnet](./bubs-testnet.md)
- [在 Bubs testnet 上部署智能合约](./deploy-on-bubs.md)
- [在 Bubs testnet 上部署 GM Portal dapp](./gm-portal-bubs.md)
- [部署 OP Stack devnet](./optimism-devnet.md/)
- [在 Celestia 上部署 OP Stack devnet](./optimism.md)

## Celestia / OP Stack 仓库

您可以在[这里](https://github.com/celestiaorg/optimism/)找到此集成的存储库，或者访问`https://github.com/celestiaorg/optimism`。

### Optimism 和 OP Stack 是什么？

Optimism 是一个以太坊第二层区块链，由 OP Stack 提供支持，OP Stack 也是致力于影响=利润（**`impact=profit`**）原则的 [Optimism Collective](https://app.optimism.io/announcement) 的基础。这个原则奖励个人对集体做出的积极贡献。

Optimism 解决了加密生态系统协调失败的问题，如资助公共产品和基础设施。OP Stack 通过创建一个共享的、开源的系统，在提议的 Superchain 生态系统中开发新的 L2 区块链，促进协作并防止冗余。

随着 Optimism 的发展，OP Stack 将适应包括区块链基础设施和治理系统在内的组件。这个软件套件旨在简化 L2 区块链的创建，并支持 Optimism 生态系统的增长和发展。

在[这里](https://www.optimism.io/)了解更多关于 Optimism 的信息。

### 什么是 Celestia？

Celestia 是一个模块化的共识和数据网络，旨在使任何人都能轻松部署自己的区块链，并且开销最小化。

Celestia 是一个最小化的区块链，只负责排序和发布交易，而不执行它们。通过将共识和应用执行层解耦，Celestia 模块化了区块链技术栈，并为去中心化应用程序构建者开启了新的可能性。在 [Celestia.org](https://celestia.org/) 上了解更多信息。

## OP Stack 和 Celestia

本类别将指导您如何使用修改后的 `optimism-bedrock` 版本在 Celestia 上启动自己的开发网络或测试网络。

数据的处理有两种方式。首先，数据被写入数据可用性（DA）层，即在这种情况下是 Celestia，然后数据凭证(`commitment`)被写入 `op-batcher`。在读取时，`op-node` 首先从 `op-batcher` 读取数据凭证，然后通过使用数据凭证从 DA 层读取数据。因此，以前 `op-node` 是从以太坊的 `calldata` 中读取数据，但现在它从 Celestia 中读取数据。

数据处理过程中涉及到几个工具。`op-batcher` 将 rollup 区块进行批处理，并将其发布到以太坊上。`op-geth` 处理执行，而 `op-proposer` 负责提交状态凭证。

通过将 Celestia 作为 DA 层，现有的 L2 可以从将数据作为 `calldata` 发布到以太坊切换到发布到 Celestia。区块的凭证被发布在 Celestia 上，Celestia 专为数据可用性而构建。这比将数据作为 `calldata` 发布到单一链上的传统方法更具可扩展性。

如果您想进行模块化，bedrock 已经使其易于替换！

## 下一步

既然您了解了这个集成，您可以开始了解使用 OP Stack 和 Celestia 构建的[Bubs testnet](https://docs.celestia.org/developers/bubs-testnet/)！这个测试网络是探索这个集成的可能性并在实际环境中测试您的应用程序的绝佳方式。

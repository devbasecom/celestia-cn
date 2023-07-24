# Rollkit

![](https://docs.celestia.org/assets/images/rollkit-a3c303985129391d591d82877628422a.png)

[Rollkit](https://rollkit.dev/)是一个为自主 Rollup 部署在 Celestia 上的 ABCI（Application Blockchain Interface）实现。

它通过将 Cosmos-SDK 共识层中的 Tendermint 替换为一个可直接与 Celestia 的数据可用性层通信的替代组件来构建。

Rollkit 启动了一个自主 Rollup，将交易收集到区块中，并将其提交到 Celestia 进行共识和数据可用性。

Rollkit 的目标是使任何人都能够在几分钟内设计和部署一个在 Celestia 上运行的自主 Rollup 。

此外，虽然 Rollkit 允许你在 Celestia 上构建自主 Rollup，但它目前尚不支持欺诈证明，因此在“悲观”模式下运行，节点需要重新执行交易以检查链的有效性（即全节点）。此外，Rollkit 目前仅支持单个排序器。

## 教程

下列教程将帮助你开始构建与 Celestia 的数据可用性层通过 Rollkit 连接的 Cosmos-SDK 应用程序。我们将这些链称为自主 Rollup。

你可以从以下教程开始：

- [Hello world](https://rollkit.dev/docs/tutorials/hello-world)
- [GM world](https://rollkit.dev/docs/tutorials/gm-world)
- [Recipe book](https://rollkit.dev/docs/tutorials/recipe-book)
- [Wordle game](https://rollkit.dev/docs/tutorials/wordle)
- [CosmWasm tutorial](https://rollkit.dev/docs/tutorials/cosmwasm)
- [Ethermint tutorial](https://rollkit.dev/docs/tutorials/ethermint)
- [Full stack modular blockchain development guide](https://docs.celestia.org/developers/full-stack-modular-development-guide/)

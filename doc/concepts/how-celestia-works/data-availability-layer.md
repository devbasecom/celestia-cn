# Celestia的 数据可用性层

Celestia是一个数据可用性（DA）层，它提供了一个可扩展的解决方案来应对[数据可用性问题](https://coinmarketcap.com/alexandria/article/what-is-data-availability)。<!--the [data availability problem](https://coinmarketcap.com/alexandria/article/what-is-data-availability).-->由于区块链网络无需许可的天然特性，一个数据可用性层需要给执行层和结算层提供一种信任最小化机制<!-- the execution and settlement layers -->，以确认交易数据确实可用。

Celestia的数据可用性（DA）层有两个关键特性，分别是[“数据可用性抽样”](https://blog.celestia.org/celestia-mvp-release-data-availability-sampling-light-clients)（Data Availability Sampling，DAS）和[“命名空间默克尔树”](https://github.com/celestiaorg/nmt)（Namespaced Merkle trees，NMTs）。这两个特性都是新颖的区块链扩展性问题解决方案<!-- are novel blockchain scaling solutions-->：DAS使轻节点能够在无需下载整个区块的情况下验证数据的可用性；NMTs使得Celestia上的执行层和结算层可以下载仅与它们相关的交易，而不必处理无关的交易数据，从而提高了整体性能和效率。

## 数据可用性抽样(DAS)

一般情况下，轻节点只下载包含区块数据的承诺<!-- 承诺（commitments）是一种哈希值，用于表示区块中的交易数据。-->（即默克尔根）的区块头部。

为了实现DAS（数据可用性抽样），Celestia使用了二维Reed-Solomon编码方案<!-- Reed-Solomon encoding scheme Celestia使用二维Reed-Solomon编码方案来编码区块数据，主要是为了实现DAS功能。DAS允许轻节点只下载包含数据承诺的区块头部，而不需要下载整个区块，从而节省带宽和存储空间-->来对区块数据进行编码：每个区块数据被分割成k × k个块，排列成一个k × k的矩阵，并通过多次应用Reed-Solomon编码，将其扩展为一个2k × 2k的扩展矩阵，同时加入奇偶校验数据<!--"Parity data"（奇偶校验数据）是指通过一种冗余校验方法生成的额外数据，用于在数据传输或存储中检测和纠正错误。在计算机科学和数据存储中，奇偶校验是一种简单的容错机制。它通过对一组数据进行计算，生成一个奇偶位（通常是一个额外的比特位），并将其添加到原始数据中。生成的奇偶位的值取决于原始数据位的奇偶性。 -->。

然后，针对扩展矩阵的行和列分别计算了4k个不同的Merkle根；而这些Merkle根的Merkle根被用作区块头部中的区块数据承诺。

![https://docs.celestia.org/assets/images/reed-solomon-encoding-5e807cd199f4aaac4cb0f9aef83446a4.png](https://celestia-cn-1259776727.cos.ap-shanghai.myqcloud.com/doc/reed-solomon-encoding-5e807cd199f4aaac4cb0f9aef83446a4.png)

为了验证数据是否可用，Celestia轻节点对2k × 2k的数据块进行抽样<!--sampling 数据抽样 -->。
每个轻节点会随机选择一组唯一的坐标，然后向全节点查询这些坐标处的数据块和对应的Merkle证明。如果轻节点对每个抽样查询都收到有效的响应，那么就能以[高概率地保证](https://github.com/celestiaorg/celestia-node/issues/805#issuecomment-1150081075)整个区块的数据是可用的。

另外，每个收到带有正确Merkle证明的数据块都会在网络中广播<!-- gossiped to the network-->。因此，只要Celestia轻节点共同抽样足够的数据块（即至少k × k个唯一的数据块），那么诚实的全节点就能够通过这些数据块来完整地恢复整个区块的数据。

对于更多关于DAS的细节，请参阅[原始论文](https://arxiv.org/abs/1809.09044)。



## 可拓展性

DAS使Celestia能够扩展数据可用性（DA）层。由于每个轻节点只对区块数据进行小样本抽样，因此DAS可以由资源有限的轻节点执行。网络中轻节点的数量越多，它们能够共同下载和存储的数据也就越多。

这意味着增加执行DAS的轻节点数量可以支持更大的区块（即包含更多交易），同时仍保持对资源有限的轻节点来说是可行的。然而，为了验证区块头部，Celestia轻节点需要下载4k个中间Merkle根。

对于一个区块数据大小为 $n^2$ 字节的情况，这意味着每个轻节点必须下载 O(n) 字节。因此，如果Celestia轻节点的带宽容量<!--bandwidth capacity  -->得到改进，那么将会对整个Celestia的数据可用性层（DA layer）的吞吐量<!--throughput -->产生二次效应（呈指数级 $n^2$ 的）<!--  a quadratic effect on-->，即使得整个系统的性能大幅提升。


## 错误生成扩展数据<!--incorrectly extended data -->的欺诈证明<!--Fraud proofs -->

使用二维Reed-Solomon编码方案后产生的结果，就是需要轻节点下载4k个中间Merkle根来验证区块头部，这会对带宽产生较大的负担。作为替代，DAS可以使用标准（即一维）Reed-Solomon编码来设计，其中原始数据被分割成k个块，并且加上k个额外的奇偶校验块。由于区块数据承诺是这2k个数据块的Merkle根，轻节点就不再需要下载O(n)字节来验证区块头部。

然而，使用标准Reed-Solomon编码的缺点在于处理恶意区块生产者<!-- dealing with malicious block producers-->。如果恶意区块生产者生成扩展数据时出现错误或篡改，轻节点可能无法正确验证区块的数据完整性，从而可能导致欺诈或错误的数据得以传播。 

因为Celestia不需要共识（即区块生产者）的大多数是诚实的，来保证数据的可用性。因此，如果扩展数据是无效的，即使轻节点抽样了足够数量的唯一数据块（对于标准编码至少是k个，对于二维编码是k × k个），原始数据也可能无法恢复。

作为解决方案，错误生成扩展数据的欺诈证明使得轻节点可以拒绝包含无效扩展数据的区块。这些证明需要重新构建编码并验证不匹配之处。使用标准的Reed-Solomon编码，这意味着需要下载原始数据，即 $n^2$  字节。而使用二维Reed-Solomon编码，只需要O(n)字节，因为仅需要验证扩展矩阵的一行或一列即可。

<!-- 通过引入这种欺诈证明机制，Celestia增强了数据的完整性和网络的安全性，确保数据可用性，并有效地应对了可能存在的恶意行为。-->

## 命名空间 Merkle 树(NMTs)

Celestia将区块数据分区为多个命名空间，每个应用程序（例如，rollup）都使用DA层。因此，每个应用程序只需要下载自己的数据，并可以忽略其他应用程序的数据。

为了实现这一点，DA层必须能够证明提供的数据是完整的，即返回了给定命名空间的所有数据。为此，Celestia使用了命名空间 Merkle 树 (NMTs)。

命名空间 Merkle 树 (NMTs) 是一种Merkle树，其叶子节点按命名空间标识符进行排序，并且哈希函数被修改，使得树中的每个节点都包含其所有子节点的命名空间范围。下图是一个示例，展示了一个高度为3（即八个数据块）的命名空间 Merkle 树。数据被分为三个命名空间。

![https://docs.celestia.org/assets/images/nmt-e0e70f4a26315a006b2c62bb3753fe4f.png](https://celestia-cn-1259776727.cos.ap-shanghai.myqcloud.com/doc/nmt-e0e70f4a26315a006b2c62bb3753fe4f.png)

当一个应用程序请求命名空间2的数据时，DA层必须提供数据块D3、D4、D5和D6，以及节点N2、N8和N7作为证明（注意，应用程序已经有了来自区块头部的根节点N14）。

因此，应用程序能够检查所提供的数据是否是区块数据的一部分。此外，应用程序可以验证命名空间2的所有数据是否都被提供。如果DA层仅提供数据块D4和D5，它还必须提供节点N12和N11作为证明。然而，应用程序可以通过检查这两个节点的命名空间范围来识别数据是否不完整，即N12和N11都有属于命名空间2的子节点。

通过这种方式，应用程序可以验证所提供的数据是否完整，并确保它是属于所请求的特定命名空间的。这样的验证过程有助于确保数据的完整性和准确性，防止恶意行为或数据的篡改。

要了解更多关于命名空间 Merkle 树（NMTs）的细节，请查阅[原始论文](https://arxiv.org/abs/1905.09274)。

## 构建DA层的PoS区块链

### 支持数据可用性

Celestia的DA层由一个PoS区块链构成。Celestia将这个区块链称作<!-- dubbing-->"celestia-app"，它是一个应用程序，用于提供交易以促进DA层，并且它是使用Cosmos SDK构建的。下图展示了"celestia-app"的主要组件。

![https://docs.celestia.org/assets/images/celestia-app-dade9feedac983fdbc5336fc713f2a3a.png](https://celestia-cn-1259776727.cos.ap-shanghai.myqcloud.com/doc/celestia-app-dade9feedac983fdbc5336fc713f2a3a.png)

"celestia-app" 是建立在 "celestia-core" 之上的，"celestia-core" 是 [Tendermint共识算法](https://arxiv.org/abs/1807.04938) 的优化版本。与标准Tendermint共识算法<!--vanilla Tendermint -->相比，celestia-core进行了以下重要更改：

- 实现了区块数据的纠删码编码<!-- erasure coding" 是一种数据编码技术-->（使用2维Reed-Solomon编码方案）。
- 将Tendermint中用于存储区块数据的常规Merkle树<!--  the regular Merkle tree-->替换为[命名空间Merkle树](https://github.com/celestiaorg/nmt)，以实现上述层（即执行和结算层）只下载所需的数据（更多详情，请参阅下面描述用例的部分）。

要了解有关对 Tendermint 的更改的更多详细信息，请查阅[ADRs（架构设计决策记录）](https://github.com/celestiaorg/celestia-core/tree/v0.34.x-celestia/docs/celestia-architecture)。值得注意的是，celestia-core节点仍然使用Tendermint的p2p网络。
与Tendermint类似，celestia-core通过[ABCI++](https://github.com/tendermint/tendermint/tree/master/spec/abci%2B%2B)与应用层（即状态机）相连接，ABCI++是[ABCI（应用区块链接口）](https://github.com/tendermint/tendermint/tree/master/spec/abci)的一个重要优化版。

celestia-app状态机是一个用于执行PoS逻辑和管理DA层的关键组件。它负责验证PoS共识和处理相关的区块数据。但是，需要注意的是，celestia-app是数据无关的<!--data-agnostic -->，其本身不验证也不存储由celestia-app提供的具体数据，它只负责执行共识算法和处理交易，而实际的数据验证和存储是在celestia-core层进行的。







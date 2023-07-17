# 前言

`Celestia`是一个模块化的区块链网络，旨在构建可扩展的[数据可用性层](https://blog.celestia.org/celestia-a-scalable-general-purpose-data-availability-layer-for-decentralized-apps-and-trust-minimized-sidechains/)。从而实现下一代可扩展区块链架构-[模块化区块链](https://celestia.org/learn/)。`Celestia`通过将[执行与共识解耦](https://arxiv.org/abs/1905.09274)并引入一种新的原语-[数据可用性采样](https://arxiv.org/abs/1809.09044)来实现扩展。

前者意味着`Celestia`仅负责交易的排序和确保其数据可用性。这类似于将共识简化为[原子广播](https://en.wikipedia.org/wiki/Atomic_broadcast#Equivalent_to_Consensus)。

后者为[数据可用性问题](https://coinmarketcap.com/alexandria/article/what-is-data-availability)提供了一种高效的解决方案，其通过要求资源有限的轻节点从每个区块中随机抽样一小部分数据块来验证数据可用性。

有趣的是，参与抽样的轻节点越多，网络可以安全处理的数据量就越大，从而使区块大小能够增加，但是不会等量的增加验证链的成本。

# 在 Bubs testnet 上部署 dapp

首先，仔细阅读[Bubs testnet](./bubs-testnet.md)页面和“[在 Bubs testnet 上部署智能合约](./deploy-on-bubs.md)”教程。

**在部署智能合约之前，您需要一个有资金的账户。**

接下来，从 Github 克隆 `gm-portal` 并启动前端：

```sh
cd $HOME
git clone https://github.com/jcstein/gm-portal.git
cd gm-portal/frontend
yarn && yarn dev
```

在新的终端窗口中，将您的 faucet 的私钥和您使用的 RPC URL 设置为环境变量：

```sh
export PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export BUBS_RPC_URL=https://bubs.calderachain.xyz/http
```

现在，使用同一个终端切换到 `gm-portal/contracts` 目录，并使用 Foundry 部署合约：

```sh
cd $HOME/gm-portal/contracts
forge script script/GmPortal.s.sol:GmPortalScript --rpc-url $BUBS_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

![](https://docs.celestia.org/assets/images/gm_contract-9111b4b1d037bf80d66ecc56e3c2583a.png)

在部署输出中找到合约地址，并将其设置为一个变量：

```sh
export CONTRACT_ADDRESS=<您在上面输出中获取到的合约地址>
```

接下来，您可以从终端与合约进行交互！

首先，向合约发送一个“gm”：

```sh
cast send $CONTRACT_ADDRESS \
"gm(string)" "gm" \
--private-key $PRIVATE_KEY \
--rpc-url $BUBS_RPC_URL
```

现在，您已经向合约发送了一个“gm”，您可以使用以下命令读取合约中的所有“gm”（GMs）：

```sh
cast call $CONTRACT_ADDRESS "getAllGms()" --rpc-url $BUBS_RPC_URL
```

接下来，查询所有 gm 的总数，它将以十六进制值返回：

```sh
cast call $CONTRACT_ADDRESS "getTotalGms()" --rpc-url $BUBS_RPC_URL
```

为了在前端与合约进行交互，您需要给您在以太坊钱包中的账户充值。使用以下命令将资金转移到外部账户：

```sh
export RECEIVER=<receiver ETH address>
cast send --private-key $PRIVATE_KEY $RECEIVER --value 1ether --rpc-url $BUBS_RPC_URL
```

如果您在与设置私钥的终端不同的终端上操作，您可能需要再次设置私钥。

## 更新前端页面

接下来，在您可以在前端与合约进行交互之前，您需要更新一些内容：

- 将 `gm-portal/frontend/src/App.tsx` 中的合约地址更改为您的合约地址。
- 在 `gm-portal/frontend/src/main.tsx` 中匹配您的 L2 链的链信息配置。
- 如果您更改了合约，请从 `gm-portal/contracts/out/GmPortal.sol/GmPortal.json` 更新 `gm-portal/frontend/GmPortal.json` 中的 ABI。您可以通过以下方式完成更新：

```sh
cd $HOME
cp dev/gm-portal/contracts/out/GmPortal.sol/GmPortal.json dev/gm-portal/frontend
```

## 与前端页面交互

现在，请使用您充值资金的以太坊钱包登录，并在您的`GM portal`上发布一条 GM！
![](https://docs.celestia.org/assets/images/gm_bubs-784564e670c1b52b1af9a250b4a7d113.png)

## 下一步

使用这个技术栈可以构建许多不同的项目。以下是一些适合使用这个技术栈构建的项目：

- 链上游戏
- 去中心化社交媒体
- NFT 门票 rollup
- 在 Celestia 上使用 Optimism
- 在 Celestia 上构建 OP Craft

# Keplr 与 Celestia 的集成

<script setup>
  import constants from "../../src/versions/constants.js";

  import AddNetworkKeplr from '../../src/components/AddNetworkKeplr';

  const ARABICA_PARAMS = {
    chainId: `${constants.arabicaChainId}`,
    chainName: 'Arabica Devnet',
    rpc: 'https://consensus-full-arabica-9.celestia-arabica.com/',
    rest: 'https://api-arabica-9.consensus.celestia-arabica.com/'
  }

  const MOCHA_PARAMS = {
    chainId: `${constants.mochaChainId}`,
    chainName: 'Mocha Testnet',
    rpc: 'https://rpc-mocha.pops.one',
    rest: 'https://api-mocha.pops.one'
  }

  const BLOCKSPACERACE_PARAMS = {
    chainId: 'blockspacerace',
    chainName: 'Blockspace Race Testnet',
    rpc: 'https://rpc-blockspacerace.pops.one',
    rest: 'https://api-blockspacerace.pops.one'
  }
</script>

Keplr 是一款流行的基于 Cosmos 的钱包，允许任何人通过浏览器连接到 Tendermint 链。

您可以在[这里](https://www.keplr.app/download)了解更多有关安装 Keplr 的信息。

在本教程中，我们将进行一个交互式演示，介绍如何将 Celestia 网络参数添加到 Keplr 中。

大部分集成的概述可以在 Keplr 的网站上找到，点击[这里](https://docs.keplr.app/api)。

为了进行我们的演示，我们将 Keplr 文档中的代码转换为 React 组件，以演示如何在文档内部将 Celestia 网络添加到 Keplr 中。

## 将 Celestia 网络添加到 Keplr

在我们演示如何导出 Celestia 测试网的特定参数之前，我们需要创建一个 ReactJS 组件，用于直接连接到 Keplr 并将网络参数传递给它。

在下面的代码中，我们展示了如何导出一个组件，该组件检测 Keplr 是否已安装并为其设置网络参数：

```jsx
import React from "react"
import styles from "./Keplr.module.css"

export default function AddNetworkKeplr({ params }) {
  async function add() {
    if (!window.keplr) {
      alert("Please install keplr extension")
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: params.chainId,
            chainName: params.chainName,
            rpc: params.rpc,
            rest: params.rest,
            bip44: {
              coinType: 118,
            },
            bech32Config: {
              bech32PrefixAccAddr: "celestia",
              bech32PrefixAccPub: "celestia" + "pub",
              bech32PrefixValAddr: "celestia" + "valoper",
              bech32PrefixValPub: "celestia" + "valoperpub",
              bech32PrefixConsAddr: "celestia" + "valcons",
              bech32PrefixConsPub: "celestia" + "valconspub",
            },
            currencies: [
              {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
              },
            ],
            feeCurrencies: [
              {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
                gasPriceStep: {
                  low: 0.01,
                  average: 0.025,
                  high: 0.04,
                },
              },
            ],
            stakeCurrency: {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
            },
          })
        } catch {
          alert("Failed to suggest the chain")
        }
      }
      const chainId = params.chainId
      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      await window.keplr.enable(chainId)
    }
  }

  return (
    <div className={styles.center}>
      <button className={styles.keplrButton} onClick={add}>
        Add/Switch To {params.chainName}
      </button>
    </div>
  )
}
```

这个示例仅用于使用 Celestia 的配置信息。

我们仍然需要为它传递 Celestia 的网络参数。

在下一节中，我们将为两个测试网络进行配置。

您还可以测试`Connect`按钮，将这些参数添加到您的 Keplr 钱包中。注意：您必须先安装 Keplr 插件。

<tabs>
<tab name="Blockspace Race">

这里有一个演示按钮，可以让你添加 blockspace race testnet 到 Keplr

试试看:
<AddNetworkKeplr :params=BLOCKSPACERACE_PARAMS />

在这个场景中这是我们传递给`AddNetworkKeplr`函数的参数：

```js
import '@site/src/components/AddNetworkKeplr'

export const BLOCKSPACERACE_PARAMS = {
  chainId: 'blockspacerace',
  chainName: 'Blockspace Race Testnet',
  rpc: 'https://rpc-blockspacerace.pops.one',
  rest: 'https://api-blockspacerace.pops.one'
}

<AddNetworkKeplr params={BLOCKSPACERACE_PARAMS}/>
```

</tab>

<tab name="Mocha">

这里有一个演示按钮，可以让你添加 Mocha Testnet 到 Keplr

试试看:
<AddNetworkKeplr :params=MOCHA_PARAMS />

在这个场景中这是我们传递给`AddNetworkKeplr`函数的参数：

```js
import '@site/src/components/AddNetworkKeplr'

export const MOCHA_PARAMS = {
  chainId: 'mocha-3',
  chainName: 'Mocha Testnet',
  rpc: 'https://rpc-mocha.pops.one',
  rest: 'https://api-mocha.pops.one/'
}

<AddNetworkKeplr params={MOCHA_PARAMS}/>
```

</tab>

<tab name="Arabica 🏗️">

这里有一个演示按钮，可以让你添加 Arabica Devnet 到 Keplr

试试看:
<AddNetworkKeplr :params=ARABICA_PARAMS />

在这个场景中这是我们传递给`AddNetworkKeplr`函数的参数：

```js
import '@site/src/components/AddNetworkKeplr'

export const ARABICA_PARAMS = {
  chainId: 'arabica-9',
  chainName: 'Arabica Devnet',
  rpc: 'https://consensus-full-arabica-9.celestia-arabica.com/',
  rest: 'https://api-arabica-9.consensus.celestia-arabica.com/'
}

<AddNetworkKeplr params={ARABICA_PARAMS}/>
```

</tab>
</tabs>

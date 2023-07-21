import constants from "../versions/constants.js"

import blockspaceraceVersions from "../versions/blockspacerace_versions.js"
import mochaVersions from "../versions/mocha_versions.js"
import arabicaVersions from "../versions/arabica_versions.js"

export const InstallCelestiaNode = ({ networkName, platform }) => {
  const target = platform === "apple" ? "go-install" : "install"
  var appVersion = "unknown"
  const lowerNetworkName = networkName.toLowerCase()
  if (lowerNetworkName === "blockspace race") {
    appVersion = blockspaceraceVersions["node-latest-tag"]
  } else if (lowerNetworkName === "mocha") {
    appVersion = mochaVersions["node-latest-tag"]
  } else if (lowerNetworkName === "arabica") {
    appVersion = arabicaVersions["node-latest-tag"]
  }
  return (
    <div>
      <p>
        安装特定版本的<code>celestia-node</code>以运行<code>{networkName}</code>网络。
      </p>
      <p>
        通过运行以下命令安装<code>celestia-node</code>二进制文件：
      </p>

      <pre>
        <code>
          cd $HOME
          <br />
          rm -rf celestia-node
          <br />
          git clone https://github.com/celestiaorg/celestia-node.git
          <br />
          cd celestia-node/
          <br />
          git checkout tags/{appVersion}
          <br />
          make build
          <br />
          make {target}
          <br />
          make cel-key
          <br />
        </code>
      </pre>
    </div>
  )
}

export const ConnectCelestiaNode = ({}) => {
  return (
    <div width="1200">
      <p>
        现在，让我们使用<code>GRPC</code>连接到一个示例的公共核心节点端点来运行<code>Celestia</code> 轻节点。
      </p>
      <blockquote>
        注意：我们也鼓励您寻找由社区运行的<code>API 接入点</code>，在<code>Discord</code>
        上有几个可用。此处提供的端点仅用于演示目的。您可以在此处找到<code>RPC接入点</code>的列表。
      </blockquote>
    </div>
  )
}

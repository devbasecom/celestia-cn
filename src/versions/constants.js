import arabicaVersions from "./arabica_versions"
import blockspaceraceVersions from "./blockspacerace_versions"
import mochaVersions from "./mocha_versions"

const networkBlockspaceRace = {
  name: "blockspacerace",
  fullName: "Blockspace Race",
  versions: blockspaceraceVersions,
}
const networkMocha = {
  name: "mocha",
  fullName: "Mocha",
  versions: mochaVersions,
}

const networkArabica = {
  name: "arabica",
  fullName: "Arabica 🏗️",
  versions: arabicaVersions,
}

const constants = Object.freeze({
  golangNodeBSR: "1.20.2",
  golangNodeMocha: "1.20.2",
  golangNodeArabica: "1.20.2",
  golangApp: "1.20.2",
  golangCore: "1.20.2",
  golang: "1.20.2",
  arabicaChainId: "arabica-9",
  bsrChainId: "blockspacerace-0",
  mochaChainId: "mocha-3",
  arabicaRollkitVersion: "v0.9.0",
  mochaRollkitVersion: "currently not compatible",
  bsrRollkitVersion: "v0.8.1",
  localCelestiaDevnetVersion: "v0.8.2",
  golangQGB: "1.20.2",
  orchrelayVersion: "v0.2.0-app-v0.13.2-beta",
  networkBlockspaceRace,
  networkMocha,
  networkArabica,
  allNetwork: [networkBlockspaceRace, networkMocha, networkArabica],
})

export default constants

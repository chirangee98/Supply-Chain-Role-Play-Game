
// require('@nomiclabs/hardhat-ethers');
// require('dotenv').config(); // Load environment variables

// module.exports = {
//     solidity: '0.8.0', // Adjust Solidity version if needed
//     networks: {
//         sepolia: {
//             url: "https://sepolia.infura.io/v3/acdfe3b85bed4759867d0ba4ce3e5ac0", // Replace with your Infura Sepolia URL
//             accounts: ["0x9dbA774eeC580b4E9059bb6F9A9C13C5d5BA3e32"], // Replace with your MetaMask private key for a test account
//         },
//     },
// };


module.exports = {
    defaultNetwork: "sepolia",
    networks: {
      hardhat: {
      },
      sepolia: {
        url: "https://sepolia.infura.io/v3/acdfe3b85bed4759867d0ba4ce3e5ac0",
        accounts: ["0x9dbA774eeC580b4E9059bb6F9A9C13C5d5BA3e32"]
      }
    },
    solidity: {
      version: "0.8.24",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 40000
    }
  }
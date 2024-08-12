import { useContext } from "react"
import { ethers, solidityPackedKeccak256, getBytes, Signature } from "ethers"

import { MetamaskContext } from "../providers/MetamaskProvider"

import { abi } from '../helpers/contract.json'
import { CONTRACT_ADDRESS } from "../helpers/env"

export function useMetamask() {

    const {
        signer,
        setSigner,
        contract,
        setContract,
        account,
        setAccount,
        setProvider
    } = useContext(MetamaskContext)

    async function connectMetaMask() {
        let newProvider
        let newSigner
        let newContract
        if (window.ethereum == null) {
            console.log("MetaMask not installed. Using read-only defaults.")
            newProvider = ethers.getDefaultProvider()
        } else {
            newProvider = new ethers.BrowserProvider(window.ethereum)
            newSigner = await newProvider.getSigner()
            newContract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner)
            setSigner(newSigner)
            setContract(newContract)
            setAccount(newSigner.address)
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        setProvider(newProvider)
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
            }
        }
    }

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0 && accounts[0] !== account) {
            const newProvider = new ethers.BrowserProvider(window.ethereum)
            const newSigner = await newProvider.getSigner()
            const newContract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner)
            setProvider(newProvider)
            setSigner(newSigner)
            setContract(newContract)
            setAccount(accounts[0])
        }
    }

    async function getTransactionSignature(amount) {
        try {
            const nonce = await contract.getNonce(account);
            const hash = solidityPackedKeccak256(
                ["address", "string", "uint256"],
                [account, amount, nonce]
            );
            const messageHash = solidityPackedKeccak256(
                ["string", "bytes32"],
                ["\x19Ethereum Signed Message:\n32", hash]
            );
            const signature = await signer.signMessage(getBytes(messageHash));
            const { r, s, v } = Signature.from(signature)
            return { r, s, v };
        } catch (err) {
            console.error("Error signing transaction:", err);
        }
    }

    return { connectMetaMask, getTransactionSignature }
}
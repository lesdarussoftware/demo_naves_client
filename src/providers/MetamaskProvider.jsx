import { createContext, useState } from "react"

export const MetamaskContext = createContext({
    account: null,
    setAccount: () => { },
    provider: null,
    setProvider: () => { },
    signer: null,
    setSigner: () => { },
    contract: null,
    setContract: () => { }
})

export function MetamaskProvider({ children }) {

    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    return (
        <MetamaskContext.Provider value={{
            account,
            setAccount,
            provider,
            setProvider,
            signer,
            setSigner,
            contract,
            setContract
        }}>
            {children}
        </MetamaskContext.Provider>
    )
}
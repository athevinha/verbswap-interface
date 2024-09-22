"use client"
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { OKXWallet } from '@okwallet/aptos-wallet-adapter';
import { PropsWithChildren } from 'react';
import { Network } from "@aptos-labs/ts-sdk";

export const Web3AptosWalletProvider = ({ children }: any) => {
  const wallets = [new OKXWallet()];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect
      dappConfig={{ network: Network.MAINNET }}
      onError={(error) => {
        console.log('error', error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

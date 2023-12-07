import { ConnectWallet, useAddress, useUser } from '@thirdweb-dev/react';

export default function Third() {
  const { user, isLoggedIn, isLoading } = useUser();
  const address = useAddress();

  return (
    <>
      <ConnectWallet btnTitle="Login" />
      <div>{JSON.stringify(address)}</div>
    </>
  );
}

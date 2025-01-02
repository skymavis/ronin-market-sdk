export interface Addresses {
  ethereum: string | null;
  ronin: string | null;
}

export interface PublicProfile {
  accountId: string;
  addresses: Addresses;
  activated: boolean;
  name: string | null;
}

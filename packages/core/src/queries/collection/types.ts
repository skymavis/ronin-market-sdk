import { PublicProfile } from '../profile';
import { AttributeType } from '../token';

export enum Erc {
  Erc1155 = 'Erc1155',
  Erc20 = 'Erc20',
  Erc721 = 'Erc721',
}

export interface CollectionData {
  tokenAddress: string;
  collectionMetadata: CollectionMetadata;
  totalVolume: string | null;
  totalOwners: number | null;
  totalItems: string | null;
  totalListing: number | null;
  minPrice: string | null;
  erc: Erc | null;
  allowedPaymentTokens: string[] | null;
}

export interface TokenMetadataValue {
  value: string;
  count: number | null;
}

export interface TokenMetadataItem {
  displayType: AttributeType;
  key: string;
  values: TokenMetadataValue[];
}

export interface TokenMetadata {
  erc: Erc;
  attributes: TokenMetadataItem[];
}

export interface CollectionMetadata {
  avatar: string | null;
  banner: string | null;
  collection_name: string | null;
  discord_url: string | null;
  ronin_url: string | null;
  studio_name: string | null;
  twitter_url: string | null;
  website_url: string | null;
}

export interface CollectionAnalytic {
  changesPct: {
    sales_change_pct: {
      last_24h: number;
      last_30d: number;
      last_7d: number;
    };
    volume_change_pct: {
      last_24h: number;
      last_30d: number;
      last_7d: number;
    };
  };
  extraStats: {
    owner_distribution: number[];
  };
  floorDepth: {
    from_price: number;
    listings: number;
    to_price?: number;
  }[];
  mkpValueCharts: {
    average_price_chart: {
      last_24h: Stat[];
      last_30d: Stat[];
      last_7d: Stat[];
    };
    floor_price_chart: {
      last_24h: Stat[];
      last_30d: Stat[];
      last_7d: Stat[];
    };
    mkp_sales_chart: {
      last_24h: Stat[];
      last_30d: Stat[];
      last_7d: Stat[];
    };
    mkp_volume_chart: {
      last_24h: Stat[];
      last_30d: Stat[];
      last_7d: Stat[];
    };
  };
  tokenAddress: string;
  totalSupply: string;
  topOwners: TopOwner[];
}

export interface Stat {
  start: number;
  value?: number;
}

export interface TopOwner {
  owner: string;
  ownerProfile: PublicProfile | null;
  quantity: string;
}

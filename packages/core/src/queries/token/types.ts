import { CollectionMetadata } from '../collection';
import { Order } from '../order/types';
import { PublicProfile } from '../profile/types';

export enum SortBy {
  IdAsc = 'IdAsc',
  IdDesc = 'IdDesc',
  Latest = 'Latest',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
}

export enum Erc1155SortBy {
  Latest = 'Latest',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
}

export interface InputRange {
  from: string;
  to: string;
}

export interface RangeSearchCriteria {
  name: string;
  range: InputRange;
}

export interface SearchCriteria {
  name: string;
  values: string[];
}

export enum AttributeType {
  Date = 'date',
  NumberRanking = 'number_ranking',
  String = 'string',
  Number = 'number',
  Price = 'price',
}

export interface TraitDistribution {
  key: string;
  value: string;
  count: number | null;
  percentage: number | null;
  displayType: AttributeType;
}

export interface Attribute {
  [key: string]: string[];
}

export interface TransferHistory {
  tokenId: string;
  from: string;
  to: string;
  fromProfile: PublicProfile | null;
  toProfile: PublicProfile | null;
  timestamp: number;
  txHash: string;
  withPrice: string;
  quantity: string;
  paymentToken: string;
}

export interface Erc721Token {
  tokenAddress: string;
  tokenId: string;
  owner: string;
  name: string | null;
  order: Order | null;
  image: string | null;
  cdnImage: string | null;
  video: string | null;
  isLocked: boolean;
  attributes: Attribute | null;
  traitDistribution: TraitDistribution[];
  collectionMetadata: CollectionMetadata | null;
  ownerProfile: PublicProfile | null;
  minPrice?: string | null;
}

export interface Erc1155Token {
  totalListing: number | null;
  totalItemsListing: number | null;
  totalItems: string | null;
  totalOwners: number | null;
  tokenId: string;
  tokenAddress: string;
  name: string | null;
  attributes: Attribute | null;
  image: string | null;
  cdnImage: string | null;
  video: string | null;
  traitDistribution: TraitDistribution[];
  collectionMetadata: CollectionMetadata | null;
  minPrice?: string | null;
  orders?: Order[] | null;
}

export interface CommonTokenData {
  tokenAddress: string;
  tokenId: string;
  owner: string;
  name: string | null;
  image: string | null;
  cdnImage: string | null;
  video: string | null;
  isLocked: boolean;
  collectionMetadata: CollectionMetadata | null;
  balance?: string | null;
  orders?: Order | Order[] | null;
}

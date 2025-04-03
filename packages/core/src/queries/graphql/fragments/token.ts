import { gql } from 'graphql-request';

import { OrderFragment, OrderInfoFragment } from './order';
import { PublicProfileFragment } from './profile';

export const TokenTraitFragment = gql`
  fragment TokenTrait on TokenTrait {
    key
    value
    count
    percentage
    displayType
  }
`;

export const TransferRecordFragment = gql`
  fragment TransferRecord on TransferRecord {
    tokenId
    from
    to
    fromProfile {
      ...PublicProfile
    }
    toProfile {
      ...PublicProfile
    }
    timestamp
    txHash
    withPrice
    quantity
    paymentToken
  }
  ${PublicProfileFragment}
`;

export const Erc721TokenFragment = gql`
  fragment Erc721Token on Erc721 {
    tokenAddress
    tokenId
    name
    order {
      ...Order
    }
    image
    cdnImage
    video
    owner
    ownerProfile {
      ...PublicProfile
    }
    attributes
    traitDistribution {
      ...TokenTrait
    }
    isLocked
    collectionMetadata
  }
  ${OrderFragment}
  ${TokenTraitFragment}
`;

export const Erc1155TokenFragment = gql`
  fragment Erc1155Token on Erc1155 {
    totalListing
    totalItemsListing
    totalItems
    totalOwners
    tokenId
    tokenAddress
    name
    attributes
    image
    cdnImage
    video
    traitDistribution {
      ...TokenTrait
    }
    collectionMetadata
  }
  ${TokenTraitFragment}
`;

export const TokenDataFragment = gql`
  fragment TokenData on TokenData {
    tokenAddress
    slug
    collectionMetadata
    volumeAllTime
    totalOwners
    totalItems
    totalListing
    minPrice
    erc
    groupTraits
    content
    creatorId
    badged
    creatorInfo {
      ...CreatorInformation
    }
    allowedPaymentTokens
    games {
      ...GameInfo
    }
    benefits
    featuredCampaigns(size: 4) {
      featuredEvents {
        ...FeaturedGameEvent
      }
    }
    tradableAfter
  }
`;

export const CreatorInformationFragment = gql`
  fragment CreatorInformation on CreatorInformation {
    id
    creatorName
    verified
    metadata
  }
`;

export const GameInfoFragment = gql`
  fragment GameInfo on GameInfo {
    slug
    name
    consoleMetadata
    gameId
    creatorInfo {
      creatorName
      verified
    }
    gameCampaigns {
      liveEvents {
        ...GameCampaign
      }
      promotionalBanner {
        ...GameCampaign
      }
      upcomingEvents {
        ...GameCampaign
      }
    }
  }
`;

export const GameCampaignFragment = gql`
  fragment GameCampaign on GameCampaign {
    id
    name
    startTime
    endTime
    metadata
  }
`;

export const FeaturedGameEventFragment = gql`
  fragment FeaturedGameEvent on FeaturedGameEvent {
    gameInfo {
      gameId
      name
      consoleMetadata
    }
    gameCampaign {
      ...GameCampaign
    }
  }
`;
export const Erc1155TokenBriefFragment = gql`
  fragment Erc1155TokenBrief on Erc1155 {
    tokenAddress
    tokenId
    slug
    name
    image
    cdnImage
    video
    minPrice
    totalItems
    collectionMetadata
    isLocked
    badged
    orders(from: 0, size: 1, showInvalid: false, sort: PriceAsc) {
      ...OrderInfo
    }
  }
`;


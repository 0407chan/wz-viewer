import {
  GetDemageSkinQuery,
  GetDemageSkinResponse,
  SkinType
} from '@/type/demage-skin'
import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const getDemageSkin = async (
  query: GetDemageSkinQuery
): Promise<GetDemageSkinResponse> => {
  const result = await axios.get(
    // `https://maplestory.io/api/wz/KMS/353/Effect/DamageSkin.img/${query.skinId}/${query.skinType}/${query.skinNumber}`
    `https://maplestory.io/api/wz/KMS/353/Effect/BasicEff.img/${query.skinType}/${query.skinNumber}`
  )
  return result.data
}

export const useGetDemageSkin = (
  query: GetDemageSkinQuery
): UseQueryResult<GetDemageSkinResponse, unknown> => {
  return useQuery(
    ['getDemageSkin', query],
    async () => {
      return getDemageSkin(query)
    },
    {
      enabled: query.skinId !== undefined,
      retry: false,
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}

export const getDemageSkinAll = async (query: {
  skinId: number
  skinType: SkinType
}): Promise<GetDemageSkinResponse> => {
  const result = await axios.get(
    `https://maplestory.io/api/wz/KMS/353/Effect/DamageSkin.img/${query.skinId}/${query.skinType}`
  )
  return result.data
}

export const useGetDemageSkinAll = (query: {
  skinId: number
  skinType: SkinType
}): UseQueryResult<GetDemageSkinResponse, unknown> => {
  return useQuery(
    ['getDemageSkinAll', query],
    async () => {
      return getDemageSkinAll(query)
    },
    {
      enabled: query.skinId !== undefined,
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )
}

export const getWzImage = async (): Promise<GetDemageSkinResponse> => {
  const result = await axios.get(
    `https://maplestory.io/api/wz/KMS/353/UI/UIWindow4.img/enchantUI/miniGame/star/STAR`
    // `https://maplestory.io/api/wz/KMS/353/UI/UIWindow4.img/enchantUI/miniGame/particle/0`
  )
  return result.data
}

export const useGetWzImage = (): UseQueryResult<
  GetDemageSkinResponse,
  unknown
> => {
  return useQuery(
    ['getWzImage'],
    async () => {
      return getWzImage()
    },
    {
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )
}

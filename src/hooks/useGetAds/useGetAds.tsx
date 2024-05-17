import { IAds } from '@vgl/types'
import { Api } from '@vgl/services'
import { useQuery } from 'react-query'

interface IGetAds {
  enabled?: boolean
}

export const useGetAds = (props: IGetAds) => {
  const { enabled = true } = props || {}

  const { isLoading: adsLoading, data: ads } = useQuery<
    IAds[] | undefined,
    Error
  >(['getAds'], Api.ads.getAds, {
    enabled: enabled,
    refetchOnWindowFocus: false,
  })

  return {
    ads,
    adsLoading,
  }
}

export default useGetAds

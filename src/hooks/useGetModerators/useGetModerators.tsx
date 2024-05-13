import { Api } from '@vgl/services'
import { useQuery } from 'react-query'
import { IModerators } from '@vgl/types'

interface IGetModerators {
  enabled?: boolean
}

export const useGetModerators = (props: IGetModerators) => {
  const { enabled = true } = props || {}

  const { isLoading: moderatorsLoading, data: moderators } = useQuery<
    IModerators[] | undefined,
    Error
  >(['getAdmins'], Api.admin.getAdmins, {
    enabled: enabled,
    refetchOnWindowFocus: false,
  })

  return {
    moderators,
    moderatorsLoading,
  }
}

export default useGetModerators

import { useQuery } from 'react-query'

interface useGetSingleUserProps {
  id: string
  fxn?: any
  refetchLabel?: string
}

export const useGetSingleUser = (props: useGetSingleUserProps) => {
  const { id, refetchLabel, fxn } = props

  const { isLoading, data } = useQuery<any>([refetchLabel, id], () => fxn(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isLoading,
  }
}

export default useGetSingleUser

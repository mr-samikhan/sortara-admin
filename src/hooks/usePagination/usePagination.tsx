import { useState, useEffect, useCallback } from 'react'

export const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  )
  const [currentItems, setCurrentItems] = useState<any[]>([])

  const goToNextPage = useCallback(
    () => setCurrentPage((page) => Math.min(page + 1, totalPages - 1)),
    [totalPages]
  )
  const goToPreviousPage = useCallback(
    () => setCurrentPage((page) => Math.max(page - 1, 0)),
    []
  )

  useEffect(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    setCurrentItems(data?.slice(start, end))
  }, [currentPage, itemsPerPage, data])

  useEffect(() => {
    setTotalPages(Math.ceil(data?.length / itemsPerPage))
  }, [data, itemsPerPage])

  return {
    totalPages,
    currentPage,
    currentItems,
    goToNextPage,
    setCurrentPage,
    goToPreviousPage,
  }
}

export default usePagination

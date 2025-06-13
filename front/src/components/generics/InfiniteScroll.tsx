import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import type { Pagination } from "../../services/models";

export function InfiniteScroll<T>({setPage, content, ScrolledComponent, emitEvent}: {
  setPage: (page: number)=>void,  content: Pagination<T>, ScrolledComponent: React.ComponentType<{contentData: T, emitEvent: (event: string, value: unknown) => void}>
  emitEvent: (event: string, value: unknown) => void
}) {

  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) isFirstRun.current = false
    else setLoading(false)
  }, [content])

  useEffect(() => {
    if (!observerRef.current || content.currentPage >= content.totalPages) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loading) return
        setLoading(true)
        setPage(content.currentPage + 1) 
      }, { rootMargin: "200px" }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [content, loading, setPage])

  return (
    <VStack align="start" spacing={4} px={4} py={6} maxW="99vw" >
      {content.data.map((data, index) => <ScrolledComponent key={index} contentData={data} emitEvent={emitEvent}/>)}
    
    {loading && <Spinner />}
      <Box ref={observerRef} h="1px" /> 
    </VStack>
  );
}

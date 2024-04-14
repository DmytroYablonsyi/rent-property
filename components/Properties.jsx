'use client'

import { useState, useEffect } from "react"

import { fetchProperties } from "@/utils/requests"
import PropertyCard from "./PropertyCard"
import Spinner from "./Spinner"
import Pagination from "./Pagination"

 // const properties = await fetchProperties()
  
    // properties.sort((a, b) => new Date(b.createdAt) - new Date (a.createdAt))

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [totalItems, setTotalItems] = useState(0)

   
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);

                if(!res.ok){
                    throw new Error('Failed to fetch data')
                }

                const data = await res.json();
                setProperties(data.properties)
                setTotalItems(data.total)
            } catch (error) {
                console.log(error)
            }finally {
                setLoading(false)
            }
        }
        fetchProperties()
    }, [page, pageSize])

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

  return loading ? (<Spinner/>): (
    <section className="px-4 py-6">
    <div className="container-xl lg:container m-auto px-4 py-6">
      {properties.length === 0 ? (<p>No data</p>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => {
         return <PropertyCard key={property.id} property={property}/>
        })}
      </div>)}
      <Pagination 
            page={page} 
            pageSize={pageSize} 
            totalItems={totalItems} 
            onchange={handlePageChange}
      />
    </div>
  </section>
  )
}

export default Properties
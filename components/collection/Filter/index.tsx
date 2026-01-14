import React from 'react'
import FilterItem from './FilterItem'
import { Facets } from '../type'
import FilterPrice from './FilterItem/FilterPrice'

interface IFilter {
  facets: Facets[]
}

const Filter = ({ facets }: IFilter) => {
  return (
    <div>
      <div>
        <div className="border-b uppercase text-base md:text-lg border-gray-600 pb-3">
          Filter
        </div>
      </div>
      <FilterPrice facets={facets}/>
      <FilterItem facets={facets} />
    </div>
  )
}

export default Filter

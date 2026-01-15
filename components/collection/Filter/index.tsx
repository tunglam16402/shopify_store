import React from 'react'
import FilterItem from './FilterItem'
import { Facets } from '../type'
import FilterPrice from './FilterItem/FilterPrice'
import SelectedFilter from './SelectedFilter'

interface IFilter {
  facets: Facets[]
  globalPrice: Facets[]
}

const Filter = ({ facets, globalPrice }: IFilter) => {
  return (
    <div>
      <div>
        <div className="border-b uppercase text-base md:text-lg border-gray-600 pb-3">
          Filter
        </div>
      </div>
      <SelectedFilter globalPrice={globalPrice} facets={facets}/>
      <FilterPrice globalPrice={globalPrice} />
      <FilterItem facets={facets} />
    </div>
  )
}

export default Filter

import {
  CollectionFilterActions
} from '@/lib/hooks/useFilterProduct'
import { Facets } from '../type'
import FilterItem from './FilterItem'
import FilterPrice from './FilterItem/FilterPrice'
import SelectedFilter from './SelectedFilter'

interface IFilter {
  facets: Facets[]
  globalPrice: Facets[]
  actions: CollectionFilterActions
}

const Filter = ({ facets, globalPrice, actions }: IFilter) => {

  return (
    <div>
      <SelectedFilter globalPrice={globalPrice} facets={facets} actions={actions}/>
      <FilterPrice globalPrice={globalPrice} setRange={actions.setRange}/>
      <FilterItem facets={facets} toggleValue={actions.toggleValue}/>
    </div>
  )
}

export default Filter

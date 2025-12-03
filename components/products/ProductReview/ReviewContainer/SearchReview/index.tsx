import { SearchIcon } from '@/components/icons'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup'
import React from 'react'

const SearchReview = () => {
  return (
    <div className='max-w-md w-full'>
      <InputGroup className='h-10 text-base' >
        <InputGroupInput placeholder="Search topics and reviews..."/>
        <InputGroupAddon></InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <SearchIcon className="text-black" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchReview

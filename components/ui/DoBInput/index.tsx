'use client'

import { format } from 'date-fns'
import * as React from 'react'
import { Button } from '../Button'
import { Calendar } from '../Calendar'
import { Field } from '../Field'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  name: string
}

export function DatePicker({ value, onChange, name }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="w-fit">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="h-12 w-full justify-start px-6 md:px-10 text-sm font-normal md:text-base"
          >
            {value ? format(value, 'dd/MM/yyyy') : 'Select date'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        name={name}
        value={value ? format(value, 'yyyy-MM-dd') : ''}
      />
    </Field>
  )
}

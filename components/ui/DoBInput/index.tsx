'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Button } from '../Button'
import { Field, FieldLabel } from '../Field'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { Calendar } from '../Calendar'

interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  name: string
}

export function DatePicker({ value, onChange, name }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="w-fit">
      <FieldLabel>Date of birth</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start font-normal">
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

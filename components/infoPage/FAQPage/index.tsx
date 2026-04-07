'use client'

import SearchInput from '@/components/common/SearchInput'
import ContactForm from '@/components/contact/ContactForm'
import { IcoDown } from '@/components/icons'
import Dropdown from '@/components/ui/Dropdown'
import StyledHeading from '@/components/ui/StyledHeading'
import { useSearch } from '@/lib/hooks/useSearch'
import { FC, useState, useRef } from 'react'

type Question = {
  question: string
  answer: string
}

type Category = {
  id: string
  category: string
  questions: Question[]
}

type Props = {
  faqsData: Category[]
}

export const FAQPage: FC<Props> = ({ faqsData }) => { 
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const { query, setQuery, results } = useSearch({
    data: faqsData,
    keys: (item) => [item.category, ...item.questions.map((q) => q.question)],
  })

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  const scrollToCategory = (id: string) => {
    const el = categoryRefs.current[id]
    if (el) {
      const yOffset = -80
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="mt-6 md:mt-10">
      <h1 className="font-sub-heading text-center text-4xl leading-none font-medium tracking-[-0.02em] text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
        Frequently Asked Question
      </h1>
      <div className="mt-20 flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}

        <aside className="sticky top-20 hidden h-fit w-120 self-start border p-8 md:block">
          <SearchInput
            value={query}
            onSearch={setQuery}
            placeholder="Search reviews..."
          />
          <ul className="mt-5 space-y-5">
            {faqsData.map((cat) => (
              <li key={cat.id}>
                <button
                  className="hover:text-primary border-b border-gray-700 text-left text-lg uppercase transition-colors"
                  onClick={() => scrollToCategory(cat.id)}
                >
                  {cat.category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* FAQ Content */}
        <div className="flex-1 space-y-8">
          {results.length ? (
            results.map((data) => (
              <div
                key={data.id}
                ref={(el) => {
                  categoryRefs.current[data.id] = el
                }}
              >
                <StyledHeading
                  headingClass="text-3xl md:text-[42px]  tracking-tighter"
                  subHeadingClass="text-4xl md:text-5xl font-sub-heading"
                  text={data.category}
                />
                <div className="mt-6 space-y-3 md:mt-8">
                  {data.questions.map((q, idx) => {
                    const questionId = `${data.id}-${idx}`
                    const isOpen = openIndex === questionId
                    return (
                      <Dropdown
                        key={questionId}
                        title={q.question}
                        isOpen={isOpen}
                        onToggle={() => toggle(questionId)}
                        openIcon={<IcoDown className="h-5 w-5" />}
                        closeIcon={<IcoDown className="h-5 w-5" />}
                        className="border-b-gray-300"
                      >
                        <div className="prose prose-sm md:prose-base mt-3 max-w-none pb-4 text-sm text-gray-700">
                          {q.answer.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </Dropdown>
                    )
                  })}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h3 className="text-3xl md:text-[42px]">
                No matching{' '}
                <span className="font-sub-heading text-5xl">results</span>
              </h3>
              <p className="mt-6 md:mt-8">
                Your search did not return any results.
              </p>
              <p className="mt-2 md:mt-4">
                Check your spelling or try again with a less specific keyword
              </p>
            </div>
          )}

          <ContactForm
            className="mt-16 bg-white p-0 text-black md:mt-28 md:px-0 md:py-0"
            formTitle="Send a message"
            checkboxClassName="text-black"
            textClassName="pl-1 text-black placeholder:text-lg placeholder:text-gray-500 md:text-lg"
          />
        </div>
      </div>
    </div>
  )
}

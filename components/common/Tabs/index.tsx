'use client'

import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.css'

type TabItem = {
  label: string
  icon?: React.ReactNode
  key: string
  component?: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultKey?: string
  selectedKey?: string
  onTabChange?: (key: string) => void
  renderContent?: (key: string) => React.ReactNode
  renderTabHeader?: (tab: TabItem, isActive: boolean) => React.ReactNode
  tabClassName?: string
}

const Tab: React.FC<TabsProps> = ({
  tabs,
  selectedKey,
  defaultKey,
  onTabChange,
  renderContent,
  renderTabHeader,
  tabClassName = '',
}) => {
  const [internalKey, setInternalKey] = useState(defaultKey ?? tabs[0]?.key)
  const activeKey = selectedKey ?? internalKey

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const indicatorRef = useRef<HTMLDivElement>(null)

  const handleClick = (key: string) => {
    if (!selectedKey) {
      setInternalKey(key)
    }
    onTabChange?.(key)
  }

  useEffect(() => {
    const activeEl = tabRefs.current[activeKey]
    const indicatorEl = indicatorRef.current
    if (activeEl && indicatorEl) {
      const offsetLeft = activeEl.offsetLeft
      const width = activeEl.offsetWidth
      indicatorEl.style.transform = `translateX(${offsetLeft}px)`
      indicatorEl.style.width = `${width}px`
    }
  }, [activeKey, tabs])

  const currentTab = tabs.find((t) => t.key === activeKey)

  return (
    <div>
      <div className={style.filterWrapper}>
        <div className={style.filter}>
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey

            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[tab.key] = el
                }}
                onClick={() => handleClick(tab.key)}
                className={`${tabClassName} flex flex-col items-center gap-1 ${
                  isActive ? 'font-bold' : 'opacity-70'
                }`}
                type="button"
              >
                {renderTabHeader ? (
                  renderTabHeader(tab, isActive)
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                )}
              </button>
            )
          })}

          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
          />
        </div>
      </div>

      <div className="mt-6">
        {currentTab?.component ?? renderContent?.(activeKey)}
      </div>
    </div>
  )
}

export default Tab

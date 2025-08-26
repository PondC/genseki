'use client'

import { useState } from 'react'

import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr'

import { type MinimalCollectionListFilterProps } from './components/filter/filter-panel'
import { FilterToggle } from './components/filter/filter-toggle'
import type { FilterFieldOptions } from './components/filter/panel-content'
import { CollectionListCreate, type MinimalCollectionListCreateProps } from './create'
import { CollectionListDelete, type MinimalCollectionListDeleteProps } from './delete'
import { CollectionListFilter } from './filter'
import { CollectionListSearch, type CollectionListSearchProps } from './search'

import { BaseIcon, ButtonLink } from '../../../../components'
import { cn } from '../../../../utils/cn'
import type { ListActions } from '../../types'

export interface CollectionListToolbarProps
  extends CollectionListSearchProps,
    MinimalCollectionListDeleteProps,
    MinimalCollectionListFilterProps,
    MinimalCollectionListCreateProps {
  isShowDeleteButton?: boolean
  actions?: ListActions
  filterOptions: FilterFieldOptions[]
  allowedFilters: string[]
  onFilterChange?: (value: string) => void
}

/**
 * @param props.slug A slug for page
 * @param props.isLoading A loading state for the toolbar
 * @param props.isShowDeleteButton A boolean to show/hide delete button
 * @param props.onDelete A callback function when delete button is clicked
 * @param props.features Features configuration for the list view
 */
export function CollectionListToolbar(props: CollectionListToolbarProps) {
  const { isShowDeleteButton = false, actions } = props

  const [filterPanelOpen, setFilterPanelOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-x-3">
        <ButtonLink
          aria-label="Back"
          href="."
          variant="ghost"
          size="md"
          leadingIcon={<BaseIcon icon={CaretLeftIcon} size="md" />}
        >
          Back
        </ButtonLink>
        <div className="flex items-center gap-x-4">
          {actions?.delete && isShowDeleteButton && (
            <CollectionListDelete onDelete={props.onDelete} isLoading={props.isLoading} />
          )}
          <CollectionListSearch
            isLoading={props.isLoading}
            onSearchChange={props.onSearchChange}
            search={props.search}
          />
          <FilterToggle
            isOpen={filterPanelOpen}
            onClick={() => {
              setFilterPanelOpen((p) => !p)
            }}
          />
          {actions?.create && (
            <CollectionListCreate isLoading={props.isLoading} slug={props.slug} />
          )}
        </div>
      </div>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          filterPanelOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <CollectionListFilter
            isLoading={props.isLoading}
            slug={props.slug}
            filterOptions={props.filterOptions}
            allowedFilters={props.allowedFilters}
          />
        </div>
      </div>
    </div>
  )
}

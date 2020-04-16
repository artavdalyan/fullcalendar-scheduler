import { Calendar, CalendarState, Action, DateRange } from '@fullcalendar/core'
import { ResourceSourceError } from '../structs/resource-source'
import { ResourceHash, ResourceInput } from '../structs/resource'
import { reduceResourceSource } from './resourceSource'
import { reduceResourceStore } from './resourceStore'
import { reduceResourceEntityExpansions } from './resourceEntityExpansions'


export type ResourceAction = Action |
  { type: 'FETCH_RESOURCE' } |
  { type: 'RECEIVE_RESOURCES', rawResources: ResourceInput[], fetchId: string, fetchRange: DateRange | null } |
  { type: 'RECEIVE_RESOURCE_ERROR', error: ResourceSourceError, fetchId: string, fetchRange: DateRange | null } |
  { type: 'ADD_RESOURCE', resourceHash: ResourceHash } | // use a hash because needs to accept children
  { type: 'REMOVE_RESOURCE', resourceId: string } |
  { type: 'SET_RESOURCE_PROP', resourceId: string, propName: string, propValue: any } |
  { type: 'SET_RESOURCE_ENTITY_EXPANDED', id: string, isExpanded: boolean } |
  { type: 'RESET_RESOURCE_SOURCE', resourceSourceInput: any } |
  { type: 'REFETCH_RESOURCES' }

export function reduceResources(state: CalendarState, action: ResourceAction, rawOptions, calendar: Calendar) {
  let resourceSource = reduceResourceSource(state.resourceSource, action, state.dateProfile, rawOptions, calendar)
  let resourceStore = reduceResourceStore(state.resourceStore, action, resourceSource, calendar)
  let resourceEntityExpansions = reduceResourceEntityExpansions(state.resourceEntityExpansions, action)

  return {
    ...state,
    resourceSource,
    resourceStore,
    resourceEntityExpansions
  }
}

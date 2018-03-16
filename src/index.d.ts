import * as React from 'react'

export type RenderResult = JSX.Element | Array<JSX.Element> | string | number | null | false

type PromiseRendererChildrenFunction<QueryResult> = (
  running: boolean,
  result: QueryResult | undefined,
  rejected: boolean,
  rejectReason: any,
) => RenderResult

interface IPromiseRendererProps<QueryParams, QueryResult> {
  params: QueryParams
  children?: PromiseRendererChildrenFunction<QueryResult> | RenderResult
}

type ResolvedChildrenFunction<QueryResult> = (result: QueryResult) => RenderResult

interface IResolvedProps<QueryResult> {
  children?: ResolvedChildrenFunction<QueryResult> | RenderResult
}

type RejectedChildrenFunction = (reason: any) => RenderResult

interface IRejectedProps {
  children?: RejectedChildrenFunction | RenderResult
}

interface IQueryTypes<QueryParams, QueryResult> {
  Running: React.ComponentType<{}>
  Resolved: React.ComponentType<IResolvedProps<QueryResult>>
  Rejected: React.ComponentType<IRejectedProps>
  new (): React.Component<IPromiseRendererProps<QueryParams, QueryResult>>
}

declare function createPromiseRenderer<QueryParams, QueryResult>(
  queryFunc: (params: QueryParams) => PromiseLike<QueryResult>,
): IQueryTypes<QueryParams, QueryResult>

export default createPromiseRenderer

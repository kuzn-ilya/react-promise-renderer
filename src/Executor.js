import * as PropTypes from 'prop-types'
import { isFunction, invariant, INVARIANT_MUST_BE_A_CHILD } from './common'

export const createExecutor = (contextPropName, rootDisplayName) => {
  /**
   * Type of children function for {@link AsyncCall.Executor}
   * @function ExecutorChildrenFunction
   * @param {object} params
   * @param {ExecuteFunction} params.execute Function for manual execution of asynchronous operation.
   * @returns {ReactNode} Should return rendered React component(s) depending on supplied params.
   * @remark type definition
   */

  /**
   * @class
   * @classdesc
   * React Component. Renders its children always. Property `children` must be a function with the only argument receiving an object
   * with a function for manual execution of async operation.
   * @example
   * ```jsx
   * <AsyncCall.Executor>{({ execute }) => <button onClick={execute}>Click me!</button>}</AsyncCall.Executor>
   * ```
   * @property {ExecutorChildrenFunction} children
   * @static
   * @extends {React.StatelessComponent}
   * @memberof AsyncCall
   */
  const Executor = (props, context) => {
    const contextProps = context[contextPropName]

    invariant(contextProps, INVARIANT_MUST_BE_A_CHILD, Executor.displayName, rootDisplayName)

    return (isFunction(props.children) && props.children({ execute: contextProps.execute })) || null
  }

  Executor.contextTypes = {
    [contextPropName]: PropTypes.shape({
      execute: PropTypes.func.isRequired,
    }),
  }

  Executor.displayName = `${rootDisplayName}.Executor`

  Executor.propTypes = {
    children: PropTypes.func.isRequired,
  }

  return Executor
}

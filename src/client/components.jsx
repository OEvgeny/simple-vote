/** @jsx html */
import { html } from 'snabbdom-jsx'
import { router } from './client'

const goto = url => event => {
  event.preventDefault()
  router.push(url)
}

export const Link = ({url, classes}, children) => (
  <a selector=".link" classNames={classes} href={url} on-click={goto(url)}>{ children }</a>
)

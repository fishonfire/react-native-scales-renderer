import React from 'react'
import axios from 'axios'
import { Callbacks, Config, CustomComponents, Styles } from '../types/ScalesCMS'
import PageRenderer from './PageRenderer'

interface ScalesCMSProps {
  config: Config
  pageSlug?: string
  pageId?: number
  customComponents?: CustomComponents
  styles?: Styles
  callbacks?: Callbacks
}

const ScalesCMS: React.FC<ScalesCMSProps> = ({
  config,
  pageSlug,
  pageId,
  customComponents,
  styles,
  callbacks,
}) => {
  const [page, setPage] = React.useState(null)

  const { apiBaseURL, apiKey, apiVersion } = config

  React.useEffect(() => {
    let url

    if (pageId) {
      url = `/pages/${pageId}`
    }

    if (pageSlug) {
      url = `/pages/slug/${pageSlug}`
    }

    if (!url) {
      return
    }

    axios
      .get(url, {
        baseURL: apiBaseURL,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          api_version: apiVersion,
        },
      })
      .then(response => {
        setPage(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [apiBaseURL, apiKey, apiVersion, config, pageId, pageSlug])

  if (!page) {
    return <></>
  }

  return (
    <PageRenderer
      page={page}
      customComponents={customComponents}
      styles={styles}
      callbacks={callbacks}
    />
  )
}

export default React.memo(ScalesCMS)

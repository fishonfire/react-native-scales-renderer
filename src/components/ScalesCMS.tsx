import React from 'react'
import axios from 'axios'
import { Config, CustomComponents } from '../types/ScalesCMS'
import PageRenderer from './PageRenderer'

interface ScalesCMSProps {
  config: Config
  pageSlug: string
  customComponents?: CustomComponents
}

const ScalesCMS: React.FC<ScalesCMSProps> = ({
  config,
  pageSlug,
  customComponents,
}) => {
  const [page, setPage] = React.useState(null)

  const { apiBaseURL, apiKey, apiVersion } = config

  React.useEffect(() => {
    axios
      .get(`/pages/slug/${pageSlug}`, {
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
  }, [apiBaseURL, apiKey, apiVersion, config, pageSlug])

  if (!page) {
    return <></>
  }

  return <PageRenderer page={page} customComponents={customComponents} />
}

export default React.memo(ScalesCMS)

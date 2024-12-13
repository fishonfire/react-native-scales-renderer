import React from 'react'
import axios from 'axios'
import { Config } from './types/ScalesCMS'
import PageRenderer from './components/PageRenderer'

export interface ScalesCMSProps {
  config: Config
  pageSlug: string
  customComponents?: Record<string, React.ComponentType>
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
  }, [config, pageSlug])

  if (!page) {
    return <></>
  }

  return <PageRenderer page={page} customComponents={customComponents} />
}

export default React.memo(ScalesCMS)

import React from 'react'
import axios from 'axios'
import { Config } from './types/ScalesCMS'
import PageRenderer from './components/PageRenderer'

interface ScalesCMSProps {
  config: Config
  pageSlug: string
}

const ScalesCMS: React.FC<ScalesCMSProps> = ({ config, pageSlug }) => {
  const [page, setPage] = React.useState(null)

  const { apiBaseURL, apiKey, apiVersion } = config

  const axiosConfig = {
    baseURL: apiBaseURL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      api_version: apiVersion,
    },
  }

  React.useEffect(() => {
    axios
      .get(`/pages/slug/${pageSlug}`, axiosConfig)
      .then(response => {
        setPage(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [axiosConfig, apiBaseURL, apiKey, apiVersion, pageSlug])

  if (!page) {
    return <></>
  }

  return <PageRenderer page={page} />
}

export default React.memo(ScalesCMS)

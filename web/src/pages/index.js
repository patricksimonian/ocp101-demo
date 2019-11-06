import React, { useState, useEffect } from "react"
import axios from 'axios';
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState(null);
  const [apiStatus, setApiStatus] = useState('OFFLINE');

  useEffect(() => {

    const getApiStatus = async () => {

      const response = await axios.get(process.env.GATSBY_API_BASE_URL);
      console.log(response, 'RESPONSE')
      if(response.status === 200) {
        setApiStatus('ONLINE');
      } else {
        setApiStatus('OFFLINE');
      }
    }

    getApiStatus();

  }, [apiStatus])

  const getJoke = async () => {
    if(!loading) {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.GATSBY_API_BASE_URL}/joke`);
        setJoke(response.data.joke);
      } catch(e) {
        setJoke('API IS OFFLINE!! This is not a Joke :) are you sure its configured correctly?');
      }
      setLoading(false);
    }
  }

  return (
    <Layout apiStatus={apiStatus}>
      <SEO title="Home" />
      <h2>Welcome to your new BC Gov hello world site.</h2>
      <p>To demonstrate that we can interact with different microservices just go ahead and click the button below
      for <i>amazing</i> jokes</p>
      <button onClick={getJoke}>Get Joke</button>
      {joke && <div style={{ maxWidth: `300px`, margin: `1.45rem`, padding: `12px`, boxShadow: `1px 1px 2px 2px rgba(0,0,0, .24)` }}>
        {joke}
      </div>
      }
    </Layout>
  )
}

export default IndexPage

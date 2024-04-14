const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  // Fetch properties

async function fetchProperties ({showFeatured = false} = {}) {
    try {
      // Handle the case where domain is not available yet

      if(!apiDomain) {
        return []
      }

      const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`, {
        cache: "no-store"
      })
      if (!res.ok) {
        throw new Error ("failed to fetch data")
      }
      return res.json()
    } catch (error) {
      console.log(error)
      return []
    }
  }

  // Fetch single property
  async function fetchProperty (id) {
    try {
      if(!apiDomain) {
        return null
      }

      const res = await fetch(`${apiDomain}/properties/${id}`, {
        cache: "no-cache"
      })
      if (!res.ok) {
        throw new Error ("failed to fetch data")
      }
      return res.json()
    } catch (error) {
      console.log(error)
      return []
    }
  }
  export {fetchProperties, fetchProperty}
import { loadedContacts } from '$lib/contacts'

export async function get() {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  // const { type } = params;

  

  return {
    body: 
    {
      contacts: loadedContacts
    }
  }
  
}

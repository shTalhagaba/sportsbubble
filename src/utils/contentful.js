import { createClient } from 'contentful';
import Config from 'react-native-config';

const client = createClient({
  space: "etuw5wlwhgh7",
  accessToken: "gqxM9QzKBU0JLfPfGgaVD5CEcWMfRdCiK9N97QP-hG0",
});

export async function fetchContentFulContent (entryId) {
    try {
      const entry = await client.getEntry(entryId)
      return entry
    } catch (error) {
      return null
    }
  }
  
export default client;

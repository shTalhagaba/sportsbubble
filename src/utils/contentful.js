import { createClient } from 'contentful';
import Config from 'react-native-config';

const client = createClient({
  space: Config.SPACE_ID ? Config.SPACE_ID : "etuw5wlwhgh7",
  accessToken: Config.ACCESS_TOKEN ? Config.ACCESS_TOKEN : "gqxM9QzKBU0JLfPfGgaVD5CEcWMfRdCiK9N97QP-hG0",
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

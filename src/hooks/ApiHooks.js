// TODO: add necessary imports
import {baseUrl} from '../utils/variables';
import {useState} from 'react';
import {useEffect} from 'react';

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.message;
      throw new Error(message);
    }
  } catch (err) {
    throw new Error('fetchJson error', err.message);
  }
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMedia = async () => {
    try {
      const media = await fetchJson(baseUrl + 'media');
      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
        })
      );
      setMediaArray(allFiles);
    } catch (err) {
      console.log('getMedia error', err.message);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};

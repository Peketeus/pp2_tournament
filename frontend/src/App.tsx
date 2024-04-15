/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import Lake from './Lake';
import Page from './components/Page';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

export interface ILake {
  name: string;
  time: string;
  season: string;
  length: string;
  compType: string;
}

function App() {
  const [originalLakes, setOriginalLakes] = useState<ILake[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateRequest = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(
        'http://localhost:8080/api/pilkki/viewLakes'
      );

      if (result?.data) {
        setOriginalLakes(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Datan haussa tapahtui virhe. Tarkempi virhe on merkitty selaimen konsoliin.');
      console.error(error)
      setIsLoading(false);
    }
  };

  const handleErrorClose = () => {
    setError('');
  };

  return (
    <>
      <Navbar />
      <div className='main-container'>
        <Page isLoading={isLoading}>
          <div className='lake-container'>
            {originalLakes.map((lake, index) => (
              <Lake key={index} lakeData={lake} />
            ))}
          </div>
        </Page>
      </div>
      {error && (
        <Toast
          isError={error ? true : false}
          errorMessage={error}
          handleClose={handleErrorClose}
        />
      )}
      <button disabled={isLoading} onClick={handleGenerateRequest}>
        Generate tournament
      </button>
    </>
  );
}

export default App;

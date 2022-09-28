import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from './store/action';
import './App.css';
import Table from './components/Table';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const dataRes = await fetch('http://localhost:3100/getData', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
      })
      const dataReq = await dataRes.json();
      dispatch(setData(dataReq))
    }
    getData();
  }, [])
  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;

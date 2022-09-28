import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData, filterAct } from '../store/action';
import _ from 'lodash';

const pageSize = 10;

const Table = () => {
    const dispatch = useDispatch();
    const datas = useSelector((store) => store.data);
    //------------------------------------------------- Пагинация
    const [paginatedData, setpaginatedData] = useState('');
    const [currentPage, setcurrentPage] = useState(1)
    const pageCount = datas ? Math.ceil(datas.length / pageSize) : 0;
    const pages = _.range(1, pageCount + 1)
    const pagination = (pageNum) => {
        setcurrentPage(pageNum);
        const startIndex = (pageNum - 1) * pageSize;
        const paginatedData = _(datas).slice(startIndex).take(pageSize).value();
        setpaginatedData(paginatedData)
    }
    //------------------------------------------------- Select and input handler
    const [inputs, setInputs] = useState({column: '', condition: '', value: ''})
    const onCangeHandler = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }
    //------------------------------------------------- Filter
    const filter = () => {
        if (inputs.column && inputs.condition && inputs.value) {
            dispatch(filterAct(inputs))
        } else {
            alert('Заполните все поля')
        }
    }
    //------------------------------------------------- Reset
    const reset = async () => {
        const dataRes = await fetch('http://localhost:3100/getData', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
      })
      const dataReq = await dataRes.json();
      dispatch(setData(dataReq))
    }
    //------------------------------------------------- Help func for inputs control
    const disableOption = () => {
        if (inputs.column === 'name') return true;
        return false
    }
    useEffect(() => {
        setpaginatedData(_(datas).slice(0).take(pageSize).value())
    }, [datas])
  return (
    <div>
        <select className="form-select" aria-label="Default select example" name="column" onChange={onCangeHandler}>
            <option selected>Выбор колонки, по которой будет фильтрация</option>
            <option value="name">Название</option>
            <option value="quantity">Количество</option>
            <option value="distance">Расстояние</option>
        </select>
        <select className="form-select" aria-label="Default select example" name="condition" onChange={onCangeHandler}>
            <option selected>Выбор условия</option>
            <option value="equal">равно</option>
            <option value="include">содержит</option>
            <option value="more" disabled={disableOption()}>больше</option>
            <option value="less" disabled={disableOption()}>меньше</option>
        </select>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="Поле для ввода значения для фильтрации" name="value" onChange={onCangeHandler}/>
            <label htmlFor="floatingInput">Значение</label>
        </div>
        <button type="button" className="btn btn-success" onClick={filter}>Фильтровать</button>
        <button type="button" className="btn btn-danger" onClick={reset}>Обновить таблицу</button>
        {!paginatedData ? ('No data') : (
        <table className="table">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние</th>
                </tr>
            </thead>
            <tbody>
                {
                    paginatedData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.createdAt}</td>
                            <td>{data.name}</td>
                            <td>{data.quantity}</td>
                            <td>{data.distance}</td>
                        </tr>
                    ) )
                }
            </tbody>
        </table>
    )}
    <nav>
        <ul className="pagination d-flex justify-content-center">
            {
                pages.map((page) => (
                    <li 
                        key={page}
                        className={
                        page === currentPage ? "page-item active" : "page-item"
                    }>
                      <p className="page-link"
                         onClick={() => pagination(page)}
                      >{page}</p>
                    </li>
                ))
            }
        </ul>
    </nav>
    </div>
    
  )
}

export default Table
import React, { useState } from 'react'
import style from './Pagination.module.css'

export default function Pagination({onPageChanged, currentPage, totalItemsCount, pageSize, portionSize = 10}) {

  let [portionNumber, setPortionNumber] = useState(1)
  
  const pages = [];
  const pagesCount  = Math.ceil(totalItemsCount / pageSize);

  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && <button className={style.pageBtn} onClick={() => setPortionNumber(1)}>1</button>}
      {portionNumber > 1 && <button className={style.pageBtn} onClick={() => setPortionNumber(portionNumber - 1)}>{'<<'}</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <button 
          className={currentPage === p ? `${style.currentPage} ${style.pageBtn}` : style.pageBtn} 
          onClick={() => onPageChanged(p)}>{p}
            </button>
          }
        )
      }
      {portionCount > portionNumber && <button className={style.pageBtn} onClick={() => setPortionNumber(portionNumber + 1)}>{'>>'}</button>}
    </div>
  )
}
import React, { FC, useState } from 'react'
import style from './Pagination.module.css'

type PropsType = {
  currentPage: number
  totalItemsCount: number | null
  pageSizeNumber: number
  portionSize: number
  propClassName: string
  onPageChanged: (page: number) => void
}

const Pagination: FC<PropsType> = ({onPageChanged, currentPage, totalItemsCount, pageSizeNumber, portionSize = 10, propClassName}) => {

  let [portionNumber, setPortionNumber] = useState(1)
  
  const pages = [];
  const pagesCount  = totalItemsCount ? Math.ceil(totalItemsCount / pageSizeNumber) : 0;

  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={propClassName}>
      {portionNumber > 1 && <button className={style.pageBtn} onClick={() => setPortionNumber(1)}>1</button>}
      {portionNumber > 1 && <button className={style.pageBtn} onClick={() => setPortionNumber(portionNumber - 1)}>{'<<'}</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <button key={p}
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

export default Pagination
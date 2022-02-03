import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Pagination = (props) => {
    const [portionNumber, setPortionNumber] = useState(1);
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
        pages.push(i);

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;
    // debugger
    return (
        <div>
            {/* {
                portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }} >PREV</button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(page => {
                        return <span className={props.currentPage == page && styles.selectedPage} onClick={(event) => { props.onPageChanged(page) }}>{page}</span>
                    })
            }
            {
                portionNumber != portionCount && <button onClick={() => { setPortionNumber(portionNumber + 1) }} >NEXT</button>
            } */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                        portionNumber > 1 &&
                        <li key="prev" className="page-item" onClick={() => { setPortionNumber(portionNumber - 1) }}>
                            <NavLink  to="#" className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </NavLink>
                        </li>
                    }
                    {
                        pages
                            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                            .map(page => {
                                return <li key={page} className="page-item"><NavLink to={props.link + '?page=' + page} className="page-link">{page}</NavLink></li>
                            })
                    }
                    {
                        portionNumber != portionCount &&
                        <li key="next" className="page-item" onClick={() => { setPortionNumber(portionNumber + 1) }}>
                            <NavLink to="#" className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
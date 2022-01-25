import React, { useState } from 'react'

const Pagination = (props) => {
    const [portionNumber, setPortionNumber] = useState(1);
    let pagesCount = Math.ceil(props.totalBooksCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
        pages.push(i);

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
        <div>
            {
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
            }
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            { portionNumber > 1 && <span aria-hidden="true">&laquo;</span> }
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            { portionNumber != portionCount && <span aria-hidden="true">&raquo;</span> }
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default Pagination;
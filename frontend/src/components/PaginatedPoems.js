import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const PaginatedPoems = (props) => {
    let {data} = props
    const [currentItems,setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    //starting offset = index of the first item
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(()=>{
    //index of the last item on the current page
    const endOffset = itemOffset + itemsPerPage;

    //items from starting offset to end offset (start index to end index)
    setCurrentItems(data.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset,itemsPerPage,data])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    
    setItemOffset(newOffset);
  };

  return (
    <>
        <div className='d-flex justify-content-center'>
            <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                //each time we change the page (click either one of the buttons on the paginate menu), will fire the function
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName = {" btn-group pagination-container p-0 mt-3"}
                pageClassName= {"text-dark text-decoration-none btn btn-lg btn-light border-dark"}
                previousClassName= {"btn btn-lg btn-light border-dark"}
                previousLinkClassName = {"text-dark text-decoration-none"}
                nextClassName = {"btn btn-lg btn-light border-dark "}
                nextLinkClassName = {"text-dark text-decoration-none "}
            />
            </div>
        </div>
        <div>
            {currentItems.map((poem, index)=>{
                const formattedCreateDate = `${new Date(poem.createdAt).getMonth()+1}/${new Date(poem.createdAt).getDate()}/${new Date(poem.createdAt).getFullYear()}`
                if(index === currentItems.length-1){
                    return (
                        <div className=' mx-auto p-3 mt-5 public_poem_container'>
                            <h1 className='text-center mb-4'><span className='text-decoration-underline'>{poem.title}</span> by <span className='fst-italic'>{poem.author_username}</span></h1>
                            <div className='text-center'>
                                {
                                    poem.text.split("\n").map((line)=>{
                                        return <p className='h5 fw-light font_lato' key={Math.random()*1000}>{line ? line : "\u00A0"}</p>
                                    })
                                }
                            </div>
                            <div>
                                <h5 className='text-end'>
                                    {formattedCreateDate}
                                </h5>
                            </div>
                        </div>
                    )
                }
                
                return (
                    <div className=' mx-auto p-3 my-5 public_poem_container'>
                        <h1 className='text-center mb-4'><span className='text-decoration-underline'>{poem.title}</span> by <span className='fst-italic'>{poem.author_username}</span></h1>
                        <div className='text-center'>
                            {
                                poem.text.split("\n").map((line)=>{
                                    return <p className='h5 fw-light font_lato' key={Math.random()*1000}>{line ? line : "\u00A0"}</p>
                                })
                            }
                        </div>
                        <div>
                            <h5 className='text-end'>
                                {formattedCreateDate}
                            </h5>
                        </div>
                    </div>
                )
            })}
        </div>
      
    </>
  );
}

export default PaginatedPoems;
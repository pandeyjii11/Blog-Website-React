import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Pagination = () => {

    const {page, totalPage, pageChangeHandle} = useContext(AppContext);

    return(
        <div className="w-full flex justify-center items-center border-2 fixed bottom-0 bg-white">
            <div className="flex justify-between items-center w-11/12 max-w-[670px] py-2">
                <div className="flex gap-x-2">
                    {
                        page > 1 && 
                        <button 
                        className="rounded-md border-2 bg-white py-1 px-4"
                        onClick={() => pageChangeHandle(page-1)}>
                            Previous
                        </button>
                    }

                    {
                        page < totalPage && 
                        <button 
                        className="rounded-md border-2 bg-white py-1 px-4"
                        onClick={() => pageChangeHandle(page+1)}>
                            Next
                        </button>
                    }
                </div>
                <div>
                    <p className="font-bold text-sm">
                        Page <span>{page}</span> of <span>{totalPage}</span>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Pagination;
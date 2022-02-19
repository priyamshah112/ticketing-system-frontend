/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";
import $ from "jquery"
// import "./style.css"

function TableFeild(props) {

    const { data, columns, filter } = props;


    const [dataPerPage, setDataPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(data.length);
    const [totalPages, setTotalPages] = useState(data.length / dataPerPage);

    const [finalData, setFinalData] = useState([]);


    useEffect(() => {
        setTotalPages(totalData / dataPerPage)
        if (!currentPage) return null;
        onCurrentPageChange(currentPage)
    }, [currentPage])

    const onCurrentPageChange = (currentPage) => {
        // let startIndex = ((totalData / totalPages) * currentPage) - dataPerPage;
        // let endIndex = ((startIndex + dataPerPage) - 1);
        // setFinalData([]);
        // data.map((d, i) => {

        //     if (i >= startIndex && i <= endIndex) {
        //         setFinalData(finalData => [...finalData, d])
        //     }
        // })
        setFinalData(data)

    }

    const currentPageHandler = (action) => {
        switch (action) {
            case "INCREMENT":
                if (currentPage === totalPages) return null;
                return (currentPage => currentPage + 10);
            case "DECREMENT":
                if (currentPage === 1) return null;
                setCurrentPage(currentPage => currentPage - 1);
                break;
            default:
                return null
        }
    }

    useEffect(() => {
        if(data.length > 0)
        window.dataTableHandler();
    }, [data])

    return (
        <>

            {
                columns && (
                    <table className="table table-striped mt-3 pt-5" id="ticketing-common-table">
                        <thead>
                            <tr>
                                {
                                    columns.map((col, index) => (
                                        <th key={`head_${index}`}>{col.name}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                filter && (
                                    <tr>
                                        {
                                            columns.map((col, index) => (
                                                columns.length - 1 !== index && <td key={`filter_${index}`}><input type={"text"} style={{ border: "1px solid #ddd" }} /></td>
                                            ))
                                        }
                                    </tr>)
                            } */}
                            {
                                data && data.map((d, i) => {
                                    return (
                                        (
                                            <tr key={`key_${i}`}>
                                                {
                                                    columns.map((p, j) => (
                                                        <td key={`index_${j}`}>{p.key === "index" ? i + 1 : (d[p.key])}</td>
                                                    ))
                                                }
                                            </tr>
                                        )
                                    )
                                })
                            }

                        </tbody>
                    </table>
                )
            }
        </>
    )

}

export default TableFeild;
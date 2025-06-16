const Table = ({ tableHeader, tableData, row }) => {
    
    return (
        <table className="table table-bordered table-striped">
            <thead className="table-light">
                <tr>
                    {tableHeader.map((header, id) => (
                       <th key = {id}>{header}</th> 
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.length>0 ? (tableData.map(row)):(<tr><td colSpan={tableHeader.length}>There are no SKU</td></tr>)}
            </tbody>
            </table>
    )
}
export default Table
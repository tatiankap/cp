import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, data, columns, children }) => {
    return (
        <table>
            {children || (
                <>
                    <TableHeader
                        {...{ onSort, selectedSort }}
                        columns={columns}
                    />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    data: PropTypes.array,
    columns: PropTypes.object,
    children: PropTypes.array
};

export default Table;

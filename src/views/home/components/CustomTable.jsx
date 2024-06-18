import { useEffect, useState } from 'react'
import { styled } from '@mui/system';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';

export const CustomTable = ({ headers, data, newBtn, editBtn, deleteBtn }) => {

  const [searchValue, setSearchValue] = useState('');
  const [listOfItems, setListOfItem] = useState(data);

  useEffect(() => {
    if (searchValue === '') {
      setListOfItem(data)
    } else {
      setListOfItem(data.filter((exercise) => exercise[1].toLowerCase().includes(searchValue.toLowerCase())))
    }
  }, [searchValue])

  useEffect(() => {
    setListOfItem(data)
  }, [data])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Root = styled('div')(
    ({ _ }) => `
        table {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.875rem;
          border-collapse: collapse;
          width: 100%;
        }
      
        td,
        th {
          border: 1px solid ${grey[700]};
          text-align: left;
          padding: 8px;
        }
      
        th {
          background-color: ${grey[900]};
        }
        `,
  );

  const CustomTablePagination = styled(TablePagination)`
        & .${classes.toolbar} {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
      
          @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
          }
        }
      
        & .${classes.selectLabel} {
          margin: 0;
        }
      
        & .${classes.displayedRows} {
          margin: 0;
      
          @media (min-width: 768px) {
            margin-left: auto;
          }
        }
      
        & .${classes.spacer} {
          display: none;
        }
      
        & .${classes.actions} {
          display: flex;
          gap: 0.25rem;
        }
      `;

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };


  return (
    <>
      <div className='row'>
        <input type="text" placeholder="Search exercise..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {newBtn && newBtn()}
      </div>
      <Root sx={{ maxWidth: '80%' }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              {editBtn && <th></th>}
              {deleteBtn && <th></th>}
            </tr>
          </thead>
          <tbody>
            {listOfItems.map((row) => (
              <tr key={row[0]}>
                {row.slice(1).map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
                {editBtn && <td>{editBtn(row)}</td>}
                {deleteBtn && <td>{deleteBtn(row[0])}</td>}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
                    <tr>
                        <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    'aria-label': 'rows per page',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </tr>
                </tfoot> */}
        </table>
      </Root>
    </>
  )
}
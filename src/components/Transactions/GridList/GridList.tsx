import * as React from 'react';
import { useGridListStyles } from './GridListStyled';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  ITransaction,
  ETransactionType,
} from '../../../store/transactions/types';

import { stableSort, getSorting } from '../../../helpers/gridLists';
import EnhancedTableHead from './TableHeader/TableHeader';
import { formatDate } from '../../../helpers/date';
import { numberWithCommas } from '../../../helpers/numbers';

interface EnchancedTableProps {
  data: ITransaction[];
}

const EnhancedTable: React.FC<EnchancedTableProps> = props => {
  const classes = useGridListStyles();
  const [order, setOrder] = React.useState<'asc' | 'desc' | undefined>('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatTypeTransaction = (value: string): string => {
    switch (value) {
      case ETransactionType.CREDIT:
        return 'Crédito';
      case ETransactionType.DEBIT:
        return 'Débito';
      default:
        return '';
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
            />
            <TableBody>
              {stableSort(props.data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction: ITransaction) => {
                  return (
                    <TableRow hover tabIndex={-1} key={transaction._id}>
                      <TableCell>
                        {formatDate(transaction.createdAt as string)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {transaction.description}
                      </TableCell>
                      <TableCell>
                        {formatTypeTransaction(transaction.type)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(transaction.value)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default React.memo(EnhancedTable);

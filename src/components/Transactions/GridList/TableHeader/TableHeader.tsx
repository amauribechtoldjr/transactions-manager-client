import * as React from 'react';

import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { useTableHeadStyled } from './TableHeaderStyles';
import { useTranslation } from 'react-i18next';

const headCells = [
  {
    id: 'createdAt',
    numeric: false,
    label: 'transactionDateHeader',
    width: '15%',
  },
  {
    id: 'description',
    numeric: false,
    label: 'descriptionHeader',
    width: '50%',
  },
  {
    id: 'type',
    numeric: false,
    label: 'transactionTypeHeader',
    width: '10%',
  },
  { id: 'value', numeric: true, label: 'transactionValueHeader', width: '25%' },
];

interface EnchancedTableHeadProps {
  onRequestSort: (event: any, property: any) => void;
  order: 'asc' | 'desc' | undefined;
  orderBy: false | 'asc' | 'desc' | undefined | string;
  rowCount: number;
}

const EnhancedTableHead: React.FC<EnchancedTableHeadProps> = props => {
  const { order, orderBy, onRequestSort } = props;
  const classes = useTableHeadStyled();
  const { t } = useTranslation();

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;

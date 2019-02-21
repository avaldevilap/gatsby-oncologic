import classNames from "classnames";
import * as moment from "moment";
import * as React from "react";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";

import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = (theme: Theme) =>
  createStyles({
    table: {
      fontFamily: theme.typography.fontFamily
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box"
    },
    tableRow: {
      cursor: "pointer"
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200]
      }
    },
    tableCell: {
      flex: 1
    },
    noClick: {
      cursor: "initial"
    }
  });

interface IMuiVirtualizedTableProps extends WithStyles<typeof styles> {}

class MuiVirtualizedTable extends React.PureComponent<
  IMuiVirtualizedTableProps
> {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function ReactVirtualizedTable(props) {
  const { patients, conditions, procedures } = props;

  const getConditionById = (id: string) => {
    return conditions.nodes.filter(
      condition => condition.resource.subject.id === id
    );
  };

  const getProcedureById = (id: string) => {
    return procedures.nodes.filter(
      procedure => procedure.resource.subject.id === id
    );
  };

  return (
    <Paper style={{ height: "85vh", width: "100%" }}>
      <WrappedVirtualizedTable
        rowCount={patients.nodes.length}
        rowGetter={({ index }) => patients.nodes[index]}
        onRowClick={({ rowData }) => props.onRowClick(rowData.resource)}
        columns={[
          {
            width: 120,
            flexGrow: 1,
            label: "Nombre Completo",
            dataKey: "resource.name.family",
            cellDataGetter: ({
              rowData: {
                resource: { name }
              }
            }) => {
              return `${
                name[0].prefix ? name[0].prefix : ""
              } ${name[0].given.join(" ")} ${name[0].family}`;
            }
          },
          {
            width: 20,
            flexGrow: 0.5,
            numeric: true,
            label: "Edad",
            dataKey: "age",
            cellDataGetter: ({
              rowData: {
                resource: { birthDate }
              }
            }) => {
              return moment(birthDate).fromNow(true);
            }
          }
          // {
          //   width: 20,
          //   flexGrow: 1,
          //   numeric: true,
          //   label: "Dirección",
          //   dataKey: "address",
          //   cellDataGetter: ({
          //     rowData: {
          //       resource: { address }
          //     }
          //   }) => {
          //     return (
          //       <address>{`${address[0].line[0]}, ${address[0].city}, ${
          //         address[0].state
          //       }`}</address>
          //     );
          //   }
          // }
        ]}
      />
    </Paper>
  );
}

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 350,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
    fontSize: 14,
    height: 32,
    fontWeight: 400,
    whiteSpace: "nowrap",
    color: 'rgba(0, 0, 0, 0.65)',
    textTransform: "none"
  },
  button1: {
    margin: theme.spacing(0.5, 0),
    fontSize: 14,
    height: 32,
    fontWeight: 400,
    whiteSpace: "nowrap",
    marginRight: 20,
    marginLeft: 90,
    color: 'rgba(0, 0, 0, 0.65)',
    textTransform: "none"
  },
}));

function not(a, b) {
  return a.filter((aVal) => !b.find((bVal) => bVal.key === aVal.key));
}

function intersection(a, b) {
  return a.filter((aVal) => b.find((bVal) => bVal.key === aVal.key));
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({ defaultList, defaultSelectedList, onSelectListChange }) {
  const classes = useStyles();
  const [leftChecked, setLeftChecked] = React.useState([]);
  const [rightChecked, setRightChecked] = React.useState([]);
  const [left, setLeft] = React.useState(defaultList || []);
  const [right, setRight] = React.useState(defaultSelectedList || []);

  useEffect(() => {
    setLeft(defaultList);
  }, [defaultList]);

  // useEffect(() => {
  //   setRight(selectedList);
  // }, [selectedList]);



  const handleToggle = (value, context) => () => {
    if (context === 'left') {
      const currentIndex = leftChecked.findIndex(cVal => cVal.key === value.key);
      const newChecked = [...leftChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setLeftChecked(newChecked);
    } else {
      const currentIndex = rightChecked.findIndex(cVal => cVal.key === value.key);
      const newChecked = [...rightChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setRightChecked(newChecked);
    }

  };

  // const numberOfChecked = (items) => intersection(checked, items).length;


  const moveAll = () => {
    const rem = not(left, right);
    const rightList = [...new Set(right.concat(rem))];
    setRight(rightList);
    // setRight(right.concat(leftChecked));
    // setLeft(not(left, []));
    setLeftChecked([]);
    onSelectListChange && onSelectListChange(rightList);
  }

  const deletAll = () => {
    const rightList = [...new Set(right.concat(left))];
    setRight([]);
    // setRight(right.concat(leftChecked));
    // setLeft(not(left, []));
    setRightChecked([]);
    onSelectListChange && onSelectListChange([]);
  }

  const handleCheckedRight = () => {
    // elemnets present in checked only bt not in rightlist A-B operation
    const rem = not(leftChecked, right);
    console.log("rem", rem, "right", right)
    const rightList = [...new Set(right.concat(rem))];
    setRight(rightList);
    // setRight(right.concat(leftChecked));
    setLeft(not(left, []));
    setLeftChecked([]);
    onSelectListChange && onSelectListChange(rightList);
  };

  const handleCheckedLeft = () => {
    setLeft(left)
    // setLeft(left.concat(rightChecked));
    const rightList = not(right, rightChecked);
    setRight(rightList);
    setRightChecked([]);
    onSelectListChange && onSelectListChange(rightList);
  };

  const customList = (context, items, extra) => (
    <Card>
      {/* <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      /> */}

      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.key}-label`;

          return (

            <ListItem key={value.key} role="listitem" button onClick={handleToggle(value, context)}>
              <ListItemIcon>

                <Checkbox
                  checked={!!(context === 'left' ? leftChecked : rightChecked).find(cVal => cVal.key === value.key)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.title}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      <Divider />
      {extra}
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList('left', left, <> <Button
        variant="outlined"
        size="small"
        className={classes.button, classes.button1}
        onClick={handleCheckedRight}
        // disabled={leftChecked.length === 0}
        aria-label="move selected right"
      >
        Add
          </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={moveAll}
          // disabled={leftChecked.length === 0}
          aria-label="move selected right"
          style={{ marginRight: 30 }}
        >
          Add all
          </Button>
      </>)}</Grid>

      <Grid item>{customList('right', right, <> <Button
        variant="outlined"
        size="small"
        className={classes.button, classes.button1}
        onClick={handleCheckedLeft}
        // disabled={rightChecked.length === 0}
        aria-label="move selected left"
      >
        Delete
          </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={deletAll}
          // disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          Delete all
          </Button>
      </>)}</Grid>
    </Grid>
  );
}

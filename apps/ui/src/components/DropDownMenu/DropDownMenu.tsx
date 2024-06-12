import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const buttonStyles = {
    color: '#000000',
    textTransform: 'capitalize',
    fontSize: '0.8125rem',
    fontWeight: 'bold',
  }

export const  DropDownMenu = ({ children, buttonContent }: { children: React.ReactNode , buttonContent: any }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        color='primary' 
        size='small'
        onClick={handleClick}
        sx={buttonStyles}
      >
        {buttonContent()}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {React.Children.map(children, (child: any) => {
            return React.cloneElement(child, { onClick: handleClose });
        })}
      </Menu>
    </div>
  );
}

export const DropDownItem = ({ handleSelect, onClick, children }: any) => {
    return <MenuItem onClick={() => {
        handleSelect()
        onClick()
    }}>{children}</MenuItem>
}

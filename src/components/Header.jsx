import { Box, HStack, Image, Text, Divider, Button } from '@chakra-ui/react';
import React from 'react';
import { FiBell, FiChevronDown, FiUser } from 'react-icons/fi';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import logo from '../assets/MicrosoftTeams-image (4).png';
import { Link } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <Box bgColor="#2C8CCB">
      <HStack justify="space-between">
        <Link to="/login">
          <Image src={logo} />
        </Link>
        <HStack color="#FFFFFF">
          <Text>Home</Text>
          <Text>Sub Distributor Management</Text>
        </HStack>
        <HStack justify="space-between" px="5">
          <FiBell color="#FFFFFF" />
          <Divider orientation="vertical" height="50px" width="3px" px="1" />
          {!token ? (
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          ) : (
            <>
              <FiUser color="#FFFFFF" />
              <Menu isLazy>
                <MenuButton bgColor="#2C8CCB">
                  <HStack>
                    <Text color="#FFFFFF">Distributor 1</Text>
                    <FiChevronDown color="#FFFFFF" />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}

export default Header;
